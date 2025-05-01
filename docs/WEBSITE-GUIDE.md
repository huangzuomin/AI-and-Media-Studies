# 网站项目文档

本文档提供了使用Hugo框架和Hugoplate主题构建的网站的完整说明，包括设置、内容管理和部署流程。

## 目录结构

```
hugoplate/
├── assets/               # 需要处理的资源文件（CSS、JS、图片等）
│   ├── images/           # 需要处理的图片
│   └── css/
│       └── custom.css    # 自定义样式文件
├── content/              # 网站内容文件夹
│   ├── zh/               # 中文内容
│   │   ├── blog/         # 博客文章
│   │   ├── about/        # 关于页面
│   │   ├── projects/     # 项目案例
│   │   ├── research/     # 研究成果
│   │   └── sections/     # 首页各部分内容
│   │       ├── call-to-action/  # 号召性用语部分
│   │       └── testimonial/     # 用户评价部分
│   └── en/               # 英文内容（结构同中文）
├── layouts/              # 布局模板
│   ├── _default/         # 默认布局模板
│   ├── partials/         # 部分模板组件
│   │   ├── components/   # 可复用组件
│   │   └── home/         # 首页部分组件
│   ├── projects/         # 项目案例布局模板
│   └── research/         # 研究成果布局模板
├── static/               # 静态资源文件（不需要处理的文件）
│   └── images/           # 静态图片资源
│       ├── projects/     # 项目图片目录
│       └── research/     # 研究图片目录
└── hugo.toml             # Hugo配置文件
```

## 设置说明

### 环境要求

- [Hugo 扩展版](https://gohugo.io/installation/) 0.100.0 或更高版本
- Node.js 18.0 或更高版本

### 本地开发环境设置

1. 克隆仓库
```bash
git clone <repository-url>
cd hugoplate
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
hugo server
```

此时可通过 `http://localhost:1313` 访问网站。

## 内容管理

### 首页模块

首页由多个组件构成，包括：

1. **Banner**：位于顶部的背景图片横幅
2. **Features**：核心特性介绍区域
3. **Projects**：项目案例展示
4. **Recent Posts**：最新博客文章
5. **Call to Action**：号召性用语区域
6. **Testimonials**：用户评价区域

#### 修改 Banner

Banner 使用资源图片作为背景，需修改 `content/zh/_index.md` 文件中的 frontmatter：

```yaml
banner:
  title: "AI与媒体交叉研究"
  content: "探索人工智能与媒体融合的前沿实践..."
  image: "banner.jpg"
  button:
    enable: true
    label: "了解更多"
    link: "about"
```

Banner 图片应放在 `assets/images/` 目录下。

### 内容类型

#### 博客文章

在 `content/zh/blog/` 目录下创建 markdown 文件：

```yaml
---
title: "文章标题"
date: 2023-05-24T18:30:00+08:00
image: "/images/blog/post-thumbnail.jpg"
categories: ["AI", "媒体"]
tags: ["机器学习", "内容生成"]
draft: false
---

文章内容...
```

#### 项目案例

在 `content/zh/projects/` 目录下创建 markdown 文件：

```yaml
---
title: "项目标题"
date: 2023-06-10T10:00:00+08:00
description: "项目简短描述"
image: "/images/projects/project-1.jpg"
categories: ["内容生成", "媒体工具"]
tags: ["AI写作", "新闻生产"]
status: "已完成"  # 可选："已完成"、"进行中"
client: "客户名称"
duration: "项目周期"
website: "https://example.com"
tech_stack: ["Python", "TensorFlow", "React"]
draft: false
---

项目内容...
```

**注意**：项目图片应放在 `static/images/projects/` 目录中。

#### 研究成果

在 `content/zh/research/` 目录下创建 markdown 文件：

```yaml
---
title: "论文标题"
date: 2023-04-15
description: "研究简短描述"
image: "/images/research/paper-1.jpg"
authors: ["作者1", "作者2"]
publication: "发表期刊/会议"
publication_url: "https://doi.org/xxxxx"
draft: false
---

研究内容...
```

### 首页各部分内容

#### 用户评价

修改 `content/zh/sections/testimonial/index.md` 文件：

```yaml
---
enable: true
title: "用户评价"
description: "了解合作伙伴对我们的评价"

testimonials:
  - name: "张三"
    designation: "媒体总监"
    avatar: "images/avatar-1.png"
    content: "评价内容..."

  - name: "李四"
    designation: "AI研究员"
    avatar: "images/avatar-2.png"
    content: "评价内容..."
---
```

#### 号召性用语

修改 `content/zh/sections/call-to-action/index.md` 文件：

```yaml
---
enable: true
title: "准备好开始您的项目了吗？"
description: "联系我们，一起探索AI与媒体的融合可能"
image: "images/cta-image.png"
button:
  enable: true
  label: "联系我们"
  link: "contact"
---
```

## 自定义样式

自定义样式文件位于 `assets/css/custom.css`，您可以在此添加或修改样式。

主要自定义样式包括：

1. Banner 背景图片样式
2. 项目卡片样式
3. 暗色模式适配
4. 内容排版调整

## 部署流程

### Vercel 部署

1. Fork 或复制代码库到您的 GitHub 账户
2. 在 Vercel 中导入项目
3. 设置构建命令为 `hugo --gc --minify`
4. 发布目录设置为 `public`

**注意事项**：
- 确保代码库中的文件名不要过长，否则可能导致 Vercel 解压失败
- 确保 Hugo 版本兼容性，可通过 `vercel.json` 设置

### 手动部署

1. 生成静态文件
```bash
hugo --minify
```

2. 静态文件将生成在 `public` 目录中，可将该目录内容上传至任何静态网站托管服务

## 常见问题解决

### 图片不显示

- 检查图片路径是否正确
- 静态图片应放在 `static/images/` 目录
- 需要处理的图片应放在 `assets/images/` 目录
- 在内容中引用静态图片时使用 `/images/filename.jpg`（带前导斜杠）
- 在模板中引用资源图片时使用 `{{ resources.Get "images/filename.jpg" }}`

### 内容更新后未显示

- 确保内容的 frontmatter 正确
- 检查 `draft: false` 设置（draft 为 true 的内容在生产环境不显示）
- 清除缓存：`hugo --gc` 或删除 `resources/_gen` 目录
- 重启 Hugo 服务器：`hugo server`

### 多语言问题

- 多语言设置在 `hugo.toml` 中配置
- 确保每种语言的内容路径正确（zh、en 等）
- 使用 `{{ relLangURL }}` 生成语言相关的 URL

## 自定义开发

### 添加新组件

1. 在 `layouts/partials/components/` 下创建新组件
2. 在需要的页面模板中引用该组件：`{{ partial "components/your-component.html" . }}`

### 修改现有模板

主要模板文件：

- `layouts/index.html` - 首页模板
- `layouts/partials/recent-posts.html` - 博客文章列表模板
- `layouts/projects/list.html` - 项目列表模板
- `layouts/projects/single.html` - 项目详情模板
- `layouts/partials/components/project-card.html` - 项目卡片组件

## 内容维护工作流

1. 定期更新博客文章
2. 添加新的项目案例
3. 更新研究成果
4. 确保所有图片资源放在正确位置
5. 推送到 Git 仓库，触发自动部署 