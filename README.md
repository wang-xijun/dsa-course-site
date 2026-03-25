# dsa-course-site

这是“数据结构与算法”课程教材站点的公开发布仓库。

它只保留与公开站点直接相关的内容：

- `site/`：`VitePress` 站点源码
- `.github/workflows/`：GitHub Pages 自动部署工作流

教材正文的私有写作源保留在本地工作仓库的 `books/` 目录中。
对外发布时，以 `site/docs/book/` 中同步后的页面为准。

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
