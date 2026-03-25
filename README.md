# dsa-course-site

这是“数据结构与算法”课程教材站点的公开发布仓库。

站点地址：

- 教材与站点首页：<https://wang-xijun.github.io/dsa-course-site/>
- 交互演示页：<https://wang-xijun.github.io/dsa-course-site/interactive/>

## 这个仓库是做什么的？

这个仓库只用于公开发布课程站点，不是私有工作仓库的完整镜像。

它只保留与公开站点直接相关的内容：

- `site/`：`VitePress` 站点源码
- `.github/workflows/`：GitHub Pages 自动部署工作流

## 怎样看交互式 HTML？

如果你在 GitHub 仓库文件列表里直接点开 `index.html`，看到的通常只是源码，不是运行后的页面。

正确的查看方式是：

1. 通过 GitHub Pages 站点访问：<https://wang-xijun.github.io/dsa-course-site/interactive/>
2. 在站点里点击具体演示页面
3. 或者在教材章节中直接查看嵌入式交互演示

## 目录说明

- `site/docs/book/`：公开教材页面
- `site/docs/interactive/`：交互演示索引页
- `site/docs/public/interactive/`：实际发布出去的交互 HTML 资源

## 本地启动

```bash
cd site
npm install
npm run docs:dev
```

## 构建

```bash
cd site
npm run docs:build
```

## 发布

推送到 `main` 分支后，GitHub Actions 会自动构建并发布到 GitHub Pages。
