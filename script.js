/* =========================================================
   AMRUT HANAMAPURE — PORTFOLIO SCRIPT
   ========================================================= */

"use strict";

/* =========================================================
   GLOBAL HELPERS
========================================================= */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];


/* =========================================================
   THEME SWITCHER
========================================================= */

const themeBtn = $("#themeBtn");

function setTheme(theme) {
    document.documentElement.dataset.theme = theme;

    localStorage.setItem(
        "portfolio-theme",
        theme
    );

    if (themeBtn) {
        const isDark = theme === "dark";

        themeBtn.innerHTML = isDark
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';
    }
}

const savedTheme =
    localStorage.getItem("portfolio-theme") ||
    "dark";

setTheme(savedTheme);

themeBtn?.addEventListener("click", () => {
    const current =
        document.documentElement.dataset.theme;

    setTheme(
        current === "dark"
            ? "light"
            : "dark"
    );
});


/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn = $("#menuBtn");
const nav = $(".main-nav");

menuBtn?.addEventListener("click", () => {
    nav?.classList.toggle("open");

    const expanded =
        nav?.classList.contains("open");

    menuBtn.setAttribute(
        "aria-expanded",
        expanded
            ? "true"
            : "false"
    );
});

$$(".main-nav a").forEach((link) => {
    link.addEventListener("click", () => {
        nav?.classList.remove("open");
    });
});


/* =========================================================
   SMOOTH SCROLL
========================================================= */

$$('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const id =
            link.getAttribute("href");

        if (
            !id ||
            id === "#"
        ) {
            return;
        }

        const target =
            document.querySelector(id);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});


/* =========================================================
   SCROLL PROGRESS
========================================================= */

const progressBar =
    $("#progressBar");

function updateScrollProgress() {
    if (!progressBar) {
        return;
    }

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        documentHeight > 0
            ? (window.scrollY /
                documentHeight) *
              100
            : 0;

    progressBar.style.width =
        `${Math.min(
            100,
            Math.max(
                0,
                progress
            )
        )}%`;
}

window.addEventListener(
    "scroll",
    updateScrollProgress,
    {
        passive: true
    }
);

updateScrollProgress();


/* =========================================================
   TYPING EFFECT
========================================================= */

const typedText =
    $("#typed");

const typingWords = [
    "Electronics Engineer",
    "Hardware Testing Engineer",
    "Embedded Systems Engineer",
    "PCB Design Engineer",
    "VLSI Enthusiast"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    if (!typedText) {
        return;
    }

    const word =
        typingWords[wordIndex];

    if (!deleting) {
        charIndex++;

        typedText.textContent =
            word.substring(
                0,
                charIndex
            );

        if (
            charIndex ===
            word.length
        ) {
            deleting = true;

            setTimeout(
                typeEffect,
                1600
            );

            return;
        }
    } else {
        charIndex--;

        typedText.textContent =
            word.substring(
                0,
                charIndex
            );

        if (
            charIndex === 0
        ) {
            deleting = false;

            wordIndex =
                (wordIndex + 1) %
                typingWords.length;
        }
    }

    setTimeout(
        typeEffect,
        deleting
            ? 45
            : 75
    );
}

if (
    typedText &&
    !window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches
) {
    typeEffect();
}


/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

const revealElements =
    $$(".reveal");

if (
    "IntersectionObserver" in
    window
) {
    const revealObserver =
        new IntersectionObserver(
            (entries) => {
                entries.forEach(
                    (entry) => {
                        if (
                            entry.isIntersecting
                        ) {
                            entry.target.classList.add(
                                "is-visible"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );
                        }
                    }
                );
            },
            {
                threshold: 0.08
            }
        );

    revealElements.forEach(
        (element) => {
            revealObserver.observe(
                element
            );
        }
    );
} else {
    revealElements.forEach(
        (element) => {
            element.classList.add(
                "is-visible"
            );
        }
    );
}


/* =========================================================
   PROJECT DETAILS MODAL
========================================================= */

const projectDetails = {

    agriguard: {
        title:
            "AgriGuard – Smart IoT Farming & Security System",

        description:
            "An Arduino-based smart farming and field security system designed to automate irrigation and monitor field conditions.",

        features: [
            "Automatic irrigation using soil moisture sensing",
            "Field security using PIR detection",
            "Temperature monitoring",
            "IoT-based monitoring using ESP8266",
            "Reduced manual irrigation effort"
        ],

        technologies:
            "Arduino, ESP8266, Soil Moisture Sensor, PIR Sensor, Temperature Sensor, IoT"
    },

    oscilloscope: {
        title:
            "Portable Oscilloscope",

        description:
            "A compact Arduino-based oscilloscope prototype designed to display measured waveform information on an OLED display.",

        features: [
            "Compact portable design",
            "Arduino-based signal processing",
            "OLED waveform display",
            "Simple user interface",
            "Useful for basic electronic signal observation"
        ],

        technologies:
            "Arduino Nano/Uno, OLED SSD1306, Embedded C/C++"
    },

    tester: {
        title:
            "All-in-One Electronic Component Tester",

        description:
            "A portable Arduino-based component testing project designed to identify and test commonly used electronic components.",

        features: [
            "Component identification",
            "Basic component measurement",
            "OLED result display",
            "Compact prototype",
            "Useful for electronics troubleshooting"
        ],

        technologies:
            "Arduino, OLED SSD1306, Resistors, Capacitors, Diodes, Transistors"
    },

    bms: {
        title:
            "5S Li-Ion Battery Management System",

        description:
            "A prototype battery management system designed for a 5-cell lithium-ion battery pack with voltage, current and temperature monitoring.",

        features: [
            "5-cell battery configuration",
            "Cell voltage monitoring",
            "Current monitoring",
            "Temperature monitoring",
            "MOSFET-based protection concept",
            "OLED status display",
            "Buzzer alert system"
        ],

        technologies:
            "Arduino UNO, INA219, DS18B20, MOSFET, OLED, Li-Ion Cells"
    },

    led: {
        title:
            "LED Pattern Generator",

        description:
            "An Arduino-based digital electronics project that generates multiple LED lighting patterns using programmed control logic.",

        features: [
            "Multiple LED patterns",
            "Arduino digital output control",
            "Sequential lighting effects",
            "Simple embedded programming",
            "Low-cost prototype"
        ],

        technologies:
            "Arduino UNO, LEDs, Resistors, Embedded C/C++"
    },

    pneumatic: {
        title:
            "Pneumatic Pick & Place Robot",

        description:
            "A miniature automation concept designed to demonstrate pneumatic pick-and-place movement for simple industrial handling applications.",

        features: [
            "Pick-and-place mechanism",
            "Pneumatic actuation concept",
            "Industrial automation application",
            "Sequential control",
            "Mini-project implementation"
        ],

        technologies:
            "Pneumatic Cylinder, Solenoid Valve, Compressor, Sensors, Control Circuit"
    }
};


/* =========================================================
   PROJECT DETAILS BUTTONS
========================================================= */

$$(".project-details-btn").forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const id =
                    button.dataset.project;

                openProjectDetails(
                    id
                );
            }
        );
    }
);


function openProjectDetails(
    projectId
) {
    const project =
        projectDetails[
            projectId
        ];

    if (!project) {
        return;
    }

    let modal =
        $("#projectModal");

    if (!modal) {
        modal =
            document.createElement(
                "div"
            );

        modal.id =
            "projectModal";

        modal.className =
            "modal";

        document.body.appendChild(
            modal
        );
    }

    modal.innerHTML = `
        <div class="modal-content">

            <button
                class="modal-close"
                aria-label="Close">
                &times;
            </button>

            <div class="modal-header">
                <span class="eyebrow">
                    PROJECT DETAILS
                </span>

                <h2>
                    ${project.title}
                </h2>
            </div>

            <div class="modal-body">

                <p>
                    ${project.description}
                </p>

                <h3>
                    Key Features
                </h3>

                <ul>
                    ${project.features
                        .map(
                            feature =>
                                `<li>${feature}</li>`
                        )
                        .join("")}
                </ul>

                <h3>
                    Technologies
                </h3>

                <p class="tech-list">
                    ${project.technologies}
                </p>

            </div>

        </div>
    `;

    modal.classList.add(
        "show"
    );

    document.body.style.overflow =
        "hidden";

    const closeBtn =
        modal.querySelector(
            ".modal-close"
        );

    closeBtn?.addEventListener(
        "click",
        closeProjectModal
    );

    modal.addEventListener(
        "click",
        (event) => {
            if (
                event.target ===
                modal
            ) {
                closeProjectModal();
            }
        }
    );

    document.addEventListener(
        "keydown",
        handleModalEscape
    );
}


function closeProjectModal() {
    const modal =
        $("#projectModal");

    if (!modal) {
        return;
    }

    modal.classList.remove(
        "show"
    );

    document.body.style.overflow =
        "";

    document.removeEventListener(
        "keydown",
        handleModalEscape
    );
}


function handleModalEscape(
    event
) {
    if (
        event.key ===
        "Escape"
    ) {
        closeProjectModal();
    }
}


/* =========================================================
   PROJECT CODE BUTTONS
========================================================= */

$$(".project-code-btn").forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const url =
                    button.dataset.url ||
                    "https://github.com/Amruth-07";

                window.open(
                    url,
                    "_blank",
                    "noopener,noreferrer"
                );
            }
        );
    }
);


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    $("#contact-form");

const formStatus =
    $("#form-status");

function showFormStatus(
    message,
    type = ""
) {
    if (!formStatus) {
        return;
    }

    formStatus.textContent =
        message;

    formStatus.className =
        `form-status ${type}`;
}

contactForm?.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();

        const submitButton =
            contactForm.querySelector(
                'button[type="submit"]'
            );

        if (
            submitButton
        ) {
            submitButton.disabled =
                true;

            submitButton.textContent =
                "Sending...";
        }

        try {

            if (
                typeof emailjs !==
                "undefined"
            ) {

                await emailjs.sendForm(
                    "service_9uitjh4",
                    "template_re3hdru",
                    contactForm
                );

                showFormStatus(
                    "Message sent successfully.",
                    "success"
                );

                contactForm.reset();

            } else {

                const formData =
                    new FormData(
                        contactForm
                    );

                const name =
                    formData.get(
                        "name"
                    );

                const email =
                    formData.get(
                        "email"
                    );

                const subject =
                    formData.get(
                        "subject"
                    );

                const message =
                    formData.get(
                        "message"
                    );

                const mailSubject =
                    encodeURIComponent(
                        subject ||
                        "Portfolio enquiry"
                    );

                const mailBody =
                    encodeURIComponent(
                        `Name: ${name}
Email: ${email}

${message}`
                    );

                window.location.href =
                    `mailto:amruthanamapure@gmail.com?subject=${mailSubject}&body=${mailBody}`;
            }

        } catch (
            error
        ) {

            console.error(
                "Email error:",
                error
            );

            showFormStatus(
                "Unable to send message. Please email me directly.",
                "error"
            );

        } finally {

            if (
                submitButton
            ) {
                submitButton.disabled =
                    false;

                submitButton.textContent =
                    "Send Message";
            }
        }
    }
);


/* =========================================================
   EMAILJS INITIALIZATION
========================================================= */

if (
    typeof emailjs !==
    "undefined"
) {
    try {
        emailjs.init({
            publicKey:
                "TZWUr1PeHYnnlkkBN"
        });
    } catch (
        error
    ) {
        console.warn(
            "EmailJS initialization failed:",
            error
        );
    }
}


/* =========================================================
   SNAKE GAME
========================================================= */

const snakeCanvas =
    $("#snake");

if (snakeCanvas) {

    const ctx =
        snakeCanvas.getContext(
            "2d"
        );

    const GRID =
        20;

    const CELL =
        snakeCanvas.width /
        GRID;

    let snake = [];

    let direction = {
        x: 1,
        y: 0
    };

    let nextDirection = {
        x: 1,
        y: 0
    };

    let food = {
        x: 14,
        y: 10
    };

    let score =
        0;

    let best =
        Number(
            localStorage.getItem(
                "snakeBest"
            ) ||
            0
        );

    let gameRunning =
        false;

    let paused =
        false;

    let gameOver =
        false;

    let gameTimer =
        null;

    const scoreEl =
        $("#sScore");

    const bestEl =
        $("#sBest");

    const levelEl =
        $("#sLevel");

    const messageEl =
        $("#sMessage");

    const startBtn =
        $("#sStart");

    const pauseBtn =
        $("#sPause");


    function setSnakeMessage(
        message
    ) {
        if (
            messageEl
        ) {
            messageEl.textContent =
                message;
        }
    }


    function updateSnakeHUD() {

        if (
            scoreEl
        ) {
            scoreEl.textContent =
                score;
        }

        if (
            bestEl
        ) {
            bestEl.textContent =
                best;
        }

        if (
            levelEl
        ) {
            levelEl.textContent =
                1 +
                Math.floor(
                    score /
                    5
                );
        }
    }


    function resetSnake() {

        snake = [
            {
                x: 8,
                y: 10
            },
            {
                x: 7,
                y: 10
            },
            {
                x: 6,
                y: 10
            },
            {
                x: 5,
                y: 10
            }
        ];

        direction = {
            x: 1,
            y: 0
        };

        nextDirection = {
            x: 1,
            y: 0
        };

        score =
            0;

        gameRunning =
            false;

        paused =
            false;

        gameOver =
            false;

        placeFood();

        updateSnakeHUD();

        drawSnake();

        if (
            pauseBtn
        ) {
            pauseBtn.disabled =
                true;

            pauseBtn.textContent =
                "Pause";
        }

        if (
            startBtn
        ) {
            startBtn.textContent =
                "Start Game";
        }

        setSnakeMessage(
            "Press Start Game to begin."
        );
    }


    function placeFood() {

        let valid =
            false;

        while (!valid) {

            food = {
                x:
                    Math.floor(
                        Math.random() *
                        GRID
                    ),

                y:
                    Math.floor(
                        Math.random() *
                        GRID
                    )
            };

            valid =
                !snake.some(
                    part =>
                        part.x ===
                            food.x &&
                        part.y ===
                            food.y
                );
        }
    }


    function drawSnake() {

        ctx.clearRect(
            0,
            0,
            snakeCanvas.width,
            snakeCanvas.height
        );

        /* Background */

        const background =
            ctx.createLinearGradient(
                0,
                0,
                snakeCanvas.width,
                snakeCanvas.height
            );

        background.addColorStop(
            0,
            "#070707"
        );

        background.addColorStop(
            0.5,
            "#110c0d"
        );

        background.addColorStop(
            1,
            "#070707"
        );

        ctx.fillStyle =
            background;

        ctx.fillRect(
            0,
            0,
            snakeCanvas.width,
            snakeCanvas.height
        );


        /* Grid */

        ctx.strokeStyle =
            "rgba(255, 140, 70, .12)";

        ctx.lineWidth =
            1;

        for (
            let i = 0;
            i <= GRID;
            i++
        ) {

            const position =
                i * CELL;

            ctx.beginPath();

            ctx.moveTo(
                position,
                0
            );

            ctx.lineTo(
                position,
                snakeCanvas.height
            );

            ctx.stroke();

            ctx.beginPath();

            ctx.moveTo(
                0,
                position
            );

            ctx.lineTo(
                snakeCanvas.width,
                position
            );

            ctx.stroke();
        }


        /* Food */

        const foodX =
            food.x *
                CELL +
            CELL / 2;

        const foodY =
            food.y *
                CELL +
            CELL / 2;

        ctx.save();

        ctx.shadowColor =
            "#ff3d4d";

        ctx.shadowBlur =
            25;

        ctx.fillStyle =
            "#ff4050";

        ctx.beginPath();

        ctx.arc(
            foodX,
            foodY,
            CELL *
                0.30,
            0,
            Math.PI *
                2
        );

        ctx.fill();

        ctx.restore();


        /* Snake */

        snake.forEach(
            (part, index) => {

                const padding =
                    index ===
                    0
                        ? 2
                        : 3;

                const x =
                    part.x *
                        CELL +
                    padding;

                const y =
                    part.y *
                        CELL +
                    padding;

                const size =
                    CELL -
                    padding *
                        2;

                const gradient =
                    ctx.createLinearGradient(
                        x,
                        y,
                        x +
                            size,
                        y +
                            size
                    );

                if (
                    index ===
                    0
                ) {

                    gradient.addColorStop(
                        0,
                        "#fff3a6"
                    );

                    gradient.addColorStop(
                        0.5,
                        "#ff8c42"
                    );

                    gradient.addColorStop(
                        1,
                        "#ff3f8e"
                    );

                } else {

                    gradient.addColorStop(
                        0,
                        "#ff8c42"
                    );

                    gradient.addColorStop(
                        0.5,
                        "#ff3f8e"
                    );

                    gradient.addColorStop(
                        1,
                        "#b52cff"
                    );
                }

                ctx.save();

                ctx.shadowColor =
                    index ===
                    0
                        ? "#ff8c42"
                        : "#ff3f8e";

                ctx.shadowBlur =
                    index ===
                    0
                        ? 18
                        : 9;

                ctx.fillStyle =
                    gradient;

                roundRect(
                    ctx,
                    x,
                    y,
                    size,
                    size,
                    6
                );

                ctx.fill();

                ctx.restore();
            }
        );


        /* Eyes */

        if (
            snake.length
        ) {

            const head =
                snake[0];

            const hx =
                head.x *
                    CELL +
                CELL /
                    2;

            const hy =
                head.y *
                    CELL +
                CELL /
                    2;

            ctx.fillStyle =
                "#171018";

            let eyes;

            if (
                direction.x !==
                0
            ) {

                eyes = [
                    [
                        hx +
                            direction.x *
                                4,
                        hy -
                            4
                    ],
                    [
                        hx +
                            direction.x *
                                4,
                        hy +
                            4
                    ]
                ];

            } else {

                eyes = [
                    [
                        hx -
                            4,
                        hy +
                            direction.y *
                                4
                    ],
                    [
                        hx +
                            4,
                        hy +
                            direction.y *
                                4
                    ]
                ];
            }

            eyes.forEach(
                eye => {

                    ctx.beginPath();

                    ctx.arc(
                        eye[0],
                        eye[1],
                        1.8,
                        0,
                        Math.PI *
                            2
                    );

                    ctx.fill();
                }
            );
        }


        /* Overlay */

        if (
            !gameRunning ||
            paused ||
            gameOver
        ) {

            ctx.fillStyle =
                "rgba(0,0,0,.65)";

            ctx.fillRect(
                0,
                0,
                snakeCanvas.width,
                snakeCanvas.height
            );

            ctx.textAlign =
                "center";

            ctx.fillStyle =
                "#ffffff";

            ctx.font =
                "800 34px Arial";

            ctx.fillText(
                gameOver
                    ? "GAME OVER"
                    : paused
                        ? "PAUSED"
                        : "SNAKE",
                snakeCanvas.width /
                    2,
                snakeCanvas.height /
                    2
            );

            ctx.fillStyle =
                "#ff9a45";

            ctx.font =
                "600 15px Arial";

            ctx.fillText(
                gameOver
                    ? `Score: ${score}`
                    : paused
                        ? "Press Resume"
                        : "Press Start Game",
                snakeCanvas.width /
                    2,
                snakeCanvas.height /
                    2 +
                    30
            );
        }
    }


    function roundRect(
        context,
        x,
        y,
        width,
        height,
        radius
    ) {

        context.beginPath();

        context.moveTo(
            x +
                radius,
            y
        );

        context.arcTo(
            x +
                width,
            y,
            x +
                width,
            y +
                height,
            radius
        );

        context.arcTo(
            x +
                width,
            y +
                height,
            x,
            y +
                height,
            radius
        );

        context.arcTo(
            x,
            y +
                height,
            x,
            y,
            radius
        );

        context.arcTo(
            x,
            y,
            x +
                width,
            y,
            radius
        );

        context.closePath();
    }


    function snakeSpeed() {

        return Math.max(
            60,
            150 -
                Math.floor(
                    score /
                        5
                ) *
                    10
        );
    }


    function changeDirection(
        x,
        y
    ) {

        if (
            x ===
                -nextDirection.x &&
            y ===
                -nextDirection.y
        ) {
            return;
        }

        nextDirection = {
            x,
            y
        };
    }


    function snakeMove() {

        if (
            !gameRunning ||
            paused ||
            gameOver
        ) {
            return;
        }

        direction = {
            ...nextDirection
        };

        const head =
            snake[0];

        const newHead = {
            x:
                head.x +
                direction.x,

            y:
                head.y +
                direction.y
        };

        const ateFood =
            newHead.x ===
                food.x &&
            newHead.y ===
                food.y;

        const body =
            ateFood
                ? snake
                : snake.slice(
                    0,
                    -1
                );

        const hitWall =
            newHead.x <
                0 ||
            newHead.x >=
                GRID ||
            newHead.y <
                0 ||
            newHead.y >=
                GRID;

        const hitSelf =
            body.some(
                part =>
                    part.x ===
                        newHead.x &&
                    part.y ===
                        newHead.y
            );

        if (
            hitWall ||
            hitSelf
        ) {

            endSnakeGame();

            return;
        }

        snake.unshift(
            newHead
        );

        if (
            ateFood
        ) {

            score++;

            if (
                score >
                best
            ) {

                best =
                    score;

                localStorage.setItem(
                    "snakeBest",
                    String(
                        best
                    )
                );
            }

            placeFood();

            clearInterval(
                gameTimer
            );

            gameTimer =
                setInterval(
                    snakeMove,
                    snakeSpeed()
                );

        } else {

            snake.pop();
        }

        updateSnakeHUD();

        drawSnake();
    }


    function startSnakeGame() {

        clearInterval(
            gameTimer
        );

        resetSnake();

        gameRunning =
            true;

        gameOver =
            false;

        paused =
            false;

        if (
            startBtn
        ) {
            startBtn.textContent =
                "Restart";
        }

        if (
            pauseBtn
        ) {
            pauseBtn.disabled =
                false;
        }

        setSnakeMessage(
            "Use Arrow Keys, WASD or the controls."
        );

        gameTimer =
            setInterval(
                snakeMove,
                snakeSpeed()
            );

        drawSnake();
    }


    function endSnakeGame() {

        clearInterval(
            gameTimer
        );

        gameTimer =
            null;

        gameRunning =
            false;

        gameOver =
            true;

        if (
            startBtn
        ) {
            startBtn.textContent =
                "Play Again";
        }

        if (
            pauseBtn
        ) {
            pauseBtn.disabled =
                true;
        }

        setSnakeMessage(
            `Game over! Score: ${score}`
        );

        updateSnakeHUD();

        drawSnake();
    }


    function toggleSnakePause() {

        if (
            !gameRunning ||
            gameOver
        ) {
            return;
        }

        paused =
            !paused;

        if (
            paused
        ) {

            clearInterval(
                gameTimer
            );

            pauseBtn.textContent =
                "Resume";

            setSnakeMessage(
                "Game paused."
            );

        } else {

            pauseBtn.textContent =
                "Pause";

            setSnakeMessage(
                "Game resumed."
            );

            gameTimer =
                setInterval(
                    snakeMove,
                    snakeSpeed()
                );
        }

        drawSnake();
    }


    startBtn?.addEventListener(
        "click",
        startSnakeGame
    );

    pauseBtn?.addEventListener(
        "click",
        toggleSnakePause
    );


    /* Keyboard */

    window.addEventListener(
        "keydown",
        (event) => {

            const keys = {
                ArrowUp:
                    [0, -1],

                ArrowDown:
                    [0, 1],

                ArrowLeft:
                    [-1, 0],

                ArrowRight:
                    [1, 0],

                w:
                    [0, -1],

                W:
                    [0, -1],

                s:
                    [0, 1],

                S:
                    [0, 1],

                a:
                    [-1, 0],

                A:
                    [-1, 0],

                d:
                    [1, 0],

                D:
                    [1, 0]
            };

            if (
                keys[
                    event.key
                ]
            ) {

                event.preventDefault();

                changeDirection(
                    ...keys[
                        event.key
                    ]
                );
            }

            if (
                event.code ===
                    "Space" &&
                gameRunning
            ) {

                event.preventDefault();

                toggleSnakePause();
            }
        }
    );


    /* Touch / swipe */

    let touchStartX =
        0;

    let touchStartY =
        0;

    snakeCanvas.addEventListener(
        "touchstart",
        (event) => {

            touchStartX =
                event.touches[0]
                    .clientX;

            touchStartY =
                event.touches[0]
                    .clientY;
        },
        {
            passive: true
        }
    );

    snakeCanvas.addEventListener(
        "touchend",
        (event) => {

            const dx =
                event.changedTouches[0]
                    .clientX -
                touchStartX;

            const dy =
                event.changedTouches[0]
                    .clientY -
                touchStartY;

            if (
                Math.max(
                    Math.abs(
                        dx
                    ),
                    Math.abs(
                        dy
                    )
                ) < 25
            ) {
                return;
            }

            if (
                Math.abs(
                    dx
                ) >
                Math.abs(
                    dy
                )
            ) {

                changeDirection(
                    dx >
                        0
                        ? 1
                        : -1,
                    0
                );

            } else {

                changeDirection(
                    0,
                    dy >
                        0
                        ? 1
                        : -1
                );
            }
        },
        {
            passive: true
        }
    );


    /* On-screen buttons */

    $$(
        ".pad button[data-d]"
    ).forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    const directions = {
                        up:
                            [0, -1],

                        down:
                            [0, 1],

                        left:
                            [-1, 0],

                        right:
                            [1, 0]
                    };

                    const value =
                        directions[
                            button.dataset.d
                        ];

                    if (
                        value
                    ) {
                        changeDirection(
                            ...value
                        );
                    }
                }
            );
        }
    );

    resetSnake();
}


/* =========================================================
   YEAR
========================================================= */

const yearElement =
    $("#year");

if (
    yearElement
) {
    yearElement.textContent =
        new Date()
            .getFullYear();
}


/* =========================================================
   EXTERNAL LINK SECURITY
========================================================= */

$$(
    'a[target="_blank"]'
).forEach(
    (link) => {

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );
    }
);


/* =========================================================
   PAGE LOAD
========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "loaded"
        );
    }
);
