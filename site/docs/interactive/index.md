# 交互演示

这里集中展示课程配套的交互式 HTML 页面。

这些页面既可以独立访问，也可以在教材章节中通过 `iframe` 嵌入。

## 先说明一个容易混淆的点

如果你在 GitHub 仓库文件列表里直接点开某个 `index.html`，GitHub 展示的通常只是源码文本。

要真正运行这些交互页面，请通过当前站点里的链接打开。

## 当前演示

下面这些入口会直接在新标签页中打开对应的交互式 HTML 页面。

<DemoLinkCard
  href="/interactive/binary-search-recursion/index.html"
  title="二分查找递归"
  description="观察递归缩小区间的过程，理解有序数组上的查找逻辑。"
/>

<DemoLinkCard
  href="/interactive/merge-sort/index.html"
  title="归并排序"
  description="查看分治拆分与合并的动态过程，理解 O(n log n) 的来源。"
/>

<DemoLinkCard
  href="/interactive/circular-queue/index.html"
  title="循环队列"
  description="配合队头、队尾和模运算，理解顺序存储下的循环复用。"
/>

<DemoLinkCard
  href="/interactive/parentheses-match/index.html"
  title="括号匹配"
  description="通过入栈与出栈过程，直观看到栈如何处理配对问题。"
/>

<DemoLinkCard
  href="/interactive/fib-recursion/index.html"
  title="斐波那契递归"
  description="观察递归展开树，感受重复计算与指数级增长。"
/>

## 嵌入示例

<InteractiveFrame
  src="/interactive/merge-sort/index.html"
  title="归并排序交互式演示"
  height="560px"
/>

<InteractiveFrame
  src="/interactive/binary-search-recursion/index.html"
  title="递归二分查找交互式演示"
  height="560px"
/>
