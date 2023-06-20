"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = exports.Kind = void 0;
/* eslint-disable @typescript-eslint/indent */
const typegoose_1 = require("@typegoose/typegoose");
const User_1 = require("./User");
var Kind;
(function (Kind) {
    Kind["INCOME"] = "income";
    Kind["SPENT"] = "spent";
})(Kind = exports.Kind || (exports.Kind = {}));
let Category = class Category {
};
__decorate([
    (0, typegoose_1.prop)({
        type: String,
        lowercase: true,
        required: true,
        minlength: 2,
        trim: true
    }),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ enum: Kind, required: true }),
    __metadata("design:type", String)
], Category.prototype, "kind", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => User_1.User }),
    __metadata("design:type", Object)
], Category.prototype, "owner", void 0);
Category = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            timestamps: true
        }
    })
], Category);
exports.CategoryModel = (0, typegoose_1.getModelForClass)(Category);
