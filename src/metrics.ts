import { Vector, ReadonlyPoint } from "./vector";
import { Finger, ReadonlyFinger } from "./finger";

export class Metrics {
  finger_count = 0;
  fingers = new Map<number, Finger>();
  centroid = new Vector(0, 0);

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

export interface ReadonlyMetrics {
  /** The number of fingers currently touching the screen */
  readonly finger_count: number;

  /** The finger data */
  readonly fingers: ReadonlyMap<number, ReadonlyFinger>;

  /** The average position of the fingers */
  readonly centroid: ReadonlyPoint;

  // average_finger_direction(): Vector;
}
