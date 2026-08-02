const fs = require('fs');
const path = require('path');

// Helper function to ensure directory exists
function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Page templates
const pages = {
  // Teacher pages
  'cred-match-web/src/views/teacher/detail.vue': `<template>
  <div class="teacher-detail">
    <h1>Teacher Detail</h1>
    <p>Teacher ID: {{ $route.params.id }}</p>
    <router-link to="/teachers">Back to list</router-link>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
<style scoped>
.teacher-detail { padding: 20px; }
</style>`,

  'cred-match-web/src/views/teacher/dashboard.vue': `<template>
  <div class="teacher-dashboard">
    <h1>Teacher Dashboard</h1>
    <p>Welcome back!</p>
    <div class="nav-links">
      <router-link to="/teacher/profile">Profile</router-link>
      <router-link to="/teacher/schedule">Schedule</router-link>
      <router-link to="/teacher/homework">Homework</router-link>
      <router-link to="/teacher/income">Income</router-link>
    </div>
  </div>
</template>
<style scoped>
.teacher-dashboard { padding: 20px; }
.nav-links { display: flex; gap: 20px; margin-top: 20px; }
</style>`,

  'cred-match-web/src/views/teacher/edit-profile.vue': `<template>
  <div class="edit-profile">
    <h1>Edit Profile</h1>
    <p>Teacher profile editing form will go here</p>
    <router-link to="/teacher">Back to Dashboard</router-link>
  </div>
</template>
<style scoped>
.edit-profile { padding: 20px; }
</style>`,

  'cred-match-web/src/views/teacher/schedule.vue': `<template>
  <div class="schedule">
    <h1>Schedule Management</h1>
    <p>Class scheduling interface will go here</p>
    <router-link to="/teacher">Back to Dashboard</router-link>
  </div>
</template>
<style scoped>
.schedule { padding: 20px; }
</style>`,

  'cred-match-web/src/views/teacher/homework.vue': `<template>
  <div class="homework-management">
    <h1>Homework Management</h1>
    <p>Create and review homework assignments</p>
    <router-link to="/teacher">Back to Dashboard</router-link>
  </div>
</template>
<style scoped>
.homework-management { padding: 20px; }
</style>`,

  'cred-match-web/src/views/teacher/income.vue': `<template>
  <div class="income">
    <h1>Income Statistics</h1>
    <p>View earnings and payment history</p>
    <router-link to="/teacher">Back to Dashboard</router-link>
  </div>
</template>
<style scoped>
.income { padding: 20px; }
</style>`,

  // Student pages
  'cred-match-web/src/views/student/index.vue': `<template>
  <div class="student-dashboard">
    <h1>Student Dashboard</h1>
    <p>Welcome back!</p>
    <div class="nav-links">
      <router-link to="/student/homework">Homework</router-link>
      <router-link to="/student/records">Learning Records</router-link>
    </div>
  </div>
</template>
<style scoped>
.student-dashboard { padding: 20px; }
.nav-links { display: flex; gap: 20px; margin-top: 20px; }
</style>`,

  'cred-match-web/src/views/student/homework.vue': `<template>
  <div class="homework-center">
    <h1>Homework Center</h1>
    <p>View and submit homework assignments</p>
    <router-link to="/student">Back to Dashboard</router-link>
  </div>
</template>
<style scoped>
.homework-center { padding: 20px; }
</style>`,

  'cred-match-web/src/views/student/homework-detail.vue': `<template>
  <div class="homework-detail">
    <h1>Homework Detail</h1>
    <p>Homework ID: {{ $route.params.id }}</p>
    <router-link to="/student/homework">Back to Homework</router-link>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
<style scoped>
.homework-detail { padding: 20px; }
</style>`,

  'cred-match-web/src/views/student/records.vue': `<template>
  <div class="learning-records">
    <h1>Learning Records</h1>
    <p>View your class history and progress</p>
    <router-link to="/student">Back to Dashboard</router-link>
  </div>
</template>
<style scoped>
.learning-records { padding: 20px; }
</style>`,

  // Parent pages
  'cred-match-web/src/views/parent/index.vue': `<template>
  <div class="parent-dashboard">
    <h1>Parent Dashboard</h1>
    <p>Monitor your child's learning progress</p>
    <div class="nav-links">
      <router-link to="/parent/consumption">Consumption</router-link>
      <router-link to="/parent/statistics">Statistics</router-link>
    </div>
  </div>
</template>
<style scoped>
.parent-dashboard { padding: 20px; }
.nav-links { display: flex; gap: 20px; margin-top: 20px; }
</style>`,

  'cred-match-web/src/views/parent/consumption.vue': `<template>
  <div class="consumption">
    <h1>Hour Consumption</h1>
    <p>View detailed hour usage and spending</p>
    <router-link to="/parent">Back to Dashboard</router-link>
  </div>
</template>
<style scoped>
.consumption { padding: 20px; }
</style>`,

  'cred-match-web/src/views/parent/statistics.vue': `<template>
  <div class="statistics">
    <h1>Learning Statistics</h1>
    <p>View learning time and performance statistics</p>
    <router-link to="/parent">Back to Dashboard</router-link>
  </div>
</template>
<style scoped>
.statistics { padding: 20px; }
</style>`,

  // Purchase pages
  'cred-match-web/src/views/purchase/index.vue': `<template>
  <div class="purchase">
    <h1>Purchase Class Hours</h1>
    <p>Select a package to purchase</p>
    <div class="packages">
      <div class="package">5 Hours - ¥500</div>
      <div class="package">20 Hours - ¥1800</div>
      <div class="package">50 Hours - ¥4000</div>
    </div>
    <router-link to="/">Back to Home</router-link>
  </div>
</template>
<style scoped>
.purchase { padding: 20px; }
.packages { display: flex; gap: 20px; margin: 20px 0; }
.package { padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
</style>`,

  'cred-match-web/src/views/purchase/orders.vue': `<template>
  <div class="orders">
    <h1>My Orders</h1>
    <p>View your purchase history</p>
    <router-link to="/">Back to Home</router-link>
  </div>
</template>
<style scoped>
.orders { padding: 20px; }
</style>`,

  // Settings page
  'cred-match-web/src/views/settings/index.vue': `<template>
  <div class="settings">
    <h1>Account Settings</h1>
    <p>Manage your account information</p>
    <router-link to="/">Back to Home</router-link>
  </div>
</template>
<style scoped>
.settings { padding: 20px; }
</style>`,

  // Admin pages
  'cred-match-web/src/views/admin/layout.vue': `<template>
  <div class="admin-layout">
    <div class="admin-sidebar">
      <h2>Admin Panel</h2>
      <nav>
        <router-link to="/admin">Dashboard</router-link>
        <router-link to="/admin/users">Users</router-link>
        <router-link to="/admin/teachers">Teachers</router-link>
        <router-link to="/admin/orders">Orders</router-link>
        <router-link to="/admin/finance">Finance</router-link>
        <router-link to="/admin/cms">CMS</router-link>
        <router-link to="/admin/settings">Settings</router-link>
      </nav>
    </div>
    <div class="admin-content">
      <router-view />
    </div>
  </div>
</template>
<style scoped>
.admin-layout { display: flex; min-height: 100vh; }
.admin-sidebar { width: 250px; background: #f5f5f5; padding: 20px; }
.admin-sidebar h2 { margin-bottom: 20px; }
.admin-sidebar nav { display: flex; flex-direction: column; gap: 10px; }
.admin-sidebar a { text-decoration: none; color: #333; padding: 8px; border-radius: 4px; }
.admin-sidebar a:hover { background: #e0e0e0; }
.admin-content { flex: 1; padding: 20px; }
</style>`,

  'cred-match-web/src/views/admin/dashboard.vue': `<template>
  <div class="admin-dashboard">
    <h1>Admin Dashboard</h1>
    <p>Platform overview and statistics</p>
  </div>
</template>
<style scoped>
.admin-dashboard { padding: 20px; }
</style>`,

  'cred-match-web/src/views/admin/users.vue': `<template>
  <div class="admin-users">
    <h1>User Management</h1>
    <p>Manage platform users</p>
  </div>
</template>
<style scoped>
.admin-users { padding: 20px; }
</style>`,

  'cred-match-web/src/views/admin/teachers.vue': `<template>
  <div class="admin-teachers">
    <h1>Teacher Review</h1>
    <p>Review and approve teacher applications</p>
  </div>
</template>
<style scoped>
.admin-teachers { padding: 20px; }
</style>`,

  'cred-match-web/src/views/admin/orders.vue': `<template>
  <div class="admin-orders">
    <h1>Order Management</h1>
    <p>View and manage orders</p>
  </div>
</template>
<style scoped>
.admin-orders { padding: 20px; }
</style>`,

  'cred-match-web/src/views/admin/finance.vue': `<template>
  <div class="admin-finance">
    <h1>Finance Reports</h1>
    <p>View financial reports and statistics</p>
  </div>
</template>
<style scoped>
.admin-finance { padding: 20px; }
</style>`,

  'cred-match-web/src/views/admin/cms.vue': `<template>
  <div class="admin-cms">
    <h1>Content Management</h1>
    <p>Manage homepage content</p>
  </div>
</template>
<style scoped>
.admin-cms { padding: 20px; }
</style>`,

  'cred-match-web/src/views/admin/settings.vue': `<template>
  <div class="admin-settings">
    <h1>System Settings</h1>
    <p>Configure platform settings</p>
  </div>
</template>
<style scoped>
.admin-settings { padding: 20px; }
</style>`,

  // Error page
  'cred-match-web/src/views/error/404.vue': `<template>
  <div class="error-404">
    <h1>404 - Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
    <router-link to="/">Go Home</router-link>
  </div>
</template>
<style scoped>
.error-404 { padding: 50px; text-align: center; }
h1 { font-size: 2em; margin-bottom: 20px; }
a { color: #c9a84c; }
</style>`
};

// Write all files
Object.entries(pages).forEach(([filePath, content]) => {
  ensureDir(filePath);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Created:', filePath);
});

console.log('All pages created successfully!');