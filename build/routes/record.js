"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordRouter = void 0;
const express_1 = require("express");
const record_1 = require("../controllers/record");
const middlewares_1 = require("../middlewares");
exports.recordRouter = (0, express_1.Router)();
exports.recordRouter.route('/').post(middlewares_1.checkAuth, record_1.createRecord).get(middlewares_1.checkAuth, record_1.getRecords);
exports.recordRouter
    .route('/:id')
    .put(middlewares_1.checkAuth, record_1.updateRecord)
    .delete(middlewares_1.checkAuth, record_1.deleteRecord);
