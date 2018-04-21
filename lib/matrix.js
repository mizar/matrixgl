"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var float32vector_1 = require("./float32vector");
var quaternion_1 = require("./quaternion");
/**
 * 2x2 Matrix of single-precision float numbers.
 *
 * Values are stored in column major order.
 */
var Matrix2x2 = /** @class */ (function () {
    function Matrix2x2(m11, m21, m12, m22) {
        this._values = new Float32Array([
            m11, m21,
            m12, m22,
        ]);
    }
    /**
     * Returns an identity matrix.
     * @returns {Matrix2x2}
     */
    Matrix2x2.identity = function () {
        return new Matrix2x2(1.0, 0.0, 0.0, 1.0);
    };
    Object.defineProperty(Matrix2x2.prototype, "values", {
        get: function () {
            return this._values;
        },
        enumerable: true,
        configurable: true
    });
    Matrix2x2.prototype.toString = function () {
        return this._values.toString();
    };
    return Matrix2x2;
}());
exports.Matrix2x2 = Matrix2x2;
/**
 * 3x3 Matrix of single-precision float numbers.
 *
 * Values are stored in column major order.
 */
var Matrix3x3 = /** @class */ (function () {
    function Matrix3x3(m11, m21, m31, m12, m22, m32, m13, m23, m33) {
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
    Matrix3x3.identity = function () {
        return new Matrix3x3(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0);
    };
    /**
     * Returns translation matrix.
     * @param {number} tx
     * @param {number} ty
     * @returns {Matrix3x3}
     */
    Matrix3x3.translation = function (tx, ty) {
        return new Matrix3x3(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, tx, ty, 1.0);
    };
    /**
     * Returns scaling matrix.
     * @param {number} sx
     * @param {number} sy
     * @returns {Matrix3x3}
     */
    Matrix3x3.scaling = function (sx, sy) {
        return new Matrix3x3(sx, 0.0, 0.0, 0.0, sy, 0.0, 0.0, 0.0, 1.0);
    };
    /**
     * Returns rotation matrix.
     * @param {number} radian
     * @returns {Matrix3x3}
     */
    Matrix3x3.rotation = function (radian) {
        var sin = Math.sin(radian);
        var cos = Math.cos(radian);
        return new Matrix3x3(cos, sin, 0.0, -sin, cos, 0.0, 0.0, 0.0, 1.0);
    };
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
    Matrix3x3.projectiveTransform = function (x1, y1, x2, y2, x3, y3, x4, y4) {
        var x2d = x2 - x1;
        var y2d = y2 - y1;
        var x3d = x3 - x1;
        var y3d = y3 - y1;
        var x4d = x4 - x1;
        var y4d = y4 - y1;
        // must sgn(d123) == sgn(d124) == sgn(d134) == sgn(d234) != 0
        var d123 = x2d * y3d - x3d * y2d;
        var d124 = x2d * y4d - x4d * y2d;
        var d134 = x3d * y4d - x4d * y3d;
        var d1234 = d123 + d134;
        var d234 = d1234 - d124;
        var a1 = d134 * x2d;
        var b1 = d123 * x4d;
        var a2 = d134 * y2d;
        var b2 = d123 * y4d;
        var a0 = d134 - d234;
        var b0 = d123 - d234;
        var c0 = d234;
        return new Matrix3x3(x1 * a0 + a1, y1 * a0 + a2, a0, x1 * b0 + b1, y1 * b0 + b2, b0, x1 * c0, y1 * c0, c0);
    };
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
    Matrix3x3.projectiveInvTransform = function (x1, y1, x2, y2, x3, y3, x4, y4) {
        var x2d = x2 - x1;
        var y2d = y2 - y1;
        var x3d = x3 - x1;
        var y3d = y3 - y1;
        var x4d = x4 - x1;
        var y4d = y4 - y1;
        // must sgn(d123) == sgn(d124) == sgn(d134) == sgn(d234) != 0
        var d123 = x2d * y3d - x3d * y2d;
        var d124 = x2d * y4d - x4d * y2d;
        var d134 = x3d * y4d - x4d * y3d;
        var d1234 = d123 + d134;
        var d234 = d1234 - d124;
        var d11 = d123 - d124;
        var d22 = d134 - d124;
        var a1 = -d123 * d234 * y4d;
        var b1 = d123 * d234 * x4d;
        var a2 = d134 * d234 * y2d;
        var b2 = -d134 * d234 * x2d;
        var a0 = d11 * d123 * y4d + d22 * d134 * y2d;
        var b0 = d11 * d123 * x4d + d22 * d134 * x2d;
        var c0 = -d123 * d124 * d134;
        return new Matrix3x3(a1, a2, a0, b1, b2, b0, -a1 * x1 - b1 * y1, -a2 * x1 - b2 * y1, -a0 * x1 - b0 * y1 + c0);
    };
    /**
     * Multiply by `other` vector and returns a vector.
     * @param {Float32Vector3} other
     * @returns {Float32Vector3}
     */
    Matrix3x3.prototype.mulByVector3 = function (other) {
        var _a = this.values, m11 = _a[0], m21 = _a[1], m31 = _a[2], m12 = _a[3], m22 = _a[4], m32 = _a[5], m13 = _a[6], m23 = _a[7], m33 = _a[8];
        var _b = other.values, o1 = _b[0], o2 = _b[1], o3 = _b[2];
        var p1 = (m11 * o1) + (m12 * o2) + (m13 * o3);
        var p2 = (m21 * o1) + (m22 * o2) + (m23 * o3);
        var p3 = (m31 * o1) + (m32 * o2) + (m33 * o3);
        return new float32vector_1.Float32Vector3(p1, p2, p3);
    };
    /**
     * Multiply by `other` matrix and returns a product.
     *
     * This method does not mutate the matrix.
     * @param {Matrix3x3} other
     * @returns {Matrix3x3}
     */
    Matrix3x3.prototype.mulByMatrix3x3 = function (other) {
        var _a = this.values, m11 = _a[0], m21 = _a[1], m31 = _a[2], m12 = _a[3], m22 = _a[4], m32 = _a[5], m13 = _a[6], m23 = _a[7], m33 = _a[8];
        var _b = other.values, o11 = _b[0], o21 = _b[1], o31 = _b[2], o12 = _b[3], o22 = _b[4], o32 = _b[5], o13 = _b[6], o23 = _b[7], o33 = _b[8];
        var p11 = (m11 * o11) + (m12 * o21) + (m13 * o31);
        var p21 = (m21 * o11) + (m22 * o21) + (m23 * o31);
        var p31 = (m31 * o11) + (m32 * o21) + (m33 * o31);
        var p12 = (m11 * o12) + (m12 * o22) + (m13 * o32);
        var p22 = (m21 * o12) + (m22 * o22) + (m23 * o32);
        var p32 = (m31 * o12) + (m32 * o22) + (m33 * o32);
        var p13 = (m11 * o13) + (m12 * o23) + (m13 * o33);
        var p23 = (m21 * o13) + (m22 * o23) + (m23 * o33);
        var p33 = (m31 * o13) + (m32 * o23) + (m33 * o33);
        return new Matrix3x3(p11, p21, p31, p12, p22, p32, p13, p23, p33);
    };
    /**
     * An alias for `mulByMatrix3x3`.
     * @param {Matrix3x3} other
     * @returns {Matrix3x3}
     */
    Matrix3x3.prototype.mulByMatrix3 = function (other) {
        return this.mulByMatrix3x3(other);
    };
    /**
     * Translate the matrix and returns new `Matrix3x3`.
     *
     * This method does not mutate the matrix.
     * @param {number} tx
     * @param {number} ty
     * @returns {Matrix4x4}
     */
    Matrix3x3.prototype.translate = function (tx, ty) {
        var t = Matrix3x3.translation(tx, ty);
        return this.mulByMatrix3x3(t);
    };
    /**
     * Scale the matrix and returns new `Matrix3x3`.
     * @param {number} sx
     * @param {number} sy
     * @returns {Matrix3x3}
     */
    Matrix3x3.prototype.scale = function (sx, sy) {
        var s = Matrix3x3.scaling(sx, sy);
        return this.mulByMatrix3x3(s);
    };
    /**
     * Rotate the matrix and returns new `Matrix3x3`.
     *
     * This method does not mutate the matrix.
     * @param {number} radian
     * @returns {Matrix3x3}
     */
    Matrix3x3.prototype.rotate = function (radian) {
        var r = Matrix3x3.rotation(radian);
        return this.mulByMatrix3x3(r);
    };
    Object.defineProperty(Matrix3x3.prototype, "values", {
        get: function () {
            return this._values;
        },
        enumerable: true,
        configurable: true
    });
    Matrix3x3.prototype.toString = function () {
        return this._values.toString();
    };
    return Matrix3x3;
}());
exports.Matrix3x3 = Matrix3x3;
/**
 * 4x4 Matrix of single-precision float numbers.
 *
 * Values are stored in column major order.
 */
var Matrix4x4 = /** @class */ (function () {
    function Matrix4x4(m11, m21, m31, m41, m12, m22, m32, m42, m13, m23, m33, m43, m14, m24, m34, m44) {
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
    Matrix4x4.identity = function () {
        return new Matrix4x4(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0);
    };
    /**
     * Returns translation matrix.
     * @param {number} tx
     * @param {number} ty
     * @param {number} tz
     * @returns {Matrix4x4}
     */
    Matrix4x4.translation = function (tx, ty, tz) {
        return new Matrix4x4(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, tx, ty, tz, 1.0);
    };
    /**
     * Returns scaling matrix.
     * @param {number} sx
     * @param {number} sy
     * @param {number} sz
     * @returns {Matrix4x4}
     */
    Matrix4x4.scaling = function (sx, sy, sz) {
        return new Matrix4x4(sx, 0.0, 0.0, 0.0, 0.0, sy, 0.0, 0.0, 0.0, 0.0, sz, 0.0, 0.0, 0.0, 0.0, 1.0);
    };
    /**
     * Returns rotation matrix around x-axis.
     * @param {number} radian
     * @returns {Matrix4x4}
     */
    Matrix4x4.rotationX = function (radian) {
        var sin = Math.sin(radian);
        var cos = Math.cos(radian);
        return new Matrix4x4(1.0, 0.0, 0.0, 0.0, 0.0, cos, sin, 0.0, 0.0, -sin, cos, 0.0, 0.0, 0.0, 0.0, 1.0);
    };
    /**
     * Returns rotation matrix around y-axis.
     * @param {number} radian
     * @returns {Matrix4x4}
     */
    Matrix4x4.rotationY = function (radian) {
        var sin = Math.sin(radian);
        var cos = Math.cos(radian);
        return new Matrix4x4(cos, 0.0, -sin, 0.0, 0.0, 1.0, 0.0, 0.0, sin, 0.0, cos, 0.0, 0.0, 0.0, 0.0, 1.0);
    };
    /**
     * Returns rotation matrix around z-axis.
     * @param {number} radian
     * @returns {Matrix4x4}
     */
    Matrix4x4.rotationZ = function (radian) {
        var sin = Math.sin(radian);
        var cos = Math.cos(radian);
        return new Matrix4x4(cos, sin, 0.0, 0.0, -sin, cos, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0);
    };
    /**
     * Returns rotation matrix around `normalizedAxis`. `normalizedAxis` must be normalized.
     * @param {Float32Vector3} normalizedAxis
     * @param {number} radian
     * @returns {Matrix4x4}
     */
    Matrix4x4.rotationAround = function (normalizedAxis, radian) {
        var q = quaternion_1.Quaternion.rotationAround(normalizedAxis, radian);
        return q.toRotationMatrix4();
    };
    /**
     * Returns "look at" matrix.
     * @param {Float32Vector3} cameraPosition
     * @param {Float32Vector3} lookAtPosition
     * @param {Float32Vector3} cameraUp
     * @returns {Matrix4x4}
     */
    Matrix4x4.lookAt = function (cameraPosition, lookAtPosition, cameraUp) {
        var zAxis = cameraPosition.sub(lookAtPosition).normalize();
        var xAxis = cameraUp.cross(zAxis).normalize();
        var yAxis = zAxis.cross(xAxis).normalize();
        return new Matrix4x4(xAxis.x, yAxis.x, zAxis.x, 0.0, xAxis.y, yAxis.y, zAxis.y, 0.0, xAxis.z, yAxis.z, zAxis.z, 0.0, -cameraPosition.dot(xAxis), -cameraPosition.dot(yAxis), -cameraPosition.dot(zAxis), 1.0);
    };
    /**
     * Returns an orthographic projection matrix.
     * @param {{top: number; bottom: number; left: number; right: number; near: number; far: number}} argsObject
     * @returns {Matrix4x4}
     */
    Matrix4x4.orthographic = function (argsObject) {
        var top = argsObject.top;
        var bottom = argsObject.bottom;
        var left = argsObject.left;
        var right = argsObject.right;
        var near = argsObject.near;
        var far = argsObject.far;
        return new Matrix4x4(2 / (right - left), 0.0, 0.0, 0.0, 0.0, 2 / (top - bottom), 0.0, 0.0, 0.0, 0.0, -2 / (far - near), 0.0, -(right + left) / (right - left), -(top + bottom) / (top - bottom), -(far + near) / (far - near), 1.0);
    };
    /**
     * Returns a frustrum projection matrix.
     * @param {{top: number; bottom: number; left: number; right: number; near: number; far: number}} argsObject
     * @returns {Matrix4x4}
     */
    Matrix4x4.frustum = function (argsObject) {
        var top = argsObject.top;
        var bottom = argsObject.bottom;
        var left = argsObject.left;
        var right = argsObject.right;
        var near = argsObject.near;
        var far = argsObject.far;
        return new Matrix4x4(2 * near / (right - left), 0.0, 0.0, 0.0, 0.0, 2 * near / (top - bottom), 0.0, 0.0, (right + left) / (right - left), (top + bottom) / (top - bottom), -(far + near) / (far - near), -1.0, 0.0, 0.0, -2 * far * near / (far - near), 0.0);
    };
    /**
     * Returns a perspective projection matrix.
     * @param {{fovYRadian: number; aspectRatio: number; near: number; far: number}} argsObject
     * @returns {Matrix4x4}
     */
    Matrix4x4.perspective = function (argsObject) {
        var top = argsObject.near * Math.tan(argsObject.fovYRadian * 0.5);
        var height = top * 2;
        var width = argsObject.aspectRatio * height;
        var left = -0.5 * width;
        var right = left + width;
        var bottom = top - height;
        return Matrix4x4.frustum({
            top: top,
            bottom: bottom,
            left: left,
            right: right,
            near: argsObject.near,
            far: argsObject.far,
        });
    };
    /**
     * Multiply by `other` vector and returns a vector.
     * @param {Float32Vector4} other
     * @returns {Float32Vector4}
     */
    Matrix4x4.prototype.mulByVector4 = function (other) {
        var _a = this.values, m11 = _a[0], m21 = _a[1], m31 = _a[2], m41 = _a[3], m12 = _a[4], m22 = _a[5], m32 = _a[6], m42 = _a[7], m13 = _a[8], m23 = _a[9], m33 = _a[10], m43 = _a[11], m14 = _a[12], m24 = _a[13], m34 = _a[14], m44 = _a[15];
        var _b = other.values, o1 = _b[0], o2 = _b[1], o3 = _b[2], o4 = _b[3];
        var p1 = (m11 * o1) + (m12 * o2) + (m13 * o3) + (m14 * o4);
        var p2 = (m21 * o1) + (m22 * o2) + (m23 * o3) + (m24 * o4);
        var p3 = (m31 * o1) + (m32 * o2) + (m33 * o3) + (m34 * o4);
        var p4 = (m41 * o1) + (m42 * o2) + (m43 * o3) + (m44 * o4);
        return new float32vector_1.Float32Vector4(p1, p2, p3, p4);
    };
    /**
     * Multiply by `other` matrix and returns a product.
     *
     * This method does not mutate the matrix.
     * @param {Matrix4x4} other
     * @returns {Matrix4x4}
     */
    Matrix4x4.prototype.mulByMatrix4x4 = function (other) {
        var _a = this.values, m11 = _a[0], m21 = _a[1], m31 = _a[2], m41 = _a[3], m12 = _a[4], m22 = _a[5], m32 = _a[6], m42 = _a[7], m13 = _a[8], m23 = _a[9], m33 = _a[10], m43 = _a[11], m14 = _a[12], m24 = _a[13], m34 = _a[14], m44 = _a[15];
        var _b = other.values, o11 = _b[0], o21 = _b[1], o31 = _b[2], o41 = _b[3], o12 = _b[4], o22 = _b[5], o32 = _b[6], o42 = _b[7], o13 = _b[8], o23 = _b[9], o33 = _b[10], o43 = _b[11], o14 = _b[12], o24 = _b[13], o34 = _b[14], o44 = _b[15];
        var p11 = (m11 * o11) + (m12 * o21) + (m13 * o31) + (m14 * o41);
        var p21 = (m21 * o11) + (m22 * o21) + (m23 * o31) + (m24 * o41);
        var p31 = (m31 * o11) + (m32 * o21) + (m33 * o31) + (m34 * o41);
        var p41 = (m41 * o11) + (m42 * o21) + (m43 * o31) + (m44 * o41);
        var p12 = (m11 * o12) + (m12 * o22) + (m13 * o32) + (m14 * o42);
        var p22 = (m21 * o12) + (m22 * o22) + (m23 * o32) + (m24 * o42);
        var p32 = (m31 * o12) + (m32 * o22) + (m33 * o32) + (m34 * o42);
        var p42 = (m41 * o12) + (m42 * o22) + (m43 * o32) + (m44 * o42);
        var p13 = (m11 * o13) + (m12 * o23) + (m13 * o33) + (m14 * o43);
        var p23 = (m21 * o13) + (m22 * o23) + (m23 * o33) + (m24 * o43);
        var p33 = (m31 * o13) + (m32 * o23) + (m33 * o33) + (m34 * o43);
        var p43 = (m41 * o13) + (m42 * o23) + (m43 * o33) + (m44 * o43);
        var p14 = (m11 * o14) + (m12 * o24) + (m13 * o34) + (m14 * o44);
        var p24 = (m21 * o14) + (m22 * o24) + (m23 * o34) + (m24 * o44);
        var p34 = (m31 * o14) + (m32 * o24) + (m33 * o34) + (m34 * o44);
        var p44 = (m41 * o14) + (m42 * o24) + (m43 * o34) + (m44 * o44);
        return new Matrix4x4(p11, p21, p31, p41, p12, p22, p32, p42, p13, p23, p33, p43, p14, p24, p34, p44);
    };
    /**
     * An alias for `mulByMatrix4x4`.
     * @param {Matrix4x4} other
     * @returns {Matrix4x4}
     */
    Matrix4x4.prototype.mulByMatrix4 = function (other) {
        return this.mulByMatrix4x4(other);
    };
    /**
     * Translate the matrix and returns new `Matrix4x4`.
     *
     * This method does not mutate the matrix.
     * @param {number} tx
     * @param {number} ty
     * @param {number} tz
     * @returns {Matrix4x4}
     */
    Matrix4x4.prototype.translate = function (tx, ty, tz) {
        var t = Matrix4x4.translation(tx, ty, tz);
        return this.mulByMatrix4x4(t);
    };
    /**
     * Scale the matrix and returns new `Matrix4x4`.
     * @param {number} sx
     * @param {number} sy
     * @param {number} sz
     * @returns {Matrix4x4}
     */
    Matrix4x4.prototype.scale = function (sx, sy, sz) {
        var s = Matrix4x4.scaling(sx, sy, sz);
        return this.mulByMatrix4x4(s);
    };
    /**
     * Rotate the matrix around x-axis and returns new `Matrix4x4`.
     *
     * This method does not mutate the matrix.
     * @param {number} radian
     * @returns {Matrix4x4}
     */
    Matrix4x4.prototype.rotateX = function (radian) {
        var rx = Matrix4x4.rotationX(radian);
        return this.mulByMatrix4x4(rx);
    };
    /**
     * Rotate the matrix around y-axis and returns new `Matrix4x4`.
     *
     * This method does not mutate the matrix.
     * @param {number} radian
     * @returns {Matrix4x4}
     */
    Matrix4x4.prototype.rotateY = function (radian) {
        var ry = Matrix4x4.rotationY(radian);
        return this.mulByMatrix4x4(ry);
    };
    /**
     * Rotate the matrix around z-axis and returns new `Matrix4x4`.
     *
     * This method does not mutate the matrix.
     * @param {number} radian
     * @returns {Matrix4x4}
     */
    Matrix4x4.prototype.rotateZ = function (radian) {
        var rz = Matrix4x4.rotationZ(radian);
        return this.mulByMatrix4x4(rz);
    };
    /**
     * Rotate the matrix around the `normalizedAxis` and return new Matrix4x4.
     *
     * This method does not mutate the matrix.
     * @param {Float32Vector3} normalizedAxis
     * @param {number} radian
     * @returns {Matrix4x4}
     */
    Matrix4x4.prototype.rotateAround = function (normalizedAxis, radian) {
        var r = Matrix4x4.rotationAround(normalizedAxis, radian);
        return this.mulByMatrix4x4(r);
    };
    Object.defineProperty(Matrix4x4.prototype, "values", {
        get: function () {
            return this._values;
        },
        enumerable: true,
        configurable: true
    });
    Matrix4x4.prototype.toString = function () {
        return this._values.toString();
    };
    return Matrix4x4;
}());
exports.Matrix4x4 = Matrix4x4;
/**
 * An alias for `Matrix2x2`.
 * @type {Matrix2x2}
 */
exports.Matrix2 = Matrix2x2;
/**
 * An alias for `Matrix3x3`.
 * @type {Matrix3x3}
 */
exports.Matrix3 = Matrix3x3;
/**
 * An alias for `Matrix4x4`.
 * @type {Matrix4x4}
 */
exports.Matrix4 = Matrix4x4;
