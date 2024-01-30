import { Vector, ReadonlyVector, ReadonlyPoint } from "./vector";

/** Represents an  */
export class Finger {
  position: Vector;
  position_delta = new Vector(0, 0);
  centroid_direction = new Vector(0, 0);

  constructor(x: number, y: number) {
    this.position = new Vector(x, y);
  }

  is_moving_toward_centroid(): boolean {
    // We determine the direction of movement by taking the dot product of the centroid_direction
    // and the position_delta. If the result is negative then the finger is moving away from the centroid.
    //
    // The position_delta moved us from the previous position to the current position.
    // The centroid_direction is the vector from the finger's position to the centroid.
    return this.position_delta.dot(this.centroid_direction) > 0;
  }

  /** Returns the angle around `point` that the finger moved in radians  */
  angle_delta_around_point(point: Vector): number {
    const previous_position_normal = this.position
      .sub(this.position_delta)
      .sub_assign(point)
      .normalise_assign();

    const current_position_normal = this.position.sub(point).normalise_assign();

    return Math.acos(previous_position_normal.dot(current_position_normal));
  }
}

export interface ReadonlyFinger {
  /** The position of the finger */
  position: ReadonlyPoint;
  /** The vector that translated the previous position to the current one  */
  position_delta: ReadonlyVector;
  /** The direction of the gesture's centoid from the finger's position */
  centroid_direction: ReadonlyVector;

  is_moving_toward_centroid(): boolean;
  angle_delta_around_point(point: Vector): number;
}
