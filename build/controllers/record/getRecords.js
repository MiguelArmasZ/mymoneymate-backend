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
exports.getRecords = void 0;
const Record_1 = require("../../models/Record");
const helpers_1 = require("../../helpers");
function getRecords(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const records = yield Record_1.RecordModel.find({ owner: (_a = req.userLogged) === null || _a === void 0 ? void 0 : _a.id }, { category: 1, amount: 1, concept: 1, date: 1, kind: 1 });
            res.send(records);
        }
        catch (error) {
            console.error(`El error obteniendo los registros es: ${error}`);
            (0, helpers_1.thrwoError)(res, 400, error);
        }
    });
}
exports.getRecords = getRecords;
