export class Vector {
  constructor(
    public x: number,
    public y: number,
  ) {}

  add(rhs: ReadonlyVector, out = new Vector(0, 0)): Vector {
    out.x = this.x + rhs.x;
    out.y = this.y + rhs.y;

    return out;
  }

  add_assign(rhs: ReadonlyVector): Vector {
    return this.add(rhs, this);
  }

  sub(rhs: ReadonlyVector, out = new Vector(0, 0)): Vector {
    out.x = this.x - rhs.x;
    out.y = this.y - rhs.y;

    return out;
  }

  sub_assign(rhs: ReadonlyVector): Vector {
    return this.sub(rhs, this);
  }

  mul(rhs: number, out = new Vector(0, 0)): Vector {
    out.x = this.x * rhs;
    out.y = this.y * rhs;

    return out;
  }

  mul_assign(rhs: number): Vector {
    return this.mul(rhs, this);
  }

  div(rhs: number, out = new Vector(0, 0)): Vector {
    return this.mul(1 / rhs, out);
  }

  div_assign(rhs: number): Vector {
    return this.mul_assign(1 / rhs);
  }

  neg(out = new Vector(0, 0)): Vector {
    return this.mul(-1, out);
  }

  neg_assign(): Vector {
    return this.mul_assign(-1);
  }

  dot(rhs: ReadonlyVector): number {
    return this.x * rhs.x + this.y * rhs.y;
  }

  cross(rhs: ReadonlyVector): number {
    return this.x * rhs.y - this.y * rhs.x;
  }

  length_sq(): number {
    return this.dot(this);
  }

  length(): number {
    return Math.sqrt(this.length_sq());
  }

  normalise(out = new Vector(0, 0)): Vector {
    return this.mul(1 / this.length(), out);
  }

  normalise_assign(): Vector {
    return this.mul_assign(1 / this.length());
  }

  copy_from(rhs: ReadonlyVector): Vector {
    this.x = rhs.x;
    this.y = rhs.y;

    return this;
  }

  set(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
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
