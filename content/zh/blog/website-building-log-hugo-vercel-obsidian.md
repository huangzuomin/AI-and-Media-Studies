---
# 文章标题 (根据内容生成/修改)
title: "建站手记：用 Hugo, Vercel, Obsidian 打造我的数字根据地「温故智新」" # 根据文章内容和个人网站风格生成
# 文章发布日期和时间 (保留原值)
date: 2025-05-02T23:47:01+08:00
# 文章 SEO 描述 (根据内容生成)
description: "记录从零开始搭建个人网站「温故智新」的全过程，分享技术选型（Hugo, Vercel, Obsidian）、遇到的挑战与思考，以及在平台时代构建数字根据地的价值。" # 根据文章内容生成
# 文章列表页摘要 (根据内容生成)
summary: "在自媒体平台盛行的当下，为何还要搭建个人网站？本文记录了作者从零开始使用 Hugo、Vercel 和 Obsidian 搭建个人数字根据地「温故智新」的完整过程。分享了技术选型、遇到的挑战、Obsidian 无缝写作流的实现，以及在平台时代构建自主数字空间的深层思考与价值。" # 根据文章内容生成
# 草稿状态 (保留原值)
draft: false
# --- 可选字段 ---
# 文章作者 (保留原值)
author: "黄作敏"
# 文章分类 (根据内容建议)
categories:
 - "建站"
 - "技术实践"
 - "知识管理" # 根据文章内容建议
# 文章标签 (根据内容提炼 3-5 个)
tags:
 - "个人网站"
 - "Hugo"
 - "Vercel"
 - "Obsidian"
 - "建站手记" # 根据文章内容提炼
---

![jimeng-2025-05-02-38-.jpeg](https://pic.huangzuomin.com/jimeng-2025-05-02-38-.jpeg)


### 建站手记：从零到一，打造“温故智新”的数字根据地

五一假期，我投入了两天时间，从零开始搭建了一个个人网站——“温故智新”。这是一个酝酿已久的计划，也是一次技术实践与自我梳理的深度结合。这篇文章将记录建站的缘起、过程、技术选型、遇到的挑战以及背后的思考，希望为有类似想法的朋友提供参考，同时也分享我对个人网站价值的理解。

---

#### 一、为何而建？平台时代下的个人网站之问

在自媒体平台如微信公众号、知乎、B站等成熟且便捷的今天，花费时间和精力搭建一个独立的个人网站，似乎显得“多此一举”。这是一个我在动工前反复思考的问题。平台无疑是内容分发和触达读者的重要渠道，我也仍会继续使用它们。但对我而言，搭建个人网站“温故智新”，有着平台无法完全替代的价值：

1. **数字主权与掌控力**：平台是“租来的地”，规则由他人制定，内容审核、算法推荐、甚至平台兴衰都可能影响创作者的表达。而个人网站是真正的“数字房产”，从设计风格到内容结构，再到数据归属，我拥有近乎完全的掌控权。(抱歉，这点是凑数用的)
2. **内容的永久性与沉淀价值**：个人网站是一个稳定的“数字档案馆”，可以按自己的逻辑组织内容，不会因平台迭代或策略调整而丢失。它更适合承载经过时间沉淀、具有长久参考价值的思考和记录，而非平台上追求时效性的即时内容。
3. **品牌形象的统一与专业性**：一个精心设计的个人网站，能更全面、系统地展现个人的专长与思考，显著提升在专业场景中的可信度。
4. **信息架构的自主性与技术探索**：我可以自由设计网站的分类、标签甚至知识图谱，同时将其作为新技术（如数据可视化、互动应用）的试验田。
5. **摆脱算法依赖，建立直接连接**：个人网站是一个不依赖平台推荐的自主流量入口，通过SEO、友链等方式积累忠实读者，建立更纯粹的交流关系。

简而言之，自媒体平台是“广场”，适合快速传播与互动；而个人网站是“书房”，适合深度思考、系统整理和长期连接。两者互补，而“温故智新”是我为自己思想和创作构筑的一个稳定、自主的“数字根据地”。

---

#### 二、缘起与目标：从想法到行动

建立个人网站的念头由来已久。作为一个长期从事内容创作的人，我希望拥有一个完全自主、能自由沉淀思考、不受平台限制的数字空间。目标很简单：搭建一个简洁、快速、易于维护的静态网站，用于记录思考、分享实践，并与志同道合的朋友交流。

---

#### 三、技术选型：工具链的平衡与取舍

基于上述目标，我综合考虑了技术门槛、维护成本和工作流整合，最终选择了以下技术栈：

1. **静态站点生成器 (SSG)：Hugo**
   - **理由**：Hugo 以生成速度快著称（基于 Go 语言），适合内容量逐渐增多的场景；它是单一二进制文件，几乎无外部依赖，安装使用简便；天然支持 Markdown，对内容创作者友好；社区活跃，主题丰富。我选用了设计简洁现代的 **Hugoplate** 主题，与我的审美契合。
 
2. **部署平台：Vercel**
   - **理由**：Vercel 对个人开发者友好，提供慷慨的免费额度，支持与 GitHub 深度集成，实现自动化 CI/CD 部署。每次 git push，Vercel 自动拉取代码、构建并部署到全球 CDN，流程无比顺畅。

3. **辅助工具：人工智能 (AI)**
   - **背景**：作为 Go 语言和 Hugo 的新手，我对模板语法和配置逻辑并不熟悉。
   - **应用**：AI 在这两天中扮演了“高效问答引擎”和“代码参考库”的角色。无论是 Hugo 模板报错、CSS 样式调整，还是配置文件调试，AI 都能快速提供指向性解答或代码片段，极大节省了查阅文档的时间，加速了从零到一的过程。

---

#### 四、搭建过程：从环境准备到上线

整个建站过程耗时两天，大致分为以下步骤：

1. **环境准备**：安装 Hugo 和 Git，确保本地开发环境就绪。
2. **项目初始化**：通过 Hugo 命令创建新站点，并引入 Hugoplate 主题。
3. **配置与定制**：根据主题文档调整 `hugo.toml` 配置文件，设置站点信息、导航、社交链接等。这部分最耗时，需理解 Hugo 模板结构和主题定制逻辑，AI 在此提供了不少帮助。
4. **内容迁移与创建**：整理部分现有笔记（Markdown 格式），放入 `content` 目录。
5. **本地预览与调试**：使用 `hugo server` 命令实时预览效果，不断调整直至满意。
6. **部署上线**：将项目托管至 GitHub，在 Vercel 上关联仓库，完成首次自动化部署。后续更新只需 git push 即可触发部署。

---

#### 五、整合写作流：Obsidian 与 Hugo 的无缝衔接

对我而言，建站只是第一步，如何实现高效、低成本的内容更新同样关键。我日常使用 Obsidian 作为知识管理和写作工具，打通 Obsidian 到 Hugo 的发布流是本次建站的核心考量。

- **实现方式**：Hugo 的内容源是 `content` 目录下的 Markdown 文件，而 Obsidian 也是基于 Markdown。因此，我将 Hugo 的 `content` 目录直接设置为 Obsidian 的一个库（Vault）子文件夹。文章完成后，无需格式转换，只需置于对应目录，执行 Hugo 构建命令并 git push 即可发布。
- **优势**：这种整合让我在熟悉的 Obsidian 环境中利用双链、标签等功能进行写作，极大降低了更新网站的心理和操作成本，使创作与发布融为一体。

---

#### 六、网站定位与内容规划：“温故智新”的内涵

技术实现只是手段，更核心的是明确这个数字空间的定位和方向。我将网站命名为“温故智新”，并赋予其个人化的含义：

- **“温故”**：回顾与反思我多年在媒体行业的经验、内容积累和对传播规律的理解，这是我的基点。
- **“智新”**：一方面直指人工智能（AI），代表我当前及未来的探索前沿；另一方面，“新”涵盖新事物、新方法，以及 AI 带来的变革，同时暗含“新闻”之意，落点在于如何以“智”与“新”赋能内容创作与传播创新。

配套的副标题进一步诠释定位：
- “一个媒体人的 AI 探索笔记”：界定身份视角（媒体人）与内容主题（AI 探索）。
- “AI 不释手的实践与思考”：强调方法论（动手实践）与内容形式（操作记录+深度反思）。

**内容规划上**，网站将围绕以下方向展开：
1. **深度思考**：系统性文章或论文，如 AI 伦理、对话框媒体理论等。
2. **实践复盘**：具体项目经验，如 AI 工具测评、可视化报道心得等。
3. **资源分享**：推荐有价值的 AI 工具、技术动态等。
4. **行业观察**：记录对媒体融合、技术趋势的碎片化思考。

**未来规划**包括持续内容填充、深化 AI 与媒体结合的探索、优化网站体验，以及开放更多交流机会。

---

#### 七、思考与总结：建站的价值与启示

这次两天的建站实践，带来了几点感悟：
1. **静态网站的独特优势**：在速度、安全性、维护成本和部署灵活性上，静态网站（如 Hugo 构建的）对于个人博客、作品集等场景极具价值。
2. **AI 作为学习助力**：AI 显著降低技术入门门槛，尤其在快速解决问题和生成代码方面效率惊人，但核心逻辑理解仍需自身投入。
3. **工具链整合的关键性**：Hugo + Obsidian + Vercel 的组合，为我构建了从写作到发布的顺畅通道，这比网站本身更有价值。
4. **“Just Build It”**：亲手完成一个产品，即使简单，其成就感和实践经验也远胜于阅读文档。

目前，“温故智新”的基础框架已搭建完成，后续将聚焦内容填充与细节优化。这不仅是一个技术项目，更是为我的思考和记录构建了一个可控、长久的数字空间。

---

#### 八、结语：一个小小锚点的意义

从一个想法到上线一个自主的数字空间，这个过程充满了学习与创造的乐趣。Hugo 的高效、Vercel 的便捷、AI 的辅助，以及 Obsidian 的无缝衔接，共同促成了这次实践。更重要的是，“温故智新”成为我未来探索的“锚点”，一个属于自己的思想角落。

如果你也在考虑搭建个人网站，或对媒体与 AI 的交叉领域感兴趣，希望这篇记录能为你提供启发和参考。欢迎访问“温故智新”，也期待与你交流。

