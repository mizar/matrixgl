import { Vector2Base, Vector3Base, Vector4Base } from './vector_base';
/**
 * A 2-dimensional vector of single-precision float numbers.
 */
export class Float32Vector2 extends Vector2Base {
    constructor(x, y) {
        super();
        this._values = new Float32Array([x, y]);
    }
    /**
     * Add `other` to the vector and returns new `Float32Vector2`.
     *
     * This method does not mutate the vector.
     * @param {Float32Vector2} other
     * @returns {Float32Vector2}
     */
    add(other) {
        return new Float32Vector2(this.x + other.x, this.y + other.y);
    }
    /**
     * Subtract `other` from the vector and returns new `Float32Vector2`.
     *
     * This method does not mutate the vector.
     * @param {Float32Vector2} other
     * @returns {Float32Vector2}
     */
    sub(other) {
        return new Float32Vector2(this.x - other.x, this.y - other.y);
    }
    /**
     * Multiply the vector by `scalar` and returns new `Float32Vector2`.
     *
     * This method does not mutate the vector.
     * @param {number} scalar
     * @returns {Float32Vector2}
     */
    mulByScalar(scalar) {
        return new Float32Vector2(this.x * scalar, this.y * scalar);
    }
}
/**
 * A 3-dimensional vector of single-precision float numbers.
 */
export class Float32Vector3 extends Vector3Base {
    constructor(x, y, z) {
        super();
        this._values = new Float32Array([x, y, z]);
    }
    /**
     * Add `other` to the vector and returns new `Float32Vector3`.
     *
     * This method does not mutate the vector.
     * @param {Float32Vector3} other
     * @returns {Float32Vector3}
     */
    add(other) {
        return new Float32Vector3(this.x + other.x, this.y + other.y, this.z + other.z);
    }
    /**
     * Subtract `other` from the vector and returns new `Float32Vector3`.
     *
     * This method does not mutate the vector.
     * @param {Float32Vector3} other
     * @returns {Float32Vector3}
     */
    sub(other) {
        return new Float32Vector3(this.x - other.x, this.y - other.y, this.z - other.z);
    }
    /**
     * Multiply the vector by `scalar` and returns new `Float32Vector3`.
     *
     * This method does not mutate the vector.
     * @param {number} scalar
     * @returns {Float32Vector3}
     */
    mulByScalar(scalar) {
        return new Float32Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
    }
    /**
     * Calculate dot product.
     * @param {Float32Vector3} other
     * @returns {number}
     */
    dot(other) {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }
    /**
     * Calculate cross product.
     * @param {Float32Vector3} other
     * @returns {Float32Vector3}
     */
    cross(other) {
        const cx = this.y * other.z - this.z * other.y;
        const cy = this.z * other.x - this.x * other.z;
        const cz = this.x * other.y - this.y * other.x;
        return new Float32Vector3(cx, cy, cz);
    }
    /**
     * Normalize the vector and returns new `Float32Vector3`.
     *
     * This method does not mutate the vector.
     * @returns {Float32Vector3}
     */
    normalize() {
        const mag = this.magnitude;
        if (mag === 0) {
            return this;
        }
        return new Float32Vector3(this.x / mag, this.y / mag, this.z / mag);
    }
    /**
     * Returns xy values of the vector as `Float32Vector2`.
     * @returns {Float32Vector2}
     */
    get xy() {
        return new Float32Vector2(this.x, this.y);
    }
    /**
     * Returns cartesian xy values of the vector as `Float32Vector2` from homogeneous coordinates.
     * @returns {Float32Vector2}
     */
    get hom2cart() {
        return new Float32Vector2(this.x / this.z, this.y / this.z);
    }
}
/**
 * A 4-dimensional vector of single-precision float numbers.
 */
export class Float32Vector4 extends Vector4Base {
    constructor(x, y, z, w) {
        super();
        this._values = new Float32Array([x, y, z, w]);
    }
    /**
     * Add `other` to the vector and returns new `Float32Vector4`.
     *
     * This method does not mutate the vector.
     * @param {Float32Vector4} other
     * @returns {Float32Vector4}
     */
    add(other) {
        return new Float32Vector4(this.x + other.x, this.y + other.y, this.z + other.z, this.w + other.w);
    }
    /**
     * Subtract `other` from the vector and returns new `Float32Vector4`.
     *
     * This method does not mutate the vector.
     * @param {Float32Vector4} other
     * @returns {Float32Vector4}
     */
    sub(other) {
        return new Float32Vector4(this.x - other.x, this.y - other.y, this.z - other.z, this.w - other.w);
    }
    /**
     * Multiply the vector by `scalar` and returns new `Float32Vector4`.
     *
     * This method does not mutate the vector.
     * @param {number} scalar
     * @returns {Float32Vector4}
     */
    mulByScalar(scalar) {
        return new Float32Vector4(this.x * scalar, this.y * scalar, this.z * scalar, this.w * scalar);
    }
    /**
     * Returns xyz values of the vector as `Float32Vector3`.
     * @returns {Float32Vector3}
     */
    get xyz() {
        return new Float32Vector3(this.x, this.y, this.z);
    }
    /**
     * Returns cartesian xyz values of the vector as `Float32Vector3` from homogeneous coordinates.
     * @returns {Float32Vector3}
     */
    get hom2cart() {
        return new Float32Vector3(this.x / this.w, this.y / this.w, this.z / this.w);
    }
}
/**
 * An alias for `Float32Vector2`.
 * @type {Float32Vector2}
 */
export const Vector2 = Float32Vector2;
/**
 * An alias for `Float32Vector3`.
 * @type {Float32Vector3}
 */
export const Vector3 = Float32Vector3;
/**
 * An alias for `Float32Vector4`.
 * @type {Float32Vector4}
 */
export const Vector4 = Float32Vector4;
