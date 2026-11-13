/* =====================================================
   AMRUT HANAMAPURE — PROFESSIONAL PORTFOLIO
   Main JavaScript
===================================================== */

(() => {
  "use strict";

  const root = document.documentElement;
  const themeBtn = document.getElementById("themeBtn");
  const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* =====================================================
     UTILITY
  ===================================================== */

  const $ = (id) => document.getElementById(id);

  const store = (key, value) => {
    try {
      if (value === undefined) {
        return localStorage.getItem(key);
      }

      localStorage.setItem(key, value);
    } catch (_) {}

    return null;
  };

  const random = (max) =>
    Math.floor(Math.random() * max);

  /* =====================================================
     THEME
  ===================================================== */

  function applyTheme(theme) {
    root.dataset.theme = theme;

    store("portfolio-theme", theme);

    if (themeBtn) {
      const dark = theme === "dark";

      themeBtn.innerHTML = dark
        ? '<i class="fa-regular fa-sun"></i>'
        : '<i class="fa-regular fa-moon"></i>';

      themeBtn.setAttribute(
        "aria-label",
        dark
          ? "Switch to light theme"
          : "Switch to dark theme"
      );

      themeBtn.title =
        dark
          ? "Switch to light theme"
          : "Switch to dark theme";
    }

    const meta =
      document.querySelector(
        'meta[name="theme-color"]'
      );

    if (meta) {
      meta.content =
        theme === "dark"
          ? "#09080b"
          : "#fffaf6";
    }
  }

  applyTheme(
    store("portfolio-theme") ||
      root.dataset.theme ||
      "light"
  );

  themeBtn?.addEventListener("click", () => {
    applyTheme(
      root.dataset.theme === "dark"
        ? "light"
        : "dark"
    );
  });

  /* =====================================================
     TYPING EFFECT
  ===================================================== */

  const typed = $("typed");

  const roles = [
    "Electronics & Communication Engineer",
    "Hardware Testing Engineer",
    "Embedded Systems Engineer",
    "PCB Design Engineer",
    "VLSI Enthusiast"
  ];

  if (typed && !prefersReducedMotion) {
    let roleIndex = 0;
    let charIndex = roles[0].length;
    let deleting = true;

    function typeLoop() {
      const current = roles[roleIndex];

      if (deleting) {
        charIndex--;

        typed.textContent =
          current.substring(
            0,
            Math.max(0, charIndex)
          );

        if (charIndex <= 0) {
          deleting = false;
          roleIndex =
            (roleIndex + 1) %
            roles.length;
        }

        setTimeout(typeLoop, 35);
      } else {
        const nextRole =
          roles[roleIndex];

        charIndex++;

        typed.textContent =
          nextRole.substring(
            0,
            charIndex
          );

        if (
          charIndex >=
          nextRole.length
        ) {
          deleting = true;
          setTimeout(typeLoop, 1600);
        } else {
          setTimeout(typeLoop, 60);
        }
      }
    }

    setTimeout(typeLoop, 1500);
  }

  /* =====================================================
     SCROLL REVEAL
  ===================================================== */

  const revealItems =
    document.querySelectorAll(".reveal");

  if (
    "IntersectionObserver" in window &&
    !prefersReducedMotion
  ) {
    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (
              entry.isIntersecting
            ) {
              entry.target.classList.add(
                "is-visible"
              );

              observer.unobserve(
                entry.target
              );
            }
          });
        },
        {
          threshold: 0.08,
          rootMargin:
            "0px 0px -25px 0px"
        }
      );

    revealItems.forEach((item) => {
      observer.observe(item);
    });
  } else {
    revealItems.forEach((item) => {
      item.classList.add(
        "is-visible"
      );
    });
  }

  /* =====================================================
     HERO COUNTERS
  ===================================================== */

  const stats =
    document.querySelector(
      ".hero-stats"
    );

  if (
    stats &&
    "IntersectionObserver" in window &&
    !prefersReducedMotion
  ) {
    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting)
              return;

            stats
              .querySelectorAll(
                "[data-count]"
              )
              .forEach((element) => {
                const target =
                  Number(
                    element.dataset
                      .count || 0
                  );

                let current = 0;

                const step =
                  Math.max(
                    1,
                    Math.ceil(
                      target / 20
                    )
                  );

                const timer =
                  setInterval(() => {
                    current =
                      Math.min(
                        target,
                        current +
                          step
                      );

                    element.textContent =
                      String(
                        current
                      );

                    if (
                      current >=
                      target
                    ) {
                      clearInterval(
                        timer
                      );
                    }
                  }, 35);
              });

            observer.disconnect();
          });
        },
        {
          threshold: 0.35
        }
      );

    observer.observe(stats);
  }

  /* =====================================================
     SCROLL PROGRESS
  ===================================================== */

  const progressBar =
    $("progressBar");

  function updateProgress() {
    if (!progressBar)
      return;

    const max =
      document.documentElement
        .scrollHeight -
      window.innerHeight;

    const percentage =
      max > 0
        ? (window.scrollY /
            max) *
          100
        : 0;

    progressBar.style.width =
      `${Math.max(
        0,
        Math.min(
          100,
          percentage
        )
      )}%`;
  }

  window.addEventListener(
    "scroll",
    updateProgress,
    {
      passive: true
    }
  );

  window.addEventListener(
    "resize",
    updateProgress
  );

  updateProgress();

  /* =====================================================
     NAVIGATION
  ===================================================== */

  const navLinks = [
    ...document.querySelectorAll(
      ".main-nav a"
    )
  ];

  const sections =
    navLinks
      .map((link) =>
        document.querySelector(
          link.getAttribute(
            "href"
          )
        )
      )
      .filter(Boolean);

  if (
    "IntersectionObserver" in
    window
  ) {
    const navObserver =
      new IntersectionObserver(
        (entries) => {
          entries.forEach(
            (entry) => {
              if (
                !entry.isIntersecting
              )
                return;

              navLinks.forEach(
                (link) => {
                  const active =
                    link.getAttribute(
                      "href"
                    ) ===
                    `#${entry.target.id}`;

                  link.classList.toggle(
                    "active",
                    active
                  );

                  if (active) {
                    link.setAttribute(
                      "aria-current",
                      "location"
                    );
                  } else {
                    link.removeAttribute(
                      "aria-current"
                    );
                  }
                }
              );
            }
          );
        },
        {
          rootMargin:
            "-35% 0px -55% 0px"
        }
      );

    sections.forEach(
      (section) =>
        navObserver.observe(
          section
        )
    );
  }

  /* =====================================================
     CONTACT FORM
  ===================================================== */

  const form =
    $("contact-form");

  const status =
    $("form-status");

  function setStatus(
    message,
    type = ""
  ) {
    if (!status)
      return;

    status.textContent =
      message;

    status.className =
      `form-status ${type}`.trim();
  }

  if (form) {
    const EMAILJS_PUBLIC_KEY =
      "TZWUr1PeHYnnlkkBN";

    const EMAILJS_SERVICE_ID =
      "service_9uitjh4";

    const EMAILJS_TEMPLATE_ID =
      "template_re3hdru";

    if (window.emailjs) {
      try {
        window.emailjs.init({
          publicKey:
            EMAILJS_PUBLIC_KEY
        });
      } catch (error) {
        console.warn(
          "EmailJS initialization failed:",
          error
        );
      }
    }

    form.addEventListener(
      "submit",
      async (event) => {
        event.preventDefault();

        const button =
          form.querySelector(
            '[type="submit"]'
          );

        const original =
          button?.innerHTML ||
          "";

        if (button) {
          button.disabled =
            true;

          button.textContent =
            "Sending...";
        }

        setStatus(
          "Sending your message..."
        );

        try {
          if (
            window.emailjs &&
            typeof window
              .emailjs
              .sendForm ===
              "function"
          ) {
            await window.emailjs.sendForm(
              EMAILJS_SERVICE_ID,
              EMAILJS_TEMPLATE_ID,
              form
            );

            form.reset();

            setStatus(
              "Your message has been sent successfully.",
              "success"
            );
          } else {
            const data =
              new FormData(
                form
              );

            const subject =
              encodeURIComponent(
                String(
                  data.get(
                    "subject"
                  ) ||
                    "Portfolio enquiry"
                )
              );

            const body =
              encodeURIComponent(
                `Name: ${data.get(
                  "name"
                )}
Email: ${data.get(
                  "email"
                )}

${data.get(
  "message"
)}`
              );

            window.location.href =
              `mailto:amruthanamapure@gmail.com?subject=${subject}&body=${body}`;

            setStatus(
              "Your email application is opening."
            );
          }
        } catch (error) {
          console.error(
            "Contact form error:",
            error
          );

          setStatus(
            "Message could not be sent. Please email amruthanamapure@gmail.com directly.",
            "error"
          );
        } finally {
          if (button) {
            button.disabled =
              false;

            button.innerHTML =
              original;
          }
        }
      }
    );
  }

  /* =====================================================
     FOOTER YEAR
  ===================================================== */

  const year =
    $("year");

  if (year) {
    year.textContent =
      new Date()
        .getFullYear();
  }
})();


/* =====================================================
   MINI GAMES
===================================================== */

(() => {
  "use strict";

  const $ = (id) =>
    document.getElementById(id);

  const store = (
    key,
    value
  ) => {
    try {
      if (
        value === undefined
      ) {
        return localStorage.getItem(
          key
        );
      }

      localStorage.setItem(
        key,
        value
      );
    } catch (_) {}

    return null;
  };

  const rand =
    (max) =>
      Math.floor(
        Math.random() *
          max
      );

  // Stop or pause time-sensitive games when the player switches tabs or hides the page.
  let pauseSnakeGame = () => {};
  let resetReactionGame = () => {};
  let suspendSimonGame = () => {};
  let pauseBugHuntGame = () => {};

  /* =====================================================
     SNAKE GAME — fixed-step movement with smooth rendering
  ===================================================== */

  const canvas = $("snake");

  if (canvas) {
    const ctx = canvas.getContext("2d");
    const GRID = 20;
    const CELL = canvas.width / GRID;
    const scoreEl = $("sScore");
    const bestEl = $("sBest");
    const startBtn = $("sStart");
    const pauseBtn = $("sPause");
    const levelEl = $("sLevel");
    const messageEl = $("sMessage");

    let snake = [];
    let previousSnake = [];
    let direction = { x: 1, y: 0 };
    let nextDirection = { x: 1, y: 0 };
    let turnQueued = false;
    let food = null;
    let score = 0;
    let best = Number(store("snakeBest") || 0);
    let started = false;
    let paused = false;
    let gameOver = false;
    let animationFrameId = null;
    let lastFrameTime = 0;
    let accumulator = 0;

    if (bestEl) bestEl.textContent = String(best);

    function speed() {
      return Math.max(72, 145 - Math.floor(score / 5) * 8);
    }

    function updateHUD() {
      if (scoreEl) scoreEl.textContent = String(score);
      if (bestEl) bestEl.textContent = String(best);
      if (levelEl) levelEl.textContent = String(1 + Math.floor(score / 5));
    }

    function message(text) {
      if (messageEl) messageEl.textContent = text;
    }

    function stopLoop() {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      lastFrameTime = 0;
      accumulator = 0;
    }

    function placeFood() {
      const empty = [];
      const occupied = new Set(snake.map((part) => `${part.x},${part.y}`));
      for (let y = 0; y < GRID; y++) {
        for (let x = 0; x < GRID; x++) {
          if (!occupied.has(`${x},${y}`)) empty.push({ x, y });
        }
      }
      return empty.length ? empty[rand(empty.length)] : null;
    }

    function roundedRect(x, y, width, height, radius) {
      const r = Math.min(radius, width / 2, height / 2);
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + width, y, x + width, y + height, r);
      ctx.arcTo(x + width, y + height, x, y + height, r);
      ctx.arcTo(x, y + height, x, y, r);
      ctx.arcTo(x, y, x + width, y, r);
      ctx.closePath();
    }

    function draw(interpolation = 1) {
      if (!ctx || !snake.length) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const bg = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bg.addColorStop(0, "#050b09");
      bg.addColorStop(0.52, "#0b1711");
      bg.addColorStop(1, "#120b10");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "rgba(255, 145, 75, 0.10)";
      ctx.lineWidth = 1;
      for (let i = 0; i <= GRID; i++) {
        const point = i * CELL + 0.5;
        ctx.beginPath();
        ctx.moveTo(point, 0);
        ctx.lineTo(point, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, point);
        ctx.lineTo(canvas.width, point);
        ctx.stroke();
      }

      // Food has a subtle pulse, independent of the movement tick.
      if (food) {
        const pulse = 1 + Math.sin(performance.now() / 115) * 0.075;
        const fx = food.x * CELL + CELL / 2;
        const fy = food.y * CELL + CELL / 2;
        ctx.save();
        ctx.shadowColor = "#ff5148";
        ctx.shadowBlur = 22;
        ctx.fillStyle = "#ff5148";
        ctx.beginPath();
        ctx.arc(fx - 3, fy + 1, 7 * pulse, 0, Math.PI * 2);
        ctx.arc(fx + 3, fy + 1, 7 * pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.strokeStyle = "#ffd4b0";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(fx, fy - 7);
        ctx.lineTo(fx + 2, fy - 12);
        ctx.stroke();
        ctx.fillStyle = "#79d18b";
        ctx.beginPath();
        ctx.ellipse(fx + 5, fy - 10, 4, 2, -0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Interpolate between grid positions for smooth movement on every display frame.
      snake.forEach((part, index) => {
        const from = previousSnake[index] || previousSnake[previousSnake.length - 1] || part;
        const gridX = from.x + (part.x - from.x) * interpolation;
        const gridY = from.y + (part.y - from.y) * interpolation;
        const padding = index === 0 ? 2 : 3;
        const x = gridX * CELL + padding;
        const y = gridY * CELL + padding;
        const size = CELL - padding * 2;
        const gradient = ctx.createLinearGradient(x, y, x + size, y + size);

        if (index === 0) {
          gradient.addColorStop(0, "#fff3a6");
          gradient.addColorStop(0.45, "#ff9a45");
          gradient.addColorStop(1, "#ff4d88");
        } else {
          const fade = Math.max(0, 1 - index / Math.max(10, snake.length));
          gradient.addColorStop(0, `rgb(${Math.round(82 + fade * 173)}, ${Math.round(90 + fade * 48)}, ${Math.round(180 - fade * 50)})`);
          gradient.addColorStop(1, "#9b35c9");
        }

        ctx.save();
        ctx.shadowColor = index === 0 ? "#ff9a45" : "#ff397d";
        ctx.shadowBlur = index === 0 ? 17 : 6;
        roundedRect(x, y, size, size, index === 0 ? 7 : 6);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.strokeStyle = "rgba(255,255,255,.28)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      });

      // Eyes follow the current direction.
      const head = snake[0];
      const hx = head.x * CELL + CELL / 2;
      const hy = head.y * CELL + CELL / 2;
      const eyeOffset = 4.5;
      const eyes = direction.x !== 0
        ? [[hx + direction.x * eyeOffset, hy - eyeOffset], [hx + direction.x * eyeOffset, hy + eyeOffset]]
        : [[hx - eyeOffset, hy + direction.y * eyeOffset], [hx + eyeOffset, hy + direction.y * eyeOffset]];
      ctx.fillStyle = "#160b15";
      eyes.forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, 1.7, 0, Math.PI * 2);
        ctx.fill();
      });

      if (!started || paused || gameOver) {
        ctx.fillStyle = "rgba(4, 4, 7, .68)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.textAlign = "center";
        ctx.shadowColor = "#ff5c8a";
        ctx.shadowBlur = 20;
        ctx.fillStyle = "#ffffff";
        ctx.font = "800 34px Arial";
        ctx.fillText(gameOver ? "GAME OVER" : paused ? "PAUSED" : "SNAKE", canvas.width / 2, canvas.height / 2 - 10);
        ctx.shadowBlur = 0;
        ctx.fillStyle = "#ffb27c";
        ctx.font = "600 15px Arial";
        const subtitle = gameOver
          ? `Score: ${score} • Press Play Again`
          : paused
            ? "Press Resume to continue"
            : "Press START GAME to begin";
        ctx.fillText(subtitle, canvas.width / 2, canvas.height / 2 + 25);
      }
    }

    function reset() {
      stopLoop();
      snake = [
        { x: 8, y: 10 },
        { x: 7, y: 10 },
        { x: 6, y: 10 },
        { x: 5, y: 10 }
      ];
      previousSnake = snake.map((part) => ({ ...part }));
      direction = { x: 1, y: 0 };
      nextDirection = { x: 1, y: 0 };
      turnQueued = false;
      score = 0;
      paused = false;
      started = false;
      gameOver = false;
      food = placeFood();
      updateHUD();
      canvas.classList.remove("live");
      if (pauseBtn) {
        pauseBtn.disabled = true;
        pauseBtn.textContent = "Pause";
      }
      if (startBtn) startBtn.textContent = "Start Game";
      message("Ready? Press Start Game to play.");
      draw(1);
    }

    function endGame(won = false) {
      stopLoop();
      gameOver = true;
      started = false;
      paused = false;
      if (score > best) {
        best = score;
        store("snakeBest", String(best));
      }
      updateHUD();
      if (startBtn) startBtn.textContent = "Play Again";
      if (pauseBtn) {
        pauseBtn.disabled = true;
        pauseBtn.textContent = "Pause";
      }
      canvas.classList.remove("live");
      message(won ? "Board cleared! Excellent run." : `Game over! Final score: ${score}.`);
      draw(1);
    }

    function move() {
      if (!started || paused || gameOver) return;
      previousSnake = snake.map((part) => ({ ...part }));
      direction = { ...nextDirection };
      turnQueued = false;

      const head = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y
      };
      const eating = Boolean(food && head.x === food.x && head.y === food.y);
      const body = eating ? snake : snake.slice(0, -1);
      const hitWall = head.x < 0 || head.y < 0 || head.x >= GRID || head.y >= GRID;
      const hitBody = body.some((part) => part.x === head.x && part.y === head.y);

      if (hitWall || hitBody) {
        endGame(false);
        return;
      }

      snake.unshift(head);
      if (eating) {
        score += 1;
        food = placeFood();
        updateHUD();
        if (!food) {
          endGame(true);
          return;
        }
        if (score % 5 === 0) {
          message(`Level ${1 + Math.floor(score / 5)} unlocked!`);
        } else {
          message("Food collected! Keep going.");
        }
      } else {
        snake.pop();
      }
    }

    function animationLoop(now) {
      if (!started || paused || gameOver) return;
      if (!lastFrameTime) lastFrameTime = now;
      const delta = Math.min(100, now - lastFrameTime);
      lastFrameTime = now;
      accumulator += delta;

      let interval = speed();
      let updates = 0;
      while (accumulator >= interval && updates < 5 && started && !paused && !gameOver) {
        accumulator -= interval;
        move();
        updates += 1;
        interval = speed();
      }
      // Avoid a spiral of catch-up updates after the browser resumes from a long pause.
      if (updates === 5) accumulator = 0;

      draw(Math.min(1, accumulator / speed()));
      if (started && !paused && !gameOver) {
        animationFrameId = requestAnimationFrame(animationLoop);
      }
    }

    function startLoop() {
      stopLoop();
      animationFrameId = requestAnimationFrame(animationLoop);
    }

    function start() {
      reset();
      started = true;
      canvas.classList.add("live");
      if (startBtn) startBtn.textContent = "Restart";
      if (pauseBtn) pauseBtn.disabled = false;
      message("Game on! Use Arrow Keys, WASD, swipe or the direction pad.");
      draw(1);
      startLoop();
    }

    function togglePause(forcePause) {
      if (!started || gameOver) return;
      const shouldPause = typeof forcePause === "boolean" ? forcePause : !paused;
      if (shouldPause === paused) return;
      paused = shouldPause;
      if (paused) {
        stopLoop();
        if (pauseBtn) pauseBtn.textContent = "Resume";
        message("Game paused. Resume when ready.");
      } else {
        if (pauseBtn) pauseBtn.textContent = "Pause";
        message("Game resumed!");
        startLoop();
      }
      draw(1);
    }

    function setDirection(x, y) {
      if (!started || paused || gameOver || turnQueued) return;
      if (x === -nextDirection.x && y === -nextDirection.y) return;
      if (x === nextDirection.x && y === nextDirection.y) return;
      nextDirection = { x, y };
      turnQueued = true;
    }

    const directions = {
      up: [0, -1],
      down: [0, 1],
      left: [-1, 0],
      right: [1, 0]
    };

    document.querySelectorAll(".pad button[data-d]").forEach((button) => {
      button.addEventListener("click", () => {
        const vector = directions[button.dataset.d];
        if (vector) setDirection(vector[0], vector[1]);
      });
    });

    window.addEventListener("keydown", (event) => {
      const target = event.target;
      if (target && /INPUT|TEXTAREA|SELECT/.test(target.tagName)) return;
      const keys = {
        ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right",
        w: "up", W: "up", s: "down", S: "down", a: "left", A: "left", d: "right", D: "right"
      };
      if (started && !paused && !gameOver && keys[event.key] && $("g-snake")?.classList.contains("on")) {
        event.preventDefault();
        const vector = directions[keys[event.key]];
        setDirection(vector[0], vector[1]);
      }
      if (event.code === "Space" && $("g-snake")?.classList.contains("on") && started && !gameOver) {
        event.preventDefault();
        togglePause();
      }
    });

    let touchStart = null;
    canvas.addEventListener("pointerdown", (event) => {
      touchStart = { x: event.clientX, y: event.clientY };
      if (canvas.setPointerCapture) canvas.setPointerCapture(event.pointerId);
    });
    canvas.addEventListener("pointerup", (event) => {
      if (!touchStart || !started || paused || gameOver) {
        touchStart = null;
        return;
      }
      const dx = event.clientX - touchStart.x;
      const dy = event.clientY - touchStart.y;
      touchStart = null;
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 18) return;
      if (Math.abs(dx) > Math.abs(dy)) {
        setDirection(dx > 0 ? 1 : -1, 0);
      } else {
        setDirection(0, dy > 0 ? 1 : -1);
      }
    });
    canvas.addEventListener("pointercancel", () => { touchStart = null; });

    const pauseForVisibility = () => togglePause(true);
    pauseSnakeGame = pauseForVisibility;
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) pauseForVisibility();
    });

    startBtn?.addEventListener("click", start);
    pauseBtn?.addEventListener("click", () => togglePause());
    reset();
  }

  /* =====================================================
     LOGIC GATES
  ===================================================== */

  const gates = {
    AND: (a, b) =>
      a & b,

    OR: (a, b) =>
      a | b,

    NAND: (a, b) =>
      +( !(a & b) ),

    NOR: (a, b) =>
      +( !(a | b) ),

    XOR: (a, b) =>
      a ^ b,

    NOT: (a) =>
      +!a
  };

  let logicRound = 0;
  let logicScore = 0;
  let logicAnswer = 0;
  let logicActive = false;
  let logicAnswered = true;
  let logicQuestionTimer = null;

  const lgMsg =
    $("lgMsg");

  function askLogicQuestion() {
    logicAnswered = false;
    const names =
      Object.keys(
        gates
      );

    const name =
      names[
        random(
          names.length
        )
      ];

    const a =
      random(2);

    const b =
      random(2);

    logicAnswer =
      gates[name](
        a,
        b
      );

    $("lgIn").textContent =
      name === "NOT"
        ? `A = ${a}`
        : `A = ${a}   B = ${b}`;

    $("lgQ").textContent =
      name === "NOT"
        ? "Y = NOT A = ?"
        : `Y = A ${name} B = ?`;

    $("lgRound").textContent =
      logicRound;
  }

  function startLogic() {
    clearTimeout(logicQuestionTimer);
    logicAnswered = true;
    logicRound =
      1;

    logicScore =
      0;

    logicActive =
      true;

    $("lgScore").textContent =
      "0";

    $("lgStart").textContent =
      "Restart";

    lgMsg.textContent =
      "Choose 0 or 1.";

    askLogicQuestion();
  }

  function answerLogic(value) {
    if (!logicActive || logicAnswered)
      return;

    logicAnswered = true;

    const correct =
      value ===
      logicAnswer;

    if (correct)
      logicScore++;

    $("lgScore").textContent =
      logicScore;

    lgMsg.textContent =
      correct
        ? "Correct!"
        : `Wrong. Answer: ${logicAnswer}`;

    if (
      logicRound >=
      10
    ) {
      logicActive =
        false;

      $("lgQ").textContent =
        `Final score: ${logicScore}/10`;

      $("lgIn").textContent =
        "Quiz complete";

      $("lgStart").textContent =
        "Play Again";

      return;
    }

    logicRound++;

    logicQuestionTimer = setTimeout(
      askLogicQuestion,
      500
    );
  }

  $("lgStart")?.addEventListener(
    "click",
    startLogic
  );

  $("lg0")?.addEventListener(
    "click",
    () =>
      answerLogic(0)
  );

  $("lg1")?.addEventListener(
    "click",
    () =>
      answerLogic(1)
  );

  /* =====================================================
     MEMORY GAME
  ===================================================== */

  const icons = [
    "fa-microchip",
    "fa-bolt",
    "fa-battery-full",
    "fa-wifi",
    "fa-lightbulb",
    "fa-plug",
    "fa-satellite-dish",
    "fa-memory"
  ];

  const memoryGrid =
    $("mgrid");

  let firstCard =
    null;

  let memoryLocked =
    false;

  let moves =
    0;

  let matched =
    0;
  let memoryFlipTimer = null;

  let memoryBest =
    Number(
      store(
        "memBest"
      ) || 0
    );

  if ($("mBest")) {
    $("mBest").textContent =
      memoryBest ||
      "—";
  }

  function initMemory() {
    clearTimeout(memoryFlipTimer);
    memoryFlipTimer = null;

    const deck = [...icons, ...icons];
    for (let index = deck.length - 1; index > 0; index--) {
      const swapIndex = rand(index + 1);
      [deck[index], deck[swapIndex]] = [deck[swapIndex], deck[index]];
    }

    memoryGrid.innerHTML =
      "";

    firstCard =
      null;

    memoryLocked =
      false;

    moves =
      0;

    matched =
      0;

    $("mMoves").textContent =
      "0";

    $("mMsg").textContent =
      "Match all electronic component pairs.";

    deck.forEach(
      (icon) => {
        const card =
          document.createElement(
            "button"
          );

        card.className =
          "mc";

        card.dataset.ic =
          icon;

        card.innerHTML =
          `<i class="fas ${icon}"></i>`;

        card.addEventListener(
          "click",
          () =>
            flipMemory(
              card
            )
        );

        memoryGrid.appendChild(
          card
        );
      }
    );
  }

  function flipMemory(
    card
  ) {
    if (
      memoryLocked ||
      card.classList.contains(
        "up"
      ) ||
      card.classList.contains(
        "done"
      )
    ) {
      return;
    }

    card.classList.add(
      "up"
    );

    if (!firstCard) {
      firstCard =
        card;

      return;
    }

    moves++;

    $("mMoves").textContent =
      moves;

    if (
      firstCard.dataset
        .ic ===
      card.dataset
        .ic
    ) {
      firstCard.classList.replace(
        "up",
        "done"
      );

      card.classList.replace(
        "up",
        "done"
      );

      firstCard =
        null;

      matched++;

      if (
        matched ===
        icons.length
      ) {
        $("mMsg").textContent =
          `Solved in ${moves} moves!`;

        if (
          !memoryBest ||
          moves <
            memoryBest
        ) {
          memoryBest =
            moves;

          $("mBest").textContent =
            memoryBest;

          store(
            "memBest",
            memoryBest
          );
        }
      }
    } else {
      memoryLocked =
        true;

      memoryFlipTimer = setTimeout(
        () => {
          if (firstCard) {
            firstCard.classList.remove("up");
          }

          card.classList.remove("up");
          firstCard = null;
          memoryLocked = false;
          memoryFlipTimer = null;
        },
        800
      );
    }
  }

  $("mReset")?.addEventListener(
    "click",
    initMemory
  );

  if (memoryGrid)
    initMemory();

  /* =====================================================
     REACTION TEST
  ===================================================== */

  const reaction =
    $("rxBox");

  let reactionState =
    "idle";

  let reactionTimer;

  let reactionStart;

  let reactionBest =
    Number(
      store(
        "rxBest"
      ) || 0
    );

  if (
    reactionBest &&
    $("rxBest")
  ) {
    $("rxBest").textContent =
      `${reactionBest} ms`;
  }

  function resetReaction() {
    clearTimeout(reactionTimer);
    reactionTimer = null;
    reactionState = "idle";
    if (reaction) reaction.className = "led";
    if ($("rxMsg")) $("rxMsg").textContent = "Tap the LED to begin";
  }

  resetReactionGame = resetReaction;

  reaction?.addEventListener(
    "click",
    () => {
      if (
        reactionState ===
        "idle"
      ) {
        reactionState =
          "wait";

        reaction.className =
          "led wait";

        $("rxMsg").textContent =
          "Wait for green...";

        reactionTimer =
          setTimeout(
            () => {
              reactionState =
                "go";

              reaction.className =
                "led go";

              $("rxMsg").textContent =
                "TAP NOW!";

              reactionStart =
                performance.now();
            },
            1500 +
              Math.random() *
                2500
          );
      } else if (
        reactionState ===
        "wait"
      ) {
        clearTimeout(
          reactionTimer
        );

        reactionState =
          "idle";

        reaction.className =
          "led bad";

        $("rxMsg").textContent =
          "Too early! Try again.";
      } else if (
        reactionState ===
        "go"
      ) {
        const time =
          Math.round(
            performance.now() -
              reactionStart
          );

        reactionState =
          "idle";

        reaction.className =
          "led";

        $("rxMsg").textContent =
          `${time} ms. Tap to retry`;

        if (
          !reactionBest ||
          time <
            reactionBest
        ) {
          reactionBest =
            time;

          $("rxBest").textContent =
            `${time} ms`;

          store(
            "rxBest",
            time
          );
        }
      }
    }
  );

  /* =====================================================
     TIC TAC TOE
  ===================================================== */

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const ticGrid =
    $("tgrid");

  if (ticGrid) {
    let board =
      Array(9).fill(
        null
      );

    let gameOver =
      false;
    let cpuThinking = false;
    let cpuTimer = null;

    let wins =
      0;

    let losses =
      0;

    function winner(
      board
    ) {
      for (
        const line of lines
      ) {
        if (
          board[line[0]] &&
          board[line[0]] ===
            board[line[1]] &&
          board[line[0]] ===
            board[line[2]]
        ) {
          return line;
        }
      }

      return null;
    }

    function renderTic(
      winningLine
    ) {
      [
        ...ticGrid
          .children
      ].forEach(
        (
          cell,
          index
        ) => {
          cell.textContent =
            board[
              index
            ] ||
            "";

          cell.classList.toggle(
            "o",
            board[
              index
            ] ===
              "O"
          );

          cell.classList.toggle(
            "win",
            winningLine
              ? winningLine.includes(
                  index
                )
              : false
          );
        }
      );
    }

    function cpuMove() {
      const findMove =
        (symbol) => {
          for (
            const line of lines
          ) {
            const values =
              line.map(
                (i) =>
                  board[i]
              );

            if (
              values.filter(
                (x) =>
                  x ===
                  symbol
              ).length ===
                2 &&
              values.includes(
                null
              )
            ) {
              return line[
                values.indexOf(
                  null
                )
              ];
            }
          }

          return -1;
        };

      let move =
        findMove(
          "O"
        );

      if (
        move <
        0
      ) {
        move =
          findMove(
            "X"
          );
      }

      if (
        move <
          0 &&
        !board[4]
      ) {
        move =
          4;
      }

      if (
        move <
        0
      ) {
        const free =
          board
            .map(
              (
                value,
                index
              ) =>
                value
                  ? -1
                  : index
            )
            .filter(
              (i) =>
                i >= 0
            );

        move =
          free[
            rand(
              free.length
            )
          ];
      }

      board[
        move
      ] =
        "O";
    }

    function playTic(
      index
    ) {
      if (gameOver || cpuThinking || board[index]) {
        return;
      }

      board[index] = "X";
      renderTic(null);

      let win = winner(board);

      if (win) {
        wins++;

        $("tW").textContent =
          wins;

        gameOver =
          true;

        $("tMsg").textContent =
          "You win!";

        renderTic(
          win
        );

        return;
      }

      if (
        !board.includes(
          null
        )
      ) {
        gameOver =
          true;

        $("tMsg").textContent =
          "Draw!";

        renderTic(
          null
        );

        return;
      }

      cpuThinking = true;
      $("tMsg").textContent = "Computer thinking…";
      cpuTimer = setTimeout(() => {
        cpuThinking = false;
        cpuMove();
        win = winner(board);

        if (win) {
          losses++;
          $("tL").textContent = losses;
          gameOver = true;
          $("tMsg").textContent = "CPU wins this round.";
          renderTic(win);
          return;
        }

        if (!board.includes(null)) {
          gameOver = true;
          $("tMsg").textContent = "Draw!";
          renderTic(null);
          return;
        }

        $("tMsg").textContent = "Your move.";
        renderTic(null);
      }, 360);
    }

    function resetTic() {
      clearTimeout(cpuTimer);
      cpuTimer = null;
      cpuThinking = false;
      board = Array(9).fill(null);
      gameOver = false;

      $("tMsg").textContent =
        "Your move.";

      renderTic(
        null
      );
    }

    for (
      let i = 0;
      i < 9;
      i++
    ) {
      const button =
        document.createElement(
          "button"
        );

      button.className =
        "tc";

      button.addEventListener(
        "click",
        () =>
          playTic(
            i
          )
      );

      ticGrid.appendChild(
        button
      );
    }

    $("tReset")?.addEventListener(
      "click",
      resetTic
    );

    resetTic();
  }

  /* =====================================================
     LED SIMON
  ===================================================== */

  const simonButtons = [
    ...document.querySelectorAll(
      ".sq"
    )
  ];

  if (
    simonButtons.length
  ) {
    let sequence =
      [];

    let step =
      0;

    let accepting =
      false;
    let simonStarted = false;

    let best =
      Number(
        store(
          "simonBest"
        ) || 0
      );

    let timers =
      [];

    $("siBest").textContent =
      best;

    function later(
      fn,
      delay
    ) {
      const timer = setTimeout(() => {
        timers = timers.filter((item) => item !== timer);
        fn();
      }, delay);
      timers.push(timer);
    }

    function flash(
      index,
      duration = 350
    ) {
      simonButtons[
        index
      ].classList.add(
        "lit"
      );

      later(
        () =>
          simonButtons[
            index
          ].classList.remove(
            "lit"
          ),
        duration
      );
    }

    function stopSimon() {
      timers.forEach(
        clearTimeout
      );

      timers =
        [];

      accepting =
        false;

      simonButtons.forEach(
        (button) =>
          button.classList.remove(
            "lit"
          )
      );
    }

    function playSequence() {
      accepting =
        false;

      $("siMsg").textContent =
        "Watch carefully...";

      sequence.forEach(
        (
          value,
          index
        ) => {
          later(
            () =>
              flash(
                value
              ),
            600 +
              index *
                650
          );
        }
      );

      later(
        () => {
          accepting =
            true;

          step =
            0;

          $("siMsg").textContent =
            "Your turn!";
        },
        600 +
          sequence.length *
            650
      );
    }

    function nextRound() {
      sequence.push(
        rand(4)
      );

      $("siLvl").textContent =
        sequence.length;

      playSequence();
    }

    $("siStart")?.addEventListener(
      "click",
      () => {
        stopSimon();

        sequence = [];
        simonStarted = true;
        $("siLvl").textContent = "0";
        $("siStart").textContent = "Restart";
        nextRound();
      }
    );

    simonButtons.forEach(
      (button) => {
        button.addEventListener(
          "click",
          () => {
            if (
              !accepting
            )
              return;

            const value =
              Number(
                button.dataset
                  .c
              );

            flash(
              value,
              200
            );

            if (
              value !==
              sequence[
                step
              ]
            ) {
              accepting = false;
              simonStarted = false;

              $("siMsg").textContent =
                `Wrong! You reached level ${sequence.length}.`;

              if (
                sequence.length >
                best
              ) {
                best =
                  sequence.length;

                $("siBest").textContent =
                  best;

                store(
                  "simonBest",
                  best
                );
              }

              $("siStart").textContent =
                "Play Again";

              return;
            }

            step++;

            if (
              step ===
              sequence.length
            ) {
              accepting =
                false;

              $("siMsg").textContent =
                "Correct! Next level...";

              later(
                nextRound,
                800
              );
            }
          }
        );
      }
    );

    suspendSimonGame = () => {
      if (!simonStarted) return;
      stopSimon();
      simonStarted = false;
      sequence = [];
      step = 0;
      $("siLvl").textContent = "0";
      $("siStart").textContent = "Start";
      $("siMsg").textContent = "Game paused when you left. Press Start to play again.";
    };
  }

  /* =====================================================
     BINARY QUIZ
  ===================================================== */

  let binaryRound =
    0;

  let binaryScore =
    0;

  let binaryAnswer =
    0;

  let binaryActive =
    false;
  let binaryAnswered = true;
  let binaryQuestionTimer = null;

  function askBinary() {
    binaryAnswered = false;
    binaryAnswer =
      rand(16);

    $("bQ").textContent =
      binaryAnswer
        .toString(2)
        .padStart(
          4,
          "0"
        );

    $("bRound").textContent =
      binaryRound;

    const options =
      new Set([
        binaryAnswer
      ]);

    while (
      options.size <
      4
    ) {
      options.add(
        rand(16)
      );
    }

    const box =
      $("bOpts");

    box.innerHTML =
      "";

    [
      ...options
    ]
      .sort(
        () =>
          Math.random() -
          0.5
      )
      .forEach(
        (value) => {
          const button =
            document.createElement(
              "button"
            );

          button.className =
            "btn";

          button.textContent =
            value;

          button.addEventListener(
            "click",
            () =>
              answerBinary(
                value
              )
          );

          box.appendChild(
            button
          );
        }
      );
  }

  function answerBinary(
    value
  ) {
    if (!binaryActive || binaryAnswered)
      return;

    binaryAnswered = true;

    const correct =
      value ===
      binaryAnswer;

    if (correct)
      binaryScore++;

    $("bScore").textContent =
      binaryScore;

    $("bMsg").textContent =
      correct
        ? "Correct!"
        : `Wrong. Answer: ${binaryAnswer}`;

    if (
      binaryRound >=
      10
    ) {
      binaryActive =
        false;

      $("bQ").textContent =
        `Score: ${binaryScore}/10`;

      $("bOpts").innerHTML =
        "";

      $("bStart").textContent =
        "Play Again";

      return;
    }

    binaryRound++;

    binaryQuestionTimer = setTimeout(
      askBinary,
      500
    );
  }

  $("bStart")?.addEventListener(
    "click",
    () => {
      clearTimeout(binaryQuestionTimer);
      binaryAnswered = true;
      binaryRound =
        1;

      binaryScore =
        0;

      binaryActive =
        true;

      $("bScore").textContent =
        "0";

      $("bStart").textContent =
        "Restart";

      $("bMsg").textContent =
        "Pick the decimal value.";

      askBinary();
    }
  );

  /* =====================================================
     BUG HUNT
  ===================================================== */

  const holes =
    $("holes");

  if (holes) {
    let score =
      0;

    let time =
      20;

    let best =
      Number(
        store(
          "bugBest"
        ) || 0
      );

    let tick =
      null;

    let spawn =
      null;

    let current =
      -1;

    $("bgBest").textContent =
      best;

    for (
      let i = 0;
      i < 9;
      i++
    ) {
      const hole =
        document.createElement(
          "button"
        );

      hole.className =
        "hole";

      hole.innerHTML =
        '<i class="fas fa-bug"></i>';

      hole.addEventListener(
        "click",
        () => {
          if (
            i ===
              current &&
            tick
          ) {
            score++;

            $("bgScore").textContent =
              score;

            hole.classList.remove(
              "bug"
            );

            current =
              -1;
          }
        }
      );

      holes.appendChild(
        hole
      );
    }

    function stopBugGame() {
      clearInterval(tick);
      clearInterval(spawn);
      tick = null;
      spawn = null;
      [...holes.children].forEach((hole) => hole.classList.remove("bug"));
      current = -1;
    }

    function runBugTimers() {
      if (tick || spawn || time <= 0) return;
      tick = setInterval(() => {
        time = Math.max(0, time - 1);
        $("bgTime").textContent = String(time);
        if (time <= 0) finishBugGame();
      }, 1000);
      spawn = setInterval(() => {
        if (current >= 0) holes.children[current].classList.remove("bug");
        current = rand(9);
        holes.children[current].classList.add("bug");
      }, 720);
    }

    function pauseBugGame() {
      if (!tick && !spawn) return;
      stopBugGame();
      $("bgStart").textContent = "Resume Hunt";
      $("bgMsg").textContent = "Hunt paused. Resume when you are ready.";
    }

    pauseBugHuntGame = pauseBugGame;

    function finishBugGame() {
      stopBugGame();

      $("bgStart").textContent =
        "Play Again";

      if (
        score >
        best
      ) {
        best =
          score;

        $("bgBest").textContent =
          best;

        store(
          "bugBest",
          best
        );
      }

      $("bgMsg").innerHTML =
        `Time's up! You squashed <b>${score}</b> bugs. Best: <b>${best}</b>`;
    }

    $("bgStart")?.addEventListener("click", () => {
      if ($("bgStart").textContent === "Resume Hunt" && time > 0) {
        $("bgStart").textContent = "Restart";
        $("bgMsg").textContent = "Back in action!";
        runBugTimers();
        return;
      }

      stopBugGame();
      score = 0;
      time = 20;
      $("bgScore").textContent = "0";
      $("bgTime").textContent = "20";
      $("bgStart").textContent = "Restart";
      $("bgMsg").textContent = "Go go go!";
      runBugTimers();
    });
  }

  /* =====================================================
     GAME TABS
  ===================================================== */

  document
    .querySelectorAll(
      ".tab"
    )
    .forEach(
      (tab) => {
        tab.addEventListener(
          "click",
          () => {
            const destination = tab.dataset.g;
            if (destination !== "snake") pauseSnakeGame();
            if (destination !== "react") resetReactionGame();
            if (destination !== "simon") suspendSimonGame();
            if (destination !== "bug") pauseBugHuntGame();

            document
              .querySelectorAll(
                ".tab"
              )
              .forEach(
                (item) => {
                  const active =
                    item ===
                    tab;

                  item.classList.toggle(
                    "on",
                    active
                  );

                  item.setAttribute(
                    "aria-selected",
                    active
                      ? "true"
                      : "false"
                  );
                }
              );

            document
              .querySelectorAll(
                ".game"
              )
              .forEach(
                (game) => {
                  game.classList.toggle(
                    "on",
                    game.id ===
                      `g-${tab.dataset.g}`
                  );
                }
              );
          }
        );
      }
    );

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      pauseSnakeGame();
      resetReactionGame();
      suspendSimonGame();
      pauseBugHuntGame();
    }
  });

})();
