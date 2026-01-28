7window.addEventListener("scroll", () => {
  document.querySelectorAll(".reveal").forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 50) {
      el.classList.add("active");
    }
  });
});
function openModal(title, content){
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalDesc").innerHTML = content;
  document.getElementById("projectModal").style.display = "block";
}

function closeModal(){
  document.getElementById("projectModal").style.display = "none";
}
const oscilloscopeDetails = `
<b>Introduction:</b>
<p>
An oscilloscope is an electronic instrument used to observe signal voltages over time.
This project presents a low-cost and portable oscilloscope using Arduino for educational
and basic signal analysis purposes.
</p>

<b>Theory:</b>
<p>
The Arduino-based oscilloscope works on the principle of analog signal sampling.
The input signal is applied to the Arduino analog pin where the built-in ADC converts
the analog voltage into digital values.
</p>

<b>Working Principle:</b>
<ul>
  <li>Input signal is fed to Arduino analog pin</li>
  <li>ADC samples the signal periodically</li>
  <li>Sampled data is processed by microcontroller</li>
  <li>Waveform is displayed on OLED screen</li>
</ul>

<b>Advantages:</b>
<ul>
  <li>Low cost</li>
  <li>Portable and compact</li>
  <li>Easy to understand and modify</li>
</ul>

<b>Limitations:</b>
<ul>
  <li>Low bandwidth</li>
  <li>Limited sampling rate</li>
</ul>

<b>Applications:</b>
<p>
Educational labs, basic electronics testing, learning embedded systems.
</p>
`;

const agriguardDetails = `
<b>Introduction:</b>
<p>
AgriGuard is a smart IoT-based farming and security system designed to automate
irrigation and improve farm safety using sensors and cloud monitoring.
</p>

<b>Theory:</b>
<p>
The system works on the principle of sensor-based automation and IoT communication.
ESP32 collects sensor data and performs actions based on predefined threshold values.
</p>

<b>Working Principle:</b>
<ul>
  <li>Soil moisture sensor measures soil condition</li>
  <li>ESP32 controls water pump automatically</li>
  <li>Flame sensor detects fire hazards</li>
  <li>Laser-LDR detects intrusion</li>
  <li>Data displayed on OLED and uploaded to cloud</li>
</ul>

<b>Advantages:</b>
<ul>
  <li>Efficient water usage</li>
  <li>Reduces manual effort</li>
  <li>Improves farm security</li>
</ul>

<b>Applications:</b>
<p>
Smart farming, home gardens, greenhouses, agricultural monitoring.
</p>
`;
