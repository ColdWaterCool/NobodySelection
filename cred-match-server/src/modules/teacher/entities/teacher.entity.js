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
exports.Teacher = exports.TeacherAuditStatus = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../../user/entities/user.entity");
var TeacherAuditStatus;
(function (TeacherAuditStatus) {
    TeacherAuditStatus["PENDING"] = "pending";
    TeacherAuditStatus["APPROVED"] = "approved";
    TeacherAuditStatus["REJECTED"] = "rejected";
})(TeacherAuditStatus || (exports.TeacherAuditStatus = TeacherAuditStatus = {}));
var Teacher = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('teachers')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _user_decorators;
    var _user_initializers = [];
    var _user_extraInitializers = [];
    var _user_id_decorators;
    var _user_id_initializers = [];
    var _user_id_extraInitializers = [];
    var _bio_decorators;
    var _bio_initializers = [];
    var _bio_extraInitializers = [];
    var _video_intro_decorators;
    var _video_intro_initializers = [];
    var _video_intro_extraInitializers = [];
    var _hourly_rate_decorators;
    var _hourly_rate_initializers = [];
    var _hourly_rate_extraInitializers = [];
    var _specializations_decorators;
    var _specializations_initializers = [];
    var _specializations_extraInitializers = [];
    var _nationality_decorators;
    var _nationality_initializers = [];
    var _nationality_extraInitializers = [];
    var _university_decorators;
    var _university_initializers = [];
    var _university_extraInitializers = [];
    var _major_decorators;
    var _major_initializers = [];
    var _major_extraInitializers = [];
    var _education_decorators;
    var _education_initializers = [];
    var _education_extraInitializers = [];
    var _teaching_years_decorators;
    var _teaching_years_initializers = [];
    var _teaching_years_extraInitializers = [];
    var _rating_decorators;
    var _rating_initializers = [];
    var _rating_extraInitializers = [];
    var _review_count_decorators;
    var _review_count_initializers = [];
    var _review_count_extraInitializers = [];
    var _student_count_decorators;
    var _student_count_initializers = [];
    var _student_count_extraInitializers = [];
    var _course_count_decorators;
    var _course_count_initializers = [];
    var _course_count_extraInitializers = [];
    var _is_gold_decorators;
    var _is_gold_initializers = [];
    var _is_gold_extraInitializers = [];
    var _is_featured_decorators;
    var _is_featured_initializers = [];
    var _is_featured_extraInitializers = [];
    var _audit_status_decorators;
    var _audit_status_initializers = [];
    var _audit_status_extraInitializers = [];
    var _audit_remark_decorators;
    var _audit_remark_initializers = [];
    var _audit_remark_extraInitializers = [];
    var _total_income_decorators;
    var _total_income_initializers = [];
    var _total_income_extraInitializers = [];
    var _available_balance_decorators;
    var _available_balance_initializers = [];
    var _available_balance_extraInitializers = [];
    var _created_at_decorators;
    var _created_at_initializers = [];
    var _created_at_extraInitializers = [];
    var _updated_at_decorators;
    var _updated_at_initializers = [];
    var _updated_at_extraInitializers = [];
    var Teacher = _classThis = /** @class */ (function () {
        function Teacher_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.user = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _user_initializers, void 0));
            this.user_id = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _user_id_initializers, void 0));
            this.bio = (__runInitializers(this, _user_id_extraInitializers), __runInitializers(this, _bio_initializers, void 0));
            this.video_intro = (__runInitializers(this, _bio_extraInitializers), __runInitializers(this, _video_intro_initializers, void 0));
            this.hourly_rate = (__runInitializers(this, _video_intro_extraInitializers), __runInitializers(this, _hourly_rate_initializers, void 0));
            this.specializations = (__runInitializers(this, _hourly_rate_extraInitializers), __runInitializers(this, _specializations_initializers, void 0));
            this.nationality = (__runInitializers(this, _specializations_extraInitializers), __runInitializers(this, _nationality_initializers, void 0));
            this.university = (__runInitializers(this, _nationality_extraInitializers), __runInitializers(this, _university_initializers, void 0));
            this.major = (__runInitializers(this, _university_extraInitializers), __runInitializers(this, _major_initializers, void 0));
            this.education = (__runInitializers(this, _major_extraInitializers), __runInitializers(this, _education_initializers, void 0));
            this.teaching_years = (__runInitializers(this, _education_extraInitializers), __runInitializers(this, _teaching_years_initializers, void 0));
            this.rating = (__runInitializers(this, _teaching_years_extraInitializers), __runInitializers(this, _rating_initializers, void 0));
            this.review_count = (__runInitializers(this, _rating_extraInitializers), __runInitializers(this, _review_count_initializers, void 0));
            this.student_count = (__runInitializers(this, _review_count_extraInitializers), __runInitializers(this, _student_count_initializers, void 0));
            this.course_count = (__runInitializers(this, _student_count_extraInitializers), __runInitializers(this, _course_count_initializers, void 0));
            this.is_gold = (__runInitializers(this, _course_count_extraInitializers), __runInitializers(this, _is_gold_initializers, void 0));
            this.is_featured = (__runInitializers(this, _is_gold_extraInitializers), __runInitializers(this, _is_featured_initializers, void 0));
            this.audit_status = (__runInitializers(this, _is_featured_extraInitializers), __runInitializers(this, _audit_status_initializers, void 0));
            this.audit_remark = (__runInitializers(this, _audit_status_extraInitializers), __runInitializers(this, _audit_remark_initializers, void 0));
            this.total_income = (__runInitializers(this, _audit_remark_extraInitializers), __runInitializers(this, _total_income_initializers, void 0));
            this.available_balance = (__runInitializers(this, _total_income_extraInitializers), __runInitializers(this, _available_balance_initializers, void 0));
            this.created_at = (__runInitializers(this, _available_balance_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
            this.updated_at = (__runInitializers(this, _created_at_extraInitializers), __runInitializers(this, _updated_at_initializers, void 0));
            // 虚拟字段 - 不存入数据库
            this.user_info = __runInitializers(this, _updated_at_extraInitializers);
        }
        return Teacher_1;
    }());
    __setFunctionName(_classThis, "Teacher");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)({ unsigned: true })];
        _user_decorators = [(0, typeorm_1.OneToOne)(function () { return user_entity_1.User; }), (0, typeorm_1.JoinColumn)({ name: 'user_id' })];
        _user_id_decorators = [(0, typeorm_1.Column)({ unsigned: true, unique: true, comment: '用户ID' })];
        _bio_decorators = [(0, typeorm_1.Column)({ length: 255, nullable: true, comment: '教师简介' })];
        _video_intro_decorators = [(0, typeorm_1.Column)({ length: 255, nullable: true, comment: '教学视频简介' })];
        _hourly_rate_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0, comment: '课时费（元/小时）' })];
        _specializations_decorators = [(0, typeorm_1.Column)({ type: 'simple-array', nullable: true, comment: '擅长领域标签' })];
        _nationality_decorators = [(0, typeorm_1.Column)({ length: 50, nullable: true, comment: '国籍' })];
        _university_decorators = [(0, typeorm_1.Column)({ length: 100, nullable: true, comment: '毕业院校' })];
        _major_decorators = [(0, typeorm_1.Column)({ length: 100, nullable: true, comment: '专业' })];
        _education_decorators = [(0, typeorm_1.Column)({ length: 50, nullable: true, comment: '学历' })];
        _teaching_years_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0, comment: '教学年限' })];
        _rating_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 3, scale: 1, default: 0, comment: '评分（1-5）' })];
        _review_count_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0, comment: '评价数量' })];
        _student_count_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0, comment: '学生数量' })];
        _course_count_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0, comment: '课程数量' })];
        _is_gold_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false, comment: '是否金牌教师' }), (0, typeorm_1.Index)()];
        _is_featured_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false, comment: '是否推荐展示' }), (0, typeorm_1.Index)()];
        _audit_status_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: TeacherAuditStatus,
                default: TeacherAuditStatus.PENDING,
                comment: '审核状态',
            }), (0, typeorm_1.Index)()];
        _audit_remark_decorators = [(0, typeorm_1.Column)({ length: 255, nullable: true, comment: '审核备注' })];
        _total_income_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0, comment: '累计收入（分）' })];
        _available_balance_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0, comment: '可提现余额（分）' })];
        _created_at_decorators = [(0, typeorm_1.CreateDateColumn)({ comment: '创建时间' })];
        _updated_at_decorators = [(0, typeorm_1.UpdateDateColumn)({ comment: '更新时间' })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: function (obj) { return "user" in obj; }, get: function (obj) { return obj.user; }, set: function (obj, value) { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
        __esDecorate(null, null, _user_id_decorators, { kind: "field", name: "user_id", static: false, private: false, access: { has: function (obj) { return "user_id" in obj; }, get: function (obj) { return obj.user_id; }, set: function (obj, value) { obj.user_id = value; } }, metadata: _metadata }, _user_id_initializers, _user_id_extraInitializers);
        __esDecorate(null, null, _bio_decorators, { kind: "field", name: "bio", static: false, private: false, access: { has: function (obj) { return "bio" in obj; }, get: function (obj) { return obj.bio; }, set: function (obj, value) { obj.bio = value; } }, metadata: _metadata }, _bio_initializers, _bio_extraInitializers);
        __esDecorate(null, null, _video_intro_decorators, { kind: "field", name: "video_intro", static: false, private: false, access: { has: function (obj) { return "video_intro" in obj; }, get: function (obj) { return obj.video_intro; }, set: function (obj, value) { obj.video_intro = value; } }, metadata: _metadata }, _video_intro_initializers, _video_intro_extraInitializers);
        __esDecorate(null, null, _hourly_rate_decorators, { kind: "field", name: "hourly_rate", static: false, private: false, access: { has: function (obj) { return "hourly_rate" in obj; }, get: function (obj) { return obj.hourly_rate; }, set: function (obj, value) { obj.hourly_rate = value; } }, metadata: _metadata }, _hourly_rate_initializers, _hourly_rate_extraInitializers);
        __esDecorate(null, null, _specializations_decorators, { kind: "field", name: "specializations", static: false, private: false, access: { has: function (obj) { return "specializations" in obj; }, get: function (obj) { return obj.specializations; }, set: function (obj, value) { obj.specializations = value; } }, metadata: _metadata }, _specializations_initializers, _specializations_extraInitializers);
        __esDecorate(null, null, _nationality_decorators, { kind: "field", name: "nationality", static: false, private: false, access: { has: function (obj) { return "nationality" in obj; }, get: function (obj) { return obj.nationality; }, set: function (obj, value) { obj.nationality = value; } }, metadata: _metadata }, _nationality_initializers, _nationality_extraInitializers);
        __esDecorate(null, null, _university_decorators, { kind: "field", name: "university", static: false, private: false, access: { has: function (obj) { return "university" in obj; }, get: function (obj) { return obj.university; }, set: function (obj, value) { obj.university = value; } }, metadata: _metadata }, _university_initializers, _university_extraInitializers);
        __esDecorate(null, null, _major_decorators, { kind: "field", name: "major", static: false, private: false, access: { has: function (obj) { return "major" in obj; }, get: function (obj) { return obj.major; }, set: function (obj, value) { obj.major = value; } }, metadata: _metadata }, _major_initializers, _major_extraInitializers);
        __esDecorate(null, null, _education_decorators, { kind: "field", name: "education", static: false, private: false, access: { has: function (obj) { return "education" in obj; }, get: function (obj) { return obj.education; }, set: function (obj, value) { obj.education = value; } }, metadata: _metadata }, _education_initializers, _education_extraInitializers);
        __esDecorate(null, null, _teaching_years_decorators, { kind: "field", name: "teaching_years", static: false, private: false, access: { has: function (obj) { return "teaching_years" in obj; }, get: function (obj) { return obj.teaching_years; }, set: function (obj, value) { obj.teaching_years = value; } }, metadata: _metadata }, _teaching_years_initializers, _teaching_years_extraInitializers);
        __esDecorate(null, null, _rating_decorators, { kind: "field", name: "rating", static: false, private: false, access: { has: function (obj) { return "rating" in obj; }, get: function (obj) { return obj.rating; }, set: function (obj, value) { obj.rating = value; } }, metadata: _metadata }, _rating_initializers, _rating_extraInitializers);
        __esDecorate(null, null, _review_count_decorators, { kind: "field", name: "review_count", static: false, private: false, access: { has: function (obj) { return "review_count" in obj; }, get: function (obj) { return obj.review_count; }, set: function (obj, value) { obj.review_count = value; } }, metadata: _metadata }, _review_count_initializers, _review_count_extraInitializers);
        __esDecorate(null, null, _student_count_decorators, { kind: "field", name: "student_count", static: false, private: false, access: { has: function (obj) { return "student_count" in obj; }, get: function (obj) { return obj.student_count; }, set: function (obj, value) { obj.student_count = value; } }, metadata: _metadata }, _student_count_initializers, _student_count_extraInitializers);
        __esDecorate(null, null, _course_count_decorators, { kind: "field", name: "course_count", static: false, private: false, access: { has: function (obj) { return "course_count" in obj; }, get: function (obj) { return obj.course_count; }, set: function (obj, value) { obj.course_count = value; } }, metadata: _metadata }, _course_count_initializers, _course_count_extraInitializers);
        __esDecorate(null, null, _is_gold_decorators, { kind: "field", name: "is_gold", static: false, private: false, access: { has: function (obj) { return "is_gold" in obj; }, get: function (obj) { return obj.is_gold; }, set: function (obj, value) { obj.is_gold = value; } }, metadata: _metadata }, _is_gold_initializers, _is_gold_extraInitializers);
        __esDecorate(null, null, _is_featured_decorators, { kind: "field", name: "is_featured", static: false, private: false, access: { has: function (obj) { return "is_featured" in obj; }, get: function (obj) { return obj.is_featured; }, set: function (obj, value) { obj.is_featured = value; } }, metadata: _metadata }, _is_featured_initializers, _is_featured_extraInitializers);
        __esDecorate(null, null, _audit_status_decorators, { kind: "field", name: "audit_status", static: false, private: false, access: { has: function (obj) { return "audit_status" in obj; }, get: function (obj) { return obj.audit_status; }, set: function (obj, value) { obj.audit_status = value; } }, metadata: _metadata }, _audit_status_initializers, _audit_status_extraInitializers);
        __esDecorate(null, null, _audit_remark_decorators, { kind: "field", name: "audit_remark", static: false, private: false, access: { has: function (obj) { return "audit_remark" in obj; }, get: function (obj) { return obj.audit_remark; }, set: function (obj, value) { obj.audit_remark = value; } }, metadata: _metadata }, _audit_remark_initializers, _audit_remark_extraInitializers);
        __esDecorate(null, null, _total_income_decorators, { kind: "field", name: "total_income", static: false, private: false, access: { has: function (obj) { return "total_income" in obj; }, get: function (obj) { return obj.total_income; }, set: function (obj, value) { obj.total_income = value; } }, metadata: _metadata }, _total_income_initializers, _total_income_extraInitializers);
        __esDecorate(null, null, _available_balance_decorators, { kind: "field", name: "available_balance", static: false, private: false, access: { has: function (obj) { return "available_balance" in obj; }, get: function (obj) { return obj.available_balance; }, set: function (obj, value) { obj.available_balance = value; } }, metadata: _metadata }, _available_balance_initializers, _available_balance_extraInitializers);
        __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: function (obj) { return "created_at" in obj; }, get: function (obj) { return obj.created_at; }, set: function (obj, value) { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
        __esDecorate(null, null, _updated_at_decorators, { kind: "field", name: "updated_at", static: false, private: false, access: { has: function (obj) { return "updated_at" in obj; }, get: function (obj) { return obj.updated_at; }, set: function (obj, value) { obj.updated_at = value; } }, metadata: _metadata }, _updated_at_initializers, _updated_at_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Teacher = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Teacher = _classThis;
}();
exports.Teacher = Teacher;
