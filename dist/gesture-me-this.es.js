class r {
  constructor(t, i) {
    this.x = t, this.y = i;
  }
  add(t, i = new r(0, 0)) {
    return i.x = this.x + t.x, i.y = this.y + t.y, i;
  }
  add_assign(t) {
    return this.add(t, this);
  }
  sub(t, i = new r(0, 0)) {
    return i.x = this.x - t.x, i.y = this.y - t.y, i;
  }
  sub_assign(t) {
    return this.sub(t, this);
  }
  mul(t, i = new r(0, 0)) {
    return i.x = this.x * t, i.y = this.y * t, i;
  }
  mul_assign(t) {
    return this.mul(t, this);
  }
  div(t, i = new r(0, 0)) {
    return this.mul(1 / t, i);
  }
  div_assign(t) {
    return this.mul_assign(1 / t);
  }
  neg(t = new r(0, 0)) {
    return this.mul(-1, t);
  }
  neg_assign() {
    return this.mul_assign(-1);
  }
  dot(t) {
    return this.x * t.x + this.y * t.y;
  }
  cross(t) {
    return this.x * t.y - this.y * t.x;
  }
  length_sq() {
    return this.dot(this);
  }
  length() {
    return Math.sqrt(this.length_sq());
  }
  normalise(t = new r(0, 0)) {
    return this.mul(1 / this.length(), t);
  }
  normalise_assign() {
    return this.mul_assign(1 / this.length());
  }
  copy_from(t) {
    return this.x = t.x, this.y = t.y, this;
  }
  set(t, i) {
    this.x = t, this.y = i;
  }
}
class m {
  constructor() {
    this.finger_count = 0, this.fingers = /* @__PURE__ */ new Map(), this.centroid = new r(0, 0);
  }
  // average_finger_direction(): Vector {
  //   const average_direction = new Vector(0, 0);
  //   if (this.finger_count > 1) {
  //     for (const finger of this.fingers.values()) {
  //       average_direction.add_assign(finger.position_delta);
  //     }
  //     average_direction.div_assign(this.finger_count);
  //   }
  //   return average_direction;
  // }
}
class f {
  constructor(t, i) {
    this.position_delta = new r(0, 0), this.centroid_direction = new r(0, 0), this.position = new r(t, i);
  }
  is_moving_toward_centroid() {
    return this.position_delta.dot(this.centroid_direction) > 0;
  }
  /** Returns the angle around `point` that the finger moved in radians  */
  angle_delta_around_point(t) {
    const i = this.position.sub(this.position_delta).sub_assign(t).normalise_assign(), e = this.position.sub(t).normalise_assign();
    return Math.acos(i.dot(e));
  }
}
class w {
  constructor(t, i) {
    this.element = t, this.metrics = new m();
    const e = (s) => {
      var o;
      s.preventDefault(), this.initialise_touches(s.changedTouches), (o = i.on_start) == null || o.call(i, this.metrics, s);
    }, c = (s) => {
      var o;
      s.preventDefault(), this.update_touches(s.changedTouches), (o = i.on_move) == null || o.call(i, this.metrics, s);
    }, u = (s) => {
      var o;
      s.preventDefault(), this.remove_touches(s.changedTouches), (o = i.on_end) == null || o.call(i, this.metrics, s);
    }, _ = (s) => {
      var o;
      s.preventDefault(), this.remove_all_touches(), (o = i.on_cancel) == null || o.call(i, this.metrics, s);
    };
    t.addEventListener("touchstart", e), t.addEventListener("touchmove", c), t.addEventListener("touchend", u), t.addEventListener("touchcancel", _), this.on_start = e, this.on_move = c, this.on_end = u, this.on_cancel = _;
  }
  /** Removes the touch event listeners from the element */
  disableGestures() {
    this.element.removeEventListener("touchstart", this.on_start), this.element.removeEventListener("touchmove", this.on_move), this.element.removeEventListener("touchmove", this.on_end), this.element.removeEventListener("touchmove", this.on_cancel);
  }
  initialise_touches(t) {
    this.metrics.finger_count += t.length;
    for (const i of t) {
      const e = new f(i.clientX, i.clientY);
      this.metrics.fingers.set(i.identifier, e);
    }
    this.calculate_centroid();
  }
  update_touches(t) {
    for (const i of t) {
      const e = this.metrics.fingers.get(i.identifier);
      e && (e.position_delta.set(
        i.clientX - e.position.x,
        i.clientY - e.position.y
      ), e.position.set(i.clientX, i.clientY));
    }
    this.calculate_centroid();
  }
  remove_touches(t) {
    this.metrics.finger_count -= t.length;
    for (const i of t)
      this.metrics.fingers.delete(i.identifier);
    this.calculate_centroid();
  }
  remove_all_touches() {
    this.metrics.finger_count = 0, this.metrics.fingers.clear(), this.metrics.centroid.set(0, 0);
  }
  calculate_centroid() {
    const { finger_count: t, fingers: i, centroid: e } = this.metrics;
    e.set(0, 0);
    for (const c of i.values())
      e.add_assign(c.position);
    t > 1 && e.div_assign(t);
    for (const c of i.values())
      e.sub(c.position, c.centroid_direction);
  }
}
var v = /* @__PURE__ */ ((n) => (n[n.Inward = 0] = "Inward", n[n.Outward = 1] = "Outward", n))(v || {});
const p = {
  sensitivity: 0.5
}, x = (n, t) => {
  const { exact_finger_count: i, sensitivity: e = 0.5 } = t ?? p, c = !!i && n.finger_count === i || !i && n.finger_count > 1;
  let u;
  if (c) {
    const _ = n.fingers.values();
    let { value: s, done: o } = _.next(), l = s.is_moving_toward_centroid(), a = !0;
    for (; !o && a; )
      a = l === s.is_moving_toward_centroid(), { value: s, done: o } = _.next();
    if (a) {
      const g = l ? 0 : 1;
      let h = 0;
      for (const d of n.fingers.values())
        h += d.position_delta.length();
      h /= n.finger_count, h *= e, u = { strength: h, direction: g };
    }
  }
  return u ? { is_recognised: !0, metrics: u } : { is_recognised: !1 };
};
export {
  f as Finger,
  w as GestureController,
  m as Metrics,
  v as PinchDirection,
  r as Vector,
  x as pinch_zoom
};
//# sourceMappingURL=gesture-me-this.es.js.map
