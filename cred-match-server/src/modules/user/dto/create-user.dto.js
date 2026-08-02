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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = void 0;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var user_entity_1 = require("../entities/user.entity");
var CreateUserDto = function () {
    var _a;
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
    return _a = /** @class */ (function () {
            function CreateUserDto() {
                this.phone = __runInitializers(this, _phone_initializers, void 0);
                this.password = (__runInitializers(this, _phone_extraInitializers), __runInitializers(this, _password_initializers, void 0));
                this.nickname = (__runInitializers(this, _password_extraInitializers), __runInitializers(this, _nickname_initializers, void 0));
                this.avatar = (__runInitializers(this, _nickname_extraInitializers), __runInitializers(this, _avatar_initializers, void 0));
                this.role = (__runInitializers(this, _avatar_extraInitializers), __runInitializers(this, _role_initializers, void 0));
                this.real_name = (__runInitializers(this, _role_extraInitializers), __runInitializers(this, _real_name_initializers, void 0));
                this.id_card = (__runInitializers(this, _real_name_extraInitializers), __runInitializers(this, _id_card_initializers, void 0));
                this.gender = (__runInitializers(this, _id_card_extraInitializers), __runInitializers(this, _gender_initializers, void 0));
                this.birthday = (__runInitializers(this, _gender_extraInitializers), __runInitializers(this, _birthday_initializers, void 0));
                this.address = (__runInitializers(this, _birthday_extraInitializers), __runInitializers(this, _address_initializers, void 0));
                this.school = (__runInitializers(this, _address_extraInitializers), __runInitializers(this, _school_initializers, void 0));
                this.grade = (__runInitializers(this, _school_extraInitializers), __runInitializers(this, _grade_initializers, void 0));
                this.class_name = (__runInitializers(this, _grade_extraInitializers), __runInitializers(this, _class_name_initializers, void 0));
                __runInitializers(this, _class_name_extraInitializers);
            }
            return CreateUserDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _phone_decorators = [(0, swagger_1.ApiProperty)({ description: '手机号', example: '13800138000' }), (0, class_validator_1.IsString)()];
            _password_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: '密码' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _nickname_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: '昵称' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _avatar_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: '头像URL' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _role_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: '角色', enum: user_entity_1.UserRole }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(user_entity_1.UserRole)];
            _real_name_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: '真实姓名' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _id_card_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: '身份证号' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _gender_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: '性别：0未知 1男 2女' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(0), (0, class_validator_1.Max)(2)];
            _birthday_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: '出生日期' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDateString)()];
            _address_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: '地址' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _school_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: '学校' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _grade_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: '年级' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _class_name_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: '班级' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _phone_decorators, { kind: "field", name: "phone", static: false, private: false, access: { has: function (obj) { return "phone" in obj; }, get: function (obj) { return obj.phone; }, set: function (obj, value) { obj.phone = value; } }, metadata: _metadata }, _phone_initializers, _phone_extraInitializers);
            __esDecorate(null, null, _password_decorators, { kind: "field", name: "password", static: false, private: false, access: { has: function (obj) { return "password" in obj; }, get: function (obj) { return obj.password; }, set: function (obj, value) { obj.password = value; } }, metadata: _metadata }, _password_initializers, _password_extraInitializers);
            __esDecorate(null, null, _nickname_decorators, { kind: "field", name: "nickname", static: false, private: false, access: { has: function (obj) { return "nickname" in obj; }, get: function (obj) { return obj.nickname; }, set: function (obj, value) { obj.nickname = value; } }, metadata: _metadata }, _nickname_initializers, _nickname_extraInitializers);
            __esDecorate(null, null, _avatar_decorators, { kind: "field", name: "avatar", static: false, private: false, access: { has: function (obj) { return "avatar" in obj; }, get: function (obj) { return obj.avatar; }, set: function (obj, value) { obj.avatar = value; } }, metadata: _metadata }, _avatar_initializers, _avatar_extraInitializers);
            __esDecorate(null, null, _role_decorators, { kind: "field", name: "role", static: false, private: false, access: { has: function (obj) { return "role" in obj; }, get: function (obj) { return obj.role; }, set: function (obj, value) { obj.role = value; } }, metadata: _metadata }, _role_initializers, _role_extraInitializers);
            __esDecorate(null, null, _real_name_decorators, { kind: "field", name: "real_name", static: false, private: false, access: { has: function (obj) { return "real_name" in obj; }, get: function (obj) { return obj.real_name; }, set: function (obj, value) { obj.real_name = value; } }, metadata: _metadata }, _real_name_initializers, _real_name_extraInitializers);
            __esDecorate(null, null, _id_card_decorators, { kind: "field", name: "id_card", static: false, private: false, access: { has: function (obj) { return "id_card" in obj; }, get: function (obj) { return obj.id_card; }, set: function (obj, value) { obj.id_card = value; } }, metadata: _metadata }, _id_card_initializers, _id_card_extraInitializers);
            __esDecorate(null, null, _gender_decorators, { kind: "field", name: "gender", static: false, private: false, access: { has: function (obj) { return "gender" in obj; }, get: function (obj) { return obj.gender; }, set: function (obj, value) { obj.gender = value; } }, metadata: _metadata }, _gender_initializers, _gender_extraInitializers);
            __esDecorate(null, null, _birthday_decorators, { kind: "field", name: "birthday", static: false, private: false, access: { has: function (obj) { return "birthday" in obj; }, get: function (obj) { return obj.birthday; }, set: function (obj, value) { obj.birthday = value; } }, metadata: _metadata }, _birthday_initializers, _birthday_extraInitializers);
            __esDecorate(null, null, _address_decorators, { kind: "field", name: "address", static: false, private: false, access: { has: function (obj) { return "address" in obj; }, get: function (obj) { return obj.address; }, set: function (obj, value) { obj.address = value; } }, metadata: _metadata }, _address_initializers, _address_extraInitializers);
            __esDecorate(null, null, _school_decorators, { kind: "field", name: "school", static: false, private: false, access: { has: function (obj) { return "school" in obj; }, get: function (obj) { return obj.school; }, set: function (obj, value) { obj.school = value; } }, metadata: _metadata }, _school_initializers, _school_extraInitializers);
            __esDecorate(null, null, _grade_decorators, { kind: "field", name: "grade", static: false, private: false, access: { has: function (obj) { return "grade" in obj; }, get: function (obj) { return obj.grade; }, set: function (obj, value) { obj.grade = value; } }, metadata: _metadata }, _grade_initializers, _grade_extraInitializers);
            __esDecorate(null, null, _class_name_decorators, { kind: "field", name: "class_name", static: false, private: false, access: { has: function (obj) { return "class_name" in obj; }, get: function (obj) { return obj.class_name; }, set: function (obj, value) { obj.class_name = value; } }, metadata: _metadata }, _class_name_initializers, _class_name_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateUserDto = CreateUserDto;
