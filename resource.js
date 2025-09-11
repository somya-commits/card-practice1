let totalBiogas = 0;
let totalGreywater = 0;
let biogasData = [];
let target = 0;

// Chart.js setup
const ctx = document.getElementById("biogasChart").getContext("2d");
const biogasChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [{
      label: "Biogas Production (m³)",
      data: biogasData,
      borderColor: "#10b981",
      backgroundColor: "rgba(16,185,129,0.2)",
      fill: true,
      tension: 0.3
    }]
  }
});

function updateBiogas() {
  const input = parseFloat(document.getElementById("biogasInput").value);
  if (!isNaN(input) && input > 0) {
    totalBiogas += input;

    // Calculations
    const energy = totalBiogas * 6;            // kWh
    const cookingHours = totalBiogas / 0.2;    // hours
    const co2Reduced = totalBiogas * 2.7;      // kg CO₂
    const lpgSaved = totalBiogas / 26;         // cylinders
    const moneySaved = energy * 6;             // ₹ (6/kWh)
    const streetlightHours = (energy / 0.06);  // hrs for 60W light
    const streetlightsOneNight = (energy / 0.6); // 10 hrs per lamp
    const nightsFor10Lights = (streetlightsOneNight / 10);

    // Update Table
    const table = document.getElementById("biogasTable").rows;
    table[1].cells[1].innerText = `${totalBiogas.toFixed(2)} m³`;
    table[2].cells[1].innerText = `${energy.toFixed(2)} kWh`;
    table[3].cells[1].innerText = `${cookingHours.toFixed(1)} hrs`;
    table[4].cells[1].innerText = `${co2Reduced.toFixed(2)} kg`;
    table[5].cells[1].innerText = `${lpgSaved.toFixed(2)}`;
    table[6].cells[1].innerText = `₹${moneySaved.toFixed(2)}`;
    table[7].cells[1].innerText = `${streetlightHours.toFixed(0)} hrs`;
    table[8].cells[1].innerText = `${streetlightsOneNight.toFixed(0)}`;
    table[9].cells[1].innerText = `${nightsFor10Lights.toFixed(0)}`;

    // Update chart
    biogasData.push(input);
    biogasChart.data.labels.push(`Entry ${biogasData.length}`);
    biogasChart.update();

    // Update progress
    updateProgress();

    document.getElementById("biogasInput").value = "";
  } else {
    alert("Please enter a valid biogas value!");
  }
}

function updateGreywater() {
  const input = parseFloat(document.getElementById("greywaterInput").value);
  if (!isNaN(input) && input > 0) {
    totalGreywater += input;
    document.getElementById("greywaterOutput").innerText = 
      `Total Greywater: ${totalGreywater.toFixed(2)} L`;
    document.getElementById("greywaterInput").value = "";
  } else {
    alert("Please enter a valid greywater value!");
  }
}

function setTarget() {
  target = parseFloat(document.getElementById("targetInput").value);
  if (isNaN(target) || target <= 0) {
    alert("Please enter a valid target!");
    return;
  }
  updateProgress();
}

function updateProgress() {
  if (target > 0) {
    let percent = (totalBiogas / target) * 100;
    if (percent > 100) percent = 100;
    document.getElementById("progressFill").style.width = percent + "%";
    document.getElementById("progressFill").innerText = percent.toFixed(1) + "%";
  }
}
