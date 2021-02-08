"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var config_1 = __importDefault(require("config"));
var application = new app_1.default({
    port: config_1.default.get('port'),
    mongoUri: config_1.default.get('mongoUri')
}).run();
if (!application) {
    console.log('good bye! ');
    process.exit(1);
}
