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
var passport_1 = __importDefault(require("passport"));
var config_1 = __importDefault(require("config"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var User_1 = __importDefault(require("../models/User"));
var _a = require('express-validator'), check = _a.check, validationResult = _a.validationResult;
// import redis = require('redis');
// const JWTR =  require('jwt-redis').default;
// //ES6 import JWTR from 'jwt-redis'
// const redisClient = redis.createClient();
// const jwtr = new JWTR(redisClient);
var Router = require('express').Router;
var router = Router();
router.post('/register', [
    check('email', 'Некорректная почта').isEmail(),
    check('password', 'Некорректный пароль - мин 6 символов').isLength({ min: 6 }),
], function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var errors, email_1, password_1, can, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({
                            errors: errors.array(),
                            mes: 'Некорректные данные'
                        })];
                } // если есть ошибка
                email_1 = req.body.email;
                password_1 = req.body.password;
                return [4 /*yield*/, User_1.default.findOne({ email: email_1 })];
            case 1:
                can = _a.sent();
                if (can) {
                    return [2 /*return*/, res.status(401).json({ success: false, messsage: 'такой уже есть' })];
                }
                bcryptjs_1.default.genSalt(10, function (err, salt) { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, bcryptjs_1.default.hash(password_1, salt, function (err, hash) { return __awaiter(_this, void 0, void 0, function () {
                                    var user;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                if (err)
                                                    throw err;
                                                user = new User_1.default({
                                                    email: email_1,
                                                    password: hash,
                                                });
                                                return [4 /*yield*/, user.save()];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/, res.status(201).json({ success: true, mes: 'Пользователь создан' })];
                                        }
                                    });
                                }); })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }); // 10 - количество символов в хешированном пароле
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(500).json({ success: false, mes: 'Ошибка' })];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post('/login', [
    check('email', 'Некорректная почта').isEmail(),
    check('password', 'Некорректный пароль - мин 6 символов').isLength({ min: 6 }),
], function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var errors;
    return __generator(this, function (_a) {
        errors = validationResult(req);
        if (!errors.isEmpty()) {
            return [2 /*return*/, res.status(400).json({
                    errors: errors.array(),
                    mes: 'Некорректные данные'
                })];
        }
        // const email: string = req.body.email
        // const password: string = req.body.password
        // const user: IUser | null = await User.findOne({ email })
        // console.log("Body user:", user);
        // if (!user) {
        //     return res.status(400).json({ success: false, message: 'Пользователь не найден' })
        // }
        // const isMatch: boolean = await bcrypt.compare(password, user.password)
        // // await bcrypt.compare(password, user.password, (err: Error, isMatch: boolean) => {
        // //     if (err) throw err
        // //     callback(null, isMatch)
        // // })
        // if (isMatch) {
        passport_1.default.authenticate('local', { session: false }, function (err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json({ success: false, mes: 'Пользователь не найден. Укажите правильный email или пароль!' });
            }
            req.login(user, { session: false }, function (err) {
                if (err) {
                    return res.status(401).json({ success: false, err: err });
                }
                var token = jsonwebtoken_1.default.sign({ id: user._id }, config_1.default.get('jwtSecret'), {
                    expiresIn: '1d'
                });
                user.isAuthenticated = true;
                user.save();
                return res.status(200).json({
                    success: true,
                    mes: 'Добро пожаловать',
                    user: {
                        id: user._id,
                        token: token,
                        status: user.status,
                        name: user.name,
                        email: user.email,
                        isAuthenticated: user.isAuthenticated,
                        posts: user.status === 'admin' && user.posts,
                        avatar: user.avatar
                    }
                });
            });
        })(req, res, next);
        return [2 /*return*/];
    });
}); });
// function mustAuthenticated(req: Request, res: Response, next: NextFunction) {
//     if (!req.isAuthenticated()) {
//       console.log("WWWWWWWW");
//       return res.status(200).send({});
//     }
//     next();
//   }
router.get('/logout', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var token, decoded;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.headers.authorization ? .split(' ')[1]
                    :
                ;
                if (!token) return [3 /*break*/, 2];
                decoded = jsonwebtoken_1.default.verify(token, config_1.default.get('jwtSecret'));
                return [4 /*yield*/, User_1.default.findByIdAndUpdate(decoded.id, { isAuthenticated: false })];
            case 1:
                _a.sent();
                req.logOut();
                res.json({ success: true, mes: 'Вы вышли из аккаунта' });
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); });
router.get('/dashboard', function (req, res, next) {
    passport_1.default.authenticate('jwt', { session: false }, function (err, user, info) {
        if (err)
            return next(err);
        if (!user && info)
            return res.json(info);
        res.json({ success: true, user: {
                id: user._id,
                status: user.status,
                name: user.name,
                email: user.email,
                isAuthenticated: user.isAuthenticated,
                posts: user.status === 'admin' && user.posts,
                avatar: user.avatar
            }
        });
    })(req, res, next);
});
router.get('/admin', function (req, res, next) {
    passport_1.default.authenticate('jwt', { session: false }, function (err, admin, info) { return __awaiter(_this, void 0, void 0, function () {
        var users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (err)
                        return [2 /*return*/, next(err)];
                    if (!admin && info)
                        return [2 /*return*/, res.json(info)];
                    if (admin && admin.status !== 'admin') {
                        // const error = new Error('No admin');
                        return [2 /*return*/, res.json({ success: false, mes: 'Доступ открыт только для администратора' })];
                    }
                    return [4 /*yield*/, User_1.default.find()];
                case 1:
                    users = _a.sent();
                    res.json({ admin: admin, users: users });
                    return [2 /*return*/];
            }
        });
    }); })(req, res, next);
});
module.exports = router;
