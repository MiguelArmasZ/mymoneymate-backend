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
exports.deleteCategory = void 0;
const Category_1 = require("../../models/Category");
const helpers_1 = require("../../helpers");
const data_1 = require("../../data");
function deleteCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: _id } = req.params;
        const categoryExisting = yield Category_1.CategoryModel.findOne({ _id });
        if (categoryExisting === null) {
            return (0, helpers_1.thrwoError)(res, 404, data_1.ERROR_MESSAGES.CATEGORY_DOES_NOT_EXIST);
        }
        try {
            yield categoryExisting.deleteOne();
            (0, helpers_1.thrwoSuccess)(res, 200, data_1.SUCCESS_MESSAGES.CATEGORY_DELETED);
        }
        catch (error) {
            console.error(`El error eliminando la categoría es: ${error}`);
            (0, helpers_1.thrwoError)(res, 400, error);
        }
    });
}
exports.deleteCategory = deleteCategory;
