window.addEventListener("scroll", () => {
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
<b>Objective:</b>
<p>To design a low-cost, compact, and portable oscilloscope for visualizing basic electrical waveforms.</p>

<b>Motivation:</b>
<p>Traditional oscilloscopes are expensive and bulky. This project provides an affordable learning tool for students and beginners.</p>

<b>Hardware Components:</b>
<ul>
  <li>Arduino UNO</li>
  <li>OLED Display (SH1106)</li>
  <li>Resistors and Capacitors</li>
  <li>Push Buttons</li>
  <li>Preset Potentiometer</li>
</ul>

<b>Software Used:</b>
<ul>
  <li>Arduino IDE</li>
  <li>Embedded C</li>
</ul>

<b>Working Principle:</b>
<p>Arduino samples analog input signals using ADC and displays real-time waveforms on an OLED screen.</p>

<b>Key Features:</b>
<ul>
  <li>Real-time waveform display</li>
  <li>Compact and portable design</li>
  <li>Low-cost implementation</li>
</ul>

<b>Applications:</b>
<p>Educational labs, electronics testing, signal analysis.</p>

<b>Future Scope:</b>
<p>FFT analysis, wireless monitoring, data logging.</p>
`;

const agriguardDetails = `
<b>Objective:</b>
<p>To automate irrigation and enhance farm security using IoT.</p>

<b>Controller & Sensors:</b>
<ul>
  <li>ESP32</li>
  <li>Soil Moisture Sensor</li>
  <li>DHT11</li>
  <li>Flame Sensor</li>
  <li>Laser + LDR</li>
</ul>

<b>Software & Platforms:</b>
<ul>
  <li>Arduino IDE</li>
  <li>Embedded C</li>
  <li>ThingSpeak Cloud</li>
</ul>

<b>Working Principle:</b>
<p>ESP32 reads sensor data and automatically controls irrigation, fire alert, and intrusion detection.</p>

<b>Key Features:</b>
<ul>
  <li>Automatic irrigation</li>
  <li>Fire and intrusion detection</li>
  <li>Real-time OLED display</li>
  <li>Cloud monitoring</li>
</ul>

<b>Applications:</b>
<p>Smart farming, gardens, greenhouses.</p>

<b>Future Scope:</b>
<p>Mobile app alerts, AI crop prediction, solar power.</p>
`;
