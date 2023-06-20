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
exports.createRecord = void 0;
const Record_1 = require("../../models/Record");
const helpers_1 = require("../../helpers");
const data_1 = require("../../data");
function createRecord(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { kind, amount, category, concept, date } = req.body;
        const userLogged = req.userLogged;
        const newRecord = new Record_1.RecordModel({
            kind,
            amount,
            category,
            concept,
            date,
            owner: userLogged === null || userLogged === void 0 ? void 0 : userLogged.id
        });
        try {
            yield newRecord.save();
            (0, helpers_1.thrwoSuccess)(res, 200, data_1.SUCCESS_MESSAGES.RECORD_CREATED);
        }
        catch (error) {
            console.error(`El error creando un registro es: ${error}`);
            (0, helpers_1.thrwoError)(res, 400, error);
        }
    });
}
exports.createRecord = createRecord;
