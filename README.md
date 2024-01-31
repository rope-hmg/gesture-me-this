# Gesture Me This

A tiny multitouch gesture library for the browser.

```bash
dist/gesture-me-this.es.js   5.97 kB │ gzip: 1.68 kB │ map: 18.11 kB
dist/gesture-me-this.umd.js  4.36 kB │ gzip: 1.49 kB │ map: 17.53 kB
```

# Gestures

Currently supports the following gestures:
- [x] Pinch Zoom
- [ ] Rotate
- [ ] Swipe

The gesture recognisers only use the public Metrics API, so you can easily create your own gestures.

# Documentation

If you want to use this with React, check out `react-gesture-me-this`:
- [npm]()
- [github](https://github.com/rope-hmg/react-gesture-me-this)

```ts
import { GestureController, EventType, pinch_zoom } from "gesture-me-this";

const canvas = document.getElementById("canvas");
const controller = new GestureController(canvas);
controller.add_listener(EventType.Move, (metrics) => {
  const pinch = pinch_zoom(metrics);

  if (pinch.is_recognised) {
    console.log(pinch.strength);
    console.log(pinch.direction);
  }
});
```
