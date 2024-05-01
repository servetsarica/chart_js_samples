var colorPalette = [
  "#0f5757", // en koyu ton
  "#166161",
  "#1d6b6b",
  "#247575",
  "#2b7f7f",
  "#338989",
  "#3a9393",
  "#419d9d",
  "#48a7a7" // en açık ton
];

var chartInstance;

function createChart(data) {
  // CabName'e göre sıralama
  data.sort((a, b) => a.CabName.localeCompare(b.CabName));
  
  // CellName'e göre sıralama
  data.sort((a, b) => {
    // Extract last and first digits from CellName
    const lastDigitA = parseInt(a.CellName.toString().slice(-1));
    const lastDigitB = parseInt(b.CellName.toString().slice(-1));
    const firstDigitA = parseInt(a.CellName.toString().charAt(0));
    const firstDigitB = parseInt(b.CellName.toString().charAt(0));

    if (lastDigitA !== lastDigitB) {
      return lastDigitA - lastDigitB; // Son rakama göre sıralama
    } else {
      return firstDigitA - firstDigitB; // İlk rakama göre sıralama
    }
  });

  var uniqueCabNames = [...new Set(data.map(item => item.CabName))];
  var uniqueCellNames = [...new Set(data.map(item => item.CellName))];
  var datasets = [];
  uniqueCellNames.forEach(cellName => {
    var totalUsersData = [];
    uniqueCabNames.forEach(cabName => {
      var filteredData = data.filter(item => item.CellName === cellName && item.CabName === cabName);
      var totalUsers = filteredData.length > 0 ? filteredData.reduce((sum, item) => sum + item.TotalUsers, 0) : 0;
      totalUsersData.push(totalUsers);
    });

    // Get the first character of the cell name (assuming numbers are single digits)
    var firstChar = cellName.toString().charAt(0);
    // Convert the first character to a number
    var number = parseInt(firstChar);

    // Assign a color from the palette based on the number
    var color = colorPalette[number % colorPalette.length];
    //console.log(cellName + " " + color)
    datasets.push({
      label: cellName,
      data: totalUsersData,
      backgroundColor: color,
      borderColor: 'white',
      borderWidth: 1
    });
  });


  var ctx = document.getElementById("cellUser").getContext("2d");

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: uniqueCabNames.map(String),
      datasets: datasets
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top"
        },
        title: {
          display: false,
          text: "User Chart"
        },
        zoom: {
          zoom: {
            wheel: {
              enabled: true
            },
            pinch: {
              enabled: true
            },
            mode: 'x'
          },
          pan: {
            enabled: true,
            mode: 'x'
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          title: {
            display: false,
            text: "CabName"
          }
        },
        y: {
          stacked: true,
          title: {
            display: false,
            text: "TotalUsers"
          }
        }
      },
      responsive: true, // Grafiği responsive hale getirir
      maintainAspectRatio: false // En boy oranını koruma
    }
  });
}

function updateChart() {
  $.ajax({
    type: "GET",
    url: "/eventgrafikcell/" + event_id,
    data: {
      id: event_id,
      _token: csrf
    },
    success: function(response) {
      createChart(response);
    }
  });
}

$(document).ready(function() {
  updateChart();
  setInterval(updateChart, setIntervalMinute);
});
