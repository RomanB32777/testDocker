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
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
var passport_1 = __importDefault(require("passport"));
var db_1 = __importDefault(require("./db"));
// const app: Application = express()
var App = /** @class */ (function () {
    function App(IConfig) {
        this.configClass = IConfig;
        this.app = express_1.default();
    }
    App.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var startServer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.app.use(express_1.default.json());
                        this.app.use(express_1.default.urlencoded({ extended: false }));
                        this.app.use(function (req, res, next) {
                            res.header("Access-Control-Allow-Origin", req.headers.origin);
                            res.header('Access-Control-Allow-Credentials', 'true');
                            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
                            next();
                        });
                        this.app.use(cors_1.default());
                        //app.use(fileUpload());
                        this.app.use(passport_1.default.initialize());
                        this.app.use(passport_1.default.session());
                        require('./config/passport')(passport_1.default);
                        // .??
                        this.app.use(function (req, res, next) {
                            res.contentType('application/json');
                            next();
                        });
                        this.app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
                        this.app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
                        this.app.use('/api/auth', require('./routes/authRouter'));
                        this.app.use('/api/post', require('./routes/postRouter'));
                        this.app.use('/api/mail', require('./routes/mailerRouter'));
                        this.app.use('/api/file', require('./routes/fileRouter'));
                        if (process.env.NODE_ENV === 'production') {
                            this.app.use('/', express_1.default.static(path_1.default.join(__dirname, 'front', 'build'))); // подключаем статическую папку с фронтом
                            this.app.get('*', function (req, res) {
                                res.sendFile(path_1.default.resolve(__dirname, 'front', 'build', 'index.html'));
                            });
                        }
                        startServer = function () {
                            _this.app.listen(_this.configClass.port, function () {
                                console.log("\u0421\u0435\u0440\u0432\u0435\u0440 \u0441 \u0431\u0434 " + _this.configClass.mongoUri + " \u0437\u0430\u043F\u0443\u0449\u0435\u043D \u043D\u0430 \u043Fo\u0440\u0442e " + _this.configClass.port);
                            });
                        };
                        return [4 /*yield*/, db_1.default(this.configClass.mongoUri)
                                .then(startServer)
                                .catch(function (error) {
                                console.log("Ошибка, связанная с базой данных", error);
                                throw error;
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return App;
}());
exports.default = App;
