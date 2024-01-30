import { Vector, ReadonlyVector, ReadonlyPoint } from "./vector";
/** Represents an  */
export declare class Finger {
    position: Vector;
    position_delta: Vector;
    centroid_direction: Vector;
    constructor(x: number, y: number);
    is_moving_toward_centroid(): boolean;
    /** Returns the angle around `point` that the finger moved in radians  */
    angle_delta_around_point(point: Vector): number;
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
//# sourceMappingURL=finger.d.ts.map