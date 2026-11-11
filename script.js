/* -------------------------------------------------------
   AMRUT HANAMAPURE — PORTFOLIO INTERACTIONS
-------------------------------------------------------- */
(() => {
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeBtn');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function applyTheme(theme) {
    root.dataset.theme = theme;
    try { localStorage.setItem('portfolio-theme', theme); } catch (_) {}
    if (themeBtn) {
      const isDark = theme === 'dark';
      themeBtn.innerHTML = isDark ? '<i class="fa-regular fa-sun"></i>' : '<i class="fa-regular fa-moon"></i>';
      themeBtn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
      themeBtn.title = isDark ? 'Switch to light theme' : 'Switch to dark theme';
    }
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) themeMeta.content = theme === 'dark' ? '#0b1220' : '#f5f8fc';
  }

  applyTheme(root.dataset.theme || 'light');
  themeBtn?.addEventListener('click', () => applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

  // Rotating role descriptor. The static fallback remains meaningful without JavaScript.
  const typed = document.getElementById('typed');
  const roles = ['Electronics & Communication Engineer', 'Hardware Testing', 'Embedded Systems', 'PCB Design'];
  if (typed && !prefersReducedMotion) {
    let roleIndex = 0, charIndex = roles[0].length, deleting = true;
    const tick = () => {
      const word = roles[roleIndex];
      if (deleting) {
        charIndex--;
        typed.textContent = word.slice(0, Math.max(0, charIndex));
        if (charIndex <= 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; }
        window.setTimeout(tick, 36);
      } else {
        const nextWord = roles[roleIndex];
        charIndex++;
        typed.textContent = nextWord.slice(0, charIndex);
        if (charIndex >= nextWord.length) {
          deleting = true;
          window.setTimeout(tick, 1600);
        } else window.setTimeout(tick, 62);
      }
    };
    window.setTimeout(tick, 1900);
  }

  // Reveal elements only when motion is allowed; content is visible as a fallback.
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -25px 0px' });
    revealItems.forEach(item => revealObserver.observe(item));
  } else revealItems.forEach(item => item.classList.add('is-visible'));

  // Count-up summary and current section navigation.
  const stats = document.querySelector('.hero-stats');
  if (stats && 'IntersectionObserver' in window && !prefersReducedMotion) {
    const statsObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        stats.querySelectorAll('[data-count]').forEach(node => {
          const target = Number(node.dataset.count || 0);
          let current = 0;
          const step = Math.max(1, Math.ceil(target / 18));
          const timer = window.setInterval(() => {
            current = Math.min(target, current + step);
            node.textContent = String(current);
            if (current >= target) window.clearInterval(timer);
          }, 35);
        });
        statsObserver.disconnect();
      });
    }, { threshold: 0.35 });
    statsObserver.observe(stats);
  }

  const progressBar = document.getElementById('progressBar');
  const updateProgress = () => {
    if (!progressBar) return;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const percent = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
    progressBar.style.width = `${Math.max(0, Math.min(100, percent))}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();

  const navLinks = [...document.querySelectorAll('.main-nav a')];
  const navSections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
          const active = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    navSections.forEach(section => navObserver.observe(section));
  }

  // Contact form: use the existing EmailJS configuration; provide a mail-client fallback.
  const form = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const setFormStatus = (message, type = '') => {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`.trim();
  };
  if (form) {
    const EMAILJS_PUBLIC_KEY = 'TZWUr1PeHYnnlkkBN';
    const EMAILJS_SERVICE_ID = 'service_9uitjh4';
    const EMAILJS_TEMPLATE_ID = 'template_re3hdru';
    if (window.emailjs) {
      try { window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY }); } catch (error) { console.warn('EmailJS initialization failed:', error); }
    }
    form.addEventListener('submit', async event => {
      event.preventDefault();
      const submitButton = form.querySelector('[type="submit"]');
      const originalButtonText = submitButton?.innerHTML || '';
      if (submitButton) { submitButton.disabled = true; submitButton.textContent = 'Sending…'; }
      setFormStatus('Sending your message…');
      try {
        if (window.emailjs && typeof window.emailjs.sendForm === 'function') {
          await window.emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
          form.reset();
          setFormStatus('Your message has been sent successfully.', 'success');
        } else {
          const data = new FormData(form);
          const subject = encodeURIComponent(String(data.get('subject') || 'Portfolio enquiry'));
          const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`);
          window.location.href = `mailto:amruthanamapure@gmail.com?subject=${subject}&body=${body}`;
          setFormStatus('Your email application is opening. Please send the prepared message.');
        }
      } catch (error) {
        console.error('Contact form error:', error);
        setFormStatus('Message could not be sent. Please email amruthanamapure@gmail.com directly.', 'error');
      } finally {
        if (submitButton) { submitButton.disabled = false; submitButton.innerHTML = originalButtonText; }
      }
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();



/* =====================================
   8. MINI GAMES (Snake, Logic Gates, Memory, Reaction)
===================================== */
(function () {
  const $ = id => document.getElementById(id);
  const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  const store = (k, v) => { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) {} };
  const rand = n => Math.floor(Math.random() * n);

  /* ---------- SNAKE ---------- */
  const cvs = $("snake"), g = cvs.getContext("2d"), N = 15, C = cvs.width / N;
  const sScore = $("sScore"), sBest = $("sBest"), sStart = $("sStart");
  let snake, dir, next, food, score, timer = null, best = +(store("snakeBest") || 0), over = false;
  sBest.textContent = best;

  function place() { do { food = { x: rand(N), y: rand(N) }; } while (snake.some(s => s.x === food.x && s.y === food.y)); }
  function reset() {
    snake = [{ x: 7, y: 7 }, { x: 6, y: 7 }, { x: 5, y: 7 }];
    dir = next = { x: 1, y: 0 }; score = 0; over = false; sScore.textContent = 0; place();
  }
  function draw() {
    g.clearRect(0, 0, cvs.width, cvs.height);
    g.strokeStyle = css("--line"); g.lineWidth = 0.5;
    for (let i = 1; i < N; i++) {
      g.beginPath(); g.moveTo(i * C, 0); g.lineTo(i * C, cvs.height); g.stroke();
      g.beginPath(); g.moveTo(0, i * C); g.lineTo(cvs.width, i * C); g.stroke();
    }
    g.strokeStyle = css("--g"); g.lineWidth = 1.5;
    g.beginPath(); g.arc(food.x * C + C / 2, food.y * C + C / 2, C / 3, 0, 6.29); g.stroke();
    g.strokeStyle = css("--b");
    snake.forEach((s, i) => { g.globalAlpha = i === 0 ? 1 : 0.75; g.strokeRect(s.x * C + 2, s.y * C + 2, C - 4, C - 4); });
    g.globalAlpha = 1;
    if (over) {
      g.fillStyle = css("--ink"); g.font = "bold 26px 'Times New Roman',serif"; g.textAlign = "center";
      g.fillText("Game Over", cvs.width / 2, cvs.height / 2);
    }
  }
  function loop(ms) { clearInterval(timer); timer = setInterval(step, ms); }
  function endSnake() {
    clearInterval(timer); timer = null; over = true; cvs.classList.remove("live"); sStart.textContent = "Play Again";
    if (score > best) { best = score; sBest.textContent = best; store("snakeBest", best); }
    draw();
  }
  function step() {
    dir = next;
    const h = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
    if (h.x < 0 || h.y < 0 || h.x >= N || h.y >= N || snake.some(s => s.x === h.x && s.y === h.y)) return endSnake();
    snake.unshift(h);
    if (h.x === food.x && h.y === food.y) {
      score++; sScore.textContent = score; place(); loop(Math.max(70, 130 - score * 3));
    } else snake.pop();
    draw();
  }
  function startSnake() { reset(); cvs.classList.add("live"); sStart.textContent = "Restart"; loop(130); draw(); }
  function setDir(x, y) { if (x !== -dir.x || y !== -dir.y) next = { x, y }; }
  const dirs = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
  document.querySelectorAll(".pad button").forEach(b => b.addEventListener("click", () => timer && setDir(...dirs[b.dataset.d])));
  addEventListener("keydown", e => {
    const map = { ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right", w: "up", s: "down", a: "left", d: "right" };
    if (timer && map[e.key]) { e.preventDefault(); setDir(...dirs[map[e.key]]); }
  });
  let tx, ty;
  cvs.addEventListener("touchstart", e => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
  cvs.addEventListener("touchend", e => {
    const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
    if (!timer || Math.max(Math.abs(dx), Math.abs(dy)) < 20) return;
    Math.abs(dx) > Math.abs(dy) ? setDir(dx > 0 ? 1 : -1, 0) : setDir(0, dy > 0 ? 1 : -1);
  }, { passive: true });
  sStart.addEventListener("click", startSnake);
  reset(); draw();

  /* ---------- LOGIC GATES QUIZ ---------- */
  const GATES = {
    AND: (a, b) => a & b, OR: (a, b) => a | b, NAND: (a, b) => +!(a & b),
    NOR: (a, b) => +!(a | b), XOR: (a, b) => a ^ b, NOT: a => +!a
  };
  let round = 0, lscore = 0, answer = 0, active = false;
  const lgMsg = $("lgMsg");
  function ask() {
    const name = Object.keys(GATES)[rand(6)], a = rand(2), b = rand(2);
    answer = GATES[name](a, b);
    $("lgIn").textContent = name === "NOT" ? `A = ${a}` : `A = ${a}   B = ${b}`;
    $("lgQ").textContent = name === "NOT" ? "Y = NOT A = ?" : `Y = A ${name} B = ?`;
    $("lgRound").textContent = round;
  }
  function startQuiz() {
    round = 1; lscore = 0; active = true; $("lgScore").textContent = 0;
    lgMsg.textContent = "Choose 0 or 1."; $("lgStart").textContent = "Restart"; ask();
  }
  function pick(v) {
    if (!active) return;
    const ok = v === answer;
    if (ok) lscore++;
    $("lgScore").textContent = lscore;
    lgMsg.textContent = ok ? "✅ Correct!" : `❌ Wrong, the answer was ${answer}.`;
    if (round >= 10) {
      active = false; $("lgQ").textContent = `Final score: ${lscore}/10`; $("lgIn").textContent = "Quiz complete";
      $("lgStart").textContent = "Play Again"; return;
    }
    round++; setTimeout(ask, 500);
  }
  $("lgStart").addEventListener("click", startQuiz);
  $("lg0").addEventListener("click", () => pick(0));
  $("lg1").addEventListener("click", () => pick(1));

  /* ---------- MEMORY MATCH ---------- */
  const ICONS = ["fa-microchip", "fa-bolt", "fa-battery-full", "fa-wifi", "fa-lightbulb", "fa-plug", "fa-satellite-dish", "fa-memory"];
  const mgrid = $("mgrid"), mBest = $("mBest");
  let first = null, lock = false, moves = 0, matched = 0, mbest = +(store("memBest") || 0);
  if (mbest) mBest.textContent = mbest;
  function memInit() {
    const deck = [...ICONS, ...ICONS].sort(() => Math.random() - 0.5);
    mgrid.innerHTML = ""; first = null; lock = false; moves = 0; matched = 0;
    $("mMoves").textContent = 0; $("mMsg").textContent = "Match all the electronic component pairs.";
    deck.forEach(ic => {
      const b = document.createElement("button");
      b.className = "mc"; b.dataset.ic = ic; b.innerHTML = `<i class="fas ${ic}"></i>`;
      b.addEventListener("click", () => flip(b)); mgrid.appendChild(b);
    });
  }
  function flip(b) {
    if (lock || b.classList.contains("up") || b.classList.contains("done")) return;
    b.classList.add("up");
    if (!first) { first = b; return; }
    moves++; $("mMoves").textContent = moves;
    if (first.dataset.ic === b.dataset.ic) {
      first.classList.replace("up", "done"); b.classList.replace("up", "done"); first = null;
      if (++matched === ICONS.length) {
        $("mMsg").textContent = `🎉 Solved in ${moves} moves!`;
        if (!mbest || moves < mbest) { mbest = moves; mBest.textContent = mbest; store("memBest", mbest); }
      }
    } else {
      lock = true;
      setTimeout(() => { first.classList.remove("up"); b.classList.remove("up"); first = null; lock = false; }, 800);
    }
  }
  $("mReset").addEventListener("click", memInit);
  memInit();

  /* ---------- REACTION TEST ---------- */
  const led = $("rxBox"), rxMsg = $("rxMsg"), rxBest = $("rxBest");
  let rState = "idle", rTimer, t0, rbest = +(store("rxBest") || 0);
  if (rbest) rxBest.textContent = rbest + " ms";
  function rxReset() { clearTimeout(rTimer); rState = "idle"; led.className = "led"; rxMsg.textContent = "Tap the LED to begin"; }
  led.addEventListener("click", () => {
    if (rState === "idle") {
      rState = "wait"; led.className = "led wait"; rxMsg.textContent = "Wait for green...";
      rTimer = setTimeout(() => { rState = "go"; led.className = "led go"; rxMsg.textContent = "TAP NOW!"; t0 = performance.now(); }, 1500 + Math.random() * 2500);
    } else if (rState === "wait") {
      clearTimeout(rTimer); rState = "idle"; led.className = "led bad"; rxMsg.textContent = "Too early! Tap to retry";
    } else if (rState === "go") {
      const ms = Math.round(performance.now() - t0);
      rState = "idle"; led.className = "led"; rxMsg.textContent = `${ms} ms. Tap to retry`;
      if (!rbest || ms < rbest) { rbest = ms; rxBest.textContent = ms + " ms"; store("rxBest", ms); }
    }
  });

  /* ---------- TABS ---------- */
  document.querySelectorAll(".tab").forEach(t => t.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(x => { x.classList.toggle("on", x === t); x.setAttribute("aria-selected", x === t ? "true" : "false"); });
    document.querySelectorAll(".game").forEach(x => x.classList.toggle("on", x.id === "g-" + t.dataset.g));
    if (timer) endSnake();
    rxReset();
  }));
})();


/* =====================================
   9. MORE GAMES (Tic-Tac-Toe, LED Simon, Binary Quiz, Bug Hunt)
===================================== */
(function () {
  const $ = id => document.getElementById(id);
  const store = (k, v) => { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) {} };
  const rand = n => Math.floor(Math.random() * n);

  /* ---------- TIC-TAC-TOE (you X vs CPU O) ---------- */
  const LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  const tgrid = $("tgrid"), tMsg = $("tMsg");
  let board, tOver, tW = 0, tL = 0;
  const winner = b => { for (const l of LINES) if (b[l[0]] && b[l[0]] === b[l[1]] && b[l[0]] === b[l[2]]) return l; return null; };
  function tRender(line) {
    [...tgrid.children].forEach((c, i) => {
      c.textContent = board[i] || ""; c.classList.toggle("o", board[i] === "O");
      c.classList.toggle("win", !!line && line.includes(i));
    });
  }
  function tFinish(line, text) { tOver = true; tMsg.textContent = text; tRender(line); }
  function cpuMove() {
    const find = who => { for (const l of LINES) { const v = l.map(i => board[i]); if (v.filter(x => x === who).length === 2 && v.includes(null)) return l[v.indexOf(null)]; } return -1; };
    let m = find("O"); if (m < 0) m = find("X");
    if (m < 0 && !board[4]) m = 4;
    if (m < 0) { const free = board.map((v, i) => v ? -1 : i).filter(i => i >= 0); m = free[rand(free.length)]; }
    board[m] = "O";
  }
  function tPlay(i) {
    if (tOver || board[i]) return;
    board[i] = "X";
    let w = winner(board);
    if (w) { $("tW").textContent = ++tW; return tFinish(w, "🎉 You win!"); }
    if (!board.includes(null)) return tFinish(null, "Draw!");
    cpuMove(); w = winner(board);
    if (w) { $("tL").textContent = ++tL; return tFinish(w, "CPU wins this one."); }
    if (!board.includes(null)) return tFinish(null, "Draw!");
    tMsg.textContent = "Your move."; tRender(null);
  }
  function tReset() { board = Array(9).fill(null); tOver = false; tMsg.textContent = "Your move."; tRender(null); }
  for (let i = 0; i < 9; i++) { const b = document.createElement("button"); b.className = "tc"; b.addEventListener("click", () => tPlay(i)); tgrid.appendChild(b); }
  $("tReset").addEventListener("click", tReset); tReset();

  /* ---------- LED SIMON ---------- */
  const sq = [...document.querySelectorAll(".sq")], siMsg = $("siMsg");
  let seq = [], step = 0, accepting = false, sBest = +(store("simonBest") || 0), simonTimers = [];
  $("siBest").textContent = sBest;
  const later = (fn, ms) => { const t = setTimeout(fn, ms); simonTimers.push(t); };
  function flash(i, ms = 350) { sq[i].classList.add("lit"); later(() => sq[i].classList.remove("lit"), ms); }
  function playSeq() {
    accepting = false; siMsg.textContent = "Watch...";
    seq.forEach((c, k) => later(() => flash(c), 600 + k * 650));
    later(() => { accepting = true; step = 0; siMsg.textContent = "Your turn!"; }, 600 + seq.length * 650);
  }
  function nextRound() { seq.push(rand(4)); $("siLvl").textContent = seq.length; playSeq(); }
  function simonStop() { simonTimers.forEach(clearTimeout); simonTimers = []; accepting = false; sq.forEach(s => s.classList.remove("lit")); }
  $("siStart").addEventListener("click", () => { simonStop(); seq = []; $("siStart").textContent = "Restart"; nextRound(); });
  sq.forEach(s => s.addEventListener("click", () => {
    if (!accepting) return;
    const c = +s.dataset.c; flash(c, 200);
    if (c !== seq[step]) {
      accepting = false; siMsg.textContent = `❌ Wrong! You reached level ${seq.length}.`;
      if (seq.length > sBest) { sBest = seq.length; $("siBest").textContent = sBest; store("simonBest", sBest); }
      $("siStart").textContent = "Play Again"; return;
    }
    if (++step === seq.length) { accepting = false; siMsg.textContent = "✅ Nice!"; later(nextRound, 800); }
  }));

  /* ---------- BINARY QUIZ ---------- */
  let bRound = 0, bScore = 0, bAns = 0, bActive = false;
  function bAsk() {
    bAns = rand(16); $("bQ").textContent = bAns.toString(2).padStart(4, "0"); $("bRound").textContent = bRound;
    const opts = new Set([bAns]); while (opts.size < 4) opts.add(rand(16));
    const box = $("bOpts"); box.innerHTML = "";
    [...opts].sort(() => Math.random() - 0.5).forEach(v => {
      const b = document.createElement("button"); b.className = "btn"; b.textContent = v;
      b.addEventListener("click", () => bPick(v)); box.appendChild(b);
    });
  }
  function bPick(v) {
    if (!bActive) return;
    const ok = v === bAns; if (ok) bScore++;
    $("bScore").textContent = bScore; $("bMsg").textContent = ok ? "✅ Correct!" : `❌ It was ${bAns}.`;
    if (bRound >= 10) { bActive = false; $("bQ").textContent = `Score: ${bScore}/10`; $("bOpts").innerHTML = ""; $("bStart").textContent = "Play Again"; return; }
    bRound++; setTimeout(bAsk, 500);
  }
  $("bStart").addEventListener("click", () => { bRound = 1; bScore = 0; bActive = true; $("bScore").textContent = 0; $("bStart").textContent = "Restart"; $("bMsg").textContent = "Pick the decimal value."; bAsk(); });

  /* ---------- BUG HUNT ---------- */
  const holes = $("holes"); let bgScore = 0, bgTime = 20, bgBest = +(store("bugBest") || 0), bgTick, bgSpawn, cur = -1;
  $("bgBest").textContent = bgBest;
  for (let i = 0; i < 9; i++) {
    const h = document.createElement("button"); h.className = "hole"; h.innerHTML = '<i class="fas fa-bug"></i>';
    h.addEventListener("click", () => { if (i === cur && bgTick) { bgScore++; $("bgScore").textContent = bgScore; h.classList.remove("bug"); cur = -1; } });
    holes.appendChild(h);
  }
  function bugStop() { clearInterval(bgTick); clearInterval(bgSpawn); bgTick = bgSpawn = null; [...holes.children].forEach(h => h.classList.remove("bug")); cur = -1; }
  function bugEnd() {
    bugStop(); $("bgStart").textContent = "Play Again";
    if (bgScore > bgBest) { bgBest = bgScore; $("bgBest").textContent = bgBest; store("bugBest", bgBest); }
    $("bgMsg").innerHTML = `Time's up! You squashed <b>${bgScore}</b> bugs. Best: <b>${bgBest}</b>`;
  }
  $("bgStart").addEventListener("click", () => {
    bugStop(); bgScore = 0; bgTime = 20; $("bgScore").textContent = 0; $("bgTime").textContent = 20; $("bgStart").textContent = "Restart";
    $("bgMsg").textContent = "Go go go!";
    bgTick = setInterval(() => { $("bgTime").textContent = --bgTime; if (bgTime <= 0) bugEnd(); }, 1000);
    bgSpawn = setInterval(() => {
      if (cur >= 0) holes.children[cur].classList.remove("bug");
      cur = rand(9); holes.children[cur].classList.add("bug");
    }, 750);
  });

  /* stop timed games when switching tabs */
  document.querySelectorAll(".tab").forEach(t => t.addEventListener("click", () => { simonStop(); bugStop(); bActive = false; }));
})();
