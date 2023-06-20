"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory = void 0;
const Category_1 = require("../../models/Category");
const helpers_1 = require("../../helpers");
const data_1 = require("../../data");
function createCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, kind } = req.body;
        const userLogged = req.userLogged;
        const existingCategory = yield Category_1.CategoryModel.findOne({
            name,
            owner: userLogged === null || userLogged === void 0 ? void 0 : userLogged.id
        });
        const creatorOfCategory = existingCategory === null || existingCategory === void 0 ? void 0 : existingCategory.owner.toString();
        const idUserLogged = userLogged === null || userLogged === void 0 ? void 0 : userLogged.id;
        if (creatorOfCategory === idUserLogged && existingCategory !== null) {
            return (0, helpers_1.thrwoError)(res, 400, data_1.ERROR_MESSAGES.CATEGORY_ALREADY_EXISTS);
        }
        const newCategory = new Category_1.CategoryModel({ name, kind, owner: userLogged === null || userLogged === void 0 ? void 0 : userLogged.id });
        try {
            yield newCategory.save();
            const { _id, kind, name } = newCategory;
            res.json({
                msg: data_1.SUCCESS_MESSAGES.CATEGORY_CREATED,
                newCategory: { _id, kind, name }
            });
        }
        catch (error) {
            console.error(`El error al momento de crear una nueva categoría es: ${error}`);
            (0, helpers_1.thrwoError)(res, 400, error);
        }
    });
}
exports.createCategory = createCategory;
