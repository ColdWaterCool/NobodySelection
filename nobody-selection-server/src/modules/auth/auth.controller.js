"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = exports.AuthService = exports.JwtAuthGuard = exports.AuthModule = void 0;
var vite_1 = require("vite");
var plugin_vue_1 = require("@vitejs/plugin-vue");
var path_1 = require("path");
exports.default = (0, vite_1.defineConfig)({
    plugins: [(0, plugin_vue_1.default)()],
    resolve: {
        alias: {
            '@': (0, path_1.resolve)(__dirname, 'src')
        }
    },
    server: {
        port: 5173,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                rewrite: function (path) { return path.replace(/^\/api/, '/api'); }
            }
        }
    }
}) < div;
var default_1 = /** @class */ (function () {
    function default_1() {
    }
    return default_1;
}());
"dev-buttons" >
    ();
"quickLogin('student')";
var default_2 = /** @class */ (function () {
    function default_2() {
    }
    return default_2;
}());
"dev-btn student";
disabled = "devLoginLoading.student"
    >
        /** @class */ (function () {
            function class_1() {
            }
            return class_1;
        }());
"dev-icon" >  & ;
/span>
    < span > {};
{
    devLoginLoading.student ? '登录中...' : '学生端';
}
/span>
    < /button>
    < button;
"quickLogin('parent')";
var default_3 = /** @class */ (function () {
    function default_3() {
    }
    return default_3;
}());
"dev-btn parent";
disabled = "devLoginLoading.parent"
    >
        /** @class */ (function () {
            function class_2() {
            }
            return class_2;
        }());
"dev-icon" >  & ;
 & ;
 & ;
 & ;
 & ;
/span>
    < span > {};
{
    devLoginLoading.parent ? '登录中...' : '家长端';
}
/span>
    < /button>
    < button;
"quickLogin('teacher')";
var default_4 = /** @class */ (function () {
    function default_4() {
    }
    return default_4;
}());
"dev-btn teacher";
disabled = "devLoginLoading.teacher"
    >
        /** @class */ (function () {
            function class_3() {
            }
            return class_3;
        }());
"dev-icon" >  & ;
 & ;
 & ;
/span>
    < span > {};
{
    devLoginLoading.teacher ? '登录中...' : '教师端';
}
/span>
    < /button>
    < button;
"quickLogin('admin')";
var default_5 = /** @class */ (function () {
    function default_5() {
    }
    return default_5;
}());
"dev-btn admin";
disabled = "devLoginLoading.admin"
    >
        /** @class */ (function () {
            function class_4() {
            }
            return class_4;
        }());
"dev-icon" >  & ;
 & ;
/span>
    < span > {};
{
    devLoginLoading.admin ? '登录中...' : '管理员';
}
/span>
    < /button>
    < /div><script setup lang="ts">;
var vue_1 = require("vue");
var vue_router_1 = require("vue-router");
var vant_1 = require("vant");
var axios_1 = require("axios");
var router = (0, vue_router_1.useRouter)();
var phone = (0, vue_1.ref)('');
var code = (0, vue_1.ref)('');
var loading = (0, vue_1.ref)(false);
var countdown = (0, vue_1.ref)(0);
var devLoginLoading = (0, vue_1.ref)({
    student: false,
    parent: false,
    teacher: false,
    admin: false
});
var timer = null;
function sendCode() {
    if (!phone.value || phone.value.length !== 11) {
        (0, vant_1.showToast)('请输入正确的手机号');
        return;
    }
    (0, vant_1.showToast)('验证码功能需要启动后端服务');
}
function handleLogin() {
    if (!phone.value || !code.value) {
        (0, vant_1.showToast)('请填写完整信息');
        return;
    }
    (0, vant_1.showToast)('登录功能需要启动后端服务，请使用开发者快速入口');
}
function quickLogin(role) {
    return __awaiter(this, void 0, void 0, function () {
        var phoneMap, response, _a, tokens, id, userRole, nickname, routes_1, error_1;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    // 设置加载状态
                    devLoginLoading.value[role] = true;
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, 4, 5]);
                    phoneMap = {
                        student: '13800000001',
                        parent: '13800000002',
                        teacher: '13800000003',
                        admin: '13800000004'
                    };
                    return [4 /*yield*/, axios_1.default.post('/api/auth/dev-login', {
                            phone: phoneMap[role],
                            role: role
                        })];
                case 2:
                    response = _d.sent();
                    _a = response.data, tokens = _a.tokens, id = _a.id, userRole = _a.role, nickname = _a.nickname;
                    // 保存token和用户信息
                    localStorage.setItem('token', tokens.accessToken);
                    localStorage.setItem('refreshToken', tokens.refreshToken);
                    localStorage.setItem('userRole', userRole);
                    localStorage.setItem('userInfo', JSON.stringify({
                        id: id,
                        phone: phoneMap[role],
                        nickname: nickname,
                        avatar: '',
                        role: userRole,
                        status: 1
                    }));
                    (0, vant_1.showToast)('已登录为：' + nickname);
                    routes_1 = {
                        student: '/student',
                        parent: '/parent',
                        teacher: '/teacher',
                        admin: '/admin'
                    };
                    setTimeout(function () {
                        router.push(routes_1[role] || '/');
                    }, 500);
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _d.sent();
                    console.error('开发登录失败:', error_1);
                    (0, vant_1.showToast)(((_c = (_b = error_1.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || '开发登录失败，请确保后端服务已启动');
                    return [3 /*break*/, 5];
                case 4:
                    devLoginLoading.value[role] = false;
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
/script>import { Module } from '@nestjs/common;
';;
var typeorm_1 = require("@nestjs/typeorm");
var jwt_1 = require("@nestjs/jwt");
var passport_1 = require("@nestjs/passport");
var config_1 = require("@nestjs/config");
var auth_service_1 = require("./auth.service");
Object.defineProperty(exports, "AuthService", { enumerable: true, get: function () { return auth_service_1.AuthService; } });
var auth_controller_1 = require("./auth.controller");
Object.defineProperty(exports, "AuthController", { enumerable: true, get: function () { return auth_controller_1.AuthController; } });
var user_module_1 = require("../user/user.module");
var jwt_strategy_1 = require("./strategies/jwt.strategy");
var user_entity_1 = require("../user/entities/user.entity");
var AuthModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
                user_module_1.UserModule,
                passport_1.PassportModule,
                jwt_1.JwtModule.registerAsync({
                    imports: [config_1.ConfigModule],
                    useFactory: function (configService) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, ({
                                    secret: configService.get('JWT_SECRET', 'default_secret'),
                                    signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN', '2h') },
                                })];
                        });
                    }); },
                    inject: [config_1.ConfigService],
                }),
            ],
            controllers: [auth_controller_1.AuthController],
            providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy],
            exports: [auth_service_1.AuthService],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AuthModule = _classThis = /** @class */ (function () {
        function AuthModule_1() {
        }
        return AuthModule_1;
    }());
    __setFunctionName(_classThis, "AuthModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthModule = _classThis;
}();
exports.AuthModule = AuthModule;
var common_1 = require("@nestjs/common");
var AuthModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
                user_module_1.UserModule,
                passport_1.PassportModule,
                jwt_1.JwtModule.registerAsync({
                    imports: [config_1.ConfigModule],
                    useFactory: function (configService) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, ({
                                    secret: configService.get('JWT_SECRET', 'default_secret'),
                                    signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN', '2h') },
                                })];
                        });
                    }); },
                    inject: [config_1.ConfigService],
                }),
            ],
            controllers: [auth_controller_1.AuthController],
            providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy],
            exports: [auth_service_1.AuthService],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AuthModule = _classThis = /** @class */ (function () {
        function AuthModule_2() {
        }
        return AuthModule_2;
    }());
    __setFunctionName(_classThis, "AuthModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthModule = _classThis;
}();
exports.AuthModule = AuthModule;
var common_2 = require("@nestjs/common");
var passport_2 = require("@nestjs/passport");
var JwtAuthGuard = function () {
    var _classDecorators = [(0, common_2.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = (0, passport_2.AuthGuard)('jwt');
    var JwtAuthGuard = _classThis = /** @class */ (function (_super) {
        __extends(JwtAuthGuard_1, _super);
        function JwtAuthGuard_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        JwtAuthGuard_1.prototype.canActivate = function (context) {
            return _super.prototype.canActivate.call(this, context);
        };
        return JwtAuthGuard_1;
    }(_classSuper));
    __setFunctionName(_classThis, "JwtAuthGuard");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        JwtAuthGuard = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return JwtAuthGuard = _classThis;
}();
exports.JwtAuthGuard = JwtAuthGuard;
var common_3 = require("@nestjs/common");
var AuthService = function () {
    var _classDecorators = [(0, common_2.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AuthService = _classThis = /** @class */ (function () {
        function AuthService_1() {
        }
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
var jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
Object.defineProperty(exports, "JwtAuthGuard", { enumerable: true, get: function () { return jwt_auth_guard_1.JwtAuthGuard; } });
var swagger_1 = require("@nestjs/swagger");
var AuthController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('认证模块'), Controller('auth')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _sendSms_decorators;
    var _smsLogin_decorators;
    var _passwordLogin_decorators;
    var _getWechatAuthUrl_decorators;
    var _wechatCallback_decorators;
    var _refreshToken_decorators;
    var _logout_decorators;
    var _getCurrentUser_decorators;
    var _devLogin_decorators;
    var AuthController = _classThis = /** @class */ (function () {
        function AuthController_1(authService, configService) {
            this.authService = (__runInitializers(this, _instanceExtraInitializers), authService);
            this.configService = configService;
        }
        AuthController_1.prototype.sendSms = function (phone) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.authService.sendSmsCode(phone)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { message: '验证码发送成功' }];
                    }
                });
            });
        };
        AuthController_1.prototype.smsLogin = function (smsLoginDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                var ip;
                return __generator(this, function (_a) {
                    ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';
                    return [2 /*return*/, this.authService.smsLogin(smsLoginDto, ip)];
                });
            });
        };
        AuthController_1.prototype.passwordLogin = function (passwordLoginDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                var ip;
                return __generator(this, function (_a) {
                    ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';
                    return [2 /*return*/, this.authService.passwordLogin(passwordLoginDto, ip)];
                });
            });
        };
        AuthController_1.prototype.getWechatAuthUrl = function (req) {
            var state = req.query.state;
            return { url: this.authService.getWechatAuthUrl(state) };
        };
        AuthController_1.prototype.wechatCallback = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                var code, ip;
                return __generator(this, function (_a) {
                    code = req.query.code;
                    ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';
                    return [2 /*return*/, this.authService.wechatCallback(code, ip)];
                });
            });
        };
        AuthController_1.prototype.refreshToken = function (refreshToken) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.authService.refreshToken(refreshToken)];
                });
            });
        };
        AuthController_1.prototype.logout = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.authService.logout(req.user.id)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { message: '退出成功' }];
                    }
                });
            });
        };
        AuthController_1.prototype.getCurrentUser = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.authService.getCurrentUser(req.user.id)];
                });
            });
        };
        AuthController_1.prototype.devLogin = function (devLoginDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                var nodeEnv, ip;
                return __generator(this, function (_a) {
                    nodeEnv = this.configService.get('NODE_ENV', 'development');
                    if (nodeEnv === 'production') {
                        throw new common_3.ForbiddenException('生产环境不允许使用开发登录');
                    }
                    ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';
                    return [2 /*return*/, this.authService.devLogin(devLoginDto, ip)];
                });
            });
        };
        return AuthController_1;
    }());
    __setFunctionName(_classThis, "AuthController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _sendSms_decorators = [Post('send-sms'), (0, swagger_1.ApiOperation)({ summary: '发送短信验证码' })];
        _smsLogin_decorators = [Post('sms-login'), (0, swagger_1.ApiOperation)({ summary: '短信验证码登录/注册' })];
        _passwordLogin_decorators = [Post('password-login'), (0, swagger_1.ApiOperation)({ summary: '密码登录' })];
        _getWechatAuthUrl_decorators = [Get('wechat'), (0, swagger_1.ApiOperation)({ summary: '获取微信授权URL' })];
        _wechatCallback_decorators = [Get('wechat/callback'), (0, swagger_1.ApiOperation)({ summary: '微信回调处理' })];
        _refreshToken_decorators = [Post('refresh'), (0, swagger_1.ApiOperation)({ summary: '刷新Token' })];
        _logout_decorators = [Post('logout'), UseGuards(jwt_auth_guard_1.JwtAuthGuard), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: '退出登录' })];
        _getCurrentUser_decorators = [Get('me'), UseGuards(jwt_auth_guard_1.JwtAuthGuard), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: '获取当前用户信息' })];
        _devLogin_decorators = [Post('dev-login'), (0, swagger_1.ApiOperation)({ summary: '开发者快速登录（仅开发环境）' })];
        __esDecorate(_classThis, null, _sendSms_decorators, { kind: "method", name: "sendSms", static: false, private: false, access: { has: function (obj) { return "sendSms" in obj; }, get: function (obj) { return obj.sendSms; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _smsLogin_decorators, { kind: "method", name: "smsLogin", static: false, private: false, access: { has: function (obj) { return "smsLogin" in obj; }, get: function (obj) { return obj.smsLogin; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _passwordLogin_decorators, { kind: "method", name: "passwordLogin", static: false, private: false, access: { has: function (obj) { return "passwordLogin" in obj; }, get: function (obj) { return obj.passwordLogin; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getWechatAuthUrl_decorators, { kind: "method", name: "getWechatAuthUrl", static: false, private: false, access: { has: function (obj) { return "getWechatAuthUrl" in obj; }, get: function (obj) { return obj.getWechatAuthUrl; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _wechatCallback_decorators, { kind: "method", name: "wechatCallback", static: false, private: false, access: { has: function (obj) { return "wechatCallback" in obj; }, get: function (obj) { return obj.wechatCallback; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _refreshToken_decorators, { kind: "method", name: "refreshToken", static: false, private: false, access: { has: function (obj) { return "refreshToken" in obj; }, get: function (obj) { return obj.refreshToken; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _logout_decorators, { kind: "method", name: "logout", static: false, private: false, access: { has: function (obj) { return "logout" in obj; }, get: function (obj) { return obj.logout; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getCurrentUser_decorators, { kind: "method", name: "getCurrentUser", static: false, private: false, access: { has: function (obj) { return "getCurrentUser" in obj; }, get: function (obj) { return obj.getCurrentUser; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _devLogin_decorators, { kind: "method", name: "devLogin", static: false, private: false, access: { has: function (obj) { return "devLogin" in obj; }, get: function (obj) { return obj.devLogin; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthController = _classThis;
}();
exports.AuthController = AuthController;
