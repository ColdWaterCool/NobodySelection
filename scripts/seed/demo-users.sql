-- NobodySelection 演示数据（可安全提交 GitHub）
-- 全部为虚构手机号与测试账号，不含真实用户信息
-- 导入前请确保后端已至少启动过一次（TypeORM 已建表），或表结构已存在

SET NAMES utf8mb4;
USE nobody_selection;

-- 清空演示表（仅开发环境使用）
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE teachers;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;

-- 统一测试密码：Test123456（bcrypt 哈希）
-- 也可使用 POST /api/auth/dev-login 免密登录（仅 development 环境）

INSERT INTO users (phone, password, nickname, role, status, token_version, created_at, updated_at) VALUES
('13800000001', '$2b$10$j14RXeFGw4Z866Ke/HHHiu60x7QqKi.QmnFT0AbQE04W9HI4Jo.eO', '测试学生小明', 'student', 'active', 0, NOW(), NOW()),
('13800000002', '$2b$10$j14RXeFGw4Z866Ke/HHHiu60x7QqKi.QmnFT0AbQE04W9HI4Jo.eO', '测试家长王女士', 'parent', 'active', 0, NOW(), NOW()),
('13800000003', '$2b$10$j14RXeFGw4Z866Ke/HHHiu60x7QqKi.QmnFT0AbQE04W9HI4Jo.eO', '测试教师张老师', 'teacher', 'active', 0, NOW(), NOW()),
('13800000004', '$2b$10$j14RXeFGw4Z866Ke/HHHiu60x7QqKi.QmnFT0AbQE04W9HI4Jo.eO', '测试管理员', 'admin', 'active', 0, NOW(), NOW());

INSERT INTO teachers (user_id, bio, hourly_rate, specializations, nationality, university, major, education, teaching_years, rating, review_count, student_count, course_count, is_gold, is_featured, audit_status, total_income, available_balance, created_at, updated_at)
SELECT id, '测试教师，擅长英语口语与阅读', 280.00, '英语口语,阅读写作', '中国', '北京师范大学', '英语教育', '硕士', 8, 4.8, 42, 18, 320, 1, 1, 'approved', 0, 0, NOW(), NOW()
FROM users WHERE phone = '13800000003';
