
    const pairs = {
      ")": "(",
      "]": "[",
      "}": "{"
    };

    const openings = new Set(["(", "[", "{"]);
    const closings = new Set([")", "]", "}"]);

    const exampleSelect = document.getElementById("example-select");
    const exprInput = document.getElementById("expr-input");
    const buildBtn = document.getElementById("build-btn");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const playBtn = document.getElementById("play-btn");
    const resetBtn = document.getElementById("reset-btn");

    const stepValue = document.getElementById("step-value");
    const charValue = document.getElementById("char-value");
    const actionValue = document.getElementById("action-value");
    const topValue = document.getElementById("top-value");
    const sizeValue = document.getElementById("size-value");
    const resultValue = document.getElementById("result-value");
    const resultNote = document.getElementById("result-note");

    const charTrack = document.getElementById("char-track");
    const stackArea = document.getElementById("stack-area");
    const messageBar = document.getElementById("message-bar");

    let state = null;
    let currentStep = 0;
    let playing = false;

    function cloneStack(stack) {
      return stack.slice();
    }

    function buildSteps(expr) {
      const steps = [];
      const stack = [];
      let finalStatus = "pending";
      let finalMessage = "还没有开始扫描。";

      steps.push({
        index: -1,
        char: "",
        action: "待开始",
        stack: cloneStack(stack),
        status: "pending",
        message: "从左到右扫描字符串。遇到左括号就入栈，遇到右括号就和栈顶配对。"
      });

      for (let i = 0; i < expr.length; i += 1) {
        const ch = expr[i];

        if (!openings.has(ch) && !closings.has(ch)) {
          steps.push({
            index: i,
            char: ch,
            action: "skip",
            stack: cloneStack(stack),
            status: "pending",
            message: "字符 `" + ch + "` 不是括号，直接跳过。"
          });
          continue;
        }

        if (openings.has(ch)) {
          stack.push(ch);
          steps.push({
            index: i,
            char: ch,
            action: "push",
            stack: cloneStack(stack),
            status: "pending",
            message: "遇到左括号 `" + ch + "`，入栈。现在它成了新的栈顶。"
          });
          continue;
        }

        if (!stack.length) {
          finalStatus = "fail";
          finalMessage = "处理到 `" + ch + "` 时失败：栈已经空了，却还遇到右括号。";
          steps.push({
            index: i,
            char: ch,
            action: "fail",
            stack: cloneStack(stack),
            status: "fail",
            message: finalMessage
          });
          return { expr, steps, finalStatus, finalMessage };
        }

        const top = stack[stack.length - 1];
        if (top !== pairs[ch]) {
          finalStatus = "fail";
          finalMessage = "处理到 `" + ch + "` 时失败：它需要匹配 `" + pairs[ch] + "`，但栈顶是 `" + top + "`。";
          steps.push({
            index: i,
            char: ch,
            action: "fail",
            stack: cloneStack(stack),
            status: "fail",
            message: finalMessage
          });
          return { expr, steps, finalStatus, finalMessage };
        }

        stack.pop();
        steps.push({
          index: i,
          char: ch,
          action: "pop",
          stack: cloneStack(stack),
          status: "pending",
          message: "遇到右括号 `" + ch + "`，它和栈顶 `" + pairs[ch] + "` 成功配对，所以把栈顶弹出。"
        });
      }

      if (stack.length) {
        finalStatus = "fail";
        finalMessage = "扫描结束后仍有左括号留在栈里，说明还没配完。";
        steps.push({
          index: expr.length,
          char: "",
          action: "finish",
          stack: cloneStack(stack),
          status: "fail",
          message: finalMessage
        });
        return { expr, steps, finalStatus, finalMessage };
      }

      finalStatus = "success";
      finalMessage = "扫描结束，栈也为空，所以括号匹配成功。";
      steps.push({
        index: expr.length,
        char: "",
        action: "finish",
        stack: cloneStack(stack),
        status: "success",
        message: finalMessage
      });
      return { expr, steps, finalStatus, finalMessage };
    }

    function resetState(expr) {
      state = buildSteps(expr);
      currentStep = 0;
      playing = false;
      render();
    }

    function currentSnapshot() {
      return state.steps[currentStep];
    }

    function currentResultText(snapshot) {
      if (snapshot.status === "success") {
        return { label: "匹配成功", note: state.finalMessage, cls: "status-ok" };
      }
      if (snapshot.status === "fail") {
        return { label: "匹配失败", note: state.finalMessage, cls: "status-bad" };
      }
      return { label: "未判定", note: "扫描结束后才最终确定", cls: "status-warn" };
    }

    function renderChars(snapshot) {
      charTrack.innerHTML = "";

      if (!state.expr.length) {
        const empty = document.createElement("div");
        empty.className = "message-bar";
        empty.textContent = "表达式为空。先输入一些括号，再点击“生成步骤”。";
        charTrack.appendChild(empty);
        return;
      }

      for (let i = 0; i < state.expr.length; i += 1) {
        const ch = state.expr[i];
        const card = document.createElement("div");
        card.className = "char-card";

        if (snapshot.index === i) {
          card.classList.add(snapshot.status === "fail" ? "error" : "current");
        } else if (i < snapshot.index || (snapshot.index === state.expr.length && currentStep > 0)) {
          card.classList.add("done");
        }

        let role = "普通字符";
        if (openings.has(ch)) {
          role = "左括号";
        } else if (closings.has(ch)) {
          role = "右括号";
        }

        card.innerHTML = `
          <div class="char-index">index ${i}</div>
          <div class="char-value">${ch}</div>
          <div class="char-role">${role}</div>
        `;
        charTrack.appendChild(card);
      }
    }

    function renderStack(snapshot) {
      stackArea.innerHTML = "";
      const stack = snapshot.stack;

      if (!stack.length) {
        const empty = document.createElement("div");
        empty.className = "stack-empty";
        empty.innerHTML = "栈当前为空。<br>如果现在遇到右括号，就会立刻失败。";
        stackArea.appendChild(empty);
        return;
      }

      for (let i = stack.length - 1; i >= 0; i -= 1) {
        const item = document.createElement("div");
        item.className = "stack-item";
        if (i === stack.length - 1) {
          item.classList.add("stack-top");
        }
        item.textContent = stack[i];
        stackArea.appendChild(item);
      }
    }

    function renderStatus(snapshot) {
      stepValue.textContent = currentStep + " / " + (state.steps.length - 1);
      charValue.textContent = snapshot.char || "-";
      actionValue.textContent = snapshot.action;
      topValue.textContent = snapshot.stack.length ? snapshot.stack[snapshot.stack.length - 1] : "空";
      sizeValue.textContent = String(snapshot.stack.length);

      const result = currentResultText(snapshot);
      resultValue.className = "status-value " + result.cls;
      resultValue.textContent = result.label;
      resultNote.textContent = result.note;

      messageBar.textContent = snapshot.message;
    }

    function renderButtons() {
      prevBtn.disabled = currentStep === 0 || playing;
      nextBtn.disabled = currentStep >= state.steps.length - 1 || playing;
      buildBtn.disabled = playing;
      resetBtn.disabled = playing;
      exampleSelect.disabled = playing;
      exprInput.disabled = playing;
      playBtn.textContent = playing ? "播放中..." : "自动播放";
      playBtn.disabled = currentStep >= state.steps.length - 1;
    }

    function render() {
      const snapshot = currentSnapshot();
      renderChars(snapshot);
      renderStack(snapshot);
      renderStatus(snapshot);
      renderButtons();
    }

    function nextStep() {
      if (currentStep < state.steps.length - 1) {
        currentStep += 1;
        render();
      }
    }

    function prevStep() {
      if (currentStep > 0) {
        currentStep -= 1;
        render();
      }
    }

    async function playSteps() {
      if (playing || currentStep >= state.steps.length - 1) {
        return;
      }
      playing = true;
      render();

      while (playing && currentStep < state.steps.length - 1) {
        await new Promise((resolve) => window.setTimeout(resolve, 850));
        currentStep += 1;
        render();
      }

      playing = false;
      render();
    }

    buildBtn.addEventListener("click", () => {
      resetState(exprInput.value);
    });

    prevBtn.addEventListener("click", prevStep);
    nextBtn.addEventListener("click", nextStep);
    playBtn.addEventListener("click", playSteps);
    resetBtn.addEventListener("click", () => {
      playing = false;
      currentStep = 0;
      render();
    });

    exampleSelect.addEventListener("change", () => {
      exprInput.value = exampleSelect.value;
      resetState(exprInput.value);
    });

    exprInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        resetState(exprInput.value);
      }
    });

    resetState(exprInput.value);
  