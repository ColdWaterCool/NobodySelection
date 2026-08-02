"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var user_entity_1 = require("../user/entities/user.entity");
var AuthService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AuthService = _classThis = /** @class */ (function () {
        function AuthService_1(jwtService, configService, userService) {
            this.jwtService = jwtService;
            this.configService = configService;
            this.userService = userService;
            // 模拟短信验证码存储（生产环境应使用Redis）
            this.smsCodes = new Map();
        }
        // 发送短信验证码（模拟实现）
        AuthService_1.prototype.sendSmsCode = function (phone) {
            return __awaiter(this, void 0, void 0, function () {
                var code, expires;
                return __generator(this, function (_a) {
                    code = Math.random().toString().slice(2, 8);
                    expires = new Date();
                    expires.setMinutes(expires.getMinutes() + 5);
                    this.smsCodes.set(phone, { code: code, expires: expires });
                    console.log("[SMS] \u5411 ".concat(phone, " \u53D1\u9001\u9A8C\u8BC1\u7801: ").concat(code));
                    return [2 /*return*/];
                });
            });
        };
        // 验证短信验证码
        AuthService_1.prototype.verifySmsCode = function (phone, code) {
            var smsRecord = this.smsCodes.get(phone);
            if (!smsRecord) {
                throw new common_1.BadRequestException('请先发送验证码');
            }
            if (new Date() > smsRecord.expires) {
                this.smsCodes.delete(phone);
                throw new common_1.BadRequestException('验证码已过期');
            }
            if (smsRecord.code !== code) {
                throw new common_1.BadRequestException('验证码错误');
            }
            this.smsCodes.delete(phone);
            return true;
        };
        // 短信验证码登录/注册
        AuthService_1.prototype.smsLogin = function (smsLoginDto, ip) {
            return __awaiter(this, void 0, void 0, function () {
                var phone, code, role, user, tokens;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            phone = smsLoginDto.phone, code = smsLoginDto.code, role = smsLoginDto.role;
                            this.verifySmsCode(phone, code);
                            return [4 /*yield*/, this.userService.findByPhone(phone)];
                        case 1:
                            user = _a.sent();
                            if (!!user) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.userService.create({
                                    phone: phone,
                                    role: role || user_entity_1.UserRole.STUDENT,
                                    nickname: "\u7528\u6237".concat(phone.slice(-4)),
                                })];
                        case 2:
                            user = _a.sent();
                            _a.label = 3;
                        case 3:
                            this.checkUserStatus(user);
                            return [4 /*yield*/, this.userService.updateLastLogin(user.id, ip || 'unknown')];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, this.generateTokens(user)];
                        case 5:
                            tokens = _a.sent();
                            return [2 /*return*/, { user: user, tokens: tokens }];
                    }
                });
            });
        };
        // 密码登录
        AuthService_1.prototype.passwordLogin = function (passwordLoginDto, ip) {
            return __awaiter(this, void 0, void 0, function () {
                var phone, password, user, isPasswordValid, tokens;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            phone = passwordLoginDto.phone, password = passwordLoginDto.password;
                            return [4 /*yield*/, this.userService.findByPhone(phone)];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.UnauthorizedException('手机号或密码错误');
                            }
                            this.checkUserStatus(user);
                            return [4 /*yield*/, this.userService.validatePassword(user, password)];
                        case 2:
                            isPasswordValid = _a.sent();
                            if (!isPasswordValid) {
                                throw new common_1.UnauthorizedException('手机号或密码错误');
                            }
                            return [4 /*yield*/, this.userService.updateLastLogin(user.id, ip || 'unknown')];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.generateTokens(user)];
                        case 4:
                            tokens = _a.sent();
                            return [2 /*return*/, { user: user, tokens: tokens }];
                    }
                });
            });
        };
        // 获取微信授权URL
        AuthService_1.prototype.getWechatAuthUrl = function (state) {
            var appId = this.configService.get('WECHAT_APP_ID', 'wx_demo_app_id');
            var redirectUri = encodeURIComponent(this.configService.get('WECHAT_REDIRECT_URI', 'http://localhost:3000/api/auth/wechat/callback'));
            var stateParam = state || 'default';
            return "https://open.weixin.qq.com/connect/qrconnect?appid=".concat(appId, "&redirect_uri=").concat(redirectUri, "&response_type=code&scope=snsapi_login&state=").concat(stateParam, "#wechat_redirect");
        };
        // 微信回调处理
        AuthService_1.prototype.wechatCallback = function (code, ip) {
            return __awaiter(this, void 0, void 0, function () {
                var wechatUserInfo, user, tokens;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!code) {
                                throw new common_1.BadRequestException('缺少微信授权码');
                            }
                            return [4 /*yield*/, this.getWechatUserInfo(code)];
                        case 1:
                            wechatUserInfo = _a.sent();
                            return [4 /*yield*/, this.userService.createOrUpdateByWechat({
                                    openid: wechatUserInfo.openid,
                                    unionid: wechatUserInfo.unionid,
                                    nickname: wechatUserInfo.nickname,
                                    avatar: wechatUserInfo.avatar,
                                })];
                        case 2:
                            user = _a.sent();
                            this.checkUserStatus(user);
                            return [4 /*yield*/, this.userService.updateLastLogin(user.id, ip || 'unknown')];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.generateTokens(user)];
                        case 4:
                            tokens = _a.sent();
                            return [2 /*return*/, { user: user, tokens: tokens }];
                    }
                });
            });
        };
        // 模拟获取微信用户信息
        AuthService_1.prototype.getWechatUserInfo = function (code) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, {
                            openid: "wx_".concat(code, "_").concat(Date.now()),
                            unionid: "union_".concat(code),
                            nickname: '微信用户',
                            avatar: null,
                        }];
                });
            });
        };
        // 刷新Token
        AuthService_1.prototype.refreshToken = function (refreshToken) {
            return __awaiter(this, void 0, void 0, function () {
                var payload, user, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            payload = this.jwtService.verify(refreshToken, {
                                secret: this.configService.get('JWT_SECRET', 'default_secret'),
                            });
                            return [4 /*yield*/, this.userService.findById(payload.sub)];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.UnauthorizedException('用户不存在');
                            }
                            this.checkUserStatus(user);
                            if (user.token_version !== payload.tokenVersion) {
                                throw new common_1.UnauthorizedException('Token已失效，请重新登录');
                            }
                            return [2 /*return*/, this.generateTokens(user)];
                        case 2:
                            error_1 = _a.sent();
                            if (error_1 instanceof common_1.UnauthorizedException) {
                                throw error_1;
                            }
                            throw new common_1.UnauthorizedException('无效的刷新令牌');
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        // 退出登录
        AuthService_1.prototype.logout = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userService.incrementTokenVersion(userId)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        // 获取当前用户信息
        AuthService_1.prototype.getCurrentUser = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var user, password, wechat_openid, wechat_unionid, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userService.findById(userId)];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.UnauthorizedException('用户不存在');
                            }
                            password = user.password, wechat_openid = user.wechat_openid, wechat_unionid = user.wechat_unionid, result = __rest(user, ["password", "wechat_openid", "wechat_unionid"]);
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        // 生成JWT Token
        AuthService_1.prototype.generateTokens = function (user) {
            return __awaiter(this, void 0, void 0, function () {
                var payload, payloadWithVersion, accessTokenExpiresIn, refreshTokenExpiresIn, _a, accessToken, refreshToken, expiresIn;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            payload = {
                                sub: user.id,
                                phone: user.phone,
                                role: user.role,
                            };
                            payloadWithVersion = __assign(__assign({}, payload), { tokenVersion: user.token_version });
                            accessTokenExpiresIn = this.configService.get('JWT_EXPIRES_IN', '2h');
                            refreshTokenExpiresIn = '7d';
                            return [4 /*yield*/, Promise.all([
                                    this.jwtService.signAsync(payloadWithVersion, { expiresIn: accessTokenExpiresIn }),
                                    this.jwtService.signAsync(payloadWithVersion, { expiresIn: refreshTokenExpiresIn }),
                                ])];
                        case 1:
                            _a = _b.sent(), accessToken = _a[0], refreshToken = _a[1];
                            expiresIn = this.parseExpiresIn(accessTokenExpiresIn);
                            return [2 /*return*/, {
                                    accessToken: accessToken,
                                    refreshToken: refreshToken,
                                    expiresIn: expiresIn,
                                }];
                    }
                });
            });
        };
        // 解析过期时间字符串为秒数
        AuthService_1.prototype.parseExpiresIn = function (expiresIn) {
            var match = expiresIn.match(/^(\d+)([smhd])$/);
            if (!match)
                return 7200;
            var value = parseInt(match[1]);
            var unit = match[2];
            switch (unit) {
                case 's': return value;
                case 'm': return value * 60;
                case 'h': return value * 3600;
                case 'd': return value * 86400;
                default: return 7200;
            }
        };
        // 检查用户状态
        AuthService_1.prototype.checkUserStatus = function (user) {
            if (user.status === user_entity_1.UserStatus.BANNED) {
                throw new common_1.ForbiddenException('账号已被封禁');
            }
            if (user.status === user_entity_1.UserStatus.INACTIVE) {
                throw new common_1.ForbiddenException('账号未激活');
            }
        };
        // 开发模式登录（跳过验证码和密码校验）
        AuthService_1.prototype.devLogin = function (devLoginDto, ip) {
            return __awaiter(this, void 0, void 0, function () {
                var phone, role, user, tokens;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            phone = devLoginDto.phone, role = devLoginDto.role;
                            return [4 /*yield*/, this.userService.findByPhone(phone)];
                        case 1:
                            user = _a.sent();
                            if (!!user) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.userService.create({
                                    phone: phone,
                                    role: role,
                                    nickname: "\u5F00\u53D1".concat(role).concat(phone.slice(-4)),
                                    password: 'dev_password_123', // 固定密码
                                })];
                        case 2:
                            // 创建新用户
                            user = _a.sent();
                            _a.label = 3;
                        case 3: 
                        // 更新最后登录信息
                        return [4 /*yield*/, this.userService.updateLastLogin(user.id, ip || 'unknown')];
                        case 4:
                            // 更新最后登录信息
                            _a.sent();
                            return [4 /*yield*/, this.generateTokens(user)];
                        case 5:
                            tokens = _a.sent();
                            return [2 /*return*/, {
                                    user: user,
                                    tokens: tokens,
                                    id: user.id,
                                    role: user.role,
                                    nickname: user.nickname
                                }];
                    }
                });
            });
        };
        return AuthService_1;
    }());
    __setFunctionName(_classThis, "AuthService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthService = _classThis;
}();
exports.AuthService = AuthService;
