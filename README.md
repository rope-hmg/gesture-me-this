# Gesture Me This

A tiny multitouch gesture library (1.5kB gzip)

# Gestures

Currently supports the following gestures:
- [x] Pinch Zoom
- [ ] Rotate
- [ ] Swipe

The gesture recognisers only use the public Metrics API, so you can easily create your own gestures.

# Documentation

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
