"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var Post_1 = __importDefault(require("../models/Post"));
var config_1 = __importDefault(require("config"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var User_1 = __importDefault(require("../models/User"));
var File_1 = __importDefault(require("../models/File"));
var mongoose_1 = require("mongoose");
var _a = require('express-validator'), check = _a.check, validationResult = _a.validationResult;
var Router = require('express').Router;
var router = Router();
router.get('/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var posts, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, Post_1.default.find({ status: 'created' })
                        .populate('img', 'path')
                        .populate('files', 'path')
                        .populate('owner', 'name')];
            case 1:
                posts = _a.sent();
                _a.label = 2;
            case 2: return [2 /*return*/, res.status(200).json({ success: true, posts: posts })
                // }
                // else {
                //     return res.status(401).json({ success: false, message: 'Ошибка, связанная с получением токена пользователя - нет авторизации' })
                // }
            ];
            case 3:
                error_1 = _a.sent();
                console.log(error_1);
                return [2 /*return*/, res.status(500).json({ success: false, message: 'Нет авторизации', error: error_1 })];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post('/create', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var token, decoded, userId, draftPost, newPost, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                token = req.headers.authorization ? .split(' ')[1]
                    :
                ;
                if (!token) return [3 /*break*/, 3];
                decoded = jsonwebtoken_1.default.verify(token, config_1.default.get('jwtSecret'));
                userId = decoded.valueOf().id;
                return [4 /*yield*/, Post_1.default.findOne({ status: 'draft' })
                        .populate('img', 'path')
                        .populate('files', 'path')];
            case 1:
                draftPost = _a.sent();
                if (draftPost)
                    return [2 /*return*/, res.status(201).json({ success: true, message: "Редактирование поста", draftPost: draftPost })];
                newPost = new Post_1.default({ owner: userId });
                return [4 /*yield*/, newPost.save()];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(201).json({ success: true, message: "Создан  пост", newPost: newPost })];
            case 3: return [2 /*return*/, res.status(401).json({ success: false, message: 'Ошибка, связанная с получением токена пользователя - нет авторизации' })];
            case 4: return [3 /*break*/, 6];
            case 5:
                error_2 = _a.sent();
                console.log(error_2);
                return [2 /*return*/, res.status(500).json({ success: false, message: "Ошибка при создании поста", error: error_2 })];
            case 6: return [2 /*return*/];
        }
    });
}); });
router.post('/edit', [
    check('title').not().isEmpty(),
    check('body').not().isEmpty(),
], function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var errors, postId, body, title, type, inMainPage, token, decoded, userId, post, user, userPosts, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({
                            errors: errors.array(),
                            mes: 'Некорректные данные'
                        })];
                }
                postId = req.body._id;
                body = req.body.body;
                title = req.body.title;
                type = req.body.type;
                inMainPage = req.body.inMainPage;
                token = req.headers.authorization ? .split(' ')[1]
                    :
                ;
                if (!token) return [3 /*break*/, 9];
                decoded = jsonwebtoken_1.default.verify(token, config_1.default.get('jwtSecret'));
                userId = decoded.valueOf().id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 8, , 9]);
                return [4 /*yield*/, Post_1.default.findOneAndUpdate({
                        _id: postId,
                        owner: userId
                    }, {
                        title: title,
                        body: body,
                        status: req.body.status,
                        type: type,
                        inMainPage: inMainPage
                    }, {
                        new: true
                    })
                        .populate('owner', 'name')
                        .populate('img', 'path')
                        .populate('files', 'path')
                    // .exec((err, files) => {
                    //     console.log("Populated files " + files);
                    // })
                ];
            case 2:
                post = _a.sent();
                if (!post) return [3 /*break*/, 6];
                return [4 /*yield*/, User_1.default.findById(userId)];
            case 3:
                user = _a.sent();
                if (!user) return [3 /*break*/, 5];
                userPosts = user ? .posts
                    :
                ;
                userPosts ? .unshift(post._id)
                    :
                ;
                user.posts = userPosts;
                return [4 /*yield*/, user];
            case 4:
                (_a.sent()) ? .save()
                    :
                ;
                _a.label = 5;
            case 5: return [2 /*return*/, res.status(201).json({ success: true, message: "Пост обнавлен", post: post })];
            case 6: return [2 /*return*/, res.status(401).json({ success: false, message: 'Ошибка при редактировании поста' })];
            case 7: return [3 /*break*/, 9];
            case 8:
                error_3 = _a.sent();
                console.log(error_3);
                return [2 /*return*/, res.status(500).json({ success: false, message: "Ошибка при редактировании поста", error: error_3 })];
            case 9: return [2 /*return*/];
        }
    });
}); });
router.delete('/delete/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var ObjectId_1, postId, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                ObjectId_1 = mongoose_1.mongo.ObjectId;
                postId = req.params.id;
                return [4 /*yield*/, Post_1.default.findOneAndDelete({
                        _id: postId
                        // _id: new ObjectId(postId)
                    }, function (error, deletePost) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (error) {
                                        res.status(500).json({ success: false, mes: 'Ошибка', error: error });
                                    }
                                    if (!deletePost) return [3 /*break*/, 4];
                                    return [4 /*yield*/, File_1.default.findByIdAndUpdate({ _id: deletePost.img, }, { post: null })];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, File_1.default.updateMany({ post: deletePost._id }, { post: null })];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, User_1.default.findById(new ObjectId_1(deletePost.owner))
                                            .then(function (ownerOfPost) { return __awaiter(_this, void 0, void 0, function () {
                                            var posts0, posts;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        if (!ownerOfPost) return [3 /*break*/, 2];
                                                        posts0 = ownerOfPost.posts.filter(function (post) {
                                                            //console.log(post, deletePost._id);
                                                            return (post != deletePost._id);
                                                        });
                                                        console.log("posts0", posts0);
                                                        posts = ownerOfPost.posts;
                                                        //posts.remove(deletePost._id); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!
                                                        posts.filter(function (item) { return item !== deletePost._id; });
                                                        ownerOfPost.posts = posts;
                                                        console.log(ownerOfPost.posts);
                                                        return [4 /*yield*/, ownerOfPost.save()];
                                                    case 1:
                                                        _a.sent();
                                                        return [3 /*break*/, 3];
                                                    case 2:
                                                        console.log("no");
                                                        _a.label = 3;
                                                    case 3: return [2 /*return*/];
                                                }
                                            });
                                        }); })
                                            .catch(function (err) { return console.log('err', err); })
                                        // if (ownerOfPost) {
                                        //     const posts = ownerOfPost.posts.filter((post: any) =>{
                                        //        console.log(post, deletePost._id);
                                        //    return(post !== deletePost._id)})
                                        //    const d = ownerOfPost.posts.find(post => {
                                        //     console.log(post, deletePost._id);
                                        //        return(post === deletePost._id)
                                        //    })
                                        //    let posts = ownerOfPost.posts;
                                        //    posts.remove(ownerOfPost._id);
                                        //    ownerOfPost.posts = posts;
                                        //    console.log(ownerOfPost.posts);
                                        // await ownerOfPost.save()
                                        // console.log(posts);
                                        // await ownerOfPost.save()
                                        //}
                                    ];
                                case 3:
                                    _a.sent();
                                    _a.label = 4;
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })];
            case 1:
                _a.sent();
                res.status(200).json({ success: true, mes: 'удаление записи' });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                res.status(500).json({ success: false, mes: 'Ошибка', error: error_4 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var post, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Post_1.default.findById(req.params.id)
                        .populate('img', 'path')
                        .populate('owner', 'name')];
            case 1:
                post = _a.sent();
                res.status(200).json({ success: true, mes: 'получены данных о записи', post: post });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                res.status(500).json({ success: false, mes: 'Ошибка', error: error_5 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/edit/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var post, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Post_1.default.findOneAndUpdate({ _id: req.params.id }, { status: 'draft' }, { new: true })
                        .populate('img', 'path')
                        .populate('owner', 'name')
                        .populate('files', 'path')];
            case 1:
                post = _a.sent();
                res.json({ success: true, mes: 'Редактирование записи', post: post });
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                res.status(500).json({ success: false, mes: 'Ошибка', error: error_6 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
module.exports = router;
