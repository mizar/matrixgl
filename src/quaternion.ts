import { Float32Vector3 } from './float32vector';
import { Matrix4x4 } from './matrix';

/**
 * Quaternion which is 4-dimensional complex number.
 * See [Wikipedia](https://en.wikipedia.org/wiki/Quaternion).
 */
export class Quaternion {
  protected _values: Float32Array;

  constructor(x: number, y: number, z: number, w: number) {
    this._values = new Float32Array([x, y, z, w]);
  }

  /**
   * Create a rotation quaternion around `normalizedAxis`.
   * `normalizedAxis` must be normalized.
   * @param {Float32Vector3} normalizedAxis
   * @param {number} radian
   * @returns {Quaternion}
   */
  static rotationAround(normalizedAxis: Float32Vector3, radian: number): Quaternion {
    const sin = Math.sin(radian / 2.0);
    const cos = Math.cos(radian / 2.0);
    return new Quaternion(normalizedAxis.x * sin, normalizedAxis.y * sin, normalizedAxis.z * sin, cos);
  }

  /**
   * Returns a normalized quaternion.
   * @returns {Quaternion}
   */
  normalize() : Quaternion {
    const mag = this.magnitude;
    if (mag === 0) { return this; }
    const r = 1 / mag;
    return new Quaternion(this.x * r, this.y * r, this.z * r, this.w * r);
  }

  /**
   * Adds the `other` to the quaternion and returns the sum.
   *
   * This method does not mutate the quaternion.
   * @param {Quaternion} other
   * @returns {Quaternion}
   */
  add(other: Quaternion): Quaternion {
    return new Quaternion(this.x + other.x, this.y + other.y, this.z + other.z, this.w + other.w);
  }

  /**
   * Multiplies the quaternion by `scalar` and returns the product.
   *
   * This method does not mutate the quaternion.
   * @param {number} scalar
   * @returns {Quaternion}
   */
  mulByScalar(scalar: number): Quaternion {
    return new Quaternion(this.x * scalar, this.y * scalar, this.z * scalar, this.w * scalar);
  }

  /**
   * Calculates dot product.
   * @param {Quaternion} other
   * @returns {number}
   */
  dot(other: Quaternion): number {
    return this.x * other.x + this.y * other.y + this.z * other.z + this.w * other.w;
  }

  /**
   * Calculates spherical linear interpolation(also known as Slerp) and returns new `Quaternion` between the quaternion and the other.
   * @param {Quaternion} other
   * @param {number} t 0.0 <= t <= 1.0
   * @param {{chooseShorterAngle: boolean}} options Does not work currently. slerp chooses shorter angle regardless of this value.
   * @returns {Quaternion}
   */
  slerp(other: Quaternion , t: number, options: { chooseShorterAngle: boolean } = { chooseShorterAngle: true }): Quaternion {
    let dotProd: number = this.dot(other);
    let otherQuaternion: Quaternion = other;

    // When the dot product is negative, slerp chooses the longer way.
    // So we should negate the `other` quaternion.
    if (dotProd < 0) {
      dotProd = -dotProd;
      otherQuaternion = other.mulByScalar(-1);
    }

    const omega: number = Math.acos(dotProd);
    const sinOmega: number = Math.sin(omega);

    const q1: Quaternion = this.mulByScalar(Math.sin((1 - t) * omega) / sinOmega);
    const q2: Quaternion = otherQuaternion.mulByScalar(Math.sin(t * omega) / sinOmega);

    return q1.add(q2);
  }

  /**
   * Calc magnitude of the quaternion.
   * @returns {number}
   */
  get magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }

  /**
   * Calc norm of the quaternion.
   * An alias for `magnitude`.
   * @returns {number}
   */
  get norm(): number {
    return this.magnitude;
  }

  /**
   * Returns x value of the vector.
   * @returns {number}
   */
  get x(): number {
    return this._values[0];
  }

  /**
   * Returns y value of the vector.
   * @returns {number}
   */
  get y(): number {
    return this._values[1];
  }

  /**
   * Returns z value of the vector.
   * @returns {number}
   */
  get z(): number {
    return this._values[2];
  }

  /**
   * Returns w value of the vector.
   * @returns {number}
   */
  get w(): number {
    return this._values[3];
  }

  /**
   * Set the `value` as new x.
   * @param {number} value
   */
  set x(value: number) {
    this._values[0] = value;
  }

  /**
   * Set the `value` as new y.
   * @param {number} value
   */
  set y(value: number) {
    this._values[1] = value;
  }

  /**
   * Set the `value` as new z.
   * @param {number} value
   */
  set z(value: number) {
    this._values[2] = value;
  }

  /**
   * Set the `value` as new w.
   * @param {number} value
   */
  set w(value: number) {
    this._values[3] = value;
  }

  /**
   * Returns values of the quaternion.
   * @returns {Float32Array}
   */
  get values(): Float32Array {
    return this._values;
  }

  /**
   * Convert the quaternion to a rotation matrix.
   * @returns {Matrix4x4}
   */
  toRotationMatrix4(): Matrix4x4 {
    /*
    const x = this.x;
    const y = this.y;
    const z = this.z;
    const w = this.w;
     */
    // Destructuring assignment
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    const { x, y, z, w } = this as any;

    const m11 = 1 - 2 * y * y - 2 * z * z;
    const m12 = 2 * x * y - 2 * w * z;
    const m13 = 2 * x * z + 2 * w * y;
    const m14 = 0;
    const m21 = 2 * x * y + 2 * w * z;
    const m22 = 1 - 2 * x * x - 2 * z * z;
    const m23 = 2 * y * z - 2 * w * x;
    const m24 = 0;
    const m31 = 2 * x * z - 2 * w * y;
    const m32 = 2 * y * z + 2 * w * x;
    const m33 = 1 - 2 * x * x - 2 * y * y;
    const m34 = 0;
    const m41 = 0;
    const m42 = 0;
    const m43 = 0;
    const m44 = 1;

    return new Matrix4x4(
      m11, m21, m31, m41,
      m12, m22, m32, m42,
      m13, m23, m33, m43,
      m14, m24, m34, m44,
    );
  }

  /**
   * Returns values as `String`.
   * @returns {string}
   */
  toString(): string {
    return `Quaternion(${this.x}, ${this.y}, ${this.z}, ${this.w})`;
  }
}
