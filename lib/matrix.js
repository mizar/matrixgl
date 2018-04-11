"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
     * @param {{fovY: number; aspect: number; near: number; far: number}} argsObject
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
     * Multiply by `other` matrix and returns a product.
     *
     * This method does not mutate the matrix.
     * @param {Matrix4x4} other
     * @returns {Matrix4x4}
     */
    Matrix4x4.prototype.mulByMatrix4x4 = function (other) {
        /*
        const m = this._values;
        const m11: number = m[0];
        const m21: number = m[1];
        const m31: number = m[2];
        const m41: number = m[3];
        const m12: number = m[4];
        const m22: number = m[5];
        const m32: number = m[6];
        const m42: number = m[7];
        const m13: number = m[8];
        const m23: number = m[9];
        const m33: number = m[10];
        const m43: number = m[11];
        const m14: number = m[12];
        const m24: number = m[13];
        const m34: number = m[14];
        const m44: number = m[15];
    
        const o = other.values;
        const o11: number = o[0];
        const o21: number = o[1];
        const o31: number = o[2];
        const o41: number = o[3];
        const o12: number = o[4];
        const o22: number = o[5];
        const o32: number = o[6];
        const o42: number = o[7];
        const o13: number = o[8];
        const o23: number = o[9];
        const o33: number = o[10];
        const o43: number = o[11];
        const o14: number = o[12];
        const o24: number = o[13];
        const o34: number = o[14];
        const o44: number = o[15];
         */
        // Destructuring assignment
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
        var _a = this._values, m11 = _a[0], m21 = _a[1], m31 = _a[2], m41 = _a[3], m12 = _a[4], m22 = _a[5], m32 = _a[6], m42 = _a[7], m13 = _a[8], m23 = _a[9], m33 = _a[10], m43 = _a[11], m14 = _a[12], m24 = _a[13], m34 = _a[14], m44 = _a[15];
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
