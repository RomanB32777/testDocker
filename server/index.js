"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var index_1 = __importDefault(require("./config/index"));
if (index_1.default.port && index_1.default.mongoUri) {
    var application = new app_1.default({
        port: +index_1.default.port,
        mongoUri: index_1.default.mongoUri
    }).run();
    if (!application) {
        console.log('good bye! ');
        process.exit(1);
    }
}
