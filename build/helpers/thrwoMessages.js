"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.thrwoError = exports.thrwoSuccess = void 0;
function thrwoSuccess(res, status, msg) {
    return res.status(status).json({ msg });
}
exports.thrwoSuccess = thrwoSuccess;
function thrwoError(res, status, msg) {
    const error = new Error(msg);
    return res.status(status).json({ msg: error.message });
}
exports.thrwoError = thrwoError;
