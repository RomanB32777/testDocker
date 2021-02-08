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
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = __importDefault(require("../models/User"));
var config_1 = __importDefault(require("config"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
module.exports = function (passport) {
    var _this = this;
    var JwtStrategy = require('passport-jwt').Strategy, ExtractJwt = require('passport-jwt').ExtractJwt, LocalStrategy = require('passport-local').Strategy;
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config_1.default.get('jwtSecret'),
    };
    // const userDB = {
    //     id: 136345,
    //     email: 'test@mail.ru',
    //     password: '123',
    //   };
    //   passport.serializeUser(function(user, done) {
    //     console.log('Сериализация: ', user);
    //     done(null, user.id);
    //   });
    //   passport.deserializeUser(function(id, done) {
    //     console.log('Десериализация: ', id);
    //     const user = userDB.id === id ? userDB : false;
    //     done(null, user);
    //   });
    //   passport.use(
    //     new LocalStrategy({ usernameField: 'email' }, function(
    //         email: string, password: string, done: any
    //     ) {
    //       if (email === userDB.email && password === userDB.password) {
    //         return done(null, userDB);
    //       } else {
    //         return done(null, false);
    //       }
    //     })
    //   );
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function (email, password, done) { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, User_1.default.findOne({ email: email }).populate('posts').populate('avatar', 'path')
                        .then(function (user) { return __awaiter(_this, void 0, void 0, function () {
                        var isMatch;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!user) {
                                        return [2 /*return*/, done(null, false, { errors: { 'email or password': 'is invalid' } })];
                                    }
                                    return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
                                case 1:
                                    isMatch = _a.sent();
                                    if (!isMatch) {
                                        return [2 /*return*/, done(null, false, { errors: { 'email or password': 'is invalid' } })];
                                    }
                                    return [2 /*return*/, done(null, user)];
                            }
                        });
                    }); }).catch(done)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }));
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        User_1.default.findOne({ _id: jwt_payload.id }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
                // or you could create a new account
            }
        })
            .populate('posts')
            .populate('avatar', 'path');
    }));
};
