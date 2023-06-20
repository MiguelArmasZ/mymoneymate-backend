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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPasswordEmail = exports.signInEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const INFO_CONSTS = {
    companyName: 'Money Watcher',
    from: 'Money Watcher - Administrador de Finanzas'
};
function signInEmail(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, token, userName } = data;
        const transportOptions = {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        };
        const transport = nodemailer_1.default.createTransport(transportOptions);
        yield transport.sendMail({
            from: INFO_CONSTS.from,
            to: email,
            subject: `${INFO_CONSTS.companyName} - Comprueba tu cuenta`,
            text: 'Comprueba tu cuenta',
            html: `
        <p>Hola ${userName} comprueba tu cuenta en Money Watcher</p>
        <a href="${process.env.FRONTEND_URL}/confirm/${token}">Haz click aquí</a>
    `
        });
    });
}
exports.signInEmail = signInEmail;
function forgotPasswordEmail(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, token, userName } = data;
        const transportOptions = {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        };
        const transport = nodemailer_1.default.createTransport(transportOptions);
        yield transport.sendMail({
            from: INFO_CONSTS.from,
            to: email,
            subject: `${INFO_CONSTS.companyName} - Reestablece tu contraseña`,
            text: 'Recupera tu acceso',
            html: `
        <p>Hola ${userName} sigue el siguiente enlace para definir una nueva contraseña</p>
        <a href="${process.env.FRONTEND_URL}/new-password/${token}">Haz click aquí</a>
    `
        });
    });
}
exports.forgotPasswordEmail = forgotPasswordEmail;
