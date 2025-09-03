/**
 * Cloudflare Workers 单文件部署版本
 * 包含所有功能、HTML、CSS 和 JavaScript
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
    background-color: #f8f9fa;
    color: #212529;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #343a40;
}

/* 表格样式 */
.table-wrapper {
    overflow-x: auto;
    margin-bottom: 1rem;
}

table {
    width: 100%;
    min-width: 800px;
    border-collapse: collapse;
    margin-bottom: 20px;
}

th, td {
    border: 1px solid #dee2e6;
    padding: 10px;
    text-align: left;
    color: #495057;
}

th {
    background-color: #f2f2f2;
    font-weight: 600;
}

tr:nth-child(even) {
    background-color: #f9f9f9;
}

/* 按钮样式 */
button {
    background-color: #6c63ff;
    color: #fff;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #534dc4;
}

.edit-btn {
    background-color: #17a2b8;
}

.del-btn {
    background-color: #dc3545;
}

/* 表单样式 */
input[type="text"], input[type="number"] {
    padding: 10px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 1rem;
    outline: none;
    margin-bottom: 5px;
    transition: border-color 0.2s;
}

input[type="text"]:focus, input[type="number"]:focus {
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
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

.pagination button:hover {
    background-color: #dee2e6;
}

/* 分类筛选和页码选择器样式 */
.config-filter {
    margin-bottom: 1rem;
}

.form-select {
    padding: 8px 12px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 1rem;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-select:focus {
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.page-size-selector {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.page-selector {
    display: inline-block;
    margin: 0 1rem;
}

.page-selector button {
    cursor: pointer;
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    margin: 0 2px;
    transition: all 0.2s;
}

.page-selector button:hover:not(.bg-primary-500) {
    background-color: #dee2e6;
}

.page-selector button.bg-primary-500 {
    background-color: #6c63ff;
    color: white;
}

.page-selector span {
    margin: 0 5px;
    color: #6c757d;
}

/* 标签页样式 */
.tab-wrapper {
    margin-top: 20px;
}

.tab-buttons {
    display: flex;
    margin-bottom: 10px;
    flex-wrap: wrap;
}

.tab-button {
    background-color: #e9ecef;
    border: 1px solid #dee2e6;
    padding: 10px 15px;
    border-radius: 4px 4px 0 0;
    cursor: pointer;
    color: #495057;
    transition: background-color 0.2s, color 0.2s;
}

.tab-button.active {
    background-color: #fff;
    border-bottom: 1px solid #fff;
    color: #212529;
}

.tab-button:hover {
    background-color: #f0f0f0;
}

.tab-content {
    display: none;
    border: 1px solid #dee2e6;
    padding: 10px;
    border-top: none;
}

.tab-content.active {
    display: block;
}

/* 添加区域样式 */
.add-new {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
}

.add-new > input {
    flex: 1 1 150px;
    min-width: 150px;
}

.add-new > button {
    flex-basis: 100%;
}

@media (min-width: 768px) {
    .add-new > button {
        flex-basis: auto;
    }
}

/* 导入导出按钮样式 */
.import-export {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    justify-content: flex-end;
    flex-wrap: wrap;
}

/* 模态框样式 */
.modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    background-color: #fff;
    margin: 10% auto;
    padding: 20px;
    border: 1px solid #dee2e6;
    width: 80%;
    max-width: 600px;
    border-radius: 8px;
    position: relative;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.modal-close {
    color: #6c757d;
    position: absolute;
    right: 10px;
    top: 0;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
    transition: color 0.2s;
}

.modal-close:hover {
    color: #343a40;
}

.modal-content form {
    display: flex;
    flex-direction: column;
}

.modal-content form label {
    margin-bottom: 5px;
    font-weight: 500;
    color: #495057;
}

/* 消息提示样式 */
#message {
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
}

.success {
    background-color: #28a745;
    color: #fff;
}

.error {
    background-color: #dc3545;
    color: #fff;
}

/* 操作列样式 */
.actions {
    display: flex;
    gap: 5px;
}

.actions button {
    padding: 5px 8px;
    font-size: 0.8rem;
}
`;

// 管理员页面 HTML
const adminHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>书签管理页面</title>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&display=swap" rel="stylesheet">
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
  
      <!-- 添加区域 -->
      <div class="add-new">
        <input type="text" id="addName" placeholder="Name" required>
        <input type="text" id="addUrl" placeholder="URL" required>
        <input type="text" id="addLogo" placeholder="Logo(optional)">
        <input type="text" id="addDesc" placeholder="Description(optional)">
        <input type="text" id="addCatelog" placeholder="Catelog" required>
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
              <!-- 分类筛选 -->
              <div class="config-filter">
                  <select id="configCatalogFilter" class="form-select">
                      <option value="">所有分类</option>
                  </select>
              </div>
              
              <!-- 每页显示数量选择 -->
              <div class="page-size-selector">
                  <label for="pageSizeSelect">每页显示: </label>
                  <select id="pageSizeSelect" class="form-select inline-block w-auto">
                      <option value="10">10条</option>
                      <option value="20">20条</option>
                      <option value="50">50条</option>
                      <option value="100">100条</option>
                  </select>
              </div>
              
              <div class="table-wrapper">
                  <table id="configTable">
                      <thead>
                          <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>URL</th>
                            <th>Logo</th>
                            <th>Description</th>
                            <th>Catelog</th>
                            <th>排序</th>
                            <th>Actions</th>
                          </tr>
                      </thead>
                      <tbody id="configTableBody">
                        <!-- 数据将由JS渲染 -->
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
                         <th>Name</th>
                         <th>URL</th>
                        <th>Logo</th>
                        <th>Description</th>
                        <th>Catelog</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody id="pendingTableBody">
                   <!-- 数据将由JS渲染 -->
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

  <!-- 编辑模态框 -->
  <div class="modal" id="editModal">
    <div class="modal-content">
      <span class="modal-close">×</span>
      <h2>编辑站点</h2>
      <form id="editForm">
        <input type="hidden" id="editId">
        <label for="editName">名称:</label>
        <input type="text" id="editName" required><br>
        <label for="editUrl">URL:</label>
        <input type="text" id="editUrl" required><br>
        <label for="editLogo">Logo(可选):</label>
        <input type="text" id="editLogo"><br>
        <label for="editDesc">描述(可选):</label>
        <input type="text" id="editDesc"><br>
        <label for="editCatelog">分类:</label>
        <input type="text" id="editCatelog" required><br>
        <label for="editSortOrder">排序:</label>
        <input type="number" id="editSortOrder"><br>
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
    
    // 分页和筛选变量
    let currentPage = 1;
    let pageSize = 10;
    let totalItems = 0;
    let allConfigs = [];
    let currentSearchKeyword = '';
    
    let pendingCurrentPage = 1;
    let pendingPageSize = 10;
    let pendingTotalItems = 0;
    let allPendingConfigs = [];
    
    // 初始化标签页切换
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
    
    // 添加搜索框
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = '搜索书签(名称，URL，分类)';
    searchInput.id = 'searchInput';
    searchInput.style.marginBottom = '10px';
    document.querySelector('.add-new').parentNode.insertBefore(searchInput, document.querySelector('.add-new'));
    
    // 编辑模态框控制
    const editModal = document.getElementById('editModal');
    const modalClose = editModal.querySelector('.modal-close');
    
    modalClose.addEventListener('click', () => {
        editModal.style.display = 'none';
    });
    
    // 点击模态框外部关闭
    window.addEventListener('click', (e) => {
        if (e.target === editModal) {
            editModal.style.display = 'none';
        }
    });
    
    // 编辑表单提交
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
                fetchConfigs();
                editModal.style.display = 'none';
            } else {
                showMessage(data.message, 'error');
            }
        }).catch(err => {
            showMessage('网络错误', 'error');
        });
    });
    
    // 加载分类并填充筛选下拉框
    function loadCatalogs() {
        fetch('/api/config?page=1&pageSize=1000')
            .then(res => res.json())
            .then(data => {
                if (data.code === 200) {
                    const catalogs = [...new Set(data.data.map(item => item.catelog))];
                    const configCatalogFilter = document.getElementById('configCatalogFilter');
                    
                    catalogs.forEach(catalog => {
                        const option = document.createElement('option');
                        option.value = catalog;
                        option.textContent = catalog;
                        configCatalogFilter.appendChild(option);
                    });
                    
                    // 添加筛选事件监听
                    configCatalogFilter.addEventListener('change', function() {
                        currentPage = 1;
                        fetchConfigs(currentPage, currentSearchKeyword, this.value);
                    });
                }
            });
    }
    
    // 获取配置数据（支持分类筛选）
    window.fetchConfigs = function(page = currentPage, keyword = currentSearchKeyword, catalog = '') {
        let url = \`/api/config?page=\${page}&pageSize=\${pageSize}\`;
        if (keyword) url += \`&keyword=\${keyword}\`;
        if (catalog) url += \`&catalog=\${catalog}\`;
        
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.code === 200) {
                    totalItems = data.total;
                    currentPage = data.page;
                    totalPagesSpan.innerText = Math.ceil(totalItems / pageSize);
                    currentPageSpan.innerText = currentPage;
                    allConfigs = data.data;
                    renderConfig(allConfigs);
                    updatePaginationButtons();
                    renderPageSelector(); // 渲染页码选择器
                } else {
                    showMessage(data.message, 'error');
                }
            }).catch(err => {
                showMessage('网络错误', 'error');
            });
    };
    
    // 渲染配置表格
    function renderConfig(configs) {
        configTableBody.innerHTML = '';
        if (configs.length === 0) {
            configTableBody.innerHTML = '<tr><td colspan="8">没有配置数据</td></tr>';
            return;
        }
        
        configs.forEach(config => {
            const row = document.createElement('tr');
            row.innerHTML = \`
                <td>\${config.id}</td>
                <td>\${config.name}</td>
                <td><a href="\${config.url}" target="_blank">\${config.url}</a></td>
                <td>\${config.logo ? \`<img src="\${config.logo}" style="width:30px;" />\` : 'N/A'}</td>
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
    
    // 绑定操作按钮事件
    function bindActionEvents() {
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.dataset.id;
                handleEdit(id);
            });
        });
        
        document.querySelectorAll('.del-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.dataset.id;
                handleDelete(id);
            });
        });
    }
    
    // 处理编辑操作
    function handleEdit(id) {
        fetch(\`/api/config?page=1&pageSize=1000\`)
        .then(res => res.json())
        .then(data => {
            const configToEdit = data.data.find(c => c.id == id);
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
        });
    }
    
    // 处理删除操作
    function handleDelete(id) {
        if(!confirm('确认删除？')) return;
        
        fetch(\`/api/config/\${id}\`, { method: 'DELETE' })
        .then(res => res.json())
        .then(data => {
            if (data.code === 200) {
                showMessage('删除成功', 'success');
                fetchConfigs();
            } else {
                showMessage(data.message, 'error');
            }
        }).catch(err => {
            showMessage('网络错误', 'error');
        });
    }
    
    // 显示消息提示
    function showMessage(message, type) {
        messageDiv.innerText = message;
        messageDiv.className = type;
        messageDiv.style.display = 'block';
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 3000);
    }
    
    // 更新分页按钮状态
    function updatePaginationButtons() {
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage >= Math.ceil(totalItems / pageSize);
    }
    
    // 页码选择器
    function renderPageSelector() {
        const paginationContainer = document.querySelector('#config .pagination');
        const existingSelector = document.querySelector('.page-selector');
        if (existingSelector) {
            paginationContainer.removeChild(existingSelector);
        }
        
        const totalPages = Math.ceil(totalItems / pageSize);
        if (totalPages <= 1) return;
        
        const pageSelector = document.createElement('div');
        pageSelector.className = 'page-selector';
        
        // 计算显示的页码范围
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + 4);
        
        // 调整起始页
        if (endPage === totalPages && endPage - startPage < 4) {
            startPage = Math.max(1, endPage - 4);
        }
        
        // 添加第一页和省略号
        if (startPage > 1) {
            pageSelector.appendChild(createPageButton(1));
            if (startPage > 2) {
                pageSelector.appendChild(createEllipsis());
            }
        }
        
        // 添加中间页码
        for (let i = startPage; i <= endPage; i++) {
            pageSelector.appendChild(createPageButton(i));
        }
        
        // 添加最后一页和省略号
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageSelector.appendChild(createEllipsis());
            }
            pageSelector.appendChild(createPageButton(totalPages));
        }
        
        // 插入到分页容器中
        const nextButton = document.getElementById('nextPage');
        paginationContainer.insertBefore(pageSelector, nextButton);
    }
    
    // 创建页码按钮
    function createPageButton(pageNum) {
        const button = document.createElement('button');
        button.className = \`px-3 py-1 mx-0.5 rounded \${currentPage === pageNum ? 'bg-primary-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}\`;
        button.textContent = pageNum;
        button.addEventListener('click', () => {
            fetchConfigs(pageNum, currentSearchKeyword, document.getElementById('configCatalogFilter').value);
        });
        return button;
    }
    
    // 创建省略号
    function createEllipsis() {
        const ellipsis = document.createElement('span');
        ellipsis.className = 'px-2 text-gray-500';
        ellipsis.textContent = '...';
        return ellipsis;
    }
    
    // 上一页/下一页事件
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            fetchConfigs(currentPage - 1);
        }
    });
    
    nextPageBtn.addEventListener('click', () => {
        if (currentPage < Math.ceil(totalItems / pageSize)) {
            fetchConfigs(currentPage + 1);
        }
    });
    
    // 每页显示数量变更
    document.getElementById('pageSizeSelect').addEventListener('change', function() {
        pageSize = parseInt(this.value);
        currentPage = 1;
        fetchConfigs(currentPage, currentSearchKeyword, document.getElementById('configCatalogFilter').value);
    });
    
    // 添加新配置
    addBtn.addEventListener('click', () => {
        const name = addName.value;
        const url = addUrl.value;
        const logo = addLogo.value;
        const desc = addDesc.value;
        const catelog = addCatelog.value;
        const sort_order = addSortOrder.value;
        
        if (!name || !url || !catelog) {
            showMessage('名称,URL,分类 必填', 'error');
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
                // 清空输入框
                addName.value = '';
                addUrl.value = '';
                addLogo.value = '';
                addDesc.value = '';
                addCatelog.value = '';
                addSortOrder.value = '';
                fetchConfigs();
            } else {
                showMessage(data.message, 'error');
            }
        }).catch(err => {
            showMessage('网络错误', 'error');
        });
    });
    
    // 导入功能
    importBtn.addEventListener('click', () => {
        importFile.click();
    });
    
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
                        } else {
                            showMessage(data.message, 'error');
                        }
                    }).catch(err => {
                        showMessage('网络错误', 'error');
                    });
                } catch (error) {
                    showMessage('JSON格式不正确', 'error');
                }
            };
            reader.readAsText(file);
        }
    });
    
    // 导出功能
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
        }).catch(err => {
            showMessage('网络错误', 'error');
        });
    });
    
    // 搜索功能
    searchInput.addEventListener('input', () => {
        currentSearchKeyword = searchInput.value.trim();
        currentPage = 1;
        fetchConfigs(currentPage, currentSearchKeyword);
    });
    
    // 待审核相关功能
    function fetchPendingConfigs(page = pendingCurrentPage) {
        fetch(\`/api/pending?page=\${page}&pageSize=\${pendingPageSize}\`)
        .then(res => res.json())
        .then(data => {
            if (data.code === 200) {
                pendingTotalItems = data.total;
                pendingCurrentPage = data.page;
                pendingTotalPagesSpan.innerText = Math.ceil(pendingTotalItems / pendingPageSize);
                pendingCurrentPageSpan.innerText = pendingCurrentPage;
                allPendingConfigs = data.data;
                renderPendingConfig(allPendingConfigs);
                updatePendingPaginationButtons();
            } else {
                showMessage(data.message, 'error');
            }
        }).catch(err => {
            showMessage('网络错误', 'error');
        });
    }
    
    function renderPendingConfig(configs) {
        pendingTableBody.innerHTML = '';
        if (configs.length === 0) {
            pendingTableBody.innerHTML = '<tr><td colspan="7">没有待审核数据</td></tr>';
            return;
        }
        
        configs.forEach(config => {
            const row = document.createElement('tr');
            row.innerHTML = \`
                <td>\${config.id}</td>
                <td>\${config.name}</td>
                <td><a href="\${config.url}" target="_blank">\${config.url}</a></td>
                <td>\${config.logo ? \`<img src="\${config.logo}" style="width:30px;" />\` : 'N/A'}</td>
                <td>\${config.desc || 'N/A'}</td>
                <td>\${config.catelog}</td>
                <td class="actions">
                    <button class="approve-btn" data-id="\${config.id}">批准</button>
                    <button class="reject-btn" data-id="\${config.id}">拒绝</button>
                </td>
            \`;
            pendingTableBody.appendChild(row);
        });
        
        bindPendingActionEvents();
    }
    
    function bindPendingActionEvents() {
        document.querySelectorAll('.approve-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.dataset.id;
                handleApprove(id);
            });
        });
        
        document.querySelectorAll('.reject-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.dataset.id;
                handleReject(id);
            });
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
            } else {
                showMessage(data.message, 'error');
            }
        }).catch(err => {
            showMessage('网络错误', 'error');
        });
    }
    
    function handleReject(id) {
        if (!confirm('确定拒绝吗？')) return;
        
        fetch(\`/api/pending/\${id}\`, { method: 'DELETE' })
        .then(res => res.json())
        .then(data => {
            if (data.code === 200) {
                showMessage('拒绝成功', 'success');
                fetchPendingConfigs();
            } else {
                showMessage(data.message, 'error');
            }
        }).catch(err => {
            showMessage('网络错误', 'error');
        });
    }
    
    function updatePendingPaginationButtons() {
        pendingPrevPageBtn.disabled = pendingCurrentPage === 1;
        pendingNextPageBtn.disabled = pendingCurrentPage >= Math.ceil(pendingTotalItems / pendingPageSize);
    }
    
    pendingPrevPageBtn.addEventListener('click', () => {
        if (pendingCurrentPage > 1) {
            fetchPendingConfigs(pendingCurrentPage - 1);
        }
    });
    
    pendingNextPageBtn.addEventListener('click', () => {
        if (pendingCurrentPage < Math.ceil(pendingTotalItems / pendingPageSize)) {
            fetchPendingConfigs(pendingCurrentPage + 1);
        }
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
  <style>
    .login-container {
      max-width: 380px;
      margin: 50px auto;
      padding: 2rem;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
    
    .login-title {
      font-size: 1.75rem;
      font-weight: 700;
      text-align: center;
      margin-bottom: 1.5rem;
      color: #333;
    }
    
    .form-group {
      margin-bottom: 1.25rem;
    }
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #555;
    }
    
    .back-link {
      display: block;
      text-align: center;
      margin-top: 1.5rem;
      color: #6c63ff;
      text-decoration: none;
      font-size: 0.875rem;
    }
    
    .back-link:hover {
      text-decoration: underline;
    }
  </style>
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
      
      loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
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
    <title>拾光集 - 精品网址导航</title>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap" rel="stylesheet"/>
    <link rel="icon" href="https://www.wangwangit.com/images/head/a.webp" type="image/webp"/>
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
      ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      ::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
      }
      ::-webkit-scrollbar-thumb {
        background: #d3c7f7;
        border-radius: 10px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #7209b7;
      }
      
      /* 卡片悬停效果 */
      .site-card {
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      }
      .site-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
      }
      
      /* 复制成功提示动画 */
      @keyframes fadeInOut {
        0% { opacity: 0; transform: translateY(10px); }
        20% { opacity: 1; transform: translateY(0); }
        80% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-10px); }
      }
      .copy-success-animation {
        animation: fadeInOut 2s ease forwards;
      }
      
      /* 移动端侧边栏 */
      @media (max-width: 768px) {
        .mobile-sidebar {
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }
        .mobile-sidebar.open {
          transform: translateX(0);
        }
        .mobile-overlay {
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .mobile-overlay.open {
          opacity: 1;
          pointer-events: auto;
        }
      }
      
      /* 多行文本截断 */
      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    </style>
  </head>
  <body class="bg-gray-50 font-sans text-gray-800">
    <!-- 移动端导航按钮 -->
    <div class="fixed top-4 left-4 z-50 lg:hidden">
      <button id="sidebarToggle" class="p-2 rounded-lg bg-white shadow-md hover:bg-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
    
    <!-- 移动端遮罩层 -->
    <div id="mobileOverlay" class="fixed inset-0 bg-black bg-opacity-50 z-40 mobile-overlay lg:hidden"></div>
    
    <!-- 侧边栏导航 -->
    <aside id="sidebar" class="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50 overflow-y-auto mobile-sidebar lg:transform-none transition-all duration-300">
      <div class="p-6">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl font-bold text-primary-500">拾光集</h2>
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
              <a href="?catalog=${cat}" class="flex items-center px-3 py-2 rounded-lg ${cat === currentCatalog ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'} w-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 ${cat === currentCatalog ? 'text-primary-500' : 'text-gray-400'}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                ${cat}
              </a>
            `).join('')}
          </div>
        </div>
        
        <div class="mt-8 pt-6 border-t border-gray-200">
          <a href="https://www.wangwangit.com/" target="_blank" class="mt-4 flex items-center px-4 py-2 text-gray-600 hover:text-primary-500 transition duration-300">
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
    
    <!-- 主内容区 -->
    <main class="min-h-screen lg:ml-64 transition-all duration-300">
      <!-- 顶部横幅 -->
      <header class="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 text-white py-8 px-6 md:px-10">
        <div class="max-w-5xl mx-auto">
          <div class="flex flex-col md:flex-row items-center justify-center">
            <div class="text-center">
              <h1 class="text-3xl md:text-4xl font-bold mb-2">拾光集</h1>
              <p class="text-primary-100 max-w-xl">分享优质网站，构建更美好的网络世界</p>
            </div>
          </div>
        </div>
      </header>
      
      <!-- 网站列表 -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <!-- 当前分类/搜索提示 -->
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
        
        <!-- 网站卡片网格 -->
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
      
      <!-- 页脚 -->
      <footer class="bg-white py-8 px-6 mt-12 border-t border-gray-200">
        <div class="max-w-5xl mx-auto text-center">
          <p class="text-gray-500">© ${new Date().getFullYear()} 拾光集 | 愿你在此找到方向</p>
          <div class="mt-4 flex justify-center space-x-6">
            <a href="https://www.wangwangit.com/" target="_blank" class="text-gray-400 hover:text-primary-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </main>
    
    <!-- 返回顶部按钮 -->
    <button id="backToTop" class="fixed bottom-8 right-8 p-3 rounded-full bg-primary-500 text-white shadow-lg opacity-0 invisible transition-all duration-300 hover:bg-primary-600">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11l7-7 7 7M5 19l7-7 7 7" />
      </svg>
    </button>
    
    <!-- 添加网站模态框 -->
    <div id="addSiteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 opacity-0 invisible transition-all duration-300">
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 transform translate-y-8 transition-all duration-300">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold text-gray-900">添加新书签</h2>
            <button id="closeModal" class="text-gray-400 hover:text-gray-500">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
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
              <datalist id="catalogList">
                ${catalogs.map(cat => `<option value="${cat}">`).join('')}
              </datalist>
            </div>
            
            <div class="flex justify-end pt-4">
              <button type="button" id="cancelAddSite" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 mr-3">
                取消
              </button>
              <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                提交
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        // 侧边栏控制
        const sidebar = document.getElementById('sidebar');
        const mobileOverlay = document.getElementById('mobileOverlay');
        const sidebarToggle = document.getElementById('sidebarToggle');
        const closeSidebar = document.getElementById('closeSidebar');
        
        function openSidebar() {
          sidebar.classList.add('open');
          mobileOverlay.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
        
        function closeSidebarMenu() {
          sidebar.classList.remove('open');
          mobileOverlay.classList.remove('open');
          document.body.style.overflow = '';
        }
        
        if (sidebarToggle) sidebarToggle.addEventListener('click', openSidebar);
        if (closeSidebar) closeSidebar.addEventListener('click', closeSidebarMenu);
        if (mobileOverlay) mobileOverlay.addEventListener('click', closeSidebarMenu);
        
        // 复制链接功能
        document.querySelectorAll('.copy-btn').forEach(btn => {
          btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const url = this.getAttribute('data-url');
            navigator.clipboard.writeText(url).then(() => {
              const successMsg = this.querySelector('.copy-success');
              successMsg.classList.remove('hidden');
              successMsg.classList.add('copy-success-animation');
              setTimeout(() => {
                successMsg.classList.add('hidden');
                successMsg.classList.remove('copy-success-animation');
              }, 2000);
            }).catch(err => {
              console.error('复制失败:', err);
              // 备用复制方法
              const textarea = document.createElement('textarea');
              textarea.value = url;
              textarea.style.position = 'fixed';
              document.body.appendChild(textarea);
              textarea.focus();
              textarea.select();
              try {
                document.execCommand('copy');
                const successMsg = this.querySelector('.copy-success');
                successMsg.classList.remove('hidden');
                successMsg.classList.add('copy-success-animation');
                setTimeout(() => {
                  successMsg.classList.add('hidden');
                  successMsg.classList.remove('copy-success-animation');
                }, 2000);
              } catch (e) {
                console.error('备用复制也失败了:', e);
                alert('复制失败，请手动复制');
              }
              document.body.removeChild(textarea);
            });
          });
        });
        
        // 返回顶部按钮
        const backToTop = document.getElementById('backToTop');
        
        window.addEventListener('scroll', function() {
          if (window.pageYOffset > 300) {
            backToTop.classList.remove('opacity-0', 'invisible');
          } else {
            backToTop.classList.add('opacity-0', 'invisible');
          }
        });
        
        if (backToTop) {
          backToTop.addEventListener('click', function() {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          });
        }
        
        // 添加网站模态框
        const addSiteModal = document.getElementById('addSiteModal');
        const closeModalBtn = document.getElementById('closeModal');
        const cancelAddSite = document.getElementById('cancelAddSite');
        const addSiteForm = document.getElementById('addSiteForm');
        
        function openModal() {
          if (addSiteModal) {
            addSiteModal.classList.remove('opacity-0', 'invisible');
            const modalContent = addSiteModal.querySelector('.max-w-md');
            if (modalContent) modalContent.classList.remove('translate-y-8');
            document.body.style.overflow = 'hidden';
          }
        }
        
        function closeModal() {
          if (addSiteModal) {
            addSiteModal.classList.add('opacity-0', 'invisible');
            const modalContent = addSiteModal.querySelector('.max-w-md');
            if (modalContent) modalContent.classList.add('translate-y-8');
            document.body.style.overflow = '';
          }
        }
        
        if (closeModalBtn) {
          closeModalBtn.addEventListener('click', function() {
            closeModal();
          });
        }
        
        if (cancelAddSite) {
          cancelAddSite.addEventListener('click', closeModal);
        }
        
        if (addSiteModal) {
          addSiteModal.addEventListener('click', function(e) {
            if (e.target === addSiteModal) {
              closeModal();
            }
          });
        }
        
        // 表单提交处理
        if (addSiteForm) {
          addSiteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('addSiteName').value;
            const url = document.getElementById('addSiteUrl').value;
            const logo = document.getElementById('addSiteLogo').value;
            const desc = document.getElementById('addSiteDesc').value;
            const catelog = document.getElementById('addSiteCatelog').value;
            
            fetch('/api/config/submit', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ name, url, logo, desc, catelog })
            })
            .then(res => res.json())
            .then(data => {
              if (data.code === 201) {
                // 显示成功消息
                const successDiv = document.createElement('div');
                successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in';
                successDiv.textContent = '提交成功，等待管理员审核';
                document.body.appendChild(successDiv);
                
                setTimeout(() => {
                  successDiv.classList.add('opacity-0');
                  setTimeout(() => {
                    if (document.body.contains(successDiv)) {
                      document.body.removeChild(successDiv);
                    }
                  }, 300);
                }, 2500);
                
                closeModal();
                addSiteForm.reset();
              } else {
                alert(data.message || '提交失败');
              }
            })
            .catch(err => {
              console.error('网络错误:', err);
              alert('网络错误，请稍后重试');
            });
          });
        }
        
        // 搜索功能
        const searchInput = document.getElementById('searchInput');
        const sitesGrid = document.getElementById('sitesGrid');
        const siteCards = document.querySelectorAll('.site-card');
        
        if (searchInput && sitesGrid) {
          searchInput.addEventListener('input', function() {
            const keyword = this.value.toLowerCase().trim();
            
            siteCards.forEach(card => {
              const name = card.getAttribute('data-name').toLowerCase();
              const url = card.getAttribute('data-url').toLowerCase();
              const catalog = card.getAttribute('data-catalog').toLowerCase();
              
              if (name.includes(keyword) || url.includes(keyword) || catalog.includes(keyword)) {
                card.classList.remove('hidden');
              } else {
                card.classList.add('hidden');
              }
            });
            
            // 搜索结果提示
            const visibleCards = sitesGrid.querySelectorAll('.site-card:not(.hidden)');
            const countHeading = document.querySelector('h2');
            if (countHeading) {
              countHeading.textContent = keyword ? '搜索结果 · ' + visibleCards.length + ' 个网站' : 
                (window.location.search.includes('catalog=') ? '${currentCatalog} · ' + visibleCards.length + ' 个网站' : '全部收藏 · ' + visibleCards.length + ' 个网站');
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
    const path = url.pathname.replace('/api', '');
    const method = request.method;
    const id = url.pathname.split('/').pop();
    
    try {
      if (path === '/config') {
        switch (method) {
          case 'GET':
            return await this.getConfig(request, env, ctx, url);
          case 'POST':
            return await this.createConfig(request, env, ctx);
          default:
            return this.errorResponse('Method Not Allowed', 405)
        }
      }
      
      if (path === '/config/submit' && method === 'POST') {
        return await this.submitConfig(request, env, ctx);
      }
      
      if (path === `/config/${id}` && /^\d+$/.test(id)) {
        switch (method) {
          case 'PUT':
            return await this.updateConfig(request, env, ctx, id);
          case 'DELETE':
            return await this.deleteConfig(request, env, ctx, id);
          default:
            return this.errorResponse('Method Not Allowed', 405)
        }
      }
      
      if (path.startsWith('/pending/') && /^\d+$/.test(id)) {
        switch (method) {
          case 'PUT':
            return await this.approvePendingConfig(request, env, ctx, id);
          case 'DELETE':
            return await this.rejectPendingConfig(request, env, ctx, id);
          default:
            return this.errorResponse('Method Not Allowed', 405)
        }
      }
      
      if (path === '/config/import' && method === 'POST') {
        return await this.importConfig(request, env, ctx);
      }
      
      if (path === '/config/export' && method === 'GET') {
        return await this.exportConfig(request, env, ctx);
      }
      
      if (path === '/pending' && method === 'GET') {
        return await this.getPendingConfig(request, env, ctx, url);
      }
      
      return this.errorResponse('Not Found', 404);
    } catch (error) {
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
      let query = `SELECT * FROM sites ORDER BY sort_order ASC, create_time DESC LIMIT ? OFFSET ?`;
      let countQuery = `SELECT COUNT(*) as total FROM sites`;
      let queryBindParams = [pageSize, offset];
      let countQueryParams = [];

      if (catalog) {
        query = `SELECT * FROM sites WHERE catelog = ? ORDER BY sort_order ASC, create_time DESC LIMIT ? OFFSET ?`;
        countQuery = `SELECT COUNT(*) as total FROM sites WHERE catelog = ?`
        queryBindParams = [catalog, pageSize, offset];
        countQueryParams = [catalog];
      }

      if (keyword) {
        const likeKeyword = `%${keyword}%`;
        query = `SELECT * FROM sites WHERE name LIKE ? OR url LIKE ? OR catelog LIKE ? ORDER BY sort_order ASC, create_time DESC LIMIT ? OFFSET ?`;
        countQuery = `SELECT COUNT(*) as total FROM sites WHERE name LIKE ? OR url LIKE ? OR catelog LIKE ?`;
        queryBindParams = [likeKeyword, likeKeyword, likeKeyword, pageSize, offset];
        countQueryParams = [likeKeyword, likeKeyword, likeKeyword];

        if (catalog) {
          query = `SELECT * FROM sites WHERE catelog = ? AND (name LIKE ? OR url LIKE ? OR catelog LIKE ?) ORDER BY sort_order ASC, create_time DESC LIMIT ? OFFSET ?`;
          countQuery = `SELECT COUNT(*) as total FROM sites WHERE catelog = ? AND (name LIKE ? OR url LIKE ? OR catelog LIKE ?)`;
          queryBindParams = [catalog, likeKeyword, likeKeyword, likeKeyword, pageSize, offset];
          countQueryParams = [catalog, likeKeyword, likeKeyword, likeKeyword];
        }
      }

      const { results } = await env.NAV_DB.prepare(query).bind(...queryBindParams).all();
      const countResult = await env.NAV_DB.prepare(countQuery).bind(...countQueryParams).first();
      const total = countResult ? countResult.total : 0;

      return new Response(
        JSON.stringify({
          code: 200,
          data: results,
          total,
          page,
          pageSize
        }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    } catch (e) {
      return this.errorResponse(`Failed to fetch config data: ${e.message}`, 500)
    }
  },
  
  async getPendingConfig(request, env, ctx, url) {
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10', 10);
    const offset = (page - 1) * pageSize;
    
    try {
      const { results } = await env.NAV_DB.prepare(`
        SELECT * FROM pending_sites ORDER BY create_time DESC LIMIT ? OFFSET ?
      `).bind(pageSize, offset).all();
      
      const countResult = await env.NAV_DB.prepare(`
        SELECT COUNT(*) as total FROM pending_sites
      `).first();
      
      const total = countResult ? countResult.total : 0;
      
      return new Response(
        JSON.stringify({
          code: 200,
          data: results,
          total,
          page,
          pageSize
        }),
        {headers: {'Content-Type': 'application/json'}}
      );
    } catch (e) {
      return this.errorResponse(`Failed to fetch pending config data: ${e.message}`, 500);
    }
  },
  
  async approvePendingConfig(request, env, ctx, id) {
    try {
      const { results } = await env.NAV_DB.prepare('SELECT * FROM pending_sites WHERE id = ?').bind(id).all();
      
      if(results.length === 0) {
        return this.errorResponse('Pending config not found', 404);
      }
      
      const config = results[0];
      
      await env.NAV_DB.prepare(`
        INSERT INTO sites (name, url, logo, desc, catelog, sort_order)
        VALUES (?, ?, ?, ?, ?, 9999) 
      `).bind(config.name, config.url, config.logo, config.desc, config.catelog).run();
      
      await env.NAV_DB.prepare('DELETE FROM pending_sites WHERE id = ?').bind(id).run();

      return new Response(JSON.stringify({
        code: 200,
        message: 'Pending config approved successfully'
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch(e) {
      return this.errorResponse(`Failed to approve pending config : ${e.message}`, 500);
    }
  },
  
  async rejectPendingConfig(request, env, ctx, id) {
    try {
      await env.NAV_DB.prepare('DELETE FROM pending_sites WHERE id = ?').bind(id).run();
      
      return new Response(JSON.stringify({
        code: 200,
        message: 'Pending config rejected successfully',
      }), { headers: {'Content-Type': 'application/json'} });
    } catch(e) {
      return this.errorResponse(`Failed to reject pending config: ${e.message}`, 500);
    }
  },
  
  async submitConfig(request, env, ctx) {
    try {
      const config = await request.json();
      const { name, url, logo, desc, catelog } = config;

      if (!name || !url || !catelog ) {
        return this.errorResponse('Name, URL and Catelog are required', 400);
      }
      
      await env.NAV_DB.prepare(`
        INSERT INTO pending_sites (name, url, logo, desc, catelog)
        VALUES (?, ?, ?, ?, ?)
      `).bind(name, url, logo, desc, catelog).run();

      return new Response(JSON.stringify({
        code: 201,
        message: 'Config submitted successfully, waiting for admin approve',
      }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch(e) {
      return this.errorResponse(`Failed to submit config : ${e.message}`, 500);
    }
  },
  
  async createConfig(request, env, ctx) {
    try {
      const config = await request.json();
      const { name, url, logo, desc, catelog, sort_order } = config;

      if (!name || !url || !catelog ) {
        return this.errorResponse('Name, URL and Catelog are required', 400);
      }
      
      const insert = await env.NAV_DB.prepare(`
        INSERT INTO sites (name, url, logo, desc, catelog, sort_order)
        VALUES (?, ?, ?, ?, ?, ?)
      `).bind(name, url, logo, desc, catelog, sort_order || 9999).run();

      return new Response(JSON.stringify({
        code: 201,
        message: 'Config created successfully',
        insert
      }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch(e) {
      return this.errorResponse(`Failed to create config : ${e.message}`, 500);
    }
  },
  
  async updateConfig(request, env, ctx, id) {
    try {
      const config = await request.json();
      const { name, url, logo, desc, catelog, sort_order } = config;

      const update = await env.NAV_DB.prepare(`
        UPDATE sites
        SET name = ?, url = ?, logo = ?, desc = ?, catelog = ?, sort_order = ?, update_time = CURRENT_TIMESTAMP
        WHERE id = ?
      `).bind(name, url, logo, desc, catelog, sort_order || 9999, id).run();
      
      return new Response(JSON.stringify({
        code: 200,
        message: 'Config updated successfully',
        update
      }), { headers: { 'Content-Type': 'application/json' }});
    } catch (e) {
      return this.errorResponse(`Failed to update config: ${e.message}`, 500);
    }
  },
  
  async deleteConfig(request, env, ctx, id) {
    try {
      const del = await env.NAV_DB.prepare('DELETE FROM sites WHERE id = ?').bind(id).run();
      
      return new Response(JSON.stringify({
        code: 200,
        message: 'Config deleted successfully',
        del
      }), { headers: {'Content-Type': 'application/json'} });
    } catch(e) {
      return this.errorResponse(`Failed to delete config: ${e.message}`, 500);
    }
  },
  
  async importConfig(request, env, ctx) {
    try {
      const jsonData = await request.json();
      let sitesToImport = [];

      if (Array.isArray(jsonData)) {
        sitesToImport = jsonData;
      } else if (jsonData && typeof jsonData === 'object' && Array.isArray(jsonData.data)) {
        sitesToImport = jsonData.data;
      } else {
        return this.errorResponse('Invalid JSON data format', 400);
      }
      
      if (sitesToImport.length === 0) {
        return new Response(JSON.stringify({
          code: 200,
          message: 'Import successful, but no data was found in the file.'
        }), { headers: {'Content-Type': 'application/json'} });
      }

      const insertStatements = sitesToImport.map(item =>
        env.NAV_DB.prepare(`
          INSERT INTO sites (name, url, logo, desc, catelog, sort_order)
          VALUES (?, ?, ?, ?, ?, ?)
        `).bind(item.name || null, item.url || null, item.logo || null, item.desc || null, item.catelog || null, item.sort_order || 9999)
      );

      await env.NAV_DB.batch(insertStatements);

      return new Response(JSON.stringify({
        code: 201,
        message: `Config imported successfully. ${sitesToImport.length} items added.`
      }), {
        status: 201,
        headers: {'Content-Type': 'application/json'}
      });
    } catch (error) {
      return this.errorResponse(`Failed to import config : ${error.message}`, 500);
    }
  },
  
  async exportConfig(request, env, ctx) {
    try {
      const { results } = await env.NAV_DB.prepare('SELECT * FROM sites ORDER BY sort_order ASC, create_time DESC').all();
      
      const pureJsonData = JSON.stringify(results, null, 2); 

      return new Response(pureJsonData, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Disposition': 'attachment; filename="config.json"'
        }
      });
    } catch(e) {
      return this.errorResponse(`Failed to export config: ${e.message}`, 500)
    }
  },
  
  errorResponse(message, status) {
    return new Response(JSON.stringify({
      code: status,
      message: message
    }), {
      status: status,
      headers: { 'Content-Type': 'application/json' },
    });
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

      // 从KV中获取凭据
      const storedUsername = await env.NAV_AUTH.get("admin_username");
      const storedPassword = await env.NAV_AUTH.get("admin_password");

      if (name === storedUsername && password === storedPassword) {
        return new Response(adminHtml, {
          headers: {'Content-Type': 'text/html; charset=utf-8'}
        });
      } else if (name || password) {
        return new Response('未授权访问', {
          status: 403,
          headers: { 'Content-Type': 'text/html; charset=utf-8' }
        });
      } else {
        return new Response(loginHtml, {
          headers: { 'Content-Type': 'text/html; charset=utf-8' }
        });
      }
    }
    
    return new Response('页面不存在', {status: 404});
  }
};

// 主处理函数
async function handleRequest(request, env, ctx) {
  const url = new URL(request.url);
  
  // API请求处理
  if (url.pathname.startsWith('/api')) {
    return api.handleRequest(request, env, ctx);
  }
  
  // 管理员页面处理
  if (url.pathname === '/admin') {
    return admin.handleRequest(request, env, ctx);
  }
  
  // 主页面处理
  const catalog = url.searchParams.get('catalog');
  let sites = [];
  
  try {
    const { results } = await env.NAV_DB.prepare('SELECT * FROM sites ORDER BY sort_order ASC, create_time DESC').all();
    sites = results;
  } catch (e) {
    return new Response(`Failed to fetch data: ${e.message}`, { status: 500 });
  }

  if (!sites || sites.length === 0) {
    return new Response('No site configuration found.', { status: 404 });
  }

  // 获取所有分类
  const catalogs = Array.from(new Set(sites.map(s => s.catelog)));
  
  // 根据URL参数筛选站点
  const currentCatalog = catalog || '';
  const currentSites = catalog ? sites.filter(s => s.catelog === currentCatalog) : sites;
  
  // 生成并返回主页面HTML
  const html = generateMainHtml(currentSites, catalogs, currentCatalog);
  return new Response(html, {
    headers: { 'content-type': 'text/html; charset=utf-8' }
  });
}

// 导出工作器
export default { fetch: handleRequest };
