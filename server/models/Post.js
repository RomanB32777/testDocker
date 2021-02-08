"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const {Schema, model, Types, Document } = require('mongoose')
var mongoose_1 = require("mongoose");
var PostSchema = new mongoose_1.Schema({
    title: { type: String, default: '' },
    body: { type: String, default: '' },
    status: { type: String, required: true, enum: ['created', 'draft'], default: 'draft' },
    owner: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true },
    files: [{ type: mongoose_1.Types.ObjectId, ref: 'File' }],
    img: { type: mongoose_1.Types.ObjectId, ref: 'File', default: null },
    type: { type: String, required: true, enum: ['project', 'review'], default: 'project' },
    inMainPage: { type: Boolean, default: false },
    date: { type: Date, default: Date.now, required: true }
});
exports.default = mongoose_1.model('Post', PostSchema);
