# mtalk

> Presentations made easy

## Usage
```bash
$ mtalk talks-folder
```

And that's all.

**Note**: For this to work you need Node v8.5+

### Slide structure
Slides are markdown files with metadata

```md
---
meta: data
---
# Slide title

Some content
```

Each slide could have the following metadata

- **title**: The title for the slide document.
- **next**: The name of the next slide file. Use a dot (.) for the last slide.
- **prev**: The name of the previous slide file. Use a dot (.) for the first slide.
- **speech**: An object with some options to enable speech for this slide. If 
this is not set, your slide wont have any speech. Availaible options are:
  - lang: The language of the speech.
  - audio: What to speech. If not set, it will read everything on this slide.

## Features
- No programming skills needed, just markdown
- Slides use service workers
- Slides shared through Dat
- Optionally add _speech_ to your slides
- Slides are responsive, also controls

## Controls
- <kbd>→</kbd> or _Tap_: Use ArrowRight key to move forward.
- <kbd>_</kbd> or _Tap_: Use Space key to move forward.
- <kbd>←</kbd> or _Double tap_: Use ArrowLeft key to move backward.
- <kbd>f1</kbd> or _Tap and hold_: Use f1 key to _read_ current slide.
- <kbd>Ctrl</kbd> + <kbd>p</kbd>: Export slides to pdf (Windows and Linux only).

## License
MIT
