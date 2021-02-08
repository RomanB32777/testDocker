"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var FileSchema = new mongoose_1.Schema({
    owner: { type: mongoose_1.Types.ObjectId, ref: 'User' },
    path: { type: String, required: true },
    post: { type: mongoose_1.Types.ObjectId, ref: 'Post' }
});
exports.default = mongoose_1.model('File', FileSchema);
