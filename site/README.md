# DSA 教材站点骨架

这个目录是课程教材与交互演示的静态站点骨架，默认使用 `VitePress`。

## 目录说明

- `docs/`：站点正文
- `docs/book/`：教材章节页
- `docs/interactive/`：交互演示索引页
- `docs/public/interactive/`：直接对外发布的交互 HTML 资源

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

## GitHub Pages 说明

如果最终发布到 `https://用户名.github.io/仓库名/`，构建时需要设置 `base`。

例如：

```bash
cd site
VITEPRESS_BASE=/仓库名/ npm run docs:build
```
