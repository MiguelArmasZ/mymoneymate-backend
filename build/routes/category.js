"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = require("express");
const category_1 = require("../controllers/category");
const middlewares_1 = require("../middlewares");
exports.categoryRouter = (0, express_1.Router)();
exports.categoryRouter
    .route('/')
    .post(middlewares_1.checkAuth, category_1.createCategory)
    .get(middlewares_1.checkAuth, category_1.getCategories);
exports.categoryRouter
    .route('/:id')
    .put(middlewares_1.checkAuth, category_1.updateCategory)
    .delete(middlewares_1.checkAuth, category_1.deleteCategory);
