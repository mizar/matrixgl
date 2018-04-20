import { Float32Vector3, Float32Vector4 } from './float32vector';
import { Quaternion } from './quaternion';
/**
 * 2x2 Matrix of single-precision float numbers.
 *
 * Values are stored in column major order.
 */
export class Matrix2x2 {
    constructor(m11, m21, m12, m22) {
        this._values = new Float32Array([
            m11, m21,
            m12, m22,
        ]);
    }
    /**
     * Returns an identity matrix.
     * @returns {Matrix2x2}
     */
    static identity() {
        return new Matrix2x2(1.0, 0.0, 0.0, 1.0);
    }
    get values() {
        return this._values;
    }
    toString() {
        return this._values.toString();
    }
}
/**
 * 3x3 Matrix of single-precision float numbers.
 *
 * Values are stored in column major order.
 */
export class Matrix3x3 {
    constructor(m11, m21, m31, m12, m22, m32, m13, m23, m33) {
        this._values = new Float32Array([
            m11, m21, m31,
            m12, m22, m32,
            m13, m23, m33,
        ]);
    }
    /**
     * Returns an identity matrix.
     * @returns {Matrix3x3}
     */
    static identity() {
        return new Matrix3x3(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0);
    }
    /**
     * Returns translation matrix.
     * @param {number} tx
     * @param {number} ty
     * @returns {Matrix3x3}
     */
    static translation(tx, ty) {
        return new Matrix3x3(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, tx, ty, 1.0);
    }
    /**
     * Returns scaling matrix.
     * @param {number} sx
     * @param {number} sy
     * @returns {Matrix3x3}
     */
    static scaling(sx, sy) {
        return new Matrix3x3(sx, 0.0, 0.0, 0.0, sy, 0.0, 0.0, 0.0, 1.0);
    }
    /**
     * Returns rotation matrix.
     * @param {number} radian
     * @returns {Matrix3x3}
     */
    static rotation(radian) {
        const sin = Math.sin(radian);
        const cos = Math.cos(radian);
        return new Matrix3x3(cos, sin, 0.0, -sin, cos, 0.0, 0.0, 0.0, 1.0);
    }
    /**
     * 2D Projective transformation matrix from Square[(0,0),(1,0),(1,1),(0,1)] to ConvexQuadrilateral[(x1,y1),(x2,y2),(x3,y3),(x4,y4)]
     * example: Matrix3x3.projectiveTransform(x1,y1,x2,y2,x3,y3,x4,y4).mulByVector3(new Float32Vector3(x,y,1)).xyNormalized
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
    static projectiveTransform(x1, y1, x2, y2, x3, y3, x4, y4) {
        const x2d = x2 - x1;
        const y2d = y2 - y1;
        const x3d = x3 - x1;
        const y3d = y3 - y1;
        const x4d = x4 - x1;
        const y4d = y4 - y1;
        // must sgn(d123) == sgn(d124) == sgn(d134) == sgn(d234) != 0
        const d123 = x2d * y3d - x3d * y2d;
        const d124 = x2d * y4d - x4d * y2d;
        const d134 = x3d * y4d - x4d * y3d;
        const d1234 = d123 + d134;
        const d234 = d1234 - d124;
        const a1 = d134 * x2d;
        const b1 = d123 * x4d;
        const a2 = d134 * y2d;
        const b2 = d123 * y4d;
        const a0 = d134 - d234;
        const b0 = d123 - d234;
        const c0 = d234;
        return new Matrix3x3(x1 * a0 + a1, y1 * a0 + a2, a0, x1 * b0 + b1, y1 * b0 + b2, b0, x1 * c0, y1 * c0, c0);
    }
    /**
     * 2D Projective transformation matrix from ConvexQuadrilateral[(x1,y1),(x2,y2),(x3,y3),(x4,y4)] to Square[(0,0),(1,0),(1,1),(0,1)]
     * example: Matrix3x3.projectiveInvTransform(x1,y1,x2,y2,x3,y3,x4,y4).mulByVector3(new Float32Vector3(x,y,1)).xyNormalized
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
    static projectiveInvTransform(x1, y1, x2, y2, x3, y3, x4, y4) {
        const x2d = x2 - x1;
        const y2d = y2 - y1;
        const x3d = x3 - x1;
        const y3d = y3 - y1;
        const x4d = x4 - x1;
        const y4d = y4 - y1;
        // must sgn(d123) == sgn(d124) == sgn(d134) == sgn(d234) != 0
        const d123 = x2d * y3d - x3d * y2d;
        const d124 = x2d * y4d - x4d * y2d;
        const d134 = x3d * y4d - x4d * y3d;
        const d1234 = d123 + d134;
        const d234 = d1234 - d124;
        const d11 = d123 - d124;
        const d22 = d134 - d124;
        const a1 = -d123 * d234 * y4d;
        const b1 = d123 * d234 * x4d;
        const a2 = d134 * d234 * y2d;
        const b2 = -d134 * d234 * x2d;
        const a0 = d11 * d123 * y4d + d22 * d134 * y2d;
        const b0 = d11 * d123 * x4d + d22 * d134 * x2d;
        const c0 = -d123 * d124 * d134;
        return new Matrix3x3(a1, a2, a0, b1, b2, b0, -a1 * x1 - b1 * y1, -a2 * x1 - b2 * y1, -a0 * x1 - b0 * y1 + c0);
    }
    /**
     * Multiply by `other` vector and returns a vector.
     * @param {Float32Vector3} other
     * @returns {Float32Vector3}
     */
    mulByVector3(other) {
        const [m11, m21, m31, m12, m22, m32, m13, m23, m33,] = this.values;
        const [o1, o2, o3,] = other.values;
        const p1 = (m11 * o1) + (m12 * o2) + (m13 * o3);
        const p2 = (m21 * o1) + (m22 * o2) + (m23 * o3);
        const p3 = (m31 * o1) + (m32 * o2) + (m33 * o3);
        return new Float32Vector3(p1, p2, p3);
    }
    /**
     * Multiply by `other` matrix and returns a product.
     *
     * This method does not mutate the matrix.
     * @param {Matrix3x3} other
     * @returns {Matrix3x3}
     */
    mulByMatrix3x3(other) {
        const [m11, m21, m31, m12, m22, m32, m13, m23, m33,] = this.values;
        const [o11, o21, o31, o12, o22, o32, o13, o23, o33,] = other.values;
        const p11 = (m11 * o11) + (m12 * o21) + (m13 * o31);
        const p21 = (m21 * o11) + (m22 * o21) + (m23 * o31);
        const p31 = (m31 * o11) + (m32 * o21) + (m33 * o31);
        const p12 = (m11 * o12) + (m12 * o22) + (m13 * o32);
        const p22 = (m21 * o12) + (m22 * o22) + (m23 * o32);
        const p32 = (m31 * o12) + (m32 * o22) + (m33 * o32);
        const p13 = (m11 * o13) + (m12 * o23) + (m13 * o33);
        const p23 = (m21 * o13) + (m22 * o23) + (m23 * o33);
        const p33 = (m31 * o13) + (m32 * o23) + (m33 * o33);
        return new Matrix3x3(p11, p21, p31, p12, p22, p32, p13, p23, p33);
    }
    /**
     * An alias for `mulByMatrix3x3`.
     * @param {Matrix3x3} other
     * @returns {Matrix3x3}
     */
    mulByMatrix3(other) {
        return this.mulByMatrix3x3(other);
    }
    /**
     * Translate the matrix and returns new `Matrix3x3`.
     *
     * This method does not mutate the matrix.
     * @param {number} tx
     * @param {number} ty
     * @returns {Matrix4x4}
     */
    translate(tx, ty) {
        const t = Matrix3x3.translation(tx, ty);
        return this.mulByMatrix3x3(t);
    }
    /**
     * Scale the matrix and returns new `Matrix3x3`.
     * @param {number} sx
     * @param {number} sy
     * @returns {Matrix3x3}
     */
    scale(sx, sy) {
        const s = Matrix3x3.scaling(sx, sy);
        return this.mulByMatrix3x3(s);
    }
    /**
     * Rotate the matrix and returns new `Matrix3x3`.
     *
     * This method does not mutate the matrix.
     * @param {number} radian
     * @returns {Matrix3x3}
     */
    rotate(radian) {
        const r = Matrix3x3.rotation(radian);
        return this.mulByMatrix3x3(r);
    }
    get values() {
        return this._values;
    }
    toString() {
        return this._values.toString();
    }
}
/**
 * 4x4 Matrix of single-precision float numbers.
 *
 * Values are stored in column major order.
 */
export class Matrix4x4 {
    constructor(m11, m21, m31, m41, m12, m22, m32, m42, m13, m23, m33, m43, m14, m24, m34, m44) {
        this._values = new Float32Array([
            m11, m21, m31, m41,
            m12, m22, m32, m42,
            m13, m23, m33, m43,
            m14, m24, m34, m44,
        ]);
    }
    /**
     * Returns an identity matrix.
     * @returns {Matrix4x4}
     */
    static identity() {
        return new Matrix4x4(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0);
    }
    /**
     * Returns translation matrix.
     * @param {number} tx
     * @param {number} ty
     * @param {number} tz
     * @returns {Matrix4x4}
     */
    static translation(tx, ty, tz) {
        return new Matrix4x4(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, tx, ty, tz, 1.0);
    }
    /**
     * Returns scaling matrix.
     * @param {number} sx
     * @param {number} sy
     * @param {number} sz
     * @returns {Matrix4x4}
     */
    static scaling(sx, sy, sz) {
        return new Matrix4x4(sx, 0.0, 0.0, 0.0, 0.0, sy, 0.0, 0.0, 0.0, 0.0, sz, 0.0, 0.0, 0.0, 0.0, 1.0);
    }
    /**
     * Returns rotation matrix around x-axis.
     * @param {number} radian
     * @returns {Matrix4x4}
     */
    static rotationX(radian) {
        const sin = Math.sin(radian);
        const cos = Math.cos(radian);
        return new Matrix4x4(1.0, 0.0, 0.0, 0.0, 0.0, cos, sin, 0.0, 0.0, -sin, cos, 0.0, 0.0, 0.0, 0.0, 1.0);
    }
    /**
     * Returns rotation matrix around y-axis.
     * @param {number} radian
     * @returns {Matrix4x4}
     */
    static rotationY(radian) {
        const sin = Math.sin(radian);
        const cos = Math.cos(radian);
        return new Matrix4x4(cos, 0.0, -sin, 0.0, 0.0, 1.0, 0.0, 0.0, sin, 0.0, cos, 0.0, 0.0, 0.0, 0.0, 1.0);
    }
    /**
     * Returns rotation matrix around z-axis.
     * @param {number} radian
     * @returns {Matrix4x4}
     */
    static rotationZ(radian) {
        const sin = Math.sin(radian);
        const cos = Math.cos(radian);
        return new Matrix4x4(cos, sin, 0.0, 0.0, -sin, cos, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0);
    }
    /**
     * Returns rotation matrix around `normalizedAxis`. `normalizedAxis` must be normalized.
     * @param {Float32Vector3} normalizedAxis
     * @param {number} radian
     * @returns {Matrix4x4}
     */
    static rotationAround(normalizedAxis, radian) {
        const q = Quaternion.rotationAround(normalizedAxis, radian);
        return q.toRotationMatrix4();
    }
    /**
     * Returns "look at" matrix.
     * @param {Float32Vector3} cameraPosition
     * @param {Float32Vector3} lookAtPosition
     * @param {Float32Vector3} cameraUp
     * @returns {Matrix4x4}
     */
    static lookAt(cameraPosition, lookAtPosition, cameraUp) {
        const zAxis = cameraPosition.sub(lookAtPosition).normalize();
        const xAxis = cameraUp.cross(zAxis).normalize();
        const yAxis = zAxis.cross(xAxis).normalize();
        return new Matrix4x4(xAxis.x, yAxis.x, zAxis.x, 0.0, xAxis.y, yAxis.y, zAxis.y, 0.0, xAxis.z, yAxis.z, zAxis.z, 0.0, -cameraPosition.dot(xAxis), -cameraPosition.dot(yAxis), -cameraPosition.dot(zAxis), 1.0);
    }
    /**
     * Returns an orthographic projection matrix.
     * @param {{top: number; bottom: number; left: number; right: number; near: number; far: number}} argsObject
     * @returns {Matrix4x4}
     */
    static orthographic(argsObject) {
        const top = argsObject.top;
        const bottom = argsObject.bottom;
        const left = argsObject.left;
        const right = argsObject.right;
        const near = argsObject.near;
        const far = argsObject.far;
        return new Matrix4x4(2 / (right - left), 0.0, 0.0, 0.0, 0.0, 2 / (top - bottom), 0.0, 0.0, 0.0, 0.0, -2 / (far - near), 0.0, -(right + left) / (right - left), -(top + bottom) / (top - bottom), -(far + near) / (far - near), 1.0);
    }
    /**
     * Returns a frustrum projection matrix.
     * @param {{top: number; bottom: number; left: number; right: number; near: number; far: number}} argsObject
     * @returns {Matrix4x4}
     */
    static frustum(argsObject) {
        const top = argsObject.top;
        const bottom = argsObject.bottom;
        const left = argsObject.left;
        const right = argsObject.right;
        const near = argsObject.near;
        const far = argsObject.far;
        return new Matrix4x4(2 * near / (right - left), 0.0, 0.0, 0.0, 0.0, 2 * near / (top - bottom), 0.0, 0.0, (right + left) / (right - left), (top + bottom) / (top - bottom), -(far + near) / (far - near), -1.0, 0.0, 0.0, -2 * far * near / (far - near), 0.0);
    }
    /**
     * Returns a perspective projection matrix.
     * @param {{fovYRadian: number; aspectRatio: number; near: number; far: number}} argsObject
     * @returns {Matrix4x4}
     */
    static perspective(argsObject) {
        const top = argsObject.near * Math.tan(argsObject.fovYRadian * 0.5);
        const height = top * 2;
        const width = argsObject.aspectRatio * height;
        const left = -0.5 * width;
        const right = left + width;
        const bottom = top - height;
        return Matrix4x4.frustum({
            top,
            bottom,
            left,
            right,
            near: argsObject.near,
            far: argsObject.far,
        });
    }
    /**
     * Multiply by `other` vector and returns a vector.
     * @param {Float32Vector4} other
     * @returns {Float32Vector4}
     */
    mulByVector4(other) {
        const [m11, m21, m31, m41, m12, m22, m32, m42, m13, m23, m33, m43, m14, m24, m34, m44,] = this.values;
        const [o1, o2, o3, o4,] = other.values;
        const p1 = (m11 * o1) + (m12 * o2) + (m13 * o3) + (m14 * o4);
        const p2 = (m21 * o1) + (m22 * o2) + (m23 * o3) + (m24 * o4);
        const p3 = (m31 * o1) + (m32 * o2) + (m33 * o3) + (m34 * o4);
        const p4 = (m41 * o1) + (m42 * o2) + (m43 * o3) + (m44 * o4);
        return new Float32Vector4(p1, p2, p3, p4);
    }
    /**
     * Multiply by `other` matrix and returns a product.
     *
     * This method does not mutate the matrix.
     * @param {Matrix4x4} other
     * @returns {Matrix4x4}
     */
    mulByMatrix4x4(other) {
        const [m11, m21, m31, m41, m12, m22, m32, m42, m13, m23, m33, m43, m14, m24, m34, m44,] = this.values;
        const [o11, o21, o31, o41, o12, o22, o32, o42, o13, o23, o33, o43, o14, o24, o34, o44,] = other.values;
        const p11 = (m11 * o11) + (m12 * o21) + (m13 * o31) + (m14 * o41);
        const p21 = (m21 * o11) + (m22 * o21) + (m23 * o31) + (m24 * o41);
        const p31 = (m31 * o11) + (m32 * o21) + (m33 * o31) + (m34 * o41);
        const p41 = (m41 * o11) + (m42 * o21) + (m43 * o31) + (m44 * o41);
        const p12 = (m11 * o12) + (m12 * o22) + (m13 * o32) + (m14 * o42);
        const p22 = (m21 * o12) + (m22 * o22) + (m23 * o32) + (m24 * o42);
        const p32 = (m31 * o12) + (m32 * o22) + (m33 * o32) + (m34 * o42);
        const p42 = (m41 * o12) + (m42 * o22) + (m43 * o32) + (m44 * o42);
        const p13 = (m11 * o13) + (m12 * o23) + (m13 * o33) + (m14 * o43);
        const p23 = (m21 * o13) + (m22 * o23) + (m23 * o33) + (m24 * o43);
        const p33 = (m31 * o13) + (m32 * o23) + (m33 * o33) + (m34 * o43);
        const p43 = (m41 * o13) + (m42 * o23) + (m43 * o33) + (m44 * o43);
        const p14 = (m11 * o14) + (m12 * o24) + (m13 * o34) + (m14 * o44);
        const p24 = (m21 * o14) + (m22 * o24) + (m23 * o34) + (m24 * o44);
        const p34 = (m31 * o14) + (m32 * o24) + (m33 * o34) + (m34 * o44);
        const p44 = (m41 * o14) + (m42 * o24) + (m43 * o34) + (m44 * o44);
        return new Matrix4x4(p11, p21, p31, p41, p12, p22, p32, p42, p13, p23, p33, p43, p14, p24, p34, p44);
    }
    /**
     * An alias for `mulByMatrix4x4`.
     * @param {Matrix4x4} other
     * @returns {Matrix4x4}
     */
    mulByMatrix4(other) {
        return this.mulByMatrix4x4(other);
    }
    /**
     * Translate the matrix and returns new `Matrix4x4`.
     *
     * This method does not mutate the matrix.
     * @param {number} tx
     * @param {number} ty
     * @param {number} tz
     * @returns {Matrix4x4}
     */
    translate(tx, ty, tz) {
        const t = Matrix4x4.translation(tx, ty, tz);
        return this.mulByMatrix4x4(t);
    }
    /**
     * Scale the matrix and returns new `Matrix4x4`.
     * @param {number} sx
     * @param {number} sy
     * @param {number} sz
     * @returns {Matrix4x4}
     */
    scale(sx, sy, sz) {
        const s = Matrix4x4.scaling(sx, sy, sz);
        return this.mulByMatrix4x4(s);
    }
    /**
     * Rotate the matrix around x-axis and returns new `Matrix4x4`.
     *
     * This method does not mutate the matrix.
     * @param {number} radian
     * @returns {Matrix4x4}
     */
    rotateX(radian) {
        const rx = Matrix4x4.rotationX(radian);
        return this.mulByMatrix4x4(rx);
    }
    /**
     * Rotate the matrix around y-axis and returns new `Matrix4x4`.
     *
     * This method does not mutate the matrix.
     * @param {number} radian
     * @returns {Matrix4x4}
     */
    rotateY(radian) {
        const ry = Matrix4x4.rotationY(radian);
        return this.mulByMatrix4x4(ry);
    }
    /**
     * Rotate the matrix around z-axis and returns new `Matrix4x4`.
     *
     * This method does not mutate the matrix.
     * @param {number} radian
     * @returns {Matrix4x4}
     */
    rotateZ(radian) {
        const rz = Matrix4x4.rotationZ(radian);
        return this.mulByMatrix4x4(rz);
    }
    /**
     * Rotate the matrix around the `normalizedAxis` and return new Matrix4x4.
     *
     * This method does not mutate the matrix.
     * @param {Float32Vector3} normalizedAxis
     * @param {number} radian
     * @returns {Matrix4x4}
     */
    rotateAround(normalizedAxis, radian) {
        const r = Matrix4x4.rotationAround(normalizedAxis, radian);
        return this.mulByMatrix4x4(r);
    }
    get values() {
        return this._values;
    }
    toString() {
        return this._values.toString();
    }
}
/**
 * An alias for `Matrix2x2`.
 * @type {Matrix2x2}
 */
export const Matrix2 = Matrix2x2;
/**
 * An alias for `Matrix3x3`.
 * @type {Matrix3x3}
 */
export const Matrix3 = Matrix3x3;
/**
 * An alias for `Matrix4x4`.
 * @type {Matrix4x4}
 */
export const Matrix4 = Matrix4x4;
