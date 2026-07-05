**Everything That Hurt You** is a kinetic novel by Eliezer Yudkowsky.  Play it at [https://everything-that-hurt-you.vercel.app/.](https://everything-that-hurt-you.vercel.app/)

A "kinetic novel" is a story / comic hybrid where you click (or press space or press Enter) to advance the writing, presented alongside images, backgrounds, character sprites, and music.  It is easier to just try it than to explain.

*Everything That Hurt You* is my first work of fiction produced with significant AI involvement.  (I don't consider previous use of image models for illustrations to be on nearly the same level.)  The story's key scenes were written down by me in 2021, but there was an equal amount of middle parts and transitions that I never found the gumption to write.  It did not help that, even if I had written the middle parts, turning the story into a manga or an actual kinetic novel seemed like it would be much, much more work.

It's not the first year, or the first month in 2026, where I've tried to see if AI has advanced to the point of helping me to produce fictional works.  While I'd now and then try the latest frontier model on fiction-writing tasks, their outputs were never good enough even to be fixable.  Image models required too many tries to produce one good image for me to try to build a whole visual novel that way.

Then came Claude Fable 5.  I tried it on 3 writing tasks.  On two of them it was better than before, but not to the level where the unfinished work was now unblocked.  But the 2nd of the 3 tasks was "Everything That Hurt You".

And maybe because the desired output was short enough, and sufficiently fillable without vast creativity, Fable's outputs were not good, but they were *fixable*.  And Fable 5 could look at AI artwork itself -- as could Opus 4.8, with more human correction -- so Claude Code could itself carry out most of the work of sending off prompts to AI image models, getting back bad art, and correcting it.  Though still with a lot of human correction from me on top.

The prototype was up in a day, and 2 days of extensive editing and revision later, the story had settled into its finished form.

If you want to see the half-story I wrote in 2021, and the Fable conversation that kicked off its completion, they're in claude-inputs/ original-script.md and fable5-conversation-full.html.  This will also give you a fair picture of which parts are me and which parts are Fable.  Tldr is that Fable proposed not-quite-right ideas and lines and I would rewrite them.  This is pretty important work by Fable!  No previous AI had reached that level.

Being able to work with Fable and Opus 4.8 was enlightening to me about my difficulties in working with humans.  It's not that I was by my own lights rude or insulting, but that I was always getting things and sending them back with lists of errors and additional required features.  A human programmer would have shot me.  And to make this not happen would've required so much more painful effort on my end that I would not have tried -- even leaving aside the much, much longer loops to get a human's work back.

I have put up the Github repository publicly in case anyone wants to trace Github history or look through Claude's notes to itself.  claude-notes/LESSONS.md contains everything Fable would want to pass on to a Claude trying a new visual novel.  There are SKILL.md files in the art pipeline and the audio pipeline.
