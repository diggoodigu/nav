/**
 * Cloudflare Workers 单文件部署版本 (已优化)
 * 包含所有功能、HTML、CSS 和 JavaScript
 *
 * @version 2.1.0
 * @author Diggoo嘀咕 with Gemini
 * @changelog
 * - 修复: 后台登录页面布局，确保表单元素宽度一致且对齐。
 * - 优化: 后台书签列表的“分类筛选”与“每页显示”调整为并排显示，节省空间。
 * - 美化: 对后台管理页面的容器、按钮、表单及表格样式进行微调，提升视觉效果。
 * - 整合: 将登录页面的内联样式合并到主样式表中，便于统一管理。
 * - 修复: 统一后台筛选器(select)与输入框(input)的视觉样式，解决尺寸不一的问题。
 * - 修复: 修复在分类筛选后，点击“上一页”/“下一页”时筛选条件丢失的BUG。
 */

// 备用随机 SVG 图标
const fallbackSVGIcons = [
  `<svg width="80" height="80" viewBox="0 0 24 24" fill="url(#gradient1)" xmlns="http://www.w3.org/2000/svg">
     <defs><linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
       <stop offset="0%" stop-color="#7209b7" /><stop offset="100%" stop-color="#4cc9f0" />
     </linearGradient></defs>
     <path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z"/>
   </svg>`,
  `<svg width="80" height="80" viewBox="0 0 24 24" fill="url(#gradient2)" xmlns="http://www.w3.org/2000/svg">
     <defs><linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
       <stop offset="0%" stop-color="#4361ee" /><stop offset="100%" stop-color="#4cc9f0" />
     </linearGradient></defs>
     <circle cx="12" cy="12" r="10"/><path d="M12 7v5l3.5 3.5 1.42-1.42L14 11.58V7h-2z" fill="#fff"/>
   </svg>`,
  `<svg width="80" height="80" viewBox="0 0 24 24" fill="url(#gradient3)" xmlns="http://www.w3.org/2000/svg">
     <defs><linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
       <stop offset="0%" stop-color="#7209b7" /><stop offset="100%" stop-color="#4361ee" />
     </linearGradient></defs>
     <path d="M12 .587l3.668 7.431L24 9.172l-6 5.843 1.416 8.252L12 19.771l-7.416 3.496L6 15.015 0 9.172l8.332-1.154z"/>
   </svg>`,
];

// 所有 CSS 样式整合到这里
const allStyles = `
/* 全局样式 */
body {
    font-family: 'Noto Sans SC', sans-serif;
    margin: 0;
    padding: 10px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) fixed;
    color: #333;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}

/* 后台管理页面背景 */
body.admin-page {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.container {
    max-width: 1400px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
    padding: 35px;
    border-radius: 24px;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.12),
                0 0 0 1px rgba(255, 255, 255, 0.3),
                0 0 40px rgba(102, 126, 234, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.4);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.container:hover {
    transform: translateY(-5px);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15),
                0 0 0 1px rgba(255, 255, 255, 0.4),
                0 0 50px rgba(102, 126, 234, 0.08);
}

h1 {
    text-align: center;
    margin: -5px 0 35px;
    color: #2c3e50;
    font-weight: 800;
    font-size: 2.75rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    letter-spacing: -0.5px;
    position: relative;
}

h1::after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 2px;
}

/* 表格样式 */
.table-wrapper {
    overflow-x: auto;
    margin-bottom: 1.5rem;
    border-radius: 16px;
}

/* 设置各列的宽度 */
/* Logo列 */
td[data-label="Logo"],
th:nth-child(4) {
    max-width: 60px;
    width: 60px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* 分类列 */
td[data-label="分类"],
th:nth-child(6) {
    min-width: 100px !important;
    width: 100px !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: 20px;
}

/* 排序列 */
td[data-label="排序"],
th:nth-child(7) {
    min-width: 100px !important;
    width: 100px !important;
    white-space: nowrap;
    text-align: left !important;
    writing-mode: horizontal-tb !important;
    text-orientation: mixed !important;
}

/* 确保所有文字横向显示 */
td, th {
    writing-mode: horizontal-tb !important;
    text-orientation: mixed !important;
    text-align: left;
}

/* 确保表头文字横向显示 */
th {
    writing-mode: horizontal-tb !important;
    text-orientation: mixed !important;
    white-space: nowrap;
}

/* 确保操作列的按钮文字横向显示 */
.actions button {
    writing-mode: horizontal-tb !important;
    text-orientation: mixed !important;
    letter-spacing: normal;
    white-space: nowrap;
}
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
    background: white;
    padding: 0.5rem;
}

table {
    width: 100%;
    min-width: 800px;
    border-collapse: separate;
    border-spacing: 0;
    margin-bottom: 20px;
    border-radius: 12px;
    overflow: hidden;
}

th, td {
    border: none;
    padding: 16px;
    text-align: left;
    color: #4a5568;
    vertical-align: middle;
    transition: all 0.2s ease;
    position: relative;
}

th {
    background: linear-gradient(to right, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
    font-weight: 600;
    color: #2d3748;
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

tr {
    border-bottom: 1px solid #f0f2f5;
    transition: all 0.2s ease;
}

tr:last-child {
    border-bottom: none;
}

tr:nth-child(even) {
    background-color: rgba(247, 248, 252, 0.7);
}

tr:hover {
    background-color: rgba(102, 126, 234, 0.04);
    transform: none;
    box-shadow: inset 0 0 0 1px rgba(102, 126, 234, 0.1);
}

td {
    font-size: 0.95rem;
}

td a {
    color: #4c51bf;
    text-decoration: none;
    transition: color 0.2s ease;
}

td a:hover {
    color: #667eea;
    text-decoration: underline;
}

/* 按钮样式 */
button {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
    border: none;
    padding: 12px 24px;
    border-radius: 12px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    height: 44px;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.25);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

button svg {
    width: 18px;
    height: 18px;
    transition: transform 0.3s ease;
}

button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
        transparent,
        rgba(255, 255, 255, 0.3),
        transparent
    );
    transition: left 0.5s;
}

button:hover::before {
    left: 100%;
}

button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.35);
}

button:hover svg {
    transform: scale(1.1);
}

button:active {
    transform: translateY(0);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
}

button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    background: linear-gradient(135deg, #a0aec0 0%, #718096 100%);
    transform: none;
    box-shadow: none;
}

.edit-btn {
    background: linear-gradient(135deg, #3182ce 0%, #2c5282 100%);
    box-shadow: 0 4px 15px rgba(49, 130, 206, 0.25);
}

.edit-btn:hover {
    box-shadow: 0 8px 25px rgba(49, 130, 206, 0.35);
}

.del-btn {
    background: linear-gradient(135deg, #e53e3e 0%, #c53030 100%);
    box-shadow: 0 4px 15px rgba(229, 62, 62, 0.25);
}

.del-btn:hover {
    box-shadow: 0 8px 25px rgba(229, 62, 62, 0.35);
}

.edit-btn { 
    background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
    box-shadow: 0 4px 15px rgba(66, 153, 225, 0.3);
}
.edit-btn:hover { 
    box-shadow: 0 8px 25px rgba(66, 153, 225, 0.4);
}
.del-btn { 
    background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
    box-shadow: 0 4px 15px rgba(245, 101, 101, 0.3);
}
.del-btn:hover { 
    box-shadow: 0 8px 25px rgba(245, 101, 101, 0.4);
}

/* 修复: 统一表单控件样式 */
input[type="text"], input[type="number"], input[type="password"], .form-select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ced4da;
    border-radius: 6px;
    font-size: 1rem;
    outline: none;
    margin-bottom: 5px;
    transition: border-color 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
    height: 40px; /* 设定统一高度 */
}

select.form-select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px 12px;
  padding-right: 2.5rem; /* 为箭头图标留出空间 */
}

input[type="text"]:focus, input[type="number"]:focus, input[type="password"]:focus, .form-select:focus {
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
}

/* 后台筛选与分页控制样式 */
.filter-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.config-filter, .page-size-selector {
    margin-bottom: 0;
}

.page-size-selector {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

/* 分页样式 */
.pagination {
    text-align: center;
    margin-top: 20px;
}
.pagination button {
    margin: 0 5px;
    background-color: #e9ecef;
    color: #495057;
    border: 1px solid #ced4da;
}
.pagination button:hover { background-color: #dee2e6; }
.page-selector { display: inline-block; margin: 0 1rem; }
.page-selector button {
    cursor: pointer;
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    margin: 0 2px;
    height: auto; /* 重置页码按钮的高度 */
    transition: all 0.2s;
}
.page-selector button:hover:not(.bg-primary-500) { background-color: #dee2e6; }
.page-selector button.bg-primary-500 { background-color: #5a67d8; color: white; }
.page-selector span { margin: 0 5px; color: #6c757d; }

/* 标签页样式 */
.tab-wrapper { margin-top: 20px; }
.tab-buttons { display: flex; margin-bottom: -1px; flex-wrap: wrap; }
.tab-button {
    background-color: #f1f3f5;
    border: 1px solid #dee2e6;
    padding: 10px 15px;
    border-radius: 6px 6px 0 0;
    cursor: pointer;
    color: #495057;
    transition: background-color 0.2s, color 0.2s;
    position: relative;
    z-index: 1;
    height: auto;
}
.tab-button.active {
    background-color: #fff;
    border-bottom: 1px solid #fff;
    color: #212529;
    font-weight: 600;
    z-index: 3;
}
.tab-button:hover { background-color: #e9ecef; }
.tab-content {
    display: none;
    border: 1px solid #dee2e6;
    padding: 20px;
    border-radius: 0 8px 8px 8px;
    position: relative;
    z-index: 2;
    background: #fff;
}
.tab-content.active { display: block; }

/* 添加区域样式 */
.add-new {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
    align-items: center;
}
.add-new > input { flex: 1 1 150px; min-width: 150px; }
.add-new > button { flex-basis: auto; margin-top: 0; }

@media (max-width: 768px) {
    .add-new > button { flex-basis: 100%; margin-top: 5px; }
    td, th { 
        writing-mode: horizontal-tb !important;
        text-orientation: mixed !important;
    }
}

/* 导入导出按钮样式 */
.import-export { display: flex; gap: 10px; margin-bottom: 20px; justify-content: flex-end; flex-wrap: wrap; }

/* 模态框样式 */
.modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0; top: 0;
    width: 100%; height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
}
.modal-content {
    background-color: #fff;
    margin: 10% auto;
    padding: 25px;
    border: 1px solid #dee2e6;
    width: 80%;
    max-width: 600px;
    border-radius: 8px;
    position: relative;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}
.modal-close {
    color: #6c757d;
    position: absolute;
    right: 15px; top: 10px;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
    transition: color 0.2s;
}
.modal-close:hover { color: #343a40; }
.modal-content form { display: flex; flex-direction: column; }
.modal-content form label { margin-bottom: 5px; font-weight: 500; color: #495057; }
.modal-content form input { margin-bottom: 15px; }

/* 消息提示样式 */
#message { padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem; color: #fff; }
.success { background-color: #28a745; }
.error { background-color: #dc3545; }

/* 操作列样式 */
.actions { 
    display: flex; 
    gap: 8px; 
    justify-content: flex-start;
    align-items: center;
}
.actions button { 
    padding: 6px 12px; 
    font-size: 0.85rem; 
    height: auto;
    min-width: 60px;
    text-align: center;
    display: inline-block;
}

/* 后台登录页面样式 */
.login-container {
    max-width: 420px;
    width: 90%;
    margin: 0 auto;
    padding: 2.8rem;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    position: relative;
}

/* 桌面端居中 */
@media (min-height: 700px) {
    .login-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        margin: 0;
    }
}

/* 移动端适配 */
@media (max-width: 480px) {
    .login-container {
        width: 95%;
        padding: 2rem;
        margin-top: 2rem;
    }
}
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1),
                0 0 0 1px rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    transform: translateY(0);
    transition: all 0.3s ease;
}
.login-container:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.12),
                0 0 0 1px rgba(255, 255, 255, 0.3);
}
.login-title {
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 2.5rem;
    color: #2c3e50;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.form-group { 
    margin-bottom: 2rem;
    position: relative;
}
.form-group label {
    display: block;
    margin-bottom: 0.8rem;
    font-weight: 500;
    color: #4a5568;
    font-size: 0.95rem;
    transition: color 0.3s ease;
}
.form-group input {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e2e8f0;
    border-radius: 10px;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: rgba(255, 255, 255, 0.9);
}
.form-group input:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15);
    outline: none;
}
.login-container button {
    width: 100%;
    padding: 14px;
    font-size: 1.1rem;
    font-weight: 600;
    color: #fff;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}
.login-container button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
    );
    transition: left 0.5s;
}
.login-container button:hover::before {
    left: 100%;
}
.login-container button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}
.error-message {
    display: none;
    color: #e53e3e;
    background-color: #fff5f5;
    border: 1px solid #feb2b2;
    border-radius: 10px;
    padding: 12px;
    margin-bottom: 1.5rem;
    text-align: center;
    font-size: 0.95rem;
    animation: shake 0.5s ease-in-out;
}
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}
.back-link {
    display: block;
    text-align: center;
    margin-top: 2rem;
    color: #667eea;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 500;
    transition: all 0.3s ease;
}
.back-link:hover {
    color: #764ba2;
    text-decoration: none;
    transform: translateY(-1px);
}
`;

// 管理员页面 HTML
const adminHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>书签管理页面</title>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet">
  <style>${allStyles}</style>
</head>
<body>
  <div class="container">
      <h1>书签管理</h1>
  
      <div class="import-export">
        <input type="file" id="importFile" accept=".json" style="display:none;">
        <button id="importBtn">导入</button>
        <button id="exportBtn">导出</button>
      </div>
  
      <div class="add-new">
        <input type="text" id="addName" placeholder="名称*" required>
        <input type="text" id="addUrl" placeholder="URL*" required>
        <input type="text" id="addLogo" placeholder="Logo (可选)">
        <input type="text" id="addDesc" placeholder="描述 (可选)">
        <input type="text" id="addCatelog" placeholder="分类*" required>
        <input type="number" id="addSortOrder" placeholder="排序 (数字小靠前)">
        <button id="addBtn">添加</button>
      </div>
      <div id="message" style="display: none;"></div>
      
      <div class="tab-wrapper">
          <div class="tab-buttons">
             <button class="tab-button active" data-tab="config">书签列表</button>
             <button class="tab-button" data-tab="pending">待审核列表</button>
          </div>
          
          <div id="config" class="tab-content active">
              <div class="filter-controls">
                <div class="config-filter">
                    <select id="configCatalogFilter" class="form-select">
                        <option value="">所有分类</option>
                    </select>
                </div>
                
                <div class="page-size-selector">
                    <label for="pageSizeSelect">每页显示: </label>
                    <select id="pageSizeSelect" class="form-select" style="width: auto;">
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
              </div>
              
              <div class="table-wrapper">
                  <table id="configTable">
                      <thead>
                          <tr>
                            <th>ID</th>
                            <th>名称</th>
                            <th>URL</th>
                            <th>Logo</th>
                            <th>描述</th>
                            <th>分类</th>
                            <th>排序</th>
                            <th>操作</th>
                          </tr>
                      </thead>
                      <tbody id="configTableBody">
                      </tbody>
                  </table>
                  <div class="pagination">
                        <button id="prevPage" disabled>上一页</button>
                        <span id="currentPage">1</span>/<span id="totalPages">1</span>
                        <button id="nextPage" disabled>下一页</button>
                  </div>
             </div>
          </div>
          
          <div id="pending" class="tab-content">
             <div class="table-wrapper">
               <table id="pendingTable">
                  <thead>
                    <tr>
                        <th>ID</th>
                         <th>名称</th>
                         <th>URL</th>
                        <th>Logo</th>
                        <th>描述</th>
                        <th>分类</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody id="pendingTableBody">
                    </tbody>
                </table>
                 <div class="pagination">
                  <button id="pendingPrevPage" disabled>上一页</button>
                   <span id="pendingCurrentPage">1</span>/<span id="pendingTotalPages">1</span>
                  <button id="pendingNextPage" disabled>下一页</button>
                </div>
             </div>
           </div>
        </div>
  </div>

  <div class="modal" id="editModal">
    <div class="modal-content">
      <span class="modal-close">×</span>
      <h2>编辑站点</h2>
      <form id="editForm">
        <input type="hidden" id="editId">
        <label for="editName">名称:</label>
        <input type="text" id="editName" required>
        <label for="editUrl">URL:</label>
        <input type="text" id="editUrl" required>
        <label for="editLogo">Logo (可选):</label>
        <input type="text" id="editLogo">
        <label for="editDesc">描述 (可选):</label>
        <input type="text" id="editDesc">
        <label for="editCatelog">分类:</label>
        <input type="text" id="editCatelog" required>
        <label for="editSortOrder">排序:</label>
        <input type="number" id="editSortOrder">
        <button type="submit">保存</button>
      </form>
    </div>
  </div>

  <script>
    // 全局变量
    const configTableBody = document.getElementById('configTableBody');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const currentPageSpan = document.getElementById('currentPage');
    const totalPagesSpan = document.getElementById('totalPages');
    
    const pendingTableBody = document.getElementById('pendingTableBody');
    const pendingPrevPageBtn = document.getElementById('pendingPrevPage');
    const pendingNextPageBtn = document.getElementById('pendingNextPage');
    const pendingCurrentPageSpan = document.getElementById('pendingCurrentPage');
    const pendingTotalPagesSpan = document.getElementById('pendingTotalPages');
    
    const messageDiv = document.getElementById('message');
    
    const addBtn = document.getElementById('addBtn');
    const addName = document.getElementById('addName');
    const addUrl = document.getElementById('addUrl');
    const addLogo = document.getElementById('addLogo');
    const addDesc = document.getElementById('addDesc');
    const addCatelog = document.getElementById('addCatelog');
    const addSortOrder = document.getElementById('addSortOrder');
    
    const importBtn = document.getElementById('importBtn');
    const importFile = document.getElementById('importFile');
    const exportBtn = document.getElementById('exportBtn');
    
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    let currentPage = 1;
    let pageSize = 10;
    let totalItems = 0;
    let allConfigs = [];
    let currentSearchKeyword = '';
    
    let pendingCurrentPage = 1;
    let pendingPageSize = 10;
    let pendingTotalItems = 0;
    let allPendingConfigs = [];
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tab = button.dataset.tab;
            tabButtons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');
            tabContents.forEach(content => {
                content.classList.remove('active');
                if(content.id === tab) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = '搜索书签(名称，URL，分类)';
    searchInput.id = 'searchInput';
    searchInput.style.marginBottom = '10px';
    document.querySelector('.add-new').parentNode.insertBefore(searchInput, document.querySelector('.add-new'));
    
    const editModal = document.getElementById('editModal');
    const modalClose = editModal.querySelector('.modal-close');
    
    modalClose.addEventListener('click', () => {
        editModal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === editModal) {
            editModal.style.display = 'none';
        }
    });
    
    const editForm = document.getElementById('editForm');
    editForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const id = document.getElementById('editId').value;
        const name = document.getElementById('editName').value;
        const url = document.getElementById('editUrl').value;
        const logo = document.getElementById('editLogo').value;
        const desc = document.getElementById('editDesc').value;
        const catelog = document.getElementById('editCatelog').value;
        const sort_order = document.getElementById('editSortOrder').value;
        
        fetch(\`/api/config/\${id}\`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, url, logo, desc, catelog, sort_order })
        }).then(res => res.json())
        .then(data => {
            if (data.code === 200) {
                showMessage('修改成功', 'success');
                fetchConfigs(currentPage, currentSearchKeyword, document.getElementById('configCatalogFilter').value);
                editModal.style.display = 'none';
            } else {
                showMessage(data.message, 'error');
            }
        }).catch(err => {
            showMessage('网络错误', 'error');
        });
    });
    
    function loadCatalogs() {
        fetch('/api/config?page=1&pageSize=1000')
            .then(res => res.json())
            .then(data => {
                if (data.code === 200) {
                    const catalogs = [...new Set(data.data.map(item => item.catelog))];
                    const configCatalogFilter = document.getElementById('configCatalogFilter');
                    
                    configCatalogFilter.innerHTML = '<option value="">所有分类</option>'; // 清空旧数据
                    
                    catalogs.forEach(catalog => {
                        const option = document.createElement('option');
                        option.value = catalog;
                        option.textContent = catalog;
                        configCatalogFilter.appendChild(option);
                    });
                    
                    configCatalogFilter.addEventListener('change', function() {
                        currentPage = 1;
                        fetchConfigs(currentPage, currentSearchKeyword, this.value);
                    });
                }
            });
    }
    
    window.fetchConfigs = function(page = currentPage, keyword = currentSearchKeyword, catalog = '') {
        let url = \`/api/config?page=\${page}&pageSize=\${pageSize}\`;
        if (keyword) url += \`&keyword=\${encodeURIComponent(keyword)}\`;
        if (catalog) url += \`&catalog=\${encodeURIComponent(catalog)}\`;
        
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.code === 200) {
                    totalItems = data.total;
                    currentPage = data.page;
                    totalPagesSpan.innerText = Math.ceil(totalItems / pageSize) || 1;
                    currentPageSpan.innerText = currentPage;
                    allConfigs = data.data;
                    renderConfig(allConfigs);
                    updatePaginationButtons();
                    renderPageSelector();
                } else {
                    showMessage(data.message, 'error');
                }
            }).catch(err => {
                showMessage('网络错误', 'error');
            });
    };
    
    function renderConfig(configs) {
        configTableBody.innerHTML = '';
        if (configs.length === 0) {
            configTableBody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 20px;">没有配置数据</td></tr>';
            return;
        }
        
        configs.forEach(config => {
            const row = document.createElement('tr');
            row.innerHTML = \`
                <td>\${config.id}</td>
                <td>\${config.name}</td>
                <td><a href="\${config.url}" target="_blank">\${config.url}</a></td>
                <td>\${config.logo ? \`<img src="\${config.logo}" style="width:30px; border-radius: 4px;" />\` : 'N/A'}</td>
                <td>\${config.desc || 'N/A'}</td>
                <td>\${config.catelog}</td>
                <td>\${config.sort_order === 9999 ? '默认' : config.sort_order}</td>
                <td class="actions">
                    <button class="edit-btn" data-id="\${config.id}">编辑</button>
                    <button class="del-btn" data-id="\${config.id}">删除</button>
                </td>
            \`;
            configTableBody.appendChild(row);
        });
        
        bindActionEvents();
    }
    
    function bindActionEvents() {
        document.querySelectorAll('#configTableBody .edit-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                handleEdit(this.dataset.id);
            });
        });
        
        document.querySelectorAll('#configTableBody .del-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                handleDelete(this.dataset.id);
            });
        });
    }
    
    function handleEdit(id) {
        const configToEdit = allConfigs.find(c => c.id == id);
        if (!configToEdit) {
            showMessage('找不到要编辑的数据', 'error');
            return;
        }
        
        document.getElementById('editId').value = configToEdit.id;
        document.getElementById('editName').value = configToEdit.name;
        document.getElementById('editUrl').value = configToEdit.url;
        document.getElementById('editLogo').value = configToEdit.logo || '';
        document.getElementById('editDesc').value = configToEdit.desc || '';
        document.getElementById('editCatelog').value = configToEdit.catelog;
        document.getElementById('editSortOrder').value = configToEdit.sort_order === 9999 ? '' : configToEdit.sort_order;
        
        editModal.style.display = 'block';
    }
    
    function handleDelete(id) {
        if(!confirm('确认删除？')) return;
        
        fetch(\`/api/config/\${id}\`, { method: 'DELETE' })
        .then(res => res.json())
        .then(data => {
            if (data.code === 200) {
                showMessage('删除成功', 'success');
                // 删除成功后重新加载当前页数据和分类
                fetchConfigs(currentPage, currentSearchKeyword, document.getElementById('configCatalogFilter').value);
                loadCatalogs();
            } else {
                showMessage(data.message, 'error');
            }
        }).catch(err => {
            showMessage('网络错误', 'error');
        });
    }
    
    function showMessage(message, type) {
        messageDiv.innerText = message;
        messageDiv.className = type;
        messageDiv.style.display = 'block';
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 3000);
    }
    
    function updatePaginationButtons() {
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage >= Math.ceil(totalItems / pageSize);
    }
    
    function renderPageSelector() {
        const paginationContainer = document.querySelector('#config .pagination');
        const existingSelector = paginationContainer.querySelector('.page-selector');
        if (existingSelector) {
            paginationContainer.removeChild(existingSelector);
        }
        
        const totalPages = Math.ceil(totalItems / pageSize);
        if (totalPages <= 1) return;
        
        const pageSelector = document.createElement('div');
        pageSelector.className = 'page-selector';
        
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + 4);
        
        if (endPage === totalPages && endPage - startPage < 4) {
            startPage = Math.max(1, endPage - 4);
        }
        
        if (startPage > 1) {
            pageSelector.appendChild(createPageButton(1));
            if (startPage > 2) pageSelector.appendChild(createEllipsis());
        }
        
        for (let i = startPage; i <= endPage; i++) {
            pageSelector.appendChild(createPageButton(i));
        }
        
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) pageSelector.appendChild(createEllipsis());
            pageSelector.appendChild(createPageButton(totalPages));
        }
        
        const nextButton = document.getElementById('nextPage');
        paginationContainer.insertBefore(pageSelector, nextButton);
    }
    
    function createPageButton(pageNum) {
        const button = document.createElement('button');
        button.className = currentPage === pageNum ? 'bg-primary-500' : '';
        button.textContent = pageNum;
        button.addEventListener('click', () => {
            fetchConfigs(pageNum, currentSearchKeyword, document.getElementById('configCatalogFilter').value);
        });
        return button;
    }
    
    function createEllipsis() {
        const ellipsis = document.createElement('span');
        ellipsis.textContent = '...';
        return ellipsis;
    }
    
    // 修复: 修复分页按钮未传递筛选条件的问题
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            const currentCatalog = document.getElementById('configCatalogFilter').value;
            fetchConfigs(currentPage - 1, currentSearchKeyword, currentCatalog);
        }
    });
    
    // 修复: 修复分页按钮未传递筛选条件的问题
    nextPageBtn.addEventListener('click', () => {
        if (currentPage < Math.ceil(totalItems / pageSize)) {
            const currentCatalog = document.getElementById('configCatalogFilter').value;
            fetchConfigs(currentPage + 1, currentSearchKeyword, currentCatalog);
        }
    });
    
    document.getElementById('pageSizeSelect').addEventListener('change', function() {
        pageSize = parseInt(this.value);
        currentPage = 1;
        fetchConfigs(currentPage, currentSearchKeyword, document.getElementById('configCatalogFilter').value);
    });
    
    addBtn.addEventListener('click', () => {
        const name = addName.value;
        const url = addUrl.value;
        const logo = addLogo.value;
        const desc = addDesc.value;
        const catelog = addCatelog.value;
        const sort_order = addSortOrder.value;
        
        if (!name || !url || !catelog) {
            showMessage('名称, URL, 分类均为必填项', 'error');
            return;
        }
        
        fetch('/api/config', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, url, logo, desc, catelog, sort_order })
        }).then(res => res.json())
        .then(data => {
            if (data.code === 201) {
                showMessage('添加成功', 'success');
                addName.value = '';
                addUrl.value = '';
                addLogo.value = '';
                addDesc.value = '';
                addCatelog.value = '';
                addSortOrder.value = '';
                fetchConfigs();
                loadCatalogs(); // 重新加载分类
            } else {
                showMessage(data.message, 'error');
            }
        }).catch(err => showMessage('网络错误', 'error'));
    });
    
    importBtn.addEventListener('click', () => importFile.click());
    importFile.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                try {
                    const jsonData = JSON.parse(event.target.result);
                    fetch('/api/config/import', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(jsonData)
                    }).then(res => res.json())
                    .then(data => {
                        if (data.code === 201) {
                            showMessage('导入成功', 'success');
                            fetchConfigs();
                            loadCatalogs();
                        } else { showMessage(data.message, 'error'); }
                    }).catch(err => showMessage('网络错误', 'error'));
                } catch (error) { showMessage('JSON格式不正确', 'error'); }
            };
            reader.readAsText(file);
        }
    });
    
    exportBtn.addEventListener('click', () => {
        fetch('/api/config/export')
        .then(res => res.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'config.json';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }).catch(err => showMessage('网络错误', 'error'));
    });
    
    searchInput.addEventListener('input', () => {
        currentSearchKeyword = searchInput.value.trim();
        currentPage = 1;
        fetchConfigs(currentPage, currentSearchKeyword, document.getElementById('configCatalogFilter').value);
    });
    
    function fetchPendingConfigs(page = pendingCurrentPage) {
        fetch(\`/api/pending?page=\${page}&pageSize=\${pendingPageSize}\`)
        .then(res => res.json())
        .then(data => {
            if (data.code === 200) {
                pendingTotalItems = data.total;
                pendingCurrentPage = data.page;
                pendingTotalPagesSpan.innerText = Math.ceil(pendingTotalItems / pendingPageSize) || 1;
                pendingCurrentPageSpan.innerText = pendingCurrentPage;
                allPendingConfigs = data.data;
                renderPendingConfig(allPendingConfigs);
                updatePendingPaginationButtons();
            } else { showMessage(data.message, 'error'); }
        }).catch(err => showMessage('网络错误', 'error'));
    }
    
    function renderPendingConfig(configs) {
        pendingTableBody.innerHTML = '';
        if (configs.length === 0) {
            pendingTableBody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 20px;">没有待审核数据</td></tr>';
            return;
        }
        
        configs.forEach(config => {
            const row = document.createElement('tr');
            row.innerHTML = \`
                <td>\${config.id}</td>
                <td>\${config.name}</td>
                <td><a href="\${config.url}" target="_blank">\${config.url}</a></td>
                <td>\${config.logo ? \`<img src="\${config.logo}" style="width:30px; border-radius: 4px;" />\` : 'N/A'}</td>
                <td>\${config.desc || 'N/A'}</td>
                <td>\${config.catelog}</td>
                <td class="actions">
                    <button class="approve-btn edit-btn" data-id="\${config.id}">批准</button>
                    <button class="reject-btn del-btn" data-id="\${config.id}">拒绝</button>
                </td>
            \`;
            pendingTableBody.appendChild(row);
        });
        
        bindPendingActionEvents();
    }
    
    function bindPendingActionEvents() {
        document.querySelectorAll('.approve-btn').forEach(btn => {
            btn.addEventListener('click', function() { handleApprove(this.dataset.id); });
        });
        
        document.querySelectorAll('.reject-btn').forEach(btn => {
            btn.addEventListener('click', function() { handleReject(this.dataset.id); });
        });
    }
    
    function handleApprove(id) {
        if (!confirm('确定批准吗？')) return;
        
        fetch(\`/api/pending/\${id}\`, { method: 'PUT' })
        .then(res => res.json())
        .then(data => {
            if (data.code === 200) {
                showMessage('批准成功', 'success');
                fetchPendingConfigs();
                fetchConfigs();
                loadCatalogs();
            } else { showMessage(data.message, 'error'); }
        }).catch(err => showMessage('网络错误', 'error'));
    }
    
    function handleReject(id) {
        if (!confirm('确定拒绝吗？')) return;
        
        fetch(\`/api/pending/\${id}\`, { method: 'DELETE' })
        .then(res => res.json())
        .then(data => {
            if (data.code === 200) {
                showMessage('拒绝成功', 'success');
                fetchPendingConfigs();
            } else { showMessage(data.message, 'error'); }
        }).catch(err => showMessage('网络错误', 'error'));
    }
    
    function updatePendingPaginationButtons() {
        pendingPrevPageBtn.disabled = pendingCurrentPage === 1;
        pendingNextPageBtn.disabled = pendingCurrentPage >= Math.ceil(pendingTotalItems / pendingPageSize);
    }
    
    pendingPrevPageBtn.addEventListener('click', () => {
        if (pendingCurrentPage > 1) fetchPendingConfigs(pendingCurrentPage - 1);
    });
    
    pendingNextPageBtn.addEventListener('click', () => {
        if (pendingCurrentPage < Math.ceil(pendingTotalItems / pendingPageSize)) fetchPendingConfigs(pendingCurrentPage + 1);
    });
    
    // 初始化加载数据
    loadCatalogs();
    fetchConfigs();
    fetchPendingConfigs();
  </script>
</body>
</html>`;

// 登录页面 HTML
const loginHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>管理员登录</title>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet">
  <style>${allStyles}</style>
</head>
<body>
  <div class="login-container">
    <h1 class="login-title">管理员登录</h1>
    <form id="loginForm">
      <div class="form-group">
        <label for="username">用户名</label>
        <input type="text" id="username" name="username" required>
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input type="password" id="password" name="password" required>
      </div>
      <div class="error-message" id="errorMessage">用户名或密码错误</div>
      <button type="submit">登 录</button>
    </form>
    <a href="/" class="back-link">返回首页</a>
  </div>
  
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const loginForm = document.getElementById('loginForm');
      const errorMessage = document.getElementById('errorMessage');
      
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('error')) {
          errorMessage.style.display = 'block';
      }

      loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        errorMessage.style.display = 'none';

        window.location.href = '/admin?name=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password);
      });
    });
  </script>
</body>
</html>`;

// 主页面 HTML 生成函数
function generateMainHtml(sites, catalogs, currentCatalog) {
  return `<!DOCTYPE html>
  <html lang="zh-CN">
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Diggoo嘀咕 - 精品网址导航</title>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap" rel="stylesheet"/>
    <link rel="icon" href="https://blog.diggoo.xyz/images/head/a.webp" type="image/webp"/>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              primary: {
                50: '#f4f1fd',
                100: '#e9e3fb',
                200: '#d3c7f7',
                300: '#b0a0f0',
                400: '#8a70e7',
                500: '#7209b7',
                600: '#6532cc',
                700: '#5429ab',
                800: '#46238d',
                900: '#3b1f75',
                950: '#241245',
              },
              secondary: {
                50: '#eef4ff',
                100: '#e0ebff',
                200: '#c7d9ff',
                300: '#a3beff',
                400: '#7a9aff',
                500: '#5a77fb',
                600: '#4361ee',
                700: '#2c4be0',
                800: '#283db6',
                900: '#253690',
                950: '#1a265c',
              },
              accent: {
                50: '#ecfdff',
                100: '#d0f7fe',
                200: '#a9eefe',
                300: '#72e0fd',
                400: '#33cafc',
                500: '#4cc9f0',
                600: '#0689cb',
                700: '#0b6ca6',
                800: '#115887',
                900: '#134971',
                950: '#0c2d48',
              },
            },
            fontFamily: {
              sans: ['Noto Sans SC', 'sans-serif'],
            },
          }
        }
      }
    </script>
    <style>
      /* 自定义滚动条 */
      ::-webkit-scrollbar { width: 6px; height: 6px; }
      ::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
      ::-webkit-scrollbar-thumb { background: #d3c7f7; border-radius: 10px; }
      ::-webkit-scrollbar-thumb:hover { background: #7209b7; }
      
      /* 卡片悬停效果 */
      .site-card { transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); }
      .site-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1); }
      
      /* 复制成功提示动画 */
      @keyframes fadeInOut {
        0% { opacity: 0; transform: translateY(10px); }
        20% { opacity: 1; transform: translateY(0); }
        80% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-10px); }
      }
      .copy-success-animation { animation: fadeInOut 2s ease forwards; }
      
      /* 移动端侧边栏 */
      @media (max-width: 1023px) { /* Changed from 768px to lg breakpoint */
        .mobile-sidebar { transform: translateX(-100%); transition: transform 0.3s ease; }
        .mobile-sidebar.open { transform: translateX(0); }
        .mobile-overlay { opacity: 0; pointer-events: none; transition: opacity 0.3s ease; }
        .mobile-overlay.open { opacity: 1; pointer-events: auto; }
      }
      
      /* 多行文本截断 */
      .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    </style>
  </head>
  <body class="bg-gray-50 font-sans text-gray-800">
    <div class="fixed top-4 left-4 z-50 lg:hidden">
      <button id="sidebarToggle" class="p-2 rounded-lg bg-white shadow-md hover:bg-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
    
    <div id="mobileOverlay" class="fixed inset-0 bg-black bg-opacity-50 z-40 mobile-overlay lg:hidden"></div>
    
    <aside id="sidebar" class="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50 overflow-y-auto mobile-sidebar lg:transform-none transition-all duration-300">
      <div class="p-6">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl font-bold text-primary-500">Diggoo嘀咕</h2>
          <button id="closeSidebar" class="p-1 rounded-full hover:bg-gray-100 lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="mb-6">
          <div class="relative">
            <input id="searchInput" type="text" placeholder="搜索书签..." class="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <div>
          <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">分类导航</h3>
          <div class="space-y-1">
            <a href="?" class="flex items-center px-3 py-2 rounded-lg ${!currentCatalog ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'} w-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 ${!currentCatalog ? 'text-primary-500' : 'text-gray-400'}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              全部
            </a>
            ${catalogs.map(cat => `
              <a href="?catalog=${encodeURIComponent(cat)}" class="flex items-center px-3 py-2 rounded-lg ${cat === currentCatalog ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'} w-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 ${cat === currentCatalog ? 'text-primary-500' : 'text-gray-400'}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                ${cat}
              </a>
            `).join('')}
          </div>
        </div>
        
        <div class="mt-8 pt-6 border-t border-gray-200">
          <a href="https://blog.diggoo.xyz/" target="_blank" class="mt-4 flex items-center px-4 py-2 text-gray-600 hover:text-primary-500 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            访问博客
          </a>

          <a href="/admin" target="_blank" class="mt-4 flex items-center px-4 py-2 text-gray-600 hover:text-primary-500 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            后台管理
          </a>
        </div>
      </div>
    </aside>
    
    <main class="min-h-screen lg:ml-64 transition-all duration-300">
      <header class="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 text-white py-8 px-6 md:px-10">
        <div class="max-w-5xl mx-auto">
          <div class="flex flex-col md:flex-row items-center justify-center">
            <div class="text-center">
              <h1 class="text-3xl md:text-4xl font-bold mb-2">Diggoo嘀咕</h1>
              <p class="text-primary-100 max-w-xl">分享优质网站，构建更美好的网络世界</p>
            </div>
          </div>
        </div>
      </header>
      
      <section class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-800">
            ${currentCatalog ? `${currentCatalog} · ${sites.length} 个网站` : `全部收藏 · ${sites.length} 个网站`}
          </h2>
          <div class="text-sm text-gray-500 hidden md:block">
            <script>
               fetch('https://v1.hitokoto.cn')
                    .then(response => response.json())
                    .then(data => {
                     const hitokoto = document.getElementById('hitokoto_text')
                    hitokoto.href = 'https://hitokoto.cn/?uuid=' + data.uuid
                    hitokoto.innerText = data.hitokoto
                    })
                    .catch(console.error)
            </script>
            <div id="hitokoto"><a href="#" target="_blank" id="hitokoto_text">疏影横斜水清浅，暗香浮动月黄昏。</a></div>
          </div>
        </div>
        
        <div id="sitesGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          ${sites.map(site => `
            <div class="site-card group bg-white rounded-xl shadow hover:shadow-lg overflow-hidden" data-id="${site.id}" data-name="${site.name}" data-url="${site.url}" data-catalog="${site.catelog}">
              <div class="p-5">
                <a href="${site.url}" target="_blank" class="block">
                  <div class="flex items-start">
                  <div class="flex-shrink-0 mr-4">
                  ${site.logo 
                    ? `<img src="${site.logo}" alt="${site.name}" class="w-10 h-10 rounded-lg object-cover bg-gray-100">`
                    : `<div class="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-accent-400 flex items-center justify-center text-white font-bold text-lg">${site.name.charAt(0).toUpperCase()}</div>`
                  }
                </div>
                    <div class="flex-1 min-w-0">
                      <h3 class="text-base font-medium text-gray-900 truncate">${site.name}</h3>
                      <span class="inline-flex items-center px-2 py-0.5 mt-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        ${site.catelog}
                      </span>
                    </div>
                  </div>
                  
                  <p class="mt-2 text-sm text-gray-500 line-clamp-2" title="${site.desc || '暂无描述'}">${site.desc || '暂无描述'}</p>
                </a>
                
                <div class="mt-3 flex items-center justify-between">
                  <span class="text-xs text-gray-500 truncate max-w-[140px]">${site.url}</span>
                  <button class="copy-btn flex items-center px-2 py-1 bg-primary-100 text-primary-600 hover:bg-primary-200 rounded-full text-xs font-medium transition-colors" data-url="${site.url}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    复制
                    <span class="copy-success hidden absolute -top-8 right-0 bg-green-500 text-white text-xs px-2 py-1 rounded shadow-md">已复制!</span>
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
      
      <footer class="bg-white py-8 px-6 mt-12 border-t border-gray-200">
        <div class="max-w-5xl mx-auto text-center">
          <p class="text-gray-500">© ${new Date().getFullYear()} Diggoo嘀咕 | 愿你在此找到方向</p>
          <div class="mt-4 flex justify-center space-x-6">
            <a href="https://blog.diggoo.xyz/" target="_blank" class="text-gray-400 hover:text-primary-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </a>
          </div>
        </div>
      </footer>
    </main>
    
    <button id="backToTop" class="fixed bottom-8 right-8 p-3 rounded-full bg-primary-500 text-white shadow-lg opacity-0 invisible transition-all duration-300 hover:bg-primary-600">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11l7-7 7 7M5 19l7-7 7 7" /></svg>
    </button>
    
    <div id="addSiteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 opacity-0 invisible transition-all duration-300">
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 transform translate-y-8 transition-all duration-300">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold text-gray-900">添加新书签</h2>
            <button id="closeModal" class="text-gray-400 hover:text-gray-500"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
          </div>
          <form id="addSiteForm" class="space-y-4">
            <div>
              <label for="addSiteName" class="block text-sm font-medium text-gray-700">名称</label>
              <input type="text" id="addSiteName" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
            </div>
            <div>
              <label for="addSiteUrl" class="block text-sm font-medium text-gray-700">网址</label>
              <input type="text" id="addSiteUrl" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
            </div>
            <div>
              <label for="addSiteLogo" class="block text-sm font-medium text-gray-700">Logo (可选)</label>
              <input type="text" id="addSiteLogo" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
            </div>
            <div>
              <label for="addSiteDesc" class="block text-sm font-medium text-gray-700">描述 (可选)</label>
              <textarea id="addSiteDesc" rows="2" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"></textarea>
            </div>
            <div>
              <label for="addSiteCatelog" class="block text-sm font-medium text-gray-700">分类</label>
              <input type="text" id="addSiteCatelog" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" list="catalogList">
              <datalist id="catalogList">${catalogs.map(cat => `<option value="${cat}">`).join('')}</datalist>
            </div>
            <div class="flex justify-end pt-4">
              <button type="button" id="cancelAddSite" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 mr-3">取消</button>
              <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">提交</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        // 侧边栏控制
        const sidebar = document.getElementById('sidebar'), mobileOverlay = document.getElementById('mobileOverlay'), sidebarToggle = document.getElementById('sidebarToggle'), closeSidebarBtn = document.getElementById('closeSidebar');
        function openSidebar() { sidebar.classList.add('open'); mobileOverlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
        function closeSidebarMenu() { sidebar.classList.remove('open'); mobileOverlay.classList.remove('open'); document.body.style.overflow = ''; }
        if (sidebarToggle) sidebarToggle.addEventListener('click', openSidebar);
        if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebarMenu);
        if (mobileOverlay) mobileOverlay.addEventListener('click', closeSidebarMenu);
        
        // 复制链接功能
        document.querySelectorAll('.copy-btn').forEach(btn => {
          btn.addEventListener('click', function(e) {
            e.preventDefault(); e.stopPropagation();
            const url = this.getAttribute('data-url');
            navigator.clipboard.writeText(url).then(() => {
              const successMsg = this.querySelector('.copy-success');
              successMsg.classList.remove('hidden'); successMsg.classList.add('copy-success-animation');
              setTimeout(() => { successMsg.classList.add('hidden'); successMsg.classList.remove('copy-success-animation'); }, 2000);
            }).catch(err => { console.error('复制失败:', err); });
          });
        });
        
        // 返回顶部按钮
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
          window.addEventListener('scroll', () => { window.pageYOffset > 300 ? backToTop.classList.remove('opacity-0', 'invisible') : backToTop.classList.add('opacity-0', 'invisible'); });
          backToTop.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });
        }
        
        // 添加网站模态框
        const addSiteModal = document.getElementById('addSiteModal'), closeModalBtn = document.getElementById('closeModal'), cancelAddSite = document.getElementById('cancelAddSite'), addSiteForm = document.getElementById('addSiteForm');
        function closeModal() { if (addSiteModal) { addSiteModal.classList.add('opacity-0', 'invisible'); addSiteModal.querySelector('.max-w-md').classList.add('translate-y-8'); document.body.style.overflow = ''; } }
        if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
        if (cancelAddSite) cancelAddSite.addEventListener('click', closeModal);
        if (addSiteModal) addSiteModal.addEventListener('click', e => { if (e.target === addSiteModal) closeModal(); });
        
        if (addSiteForm) {
          addSiteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = { name: document.getElementById('addSiteName').value, url: document.getElementById('addSiteUrl').value, logo: document.getElementById('addSiteLogo').value, desc: document.getElementById('addSiteDesc').value, catelog: document.getElementById('addSiteCatelog').value };
            fetch('/api/config/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
            .then(res => res.json())
            .then(data => {
              if (data.code === 201) {
                const successDiv = document.createElement('div');
                successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50';
                successDiv.textContent = '提交成功，等待管理员审核';
                document.body.appendChild(successDiv);
                setTimeout(() => { if (document.body.contains(successDiv)) document.body.removeChild(successDiv); }, 3000);
                closeModal();
                addSiteForm.reset();
              } else { alert(data.message || '提交失败'); }
            })
            .catch(err => { console.error('网络错误:', err); alert('网络错误，请稍后重试'); });
          });
        }
        
        // 搜索功能
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
          searchInput.addEventListener('input', function() {
            const keyword = this.value.toLowerCase().trim();
            document.querySelectorAll('.site-card').forEach(card => {
              const name = card.dataset.name.toLowerCase(), url = card.dataset.url.toLowerCase(), catalog = card.dataset.catalog.toLowerCase();
              card.style.display = (name.includes(keyword) || url.includes(keyword) || catalog.includes(keyword)) ? '' : 'none';
            });
            const visibleCount = document.querySelectorAll('.site-card[style*="display: "], .site-card:not([style])').length;
            const countHeading = document.querySelector('h2');
            if (countHeading) {
               const currentCatText = new URLSearchParams(window.location.search).get('catalog') || '全部收藏';
               countHeading.textContent = keyword ? \`搜索结果 · \${visibleCount} 个网站\` : \`\${currentCatText} · \${visibleCount} 个网站\`;
            }
          });
        }
      });
    </script>
  </body>
  </html>`;
}

// API 处理
const api = {
  async handleRequest(request, env, ctx) {
    const url = new URL(request.url);
    const path = url。pathname。替换('/api'， '');
    const method = request.method;
    const id = url.pathname.split('/').pop();
    
    try {
      if (path === '/config') {
        if (method === 'GET') return await this.getConfig(request, env, ctx, url);
        if (method === 'POST') return await this.createConfig(request, env, ctx);
      }
      if (path === '/config/submit' && method === 'POST') return await this.submitConfig(request, env, ctx);
      if (path === `/config/${id}` && /^\d+$/.test(id)) {
        if (method === 'PUT') return await this.updateConfig(request, env, ctx, id);
        if (method === 'DELETE') return await this.deleteConfig(request, env, ctx, id);
      }
      if (path.startsWith('/pending/') && /^\d+$/.test(id)) {
        if (method === 'PUT') return await this.approvePendingConfig(request, env, ctx, id);
        if (method === 'DELETE') return await this.rejectPendingConfig(request, env, ctx, id);
      }
      if (path === '/config/import' && method === 'POST') return await this.importConfig(request, env, ctx);
      if (path === '/config/export' && method === 'GET') return await this.exportConfig(request, env, ctx);
      if (path === '/pending' && method === 'GET') return await this.getPendingConfig(request, env, ctx, url);
      
      return this.errorResponse('Method Not Allowed or Not Found', 405);
    } catch (error) {
      console.error(`API Error: ${error}`);
      return this.errorResponse(`Internal Server Error: ${error.message}`, 500);
    }
  },
  
  async getConfig(request, env, ctx, url) {
    const catalog = url.searchParams.get('catalog');
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10', 10);
    const keyword = url.searchParams.get('keyword');
    const offset = (page - 1) * pageSize;
    
    try {
      let conditions = [];
      let queryBindParams = [];
      
      if (catalog) {
        conditions.push("catelog = ?");
        queryBindParams.push(catalog);
      }
      
      if (keyword) {
        conditions.push("(name LIKE ? OR url LIKE ? OR catelog LIKE ?)");
        const likeKeyword = `%${keyword}%`;
        queryBindParams.push(likeKeyword, likeKeyword, likeKeyword);
      }
      
      const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
      
      const query = `SELECT * FROM sites ${whereClause} ORDER BY sort_order ASC, create_time DESC LIMIT ? OFFSET ?`;
      const countQuery = `SELECT COUNT(*) as total FROM sites ${whereClause}`;

      const { results } = await env.NAV_DB.prepare(query).bind(...queryBindParams, pageSize, offset).all();
      const countResult = await env.NAV_DB.prepare(countQuery).bind(...queryBindParams).first();
      const total = countResult ? countResult.total : 0;

      return new Response(JSON.stringify({ code: 200, data: results, total, page, pageSize }), { headers: { 'Content-Type': 'application/json' } });
    } catch (e) {
      return this.errorResponse(`Failed to fetch config data: ${e.message}`, 500)
    }
  },
  
  async getPendingConfig(request, env, ctx, url) {
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10', 10);
    const offset = (page - 1) * pageSize;
    try {
      const { results } = await env.NAV_DB.prepare(`SELECT * FROM pending_sites ORDER BY create_time DESC LIMIT ? OFFSET ?`).bind(pageSize, offset).all();
      const { total } = await env.NAV_DB.prepare(`SELECT COUNT(*) as total FROM pending_sites`).first();
      return new Response(JSON.stringify({ code: 200, data: results, total, page, pageSize }), { headers: {'Content-Type': 'application/json'} });
    } catch (e) {
      return this.errorResponse(`Failed to fetch pending config data: ${e.message}`, 500);
    }
  },
  
  async approvePendingConfig(request, env, ctx, id) {
    try {
      const pendingItem = await env.NAV_DB.prepare('SELECT * FROM pending_sites WHERE id = ?').bind(id).first();
      if(!pendingItem) return this.errorResponse('Pending config not found', 404);
      
      await env.NAV_DB.prepare(`INSERT INTO sites (name, url, logo, desc, catelog, sort_order) VALUES (?, ?, ?, ?, ?, 9999)`).bind(pendingItem.name, pendingItem.url, pendingItem.logo, pendingItem.desc, pendingItem.catelog).run();
      await env.NAV_DB.prepare('DELETE FROM pending_sites WHERE id = ?').bind(id).run();

      return new Response(JSON.stringify({ code: 200, message: 'Pending config approved successfully' }), { headers: { 'Content-Type': 'application/json' } });
    } catch(e) {
      return this.errorResponse(`Failed to approve pending config : ${e.message}`, 500);
    }
  },
  
  async rejectPendingConfig(request, env, ctx, id) {
    try {
      await env.NAV_DB.prepare('DELETE FROM pending_sites WHERE id = ?').bind(id).run();
      return new Response(JSON.stringify({ code: 200, message: 'Pending config rejected successfully' }), { headers: {'Content-Type': 'application/json'} });
    } catch(e) {
      return this.errorResponse(`Failed to reject pending config: ${e.message}`, 500);
    }
  },
  
  async submitConfig(request, env, ctx) {
    try {
      const { name, url, logo, desc, catelog } = await request.json();
      if (!name || !url || !catelog ) return this.errorResponse('Name, URL and Catelog are required', 400);
      
      await env.NAV_DB.prepare(`INSERT INTO pending_sites (name, url, logo, desc, catelog) VALUES (?, ?, ?, ?, ?)`).bind(name, url, logo, desc, catelog).run();

      return new Response(JSON.stringify({ code: 201, message: 'Config submitted successfully' }), { status: 201, headers: { 'Content-Type': 'application/json' } });
    } catch(e) {
      return this.errorResponse(`Failed to submit config : ${e.message}`, 500);
    }
  },
  
  async createConfig(request, env, ctx) {
    try {
      const { name, url, logo, desc, catelog, sort_order } = await request.json();
      if (!name || !url || !catelog ) return this.errorResponse('Name, URL and Catelog are required', 400);
      
      const result = await env.NAV_DB.prepare(`INSERT INTO sites (name, url, logo, desc, catelog, sort_order) VALUES (?, ?, ?, ?, ?, ?)`).bind(name, url, logo, desc, catelog, sort_order || 9999).run();

      return new Response(JSON.stringify({ code: 201, message: 'Config created successfully', data: result }), { status: 201, headers: { 'Content-Type': 'application/json' } });
    } catch(e) {
      return this.errorResponse(`Failed to create config : ${e.message}`, 500);
    }
  },
  
  async updateConfig(request, env, ctx, id) {
    try {
      const { name, url, logo, desc, catelog, sort_order } = await request.json();
      const result = await env.NAV_DB.prepare(`UPDATE sites SET name = ?, url = ?, logo = ?, desc = ?, catelog = ?, sort_order = ?, update_time = CURRENT_TIMESTAMP WHERE id = ?`).bind(name, url, logo, desc, catelog, sort_order || 9999, id).run();
      return new Response(JSON.stringify({ code: 200, message: 'Config updated successfully', data: result }), { headers: { 'Content-Type': 'application/json' }});
    } catch (e) {
      return this.errorResponse(`Failed to update config: ${e.message}`, 500);
    }
  },
  
  async deleteConfig(request, env, ctx, id) {
    try {
      const result = await env.NAV_DB.prepare('DELETE FROM sites WHERE id = ?').bind(id).run();
      return new Response(JSON.stringify({ code: 200, message: 'Config deleted successfully', data: result }), { headers: {'Content-Type': 'application/json'} });
    } catch(e) {
      return this.errorResponse(`Failed to delete config: ${e.message}`, 500);
    }
  },
  
  async importConfig(request, env, ctx) {
    try {
      const jsonData = await request.json();
      const sitesToImport = Array.isArray(jsonData) ? jsonData : (jsonData?.data || []);
      
      if (sitesToImport.length === 0) {
        return new Response(JSON.stringify({ code: 200, message: 'No valid data to import.' }), { headers: {'Content-Type': 'application/json'} });
      }

      const statements = sitesToImport.map(item =>
        env.NAV_DB.prepare(`INSERT INTO sites (name, url, logo, desc, catelog, sort_order) VALUES (?, ?, ?, ?, ?, ?)`).bind(item.name || null, item.url || null, item.logo || null, item.desc || null, item.catelog || null, item.sort_order || 9999)
      );
      await env.NAV_DB.batch(statements);

      return new Response(JSON.stringify({ code: 201, message: `Successfully imported ${sitesToImport.length} items.` }), { status: 201, headers: {'Content-Type': 'application/json'} });
    } catch (error) {
      return this.errorResponse(`Failed to import config : ${error.message}`, 500);
    }
  },
  
  async exportConfig(request, env, ctx) {
    try {
      const { results } = await env.NAV_DB.prepare('SELECT * FROM sites ORDER BY sort_order ASC, create_time DESC').all();
      const jsonData = JSON.stringify(results, null, 2); 
      return new Response(jsonData, { headers: { 'Content-Type': 'application/json; charset=utf-8', 'Content-Disposition': 'attachment; filename="config.json"' } });
    } catch(e) {
      return this.errorResponse(`Failed to export config: ${e.message}`, 500)
    }
  },
  
  errorResponse(message, status) {
    return new Response(JSON.stringify({ code: status, message: message }), { status: status, headers: { 'Content-Type': 'application/json' } });
  }
};

// 管理员页面处理
const admin = {
  async handleRequest(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/admin') {
      const params = url.searchParams;
      const name = params.get('name');
      const password = params.get('password');

      const storedUsername = await env.NAV_AUTH.get("admin_username");
      const storedPassword = await env.NAV_AUTH.get("admin_password");
      
      const isAuthDisabled = !storedUsername && !storedPassword;

      if (isAuthDisabled || (name === storedUsername && password === storedPassword)) {
        return new Response(adminHtml, { headers: {'Content-Type': 'text/html; charset=utf-8'} });
      } else if (name || password) {
        const loginUrl = new URL(request.url);
        loginUrl.searchParams.delete('name');
        loginUrl.searchParams.delete('password');
        loginUrl.searchParams.set('error', '1');
        return Response.redirect(loginUrl.toString(), 302);
      } else {
        return new Response(loginHtml, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
      }
    }
    
    return new Response('页面不存在', {status: 404});
  }
};

// 主处理函数
async function handleRequest(request, env, ctx) {
  const url = new URL(request.url);
  
  if (url.pathname.startsWith('/api')) return api.handleRequest(request, env, ctx);
  if (url.pathname === '/admin') return admin.handleRequest(request, env, ctx);
  
  // 主页面处理
  const catalog = url.searchParams.get('catalog');
  
  try {
    const { results: sites } = await env.NAV_DB.prepare('SELECT * FROM sites ORDER BY sort_order ASC, create_time DESC').all();
    if (!sites) return new Response('No site configuration found.', { status: 404 });

    const catalogs = [...new Set(sites.map(s => s.catelog))];
    const currentSites = catalog ? sites.filter(s => s.catelog === catalog) : sites;
    
    const html = generateMainHtml(currentSites, catalogs, catalog || '');
    return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8' } });
  } catch (e) {
    return new Response(`Failed to fetch data: ${e.message}`, { status: 500 });
  }
}

// 导出工作器
export default { fetch: handleRequest };
