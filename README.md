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
- **:raising_hand: Easy**: No programming skills needed, just markdown.
- **:rocket: Slides are PWAs**: Slides use service workers, so they are 
offline-first, also have a manifest, so they are installable.
- **:globe_with_meridians: p2p distributed**: Slides are automatically shared 
through Dat.
- **:nail_care: a11y friendly**: Slides are responsive, also controls. 
Optionally add _speech_ to your slides.

## Controls
- <kbd>→</kbd> or _Tap_: Use ArrowRight key to move forward.
- <kbd>_</kbd> or _Tap_: Use Space key to move forward.
- <kbd>←</kbd> or _Double tap_: Use ArrowLeft key to move backward.
- <kbd>f8</kbd> or _Tap and hold_: Use f8 key to _read_ current slide.

## License
MIT
