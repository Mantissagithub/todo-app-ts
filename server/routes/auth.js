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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var express_1 = require("express");
var middleware_1 = require("../middleware/");
var db_1 = require("../db");
var zod_1 = require("zod");
var signupInput = zod_1.z.object({
    username: zod_1.z.string().min(1).max(16).email(),
    password: zod_1.z.string().min(1).max(16)
});
var router = express_1.default.Router();
router.post('/signup', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var spInput, _a, username, password, user, newUser, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                spInput = signupInput.safeParse(req.body);
                if (!spInput.success) {
                    return [2 /*return*/, res.status(411).send({ message: "please give correct input." })];
                }
                _a = req.body, username = _a.username, password = _a.password;
                return [4 /*yield*/, db_1.User.findOne({ username: username })];
            case 1:
                user = _b.sent();
                if (!user) return [3 /*break*/, 2];
                res.status(403).json({ message: 'User already exists' });
                return [3 /*break*/, 4];
            case 2:
                newUser = new db_1.User({ username: username, password: password });
                return [4 /*yield*/, newUser.save()];
            case 3:
                _b.sent();
                token = jsonwebtoken_1.default.sign({ id: newUser._id }, middleware_1.SECRET, { expiresIn: '1h' });
                res.json({ message: 'User created successfully', token: token });
                _b.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, user, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                return [4 /*yield*/, db_1.User.findOne({ username: username, password: password })];
            case 1:
                user = _b.sent();
                if (user) {
                    token = jsonwebtoken_1.default.sign({ id: user._id }, middleware_1.SECRET, { expiresIn: '1h' });
                    res.json({ message: 'Logged in successfully', token: token });
                }
                else {
                    res.status(403).json({ message: 'Invalid username or password' });
                }
                return [2 /*return*/];
        }
    });
}); });
router.get('/me', middleware_1.authenticateJwt, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.headers["userId"];
                return [4 /*yield*/, db_1.User.findOne({ _id: userId })];
            case 1:
                user = _a.sent();
                if (user) {
                    res.json({ username: user.username });
                }
                else {
                    res.status(403).json({ message: 'User not logged in' });
                }
                return [2 /*return*/];
        }
    });
}); });
exports.default = router;
