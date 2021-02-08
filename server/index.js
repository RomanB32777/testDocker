"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
//import config from 'config'
var application = new app_1.default({
    port: process.env.PORT,
    // config.get('port'),
    mongoUri: process.env.DB
    // config.get('mongoUri')
}).run();
if (!application) {
    console.log('good bye! ');
    process.exit(1);
}
