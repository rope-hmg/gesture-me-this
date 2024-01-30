export declare class Vector {
    x: number;
    y: number;
    constructor(x: number, y: number);
    add(rhs: ReadonlyVector, out?: Vector): Vector;
    add_assign(rhs: ReadonlyVector): Vector;
    sub(rhs: ReadonlyVector, out?: Vector): Vector;
    sub_assign(rhs: ReadonlyVector): Vector;
    mul(rhs: number, out?: Vector): Vector;
    mul_assign(rhs: number): Vector;
    div(rhs: number, out?: Vector): Vector;
    div_assign(rhs: number): Vector;
    neg(out?: Vector): Vector;
    neg_assign(): Vector;
    dot(rhs: ReadonlyVector): number;
    cross(rhs: ReadonlyVector): number;
    length_sq(): number;
    length(): number;
    normalise(out?: Vector): Vector;
    normalise_assign(): Vector;
    copy_from(rhs: ReadonlyVector): Vector;
    set(x: number, y: number): void;
}
export interface ReadonlyVector {
    readonly x: number;
    readonly y: number;
    add(rhs: ReadonlyVector, out?: Vector): Vector;
    sub(rhs: ReadonlyVector, out?: Vector): Vector;
    mul(rhs: number, out?: Vector): Vector;
    div(rhs: number, out?: Vector): Vector;
    dot(rhs: ReadonlyVector): number;
    cross(rhs: ReadonlyVector): number;
    length_sq(): number;
    length(): number;
    normalise(out?: Vector): Vector;
}
export type ReadonlyPoint = ReadonlyVector;
//# sourceMappingURL=vector.d.ts.map