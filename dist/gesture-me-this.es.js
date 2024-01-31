class o {
  constructor(t, s) {
    this.x = t, this.y = s;
  }
  add(t, s = new o(0, 0)) {
    return s.x = this.x + t.x, s.y = this.y + t.y, s;
  }
  add_assign(t) {
    return this.add(t, this);
  }
  sub(t, s = new o(0, 0)) {
    return s.x = this.x - t.x, s.y = this.y - t.y, s;
  }
  sub_assign(t) {
    return this.sub(t, this);
  }
  mul(t, s = new o(0, 0)) {
    return s.x = this.x * t, s.y = this.y * t, s;
  }
  mul_assign(t) {
    return this.mul(t, this);
  }
  div(t, s = new o(0, 0)) {
    return this.mul(1 / t, s);
  }
  div_assign(t) {
    return this.mul_assign(1 / t);
  }
  neg(t = new o(0, 0)) {
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
  normalise(t = new o(0, 0)) {
    return this.mul(1 / this.length(), t);
  }
  normalise_assign() {
    return this.mul_assign(1 / this.length());
  }
  copy_from(t) {
    return this.x = t.x, this.y = t.y, this;
  }
  set(t, s) {
    this.x = t, this.y = s;
  }
}
class f {
  constructor() {
    this.finger_count = 0, this.fingers = /* @__PURE__ */ new Map(), this.centroid = new o(0, 0);
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
class m {
  constructor(t, s) {
    this.position_delta = new o(0, 0), this.centroid_direction = new o(0, 0), this.position = new o(t, s);
  }
  is_moving_toward_centroid() {
    return this.position_delta.dot(this.centroid_direction) > 0;
  }
  /** Returns the angle around `point` that the finger moved in radians  */
  angle_delta_around_point(t) {
    const s = this.position.sub(this.position_delta).sub_assign(t).normalise_assign(), i = this.position.sub(t).normalise_assign();
    return Math.acos(s.dot(i));
  }
}
var v = /* @__PURE__ */ ((e) => (e[e.OnStart = 0] = "OnStart", e[e.OnMove = 1] = "OnMove", e[e.OnEnd = 2] = "OnEnd", e[e.OnCancel = 3] = "OnCancel", e))(v || {});
class p {
  constructor(t, s, i) {
    this.element = t, this.listeners = s, this.user_data = i, this.metrics = new f();
    const r = (n) => {
      n.preventDefault(), this.initialise_touches(n.changedTouches), this.run_user_handlers(
        n,
        0
        /* OnStart */
      );
    }, c = (n) => {
      n.preventDefault(), this.update_touches(n.changedTouches), this.run_user_handlers(
        n,
        1
        /* OnMove */
      );
    }, a = (n) => {
      n.preventDefault(), this.remove_touches(n.changedTouches), this.run_user_handlers(
        n,
        2
        /* OnEnd */
      );
    }, h = (n) => {
      n.preventDefault(), this.remove_all_touches(), this.run_user_handlers(
        n,
        3
        /* OnCancel */
      );
    };
    t.addEventListener("touchstart", r), t.addEventListener("touchmove", c), t.addEventListener("touchend", a), t.addEventListener("touchcancel", h), this.on_start = r, this.on_move = c, this.on_end = a, this.on_cancel = h;
  }
  /** Removes the touch event listeners from the element */
  disableGestures() {
    this.element.removeEventListener("touchstart", this.on_start), this.element.removeEventListener("touchmove", this.on_move), this.element.removeEventListener("touchmove", this.on_end), this.element.removeEventListener("touchmove", this.on_cancel);
  }
  run_user_handlers(t, s) {
    const i = this.listeners.get(s);
    if (i)
      for (const r of i)
        r(this.metrics, t, this.user_data);
  }
  initialise_touches(t) {
    this.metrics.finger_count += t.length;
    for (const s of t) {
      const i = new m(s.clientX, s.clientY);
      this.metrics.fingers.set(s.identifier, i);
    }
    this.calculate_centroid();
  }
  update_touches(t) {
    for (const s of t) {
      const i = this.metrics.fingers.get(s.identifier);
      i && (i.position_delta.set(
        s.clientX - i.position.x,
        s.clientY - i.position.y
      ), i.position.set(s.clientX, s.clientY));
    }
    this.calculate_centroid();
  }
  remove_touches(t) {
    this.metrics.finger_count -= t.length;
    for (const s of t)
      this.metrics.fingers.delete(s.identifier);
    this.calculate_centroid();
  }
  remove_all_touches() {
    this.metrics.finger_count = 0, this.metrics.fingers.clear(), this.metrics.centroid.set(0, 0);
  }
  calculate_centroid() {
    const { finger_count: t, fingers: s, centroid: i } = this.metrics;
    i.set(0, 0);
    for (const r of s.values())
      i.add_assign(r.position);
    t > 1 && i.div_assign(t);
    for (const r of s.values())
      i.sub(r.position, r.centroid_direction);
  }
}
var w = /* @__PURE__ */ ((e) => (e[e.Inward = 0] = "Inward", e[e.Outward = 1] = "Outward", e))(w || {});
const x = {
  sensitivity: 0.5
}, O = (e, t) => {
  const { exact_finger_count: s, sensitivity: i = 0.5 } = t ?? x, r = !!s && e.finger_count === s || !s && e.finger_count > 1;
  let c;
  if (r) {
    const a = e.fingers.values();
    let { value: h, done: n } = a.next(), l = h.is_moving_toward_centroid(), _ = !0;
    for (; !n && _; )
      _ = l === h.is_moving_toward_centroid(), { value: h, done: n } = a.next();
    if (_) {
      const d = l ? 0 : 1;
      let u = 0;
      for (const g of e.fingers.values())
        u += g.position_delta.length();
      u /= e.finger_count, u *= i, c = { strength: u, direction: d };
    }
  }
  return c ? { is_recognised: !0, metrics: c } : { is_recognised: !1 };
};
export {
  v as EventType,
  m as Finger,
  p as GestureController,
  f as Metrics,
  w as PinchDirection,
  o as Vector,
  O as pinch_zoom
};
//# sourceMappingURL=gesture-me-this.es.js.map
