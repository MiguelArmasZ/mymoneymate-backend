"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
(0, config_1.setupServer)();
(0, config_1.corsConfig)();
void (0, config_1.DBconnect)();
(0, config_1.routing)();
/**
 * TODO: Optimizar la llamada a las variables de entorno
 */
