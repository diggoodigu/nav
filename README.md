# 拾光集 - 精品网址导航站

<p align="center">
  <img src="https://github.com/user-attachments/assets/c0200239-4b89-4f3f-9d5d-99f731661d7c" alt="拾光集Logo" width="200">
</p>

<p align="center">
  一个优雅、快速、易于部署的书签（网址）收藏与分享平台，完全基于 Cloudflare 全家桶构建。
</p>

<p align="center">
  <a href="#✨-核心特性">特性</a> •
  <a href="#🚀-快速部署">部署</a> •
  <a href="#⬆️-版本升级">升级</a> •
  <a href="#🛠️-自定义开发">开发</a> •
  <a href="#🌟-贡献">贡献</a> •
  <a href="#changelog">更新日志</a>
</p>

<p align="center">
  <strong>在线体验:</strong> <a href="https://nav.wangwangit.com">https://nav.wangwangit.com</a>
</p>

---

## 🖼️ 效果预览

| 首页 | 后台管理 |
| :---: | :---: |
| ![首页预览](https://github.com/user-attachments/assets/b12755c5-7669-408f-be05-2db6ba1b02cc) | ![后台预览](https://github.com/user-attachments/assets/d387794d-95f8-42e9-879d-41fc6c5f5fa8) |

## ✨ 核心特性

- 📱 **响应式设计**：完美适配桌面、平板和手机等各种设备。
- 🎨 **主题美观**：界面简洁优雅，支持自定义主色调。
- 🔍 **快速搜索**：内置站内模糊搜索，迅速定位所需网站。
- 📂 **分类清晰**：通过分类组织书签，浏览直观高效。
- 🔒 **安全后台**：基于 KV 的管理员认证，提供完整的书签增删改查后台。
- 📝 **用户提交**：支持访客提交书签，经管理员审核后显示。
- ⚡ **性能卓越**：利用 Cloudflare 边缘缓存，实现秒级加载，并极大节省 D1 数据库读取成本。
- 📤 **数据管理**：支持书签数据的导入与导出，格式兼容，方便迁移。




## 🚀 快速部署

> **准备工作**: 你需要一个 Cloudflare 账号。

### 步骤 1: 创建 D1 数据库

1.  在 Cloudflare 控制台，进入 `Workers & Pages` -> `D1`。
2.  点击 `创建数据库`，数据库名称输入 `book`，然后创建。

    ![创建D1数据库](https://github.com/user-attachments/assets/f49d61ea-a87b-42ed-a460-98e53fb340e0)

3.  进入数据库的`控制台`，执行下方的 SQL 语句来快速创建所需的表结构。(注意移除中文注释)

    ![执行SQL](https://github.com/user-attachments/assets/be10c3a0-a862-467a-8114-d5c5c8e48d2a)

```sql
-- 创建已发布网站表
CREATE TABLE sites (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL,
url TEXT NOT NULL,
logo TEXT,
"desc" TEXT,
catelog TEXT NOT NULL,
status TEXT,
sort_order INTEGER NOT NULL DEFAULT 9999,
create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
update_time DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 创建待审核网站表
CREATE TABLE pending_sites (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL,
url TEXT NOT NULL,
logo TEXT,
"desc" TEXT,
catelog TEXT NOT NULL,
status TEXT,
create_time DATETIME DEFAULT CURRENT_TIMESTAMP
);
```
> **提示**: 使用 SQL 是最快捷的方式。如果你想手动建表，请确保字段名、类型与上述 SQL 一致。

### 步骤 2: 创建 KV 存储

1.  在 Cloudflare 控制台，进入 `Workers & Pages` -> `KV`。
2.  点击 `创建命名空间`，名称输入 `NAV_AUTH`。

    ![创建KV](https://github.com/user-attachments/assets/ed274f2d-2bf0-4f26-aa86-90e22286e94b)

3.  创建后，为此 KV 添加两个条目，用于设置后台登录的 **用户名** 和 **密码**。
    -   **admin_username**: 你的管理员用户名（例如 `admin`）
    -   **admin_password**: 你的管理员密码

    ![设置KV键值对](https://github.com/user-attachments/assets/2fd5742f-5709-4ad9-b4fa-865cbca0bb8e)

### 步骤 3: 创建并部署 Worker

1.  回到 `Workers & Pages`，点击 `创建应用程序` -> `创建 Worker`。
2.  为你的 Worker 指定一个名称（例如 `my-nav`），然后点击 `部署`。

    ![创建Worker](https://github.com/user-attachments/assets/02c3d4c4-6746-45fe-a428-516023fed880)

3.  部署后，点击 `编辑代码`。将本项目 `worker1.js` 文件中的所有代码复制并粘贴到编辑器中，替换掉原有内容。
4.  点击 `部署` 保存代码。

    ![编辑并部署代码](https://github.com/user-attachments/assets/f2f4fe86-aab1-4805-9ba3-bac8b889875d)

### 步骤 4: 绑定服务

1.  进入你刚刚创建的 Worker 的 `设置` -> `变量`。
2.  在 **D1 数据库绑定** 中，点击 `添加绑定`：
    -   变量名称: `NAV_DB`
    -   D1 数据库: 选择你创建的 `book`
3.  在 **KV 命名空间绑定** 中，点击 `添加绑定`：
    -   变量名称: `NAV_AUTH`
    -   KV 命名空间: 选择你创建的 `NAV_AUTH`

    ![绑定服务](https://github.com/user-attachments/assets/269f4678-4e8a-4dbd-a8d7-f186466f4380)

### 步骤 5: 开始使用

1.  访问你的 Worker 域名（例如 `my-nav.your-subdomain.workers.dev`）。首次访问会提示没有数据。
2.  访问 `你的域名/admin` 进入后台，使用你在 **步骤 2** 中设置的用户名和密码登录。
3.  在后台添加第一个书签后，首页即可正常显示。

    ![后台登录](https://github.com/user-attachments/assets/284e3560-284f-4313-a7c6-d651d2e25c00)

## ⬆️ 从旧版本升级

如果你是 **从 v1 之前的版本** 升级到最新版，你需要为 `sites` 表添加 `sort_order` 字段以支持自定义排序功能。

请进入你的 `book` 数据库控制台，执行以下 SQL 语句：

```sql
ALTER TABLE sites ADD COLUMN sort_order INTEGER DEFAULT 9999;
```

![执行ALTER语句](https://github.com/user-attachments/assets/4b12b1ef-042e-407d-9efb-7fecf9efb02c)

执行成功后，用最新的 `worker.js` 代码重新部署 Worker 即可。

## 🛠️ 自定义与开发

本项目所有逻辑均封装在 `worker.js` 单文件中，结构清晰，便于二次开发。

### 修改主题样式

你可以直接在 `worker.js` 文件顶部的 `tailwind.config` 对象中修改主题颜色。

```js
// worker.js
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: {
          // 修改为你喜欢的主色调
          500: '#7209b7', 
        },
        // ...其他颜色配置
      },
    }
  }
}
```

### 项目结构

-   `worker.js`: 包含所有后端逻辑、API 路由和前端页面渲染的入口文件。
-   主要逻辑模块:
    -   `api`: 处理所有数据交互的 API 请求。
    -   `admin`: 负责后台管理界面的渲染和逻辑。
    -   `handleRequest`: 负责前台页面的渲染和路由。

## 更新日志

### [v1] - [2025-06-06] - 功能增强与性能优化

本次更新带来了一系列核心功能增强和性能改进，致力于提供更强大、更快速、更友好的使用体验。

### [v2] - [2025-09-04] - 优化后台页面

- 增加了书签分类选择。
- 增加了每页显示书签数。
- 增加了页码选择，可以选择对应的页码。
- 修复了新增书签的时候，填了排序号，保存没有显示排序号。

#### ✨ 新功能 (Features)

*   **网站自定义排序**
    -   现在您可以在后台为每个网站设置一个“排序”值，数字越小，在前台显示的位置越靠前。
    -   所有查询接口已支持该排序逻辑，让您能够完全掌控网站的排列顺序。
*   **数据导入/导出体验优化**
    -   **无缝对接**: 导出的 `config.json` 文件现在可以直接用于导入，形成完美的体验闭环。
    -   **格式标准**: 导出的 JSON 文件为纯数据数组，格式整洁，便于阅读和在其他项目中使用。
    -   **智能导入**: 导入功能现在可以兼容新旧两种格式的配置文件，更加健壮和用户友好。

#### 📱 体验改进 (Improvements)

*   **后台移动端适配**
    -   优化了后台管理界面在手机等小屏幕设备上的布局，包括表单和表格，使得移动办公成为可能。

---

## 🔧 技术栈

-   **计算**: [Cloudflare Workers](https://workers.cloudflare.com/)
-   **数据库**: [Cloudflare D1](https://developers.cloudflare.com/d1/)
-   **存储**: [Cloudflare KV](https://developers.cloudflare.com/workers/runtime-apis/kv/)
-   **前端框架**: [TailwindCSS](https://tailwindcss.com/)

## 🌟 贡献

欢迎通过 Issue 或 Pull Request 为本项目贡献代码、提出问题或建议！

1.  Fork 本仓库
2.  创建你的功能分支 (`git checkout -b feature/amazing-feature`)
3.  提交你的更改 (`git commit -m 'Add some amazing feature'`)
4.  推送到你的分支 (`git push origin feature/amazing-feature`)
5.  创建一个 Pull Request

## 📄 许可证

本项目采用 [MIT](LICENSE) 许可证。

## 📞 联系方式

-   **项目作者**: [@一只会飞的旺旺](https://github.com/wangwangit)
-   **项目链接**: [https://github.com/wangwangit/nav](https://github.com/wangwangit/nav)

[![Powered by DartNode](https://dartnode.com/branding/DN-Open-Source-sm.png)](https://dartnode.com "Powered by DartNode - Free VPS for Open Source")

<p align="center">如果你喜欢这个项目，请给它一个 ⭐️！</p>
