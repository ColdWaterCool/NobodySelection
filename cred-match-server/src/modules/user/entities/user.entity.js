"use strict";
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserStatus = exports.UserRole = void 0;
var typeorm_1 = require("typeorm");
var UserRole;
(function (UserRole) {
    UserRole["STUDENT"] = "student";
    UserRole["PARENT"] = "parent";
    UserRole["TEACHER"] = "teacher";
    UserRole["ADMIN"] = "admin";
    UserRole["OPERATOR"] = "operator";
})(UserRole || (exports.UserRole = UserRole = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus["ACTIVE"] = "active";
    UserStatus["INACTIVE"] = "inactive";
    UserStatus["BANNED"] = "banned";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
var User = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('users')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _phone_decorators;
    var _phone_initializers = [];
    var _phone_extraInitializers = [];
    var _password_decorators;
    var _password_initializers = [];
    var _password_extraInitializers = [];
    var _nickname_decorators;
    var _nickname_initializers = [];
    var _nickname_extraInitializers = [];
    var _avatar_decorators;
    var _avatar_initializers = [];
    var _avatar_extraInitializers = [];
    var _role_decorators;
    var _role_initializers = [];
    var _role_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _wechat_openid_decorators;
    var _wechat_openid_initializers = [];
    var _wechat_openid_extraInitializers = [];
    var _wechat_unionid_decorators;
    var _wechat_unionid_initializers = [];
    var _wechat_unionid_extraInitializers = [];
    var _real_name_decorators;
    var _real_name_initializers = [];
    var _real_name_extraInitializers = [];
    var _id_card_decorators;
    var _id_card_initializers = [];
    var _id_card_extraInitializers = [];
    var _gender_decorators;
    var _gender_initializers = [];
    var _gender_extraInitializers = [];
    var _birthday_decorators;
    var _birthday_initializers = [];
    var _birthday_extraInitializers = [];
    var _address_decorators;
    var _address_initializers = [];
    var _address_extraInitializers = [];
    var _school_decorators;
    var _school_initializers = [];
    var _school_extraInitializers = [];
    var _grade_decorators;
    var _grade_initializers = [];
    var _grade_extraInitializers = [];
    var _class_name_decorators;
    var _class_name_initializers = [];
    var _class_name_extraInitializers = [];
    var _last_login_at_decorators;
    var _last_login_at_initializers = [];
    var _last_login_at_extraInitializers = [];
    var _last_login_ip_decorators;
    var _last_login_ip_initializers = [];
    var _last_login_ip_extraInitializers = [];
    var _token_version_decorators;
    var _token_version_initializers = [];
    var _token_version_extraInitializers = [];
    var _created_at_decorators;
    var _created_at_initializers = [];
    var _created_at_extraInitializers = [];
    var _updated_at_decorators;
    var _updated_at_initializers = [];
    var _updated_at_extraInitializers = [];
    var User = _classThis = /** @class */ (function () {
        function User_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.phone = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _phone_initializers, void 0));
            this.password = (__runInitializers(this, _phone_extraInitializers), __runInitializers(this, _password_initializers, void 0));
            this.nickname = (__runInitializers(this, _password_extraInitializers), __runInitializers(this, _nickname_initializers, void 0));
            this.avatar = (__runInitializers(this, _nickname_extraInitializers), __runInitializers(this, _avatar_initializers, void 0));
            this.role = (__runInitializers(this, _avatar_extraInitializers), __runInitializers(this, _role_initializers, void 0));
            this.status = (__runInitializers(this, _role_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.wechat_openid = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _wechat_openid_initializers, void 0));
            this.wechat_unionid = (__runInitializers(this, _wechat_openid_extraInitializers), __runInitializers(this, _wechat_unionid_initializers, void 0));
            this.real_name = (__runInitializers(this, _wechat_unionid_extraInitializers), __runInitializers(this, _real_name_initializers, void 0));
            this.id_card = (__runInitializers(this, _real_name_extraInitializers), __runInitializers(this, _id_card_initializers, void 0));
            this.gender = (__runInitializers(this, _id_card_extraInitializers), __runInitializers(this, _gender_initializers, void 0));
            this.birthday = (__runInitializers(this, _gender_extraInitializers), __runInitializers(this, _birthday_initializers, void 0));
            this.address = (__runInitializers(this, _birthday_extraInitializers), __runInitializers(this, _address_initializers, void 0));
            this.school = (__runInitializers(this, _address_extraInitializers), __runInitializers(this, _school_initializers, void 0));
            this.grade = (__runInitializers(this, _school_extraInitializers), __runInitializers(this, _grade_initializers, void 0));
            this.class_name = (__runInitializers(this, _grade_extraInitializers), __runInitializers(this, _class_name_initializers, void 0));
            this.last_login_at = (__runInitializers(this, _class_name_extraInitializers), __runInitializers(this, _last_login_at_initializers, void 0));
            this.last_login_ip = (__runInitializers(this, _last_login_at_extraInitializers), __runInitializers(this, _last_login_ip_initializers, void 0));
            this.token_version = (__runInitializers(this, _last_login_ip_extraInitializers), __runInitializers(this, _token_version_initializers, void 0));
            this.created_at = (__runInitializers(this, _token_version_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
            this.updated_at = (__runInitializers(this, _created_at_extraInitializers), __runInitializers(this, _updated_at_initializers, void 0));
            // 虚拟字段 - 不存入数据库
            this.accessToken = __runInitializers(this, _updated_at_extraInitializers);
        }
        return User_1;
    }());
    __setFunctionName(_classThis, "User");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)({ unsigned: true })];
        _phone_decorators = [(0, typeorm_1.Column)({ length: 20, nullable: true, comment: '手机号' }), (0, typeorm_1.Index)({ unique: true })];
        _password_decorators = [(0, typeorm_1.Column)({ length: 255, nullable: true, comment: '密码（bcrypt加密）' })];
        _nickname_decorators = [(0, typeorm_1.Column)({ length: 50, nullable: true, comment: '昵称' })];
        _avatar_decorators = [(0, typeorm_1.Column)({ length: 500, nullable: true, comment: '头像URL' })];
        _role_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: UserRole,
                default: UserRole.STUDENT,
                comment: '角色',
            })];
        _status_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: UserStatus,
                default: UserStatus.ACTIVE,
                comment: '状态',
            })];
        _wechat_openid_decorators = [(0, typeorm_1.Column)({ length: 50, nullable: true, comment: '微信OpenID' }), (0, typeorm_1.Index)({ unique: true })];
        _wechat_unionid_decorators = [(0, typeorm_1.Column)({ length: 100, nullable: true, comment: '微信UnionID' })];
        _real_name_decorators = [(0, typeorm_1.Column)({ length: 100, nullable: true, comment: '真实姓名' })];
        _id_card_decorators = [(0, typeorm_1.Column)({ length: 18, nullable: true, comment: '身份证号' })];
        _gender_decorators = [(0, typeorm_1.Column)({ nullable: true, comment: '性别：0未知 1男 2女' })];
        _birthday_decorators = [(0, typeorm_1.Column)({ type: 'date', nullable: true, comment: '出生日期' })];
        _address_decorators = [(0, typeorm_1.Column)({ length: 500, nullable: true, comment: '地址' })];
        _school_decorators = [(0, typeorm_1.Column)({ length: 100, nullable: true, comment: '学校' })];
        _grade_decorators = [(0, typeorm_1.Column)({ length: 50, nullable: true, comment: '年级' })];
        _class_name_decorators = [(0, typeorm_1.Column)({ length: 50, nullable: true, comment: '班级' })];
        _last_login_at_decorators = [(0, typeorm_1.Column)({ nullable: true, comment: '最后登录时间' })];
        _last_login_ip_decorators = [(0, typeorm_1.Column)({ length: 50, nullable: true, comment: '最后登录IP' })];
        _token_version_decorators = [(0, typeorm_1.Column)({ nullable: false, default: 0, comment: 'Token版本号，用于失效Token' })];
        _created_at_decorators = [(0, typeorm_1.CreateDateColumn)({ comment: '创建时间' })];
        _updated_at_decorators = [(0, typeorm_1.UpdateDateColumn)({ comment: '更新时间' })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _phone_decorators, { kind: "field", name: "phone", static: false, private: false, access: { has: function (obj) { return "phone" in obj; }, get: function (obj) { return obj.phone; }, set: function (obj, value) { obj.phone = value; } }, metadata: _metadata }, _phone_initializers, _phone_extraInitializers);
        __esDecorate(null, null, _password_decorators, { kind: "field", name: "password", static: false, private: false, access: { has: function (obj) { return "password" in obj; }, get: function (obj) { return obj.password; }, set: function (obj, value) { obj.password = value; } }, metadata: _metadata }, _password_initializers, _password_extraInitializers);
        __esDecorate(null, null, _nickname_decorators, { kind: "field", name: "nickname", static: false, private: false, access: { has: function (obj) { return "nickname" in obj; }, get: function (obj) { return obj.nickname; }, set: function (obj, value) { obj.nickname = value; } }, metadata: _metadata }, _nickname_initializers, _nickname_extraInitializers);
        __esDecorate(null, null, _avatar_decorators, { kind: "field", name: "avatar", static: false, private: false, access: { has: function (obj) { return "avatar" in obj; }, get: function (obj) { return obj.avatar; }, set: function (obj, value) { obj.avatar = value; } }, metadata: _metadata }, _avatar_initializers, _avatar_extraInitializers);
        __esDecorate(null, null, _role_decorators, { kind: "field", name: "role", static: false, private: false, access: { has: function (obj) { return "role" in obj; }, get: function (obj) { return obj.role; }, set: function (obj, value) { obj.role = value; } }, metadata: _metadata }, _role_initializers, _role_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _wechat_openid_decorators, { kind: "field", name: "wechat_openid", static: false, private: false, access: { has: function (obj) { return "wechat_openid" in obj; }, get: function (obj) { return obj.wechat_openid; }, set: function (obj, value) { obj.wechat_openid = value; } }, metadata: _metadata }, _wechat_openid_initializers, _wechat_openid_extraInitializers);
        __esDecorate(null, null, _wechat_unionid_decorators, { kind: "field", name: "wechat_unionid", static: false, private: false, access: { has: function (obj) { return "wechat_unionid" in obj; }, get: function (obj) { return obj.wechat_unionid; }, set: function (obj, value) { obj.wechat_unionid = value; } }, metadata: _metadata }, _wechat_unionid_initializers, _wechat_unionid_extraInitializers);
        __esDecorate(null, null, _real_name_decorators, { kind: "field", name: "real_name", static: false, private: false, access: { has: function (obj) { return "real_name" in obj; }, get: function (obj) { return obj.real_name; }, set: function (obj, value) { obj.real_name = value; } }, metadata: _metadata }, _real_name_initializers, _real_name_extraInitializers);
        __esDecorate(null, null, _id_card_decorators, { kind: "field", name: "id_card", static: false, private: false, access: { has: function (obj) { return "id_card" in obj; }, get: function (obj) { return obj.id_card; }, set: function (obj, value) { obj.id_card = value; } }, metadata: _metadata }, _id_card_initializers, _id_card_extraInitializers);
        __esDecorate(null, null, _gender_decorators, { kind: "field", name: "gender", static: false, private: false, access: { has: function (obj) { return "gender" in obj; }, get: function (obj) { return obj.gender; }, set: function (obj, value) { obj.gender = value; } }, metadata: _metadata }, _gender_initializers, _gender_extraInitializers);
        __esDecorate(null, null, _birthday_decorators, { kind: "field", name: "birthday", static: false, private: false, access: { has: function (obj) { return "birthday" in obj; }, get: function (obj) { return obj.birthday; }, set: function (obj, value) { obj.birthday = value; } }, metadata: _metadata }, _birthday_initializers, _birthday_extraInitializers);
        __esDecorate(null, null, _address_decorators, { kind: "field", name: "address", static: false, private: false, access: { has: function (obj) { return "address" in obj; }, get: function (obj) { return obj.address; }, set: function (obj, value) { obj.address = value; } }, metadata: _metadata }, _address_initializers, _address_extraInitializers);
        __esDecorate(null, null, _school_decorators, { kind: "field", name: "school", static: false, private: false, access: { has: function (obj) { return "school" in obj; }, get: function (obj) { return obj.school; }, set: function (obj, value) { obj.school = value; } }, metadata: _metadata }, _school_initializers, _school_extraInitializers);
        __esDecorate(null, null, _grade_decorators, { kind: "field", name: "grade", static: false, private: false, access: { has: function (obj) { return "grade" in obj; }, get: function (obj) { return obj.grade; }, set: function (obj, value) { obj.grade = value; } }, metadata: _metadata }, _grade_initializers, _grade_extraInitializers);
        __esDecorate(null, null, _class_name_decorators, { kind: "field", name: "class_name", static: false, private: false, access: { has: function (obj) { return "class_name" in obj; }, get: function (obj) { return obj.class_name; }, set: function (obj, value) { obj.class_name = value; } }, metadata: _metadata }, _class_name_initializers, _class_name_extraInitializers);
        __esDecorate(null, null, _last_login_at_decorators, { kind: "field", name: "last_login_at", static: false, private: false, access: { has: function (obj) { return "last_login_at" in obj; }, get: function (obj) { return obj.last_login_at; }, set: function (obj, value) { obj.last_login_at = value; } }, metadata: _metadata }, _last_login_at_initializers, _last_login_at_extraInitializers);
        __esDecorate(null, null, _last_login_ip_decorators, { kind: "field", name: "last_login_ip", static: false, private: false, access: { has: function (obj) { return "last_login_ip" in obj; }, get: function (obj) { return obj.last_login_ip; }, set: function (obj, value) { obj.last_login_ip = value; } }, metadata: _metadata }, _last_login_ip_initializers, _last_login_ip_extraInitializers);
        __esDecorate(null, null, _token_version_decorators, { kind: "field", name: "token_version", static: false, private: false, access: { has: function (obj) { return "token_version" in obj; }, get: function (obj) { return obj.token_version; }, set: function (obj, value) { obj.token_version = value; } }, metadata: _metadata }, _token_version_initializers, _token_version_extraInitializers);
        __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: function (obj) { return "created_at" in obj; }, get: function (obj) { return obj.created_at; }, set: function (obj, value) { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
        __esDecorate(null, null, _updated_at_decorators, { kind: "field", name: "updated_at", static: false, private: false, access: { has: function (obj) { return "updated_at" in obj; }, get: function (obj) { return obj.updated_at; }, set: function (obj, value) { obj.updated_at = value; } }, metadata: _metadata }, _updated_at_initializers, _updated_at_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        User = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return User = _classThis;
}();
exports.User = User;
