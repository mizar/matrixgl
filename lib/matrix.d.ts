import { Float32Vector3, Float32Vector4 } from './float32vector';
/**
 * An interface for matrices;
 */
export interface Matrix {
    /**
     * Values of the matrix, that is stored in column major order.
     */
    readonly values: Float32Array;
    /**
     * Returns `values` as string.
     * @returns {string}
     */
    toString(): string;
}
/**
 * 2x2 Matrix of single-precision float numbers.
 *
 * Values are stored in column major order.
 */
export declare class Matrix2x2 implements Matrix {
    protected _values: Float32Array;
    constructor(m11: number, m21: number, m12: number, m22: number);
    /**
     * Returns an identity matrix.
     * @returns {Matrix2x2}
     */
    static identity(): Matrix2x2;
    readonly values: Float32Array;
    toString(): string;
}
/**
 * 3x3 Matrix of single-precision float numbers.
 *
 * Values are stored in column major order.
 */
export declare class Matrix3x3 implements Matrix {
    protected _values: Float32Array;
    constructor(m11: number, m21: number, m31: number, m12: number, m22: number, m32: number, m13: number, m23: number, m33: number);
    /**
     * Returns an identity matrix.
     * @returns {Matrix3x3}
     */
    static identity(): Matrix3x3;
    /**
     * Returns translation matrix.
     * @param {number} tx
     * @param {number} ty
     * @returns {Matrix3x3}
     */
    static translation(tx: number, ty: number): Matrix3x3;
    /**
     * Returns scaling matrix.
     * @param {number} sx
     * @param {number} sy
     * @returns {Matrix3x3}
     */
    static scaling(sx: number, sy: number): Matrix3x3;
    /**
     * Returns rotation matrix.
     * @param {number} radian
     * @returns {Matrix3x3}
     */
    static rotation(radian: number): Matrix3x3;
    /**
     * 2D Projective transformation matrix from Square[(0,0),(1,0),(1,1),(0,1)] to ConvexQuadrilateral[(x1,y1),(x2,y2),(x3,y3),(x4,y4)]
     * example: Matrix3x3.projectiveTransform(x1,y1,x2,y2,x3,y3,x4,y4).mulByVector3(new Float32Vector3(x,y,1)).hom2cart
     * @param {number} x1
     * @param {number} y1
     * @param {number} x2
     * @param {number} y2
     * @param {number} x3
     * @param {number} y3
     * @param {number} x4
     * @param {number} y4
     * @returns {Matrix3x3}
     */
    static projectiveTransform(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): Matrix3x3;
    /**
     * 2D Projective transformation matrix from ConvexQuadrilateral[(x1,y1),(x2,y2),(x3,y3),(x4,y4)] to Square[(0,0),(1,0),(1,1),(0,1)]
     * example: Matrix3x3.projectiveInvTransform(x1,y1,x2,y2,x3,y3,x4,y4).mulByVector3(new Float32Vector3(x,y,1)).hom2cart
     * @param {number} x1
     * @param {number} y1
     * @param {number} x2
     * @param {number} y2
     * @param {number} x3
     * @param {number} y3
     * @param {number} x4
     * @param {number} y4
     * @returns {Matrix3x3}
     */
    static projectiveInvTransform(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): Matrix3x3;
    /**
     * Multiply by `other` vector and returns a vector.
     * @param {Float32Vector3} other
     * @returns {Float32Vector3}
     */
    mulByVector3(other: Float32Vector3): Float32Vector3;
    /**
     * Multiply by `other` matrix and returns a product.
     *
     * This method does not mutate the matrix.
     * @param {Matrix3x3} other
     * @returns {Matrix3x3}
     */
    mulByMatrix3x3(other: Matrix3x3): Matrix3x3;
    /**
     * An alias for `mulByMatrix3x3`.
     * @param {Matrix3x3} other
     * @returns {Matrix3x3}
     */
    mulByMatrix3(other: Matrix3x3): Matrix3x3;
    /**
     * Translate the matrix and returns new `Matrix3x3`.
     *
     * This method does not mutate the matrix.
     * @param {number} tx
     * @param {number} ty
     * @returns {Matrix4x4}
     */
    translate(tx: number, ty: number): Matrix3x3;
    /**
     * Scale the matrix and returns new `Matrix3x3`.
     * @param {number} sx
     * @param {number} sy
     * @returns {Matrix3x3}
     */
    scale(sx: number, sy: number): Matrix3x3;
    /**
     * Rotate the matrix and returns new `Matrix3x3`.
     *
     * This method does not mutate the matrix.
     * @param {number} radian
     * @returns {Matrix3x3}
     */
    rotate(radian: number): Matrix3x3;
    readonly values: Float32Array;
    toString(): string;
}
/**
 * 4x4 Matrix of single-precision float numbers.
 *
 * Values are stored in column major order.
 */
export declare class Matrix4x4 implements Matrix {
    protected _values: Float32Array;
    constructor(m11: number, m21: number, m31: number, m41: number, m12: number, m22: number, m32: number, m42: number, m13: number, m23: number, m33: number, m43: number, m14: number, m24: number, m34: number, m44: number);
    /**
     * Returns an identity matrix.
     * @returns {Matrix4x4}
     */
    static identity(): Matrix4x4;
    /**
     * Returns translation matrix.
     * @param {number} tx
     * @param {number} ty
     * @param {number} tz
     * @returns {Matrix4x4}
     */
    static translation(tx: number, ty: number, tz: number): Matrix4x4;
    /**
     * Returns scaling matrix.
     * @param {number} sx
     * @param {number} sy
     * @param {number} sz
     * @returns {Matrix4x4}
     */
    static scaling(sx: number, sy: number, sz: number): Matrix4x4;
    /**
     * Returns rotation matrix around x-axis.
     * @param {number} radian
     * @returns {Matrix4x4}
     */
    static rotationX(radian: number): Matrix4x4;
    /**
     * Returns rotation matrix around y-axis.
     * @param {number} radian
     * @returns {Matrix4x4}
     */
    static rotationY(radian: number): Matrix4x4;
    /**
     * Returns rotation matrix around z-axis.
     * @param {number} radian
     * @returns {Matrix4x4}
     */
    static rotationZ(radian: number): Matrix4x4;
    /**
     * Returns rotation matrix around `normalizedAxis`. `normalizedAxis` must be normalized.
     * @param {Float32Vector3} normalizedAxis
     * @param {number} radian
     * @returns {Matrix4x4}
     */
    static rotationAround(normalizedAxis: Float32Vector3, radian: number): Matrix4x4;
    /**
     * Returns "look at" matrix.
     * @param {Float32Vector3} cameraPosition
     * @param {Float32Vector3} lookAtPosition
     * @param {Float32Vector3} cameraUp
     * @returns {Matrix4x4}
     */
    static lookAt(cameraPosition: Float32Vector3, lookAtPosition: Float32Vector3, cameraUp: Float32Vector3): Matrix4x4;
    /**
     * Returns an orthographic projection matrix.
     * @param {{top: number; bottom: number; left: number; right: number; near: number; far: number}} argsObject
     * @returns {Matrix4x4}
     */
    static orthographic(argsObject: {
        top: number;
        bottom: number;
        left: number;
        right: number;
        near: number;
        far: number;
    }): Matrix4x4;
    /**
     * Returns a frustrum projection matrix.
     * @param {{top: number; bottom: number; left: number; right: number; near: number; far: number}} argsObject
     * @returns {Matrix4x4}
     */
    static frustum(argsObject: {
        top: number;
        bottom: number;
        left: number;
        right: number;
        near: number;
        far: number;
    }): Matrix4x4;
    /**
     * Returns a perspective projection matrix.
     * @param {{fovYRadian: number; aspectRatio: number; near: number; far: number}} argsObject
     * @returns {Matrix4x4}
     */
    static perspective(argsObject: {
        fovYRadian: number;
        aspectRatio: number;
        near: number;
        far: number;
    }): Matrix4x4;
    /**
     * Multiply by `other` vector and returns a vector.
     * @param {Float32Vector4} other
     * @returns {Float32Vector4}
     */
    mulByVector4(other: Float32Vector4): Float32Vector4;
    /**
     * Multiply by `other` matrix and returns a product.
     *
     * This method does not mutate the matrix.
     * @param {Matrix4x4} other
     * @returns {Matrix4x4}
     */
    mulByMatrix4x4(other: Matrix4x4): Matrix4x4;
    /**
     * An alias for `mulByMatrix4x4`.
     * @param {Matrix4x4} other
     * @returns {Matrix4x4}
     */
    mulByMatrix4(other: Matrix4x4): Matrix4x4;
    /**
     * Translate the matrix and returns new `Matrix4x4`.
     *
     * This method does not mutate the matrix.
     * @param {number} tx
     * @param {number} ty
     * @param {number} tz
     * @returns {Matrix4x4}
     */
    translate(tx: number, ty: number, tz: number): Matrix4x4;
    /**
     * Scale the matrix and returns new `Matrix4x4`.
     * @param {number} sx
     * @param {number} sy
     * @param {number} sz
     * @returns {Matrix4x4}
     */
    scale(sx: number, sy: number, sz: number): Matrix4x4;
    /**
     * Rotate the matrix around x-axis and returns new `Matrix4x4`.
     *
     * This method does not mutate the matrix.
     * @param {number} radian
     * @returns {Matrix4x4}
     */
    rotateX(radian: number): Matrix4x4;
    /**
     * Rotate the matrix around y-axis and returns new `Matrix4x4`.
     *
     * This method does not mutate the matrix.
     * @param {number} radian
     * @returns {Matrix4x4}
     */
    rotateY(radian: number): Matrix4x4;
    /**
     * Rotate the matrix around z-axis and returns new `Matrix4x4`.
     *
     * This method does not mutate the matrix.
     * @param {number} radian
     * @returns {Matrix4x4}
     */
    rotateZ(radian: number): Matrix4x4;
    /**
     * Rotate the matrix around the `normalizedAxis` and return new Matrix4x4.
     *
     * This method does not mutate the matrix.
     * @param {Float32Vector3} normalizedAxis
     * @param {number} radian
     * @returns {Matrix4x4}
     */
    rotateAround(normalizedAxis: Float32Vector3, radian: number): Matrix4x4;
    readonly values: Float32Array;
    toString(): string;
}
/**
 * An alias for `Matrix2x2`.
 * @type {Matrix2x2}
 */
export declare const Matrix2: typeof Matrix2x2;
/**
 * An alias for `Matrix3x3`.
 * @type {Matrix3x3}
 */
export declare const Matrix3: typeof Matrix3x3;
/**
 * An alias for `Matrix4x4`.
 * @type {Matrix4x4}
 */
export declare const Matrix4: typeof Matrix4x4;
