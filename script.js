/* ===== SCROLL REVEAL ANIMATION ===== */
window.addEventListener("scroll", () => {
  document.querySelectorAll(".reveal").forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 50) {
      el.classList.add("active");
    }
  });
});

/* ===== MODAL CONTROLS ===== */
function openModal(title, content) {
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalDesc").innerHTML = content;
  document.getElementById("projectModal").style.display = "block";
}

function closeModal() {
  document.getElementById("projectModal").style.display = "none";
}

/* ===== PROJECT DETAILS CONTENT ===== */

const oscilloscopeDetails = `
<b>Introduction</b>
<p>
An oscilloscope is an electronic instrument used to observe signal voltages over time.
This project presents a low-cost and portable oscilloscope using Arduino.
</p>

<b>Theory</b>
<p>
The Arduino-based oscilloscope works on the principle of analog signal sampling.
The built-in ADC converts analog voltage into digital values.
</p>

<b>Working Principle</b>
<ul>
  <li>Input signal is applied to Arduino analog pin</li>
  <li>ADC samples the signal periodically</li>
  <li>Microcontroller processes sampled data</li>
  <li>Waveform displayed on OLED</li>
</ul>

<b>Advantages</b>
<ul>
  <li>Low cost</li>
  <li>Portable</li>
  <li>Easy to modify</li>
</ul>

<b>Limitations</b>
<ul>
  <li>Low bandwidth</li>
  <li>Limited sampling rate</li>
</ul>

<b>Applications</b>
<p>
Educational labs, basic electronics testing, embedded learning.
</p>
`;

/* ===== AGRIGUARD DETAILS ===== */
const agriguardDetails = `
<b>Introduction</b>
<p>
AgriGuard is an IoT-based smart farming and security system using ESP32.
</p>

<b>Working Principle</b>
<ul>
  <li>Soil moisture sensor controls water pump</li>
  <li>Flame sensor detects fire</li>
  <li>Laser-LDR detects intrusion</li>
  <li>ESP32 uploads data to ThingSpeak</li>
</ul>

<b>Advantages</b>
<ul>
  <li>Efficient irrigation</li>
  <li>Improved farm security</li>
  <li>Remote monitoring</li>
</ul>

<b>Applications</b>
<p>
Smart agriculture, home gardens, greenhouses.
</p>
`;

/* ===== COMPONENT TESTER DETAILS ===== */
const componentTesterDetails = `
<b>Introduction</b>
<p>
An All-in-One Component Tester automatically identifies electronic components.
</p>

<b>Tested Components</b>
<ul>
  <li>Resistors</li>
  <li>Capacitors</li>
  <li>Diodes & LEDs</li>
  <li>Transistors</li>
</ul>

<b>Features</b>
<ul>
  <li>Auto detection</li>
  <li>LCD output</li>
  <li>Portable</li>
</ul>
`;

/* ===== PROJECT CODE CONTENT ===== */

const oscilloscopeCode = `
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

void setup() {
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  display.clearDisplay();
}

void loop() {
  int signal = analogRead(A0);
  display.clearDisplay();
  display.drawLine(0, 32, signal / 8, 32, WHITE);
  display.display();
}
`;

const agriguardCode = `
#include <WiFi.h>

void setup() {
  Serial.begin(9600);
}

void loop() {
  Serial.println("AgriGuard running...");
  delay(2000);
}
`;

const componentTesterCode = `
void setup() {
  Serial.begin(9600);
  Serial.println("Component Tester Ready");
}

void loop() {
}
`;
