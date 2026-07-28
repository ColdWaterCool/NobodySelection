# NobodySelection - 数据库设计 (DDL)

## ER关系概览

- User 1:1 Teacher / Student / Parent（按角色扩展）
- Parent N:M Student（通过 parent_student_relations 关联）
- Teacher 1:N Schedule（排课记录）
- Student 1:N ClassHourAccount（课时账户，每购买一个课时包生成一条）
- Schedule 1:N Homework（每次上课可布置多个作业）
- Homework 1:1 HomeworkSubmission（学生提交）
- User 1:N Order（订单）
- Order 1:N Payment（支付记录）
