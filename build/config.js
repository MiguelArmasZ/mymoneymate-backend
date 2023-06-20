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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsConfig = exports.DBconnect = exports.routing = exports.setupServer = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const routes_1 = require("./routes");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// app.use(cors())
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 4000;
function setupServer() {
    (0, dotenv_1.config)();
    app.use(express_1.default.json());
    app.listen(PORT, () => {
        console.log(`Server runing in port: ${PORT} 🚀`);
    });
}
exports.setupServer = setupServer;
function routing() {
    app.use('/api/user', routes_1.userRouter);
    app.use('/api/category', routes_1.categoryRouter);
    app.use('/api/record', routes_1.recordRouter);
}
exports.routing = routing;
function DBconnect() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const optionsConnection = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        };
        try {
            const connection = yield mongoose_1.default.connect((_a = process.env.MONGO_URI) !== null && _a !== void 0 ? _a : '', optionsConnection);
            console.log('Conectado a la base de datos 📀', connection.connection.db.databaseName);
        }
        catch (error) {
            console.error(`El error al momento de conectarse a la base de datos es: ${error}`);
        }
    });
}
exports.DBconnect = DBconnect;
function corsConfig() {
    const whiteList = [process.env.FRONTEND_URL, 'http://192.168.0.15:5173'];
    const corsOptions = {
        origin: (origin, callback) => {
            if (whiteList.includes(origin)) {
                callback(null, true);
            }
            else {
                const error = new Error('Sin acceso por política de CORS');
                callback(error);
            }
        }
    };
    app.use((0, cors_1.default)(corsOptions));
}
exports.corsConfig = corsConfig;
