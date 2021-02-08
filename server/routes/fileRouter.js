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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("config"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var File_1 = __importDefault(require("../models/File"));
var Post_1 = __importDefault(require("../models/Post"));
var User_1 = __importDefault(require("../models/User"));
var Router = require('express').Router;
var multer = require("multer");
var path = require('path');
var router = Router();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './server/uploads'); // '' ./client/src/img
    },
    filename: function (req, file, cb) {
        var fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName);
    }
});
var uploadFile = multer({ storage: storage }).single('file');
router.post('/upload', function (req, res) {
    var _a;
    var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (token) {
        var decoded = jsonwebtoken_1.default.verify(token, config_1.default.get('jwtSecret'));
        var ownerId_1 = decoded.valueOf().id;
        uploadFile(req, res, function (err) { return __awaiter(void 0, void 0, void 0, function () {
            var postId, typeUpload, path, file;
            return __generator(this, function (_a) {
                postId = req.body.postId;
                typeUpload = req.body.typeUpload;
                if (err instanceof multer.MulterError) {
                    return [2 /*return*/, res.status(500).json(err)];
                }
                else if (err) {
                    return [2 /*return*/, res.status(500).json(err)];
                }
                path = req.protocol + '://' + req.get('host') + '/uploads/' + req.file.filename;
                file = new File_1.default({
                    path: path,
                    owner: ownerId_1,
                    post: postId
                });
                file.save()
                    .then(function (result) { return __awaiter(void 0, void 0, void 0, function () {
                    var owner, ownerFiles;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(typeUpload === 'post')) return [3 /*break*/, 2];
                                return [4 /*yield*/, Post_1.default.findByIdAndUpdate({ _id: postId, ownerId: ownerId_1 }, { img: result.id })];
                            case 1:
                                _a.sent();
                                _a.label = 2;
                            case 2: return [4 /*yield*/, User_1.default.findById(ownerId_1)];
                            case 3:
                                owner = _a.sent();
                                if (!owner) return [3 /*break*/, 5];
                                ownerFiles = owner === null || owner === void 0 ? void 0 : owner.files;
                                ownerFiles === null || ownerFiles === void 0 ? void 0 : ownerFiles.unshift(result.id);
                                owner.files = ownerFiles;
                                if (typeUpload === 'avatar') {
                                    owner.avatar = result.id;
                                }
                                return [4 /*yield*/, (owner === null || owner === void 0 ? void 0 : owner.save())];
                            case 4:
                                _a.sent();
                                _a.label = 5;
                            case 5:
                                res.status(201).json({
                                    message: "Done upload!",
                                    result: result,
                                    // file: req.file,
                                    path: path
                                });
                                return [2 /*return*/];
                        }
                    });
                }); })
                    .catch(function (err) {
                    console.log(err);
                    res.status(500).json(err);
                });
                return [2 /*return*/];
            });
        }); });
    }
});
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, DIR);
//     },
//     filename: (req, file, cb) => {
//         const fileName = file.originalname.toLowerCase().split(' ').join('-');
//         cb(null, uuidv4() + '-' + fileName)
//     }
// });
var uploadFiles = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        }
        else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
}).array('imgCollection', 10);
router.post('/upload-files', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, decoded, ownerId_2;
    var _a;
    return __generator(this, function (_b) {
        token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (token) {
            decoded = jsonwebtoken_1.default.verify(token, config_1.default.get('jwtSecret'));
            ownerId_2 = decoded.valueOf().id;
            uploadFiles(req, res, function (err) { return __awaiter(void 0, void 0, void 0, function () {
                var reqFiles, postId, url, i, files;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            reqFiles = [];
                            postId = req.body.postId;
                            url = req.protocol + '://' + req.get('host');
                            for (i = 0; i < req.files.length; i++) {
                                reqFiles.push({
                                    path: url + '/uploads/' + req.files[i].filename,
                                    owner: ownerId_2,
                                    post: postId
                                });
                            }
                            files = [];
                            return [4 /*yield*/, File_1.default.insertMany(reqFiles)
                                    .then(function (res) { return __awaiter(void 0, void 0, void 0, function () {
                                    var filesId, _i, _a, key, post, postFiles, owner, ownerFiles;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                filesId = [];
                                                for (_i = 0, _a = Object.keys(res); _i < _a.length; _i++) {
                                                    key = _a[_i];
                                                    filesId.push(res[+key]._id);
                                                    files.push({
                                                        _id: res[+key]._id,
                                                        path: res[+key].path
                                                    });
                                                }
                                                return [4 /*yield*/, Post_1.default.findById(postId)];
                                            case 1:
                                                post = _b.sent();
                                                if (!post) return [3 /*break*/, 3];
                                                postFiles = __spreadArrays(post === null || post === void 0 ? void 0 : post.files, filesId);
                                                post.files = postFiles;
                                                return [4 /*yield*/, (post === null || post === void 0 ? void 0 : post.save())];
                                            case 2:
                                                _b.sent();
                                                _b.label = 3;
                                            case 3: return [4 /*yield*/, User_1.default.findById(ownerId_2)];
                                            case 4:
                                                owner = _b.sent();
                                                if (!owner) return [3 /*break*/, 6];
                                                ownerFiles = __spreadArrays(owner === null || owner === void 0 ? void 0 : owner.files, filesId);
                                                //ownerFiles?.unshift(result.id)
                                                owner.files = ownerFiles;
                                                return [4 /*yield*/, (owner === null || owner === void 0 ? void 0 : owner.save())];
                                            case 5:
                                                _b.sent();
                                                _b.label = 6;
                                            case 6: return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 1:
                            _a.sent();
                            res.status(201).json({
                                message: "Done upload!",
                                files: files
                            });
                            return [2 /*return*/];
                    }
                });
            }); });
        }
        return [2 /*return*/];
    });
}); });
router.delete('/delete/:type/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var fileId, type;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fileId = req.params.id;
                type = req.params.type;
                return [4 /*yield*/, File_1.default.findOneAndDelete({
                        _id: fileId
                    }, function (error, deleteFile) { return __awaiter(void 0, void 0, void 0, function () {
                        var _a, post, files, afterDeleteFiles, owner, files, afterDeleteFiles, error_1;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (error) {
                                        res.status(204).json({ success: false, mes: 'Ошибка удаления', error: error });
                                    }
                                    if (!deleteFile) return [3 /*break*/, 10];
                                    _b.label = 1;
                                case 1:
                                    _b.trys.push([1, 9, , 10]);
                                    _a = type;
                                    switch (_a) {
                                        case 'imgPost': return [3 /*break*/, 2];
                                        case 'galleryPost': return [3 /*break*/, 4];
                                    }
                                    return [3 /*break*/, 6];
                                case 2: return [4 /*yield*/, Post_1.default.findByIdAndUpdate({ _id: deleteFile.post, }, { img: null })];
                                case 3:
                                    _b.sent();
                                    return [3 /*break*/, 7];
                                case 4: return [4 /*yield*/, Post_1.default.findById(deleteFile.post)];
                                case 5:
                                    post = _b.sent();
                                    if (post) {
                                        files = __spreadArrays(post.files);
                                        afterDeleteFiles = files.filter(function (file) {
                                            return file.toJSON() !== deleteFile._id.toJSON();
                                        });
                                        post.files = __spreadArrays(afterDeleteFiles);
                                        post.save();
                                    }
                                    return [3 /*break*/, 7];
                                case 6: return [3 /*break*/, 7];
                                case 7: return [4 /*yield*/, User_1.default.findById(deleteFile.owner)];
                                case 8:
                                    owner = _b.sent();
                                    if (owner) {
                                        files = __spreadArrays(owner.files);
                                        afterDeleteFiles = files.filter(function (file) {
                                            return file.toJSON() !== deleteFile._id.toJSON();
                                        });
                                        owner.files = __spreadArrays(afterDeleteFiles); // .???
                                        owner.save();
                                    }
                                    res.status(200).json({
                                        message: "Done delete!",
                                    });
                                    return [3 /*break*/, 10];
                                case 9:
                                    error_1 = _b.sent();
                                    res.status(204).json({ success: false, mes: 'Ошибка удаления', error: error_1 });
                                    return [3 /*break*/, 10];
                                case 10: return [2 /*return*/];
                            }
                        });
                    }); })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
module.exports = router;
