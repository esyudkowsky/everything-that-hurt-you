/* End-to-end drive of the kinetic novel: title -> begin -> click through the
 * ENTIRE script -> end card; verify cookie+localStorage autosave, Continue,
 * and chapter jump. Screenshots at key beats. */
const { chromium } = require("playwright");
const SHOTS = __dirname + "/shots";
const fs = require("fs");
fs.mkdirSync(SHOTS, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
  page.on("response", (r) => {
    if (r.status() >= 400 && !/fonts\//.test(r.url()))
      errors.push("HTTP " + r.status() + " " + r.url());
  });

  // --- mid-read resume check first: begin, click a while, reload ---
  await page.goto("http://localhost:8321/index.html");
  await page.waitForTimeout(800);
  await page.click("#btn-begin");
  for (let k = 0; k < 40; k++) {
    await page.keyboard.press("Enter");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(60);
  }
  const savedMid = await page.evaluate(() => localStorage.getItem("ethy_save"));
  await page.reload();
  await page.waitForTimeout(800);
  const contMid = await page.evaluate(
    () => document.getElementById("btn-continue").style.display !== "none"
  );
  console.log("mid-read: Continue offered after reload:", contMid, "| save:", savedMid && savedMid.slice(0, 40));
  if (contMid) {
    await page.click("#btn-continue");
    await page.waitForTimeout(1200);
    await page.screenshot({ path: SHOTS + "/00_resume_midread.png" });
  }
  // wipe and start the full run clean
  await page.evaluate(() => { localStorage.clear(); document.cookie = "ethy_save=; max-age=0; path=/"; });
  await page.goto("http://localhost:8321/index.html");
  await page.waitForTimeout(1200);
  await page.screenshot({ path: SHOTS + "/01_title.png" });

  // Begin
  await page.click("#btn-begin");
  await page.waitForTimeout(1500);
  await page.screenshot({ path: SHOTS + "/02_voiceover.png" });

  // click through everything; sample screenshots
  const sampleAt = new Set([5, 30, 60, 90, 130, 160, 200, 230, 260]);
  let clicks = 0;
  for (; clicks < 600; clicks++) {
    const done = await page.evaluate(() => {
      const end = document.getElementById("endcard");
      return end && end.style.display !== "none";
    });
    if (done) break;
    await page.keyboard.press("Enter"); // complete typewriter
    await page.keyboard.press("Enter"); // advance
    await page.waitForTimeout(120);
    if (sampleAt.has(clicks))
      await page.screenshot({ path: SHOTS + `/seq_${String(clicks).padStart(3, "0")}.png` });
    // wait out auto-advance blocks (pause/floor/montage) where clicks are consumed
    if (clicks % 25 === 24) await page.waitForTimeout(600);
  }
  console.log("clicks to finish:", clicks);
  await page.screenshot({ path: SHOTS + "/98_end.png" });

  const endShown = await page.evaluate(
    () => document.getElementById("endcard").style.display !== "none"
  );
  console.log("end card reached:", endShown);

  // persistence checks
  const cookie = (await page.context().cookies()).find((c) => c.name === "ethy_save");
  const ls = await page.evaluate(() => localStorage.getItem("ethy_save"));
  console.log("cookie present:", !!cookie, cookie ? decodeURIComponent(cookie.value).slice(0, 60) : "");
  console.log("localStorage present:", !!ls, ls ? ls.slice(0, 60) : "");

  // back to title -> chapters should all be unlocked
  await page.click("#btn-end-title");
  await page.waitForTimeout(300);
  await page.click("#btn-chapters-title");
  await page.waitForTimeout(300);
  await page.screenshot({ path: SHOTS + "/99_chapters.png" });
  const lockedCount = await page.$$eval("#chapter-list .locked", (els) => els.length);
  console.log("locked chapters after full read:", lockedCount);

  // jump to The Cliff (ch 14) and check the scene reconstructs
  await page.$$eval("#chapter-list .chapter-btn", (els) => {
    els.find((e) => e.textContent.includes("The Cliff")).click();
  });
  await page.waitForTimeout(1500);
  await page.keyboard.press("Enter");
  await page.keyboard.press("Enter");
  await page.waitForTimeout(400);
  await page.screenshot({ path: SHOTS + "/95_cliff_jump.png" });
  const cliffState = await page.evaluate(() => ({
    bg: document.querySelector("#bglayer .layer-img")?.style.backgroundImage,
    right: document.querySelector("#spr-right img")?.src,
  }));
  console.log("cliff jump state:", JSON.stringify(cliffState));

  // fresh page: silent resume via Continue
  const page2 = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page2.goto("http://localhost:8321/index.html");
  await page2.waitForTimeout(800);
  const contVisible = await page2.evaluate(
    () => document.getElementById("btn-continue").style.display !== "none"
  );
  console.log("Continue offered on fresh visit:", contVisible);
  if (contVisible) {
    await page2.click("#btn-continue");
    await page2.waitForTimeout(1500);
    await page2.screenshot({ path: SHOTS + "/96_resume.png" });
  }

  console.log("page errors:", errors.length ? errors.slice(0, 10) : "none");
  await browser.close();
  process.exit(errors.length ? 1 : 0);
})();
