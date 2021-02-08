"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, default: '' },
    isAuthenticated: { type: Boolean, default: false },
    status: { type: String, required: true, enum: ['admin', 'guest'], default: 'guest' },
    posts: [{ type: mongoose_1.Types.ObjectId, ref: 'Post' }],
    files: [{ type: mongoose_1.Types.ObjectId, ref: 'File' }],
    avatar: { type: mongoose_1.Types.ObjectId, ref: 'File', default: null }
});
exports.default = mongoose_1.model('User', UserSchema);
