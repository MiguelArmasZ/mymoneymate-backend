"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_1 = require("../controllers/user");
const middlewares_1 = require("../middlewares");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post('/', user_1.signIn);
exports.userRouter.get('/confirm/:token', user_1.confirmAccount);
exports.userRouter.post('/log-in', user_1.logIn);
exports.userRouter.post('/forgot-password', user_1.forgotPassword);
exports.userRouter.route('/forgot-password/:token').get(user_1.checkToken).post(user_1.newPassword);
exports.userRouter.get('/profile', middlewares_1.checkAuth, user_1.getProfile);
