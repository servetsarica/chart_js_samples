var colorPalette1 = [
  "#042c2c", // 0
  "#042c2c", // 1
  "#21bcbc", // 2
  "#0f5757", // 3
  "#3cdddd", // 4
  "#167d7d", // 5
  "#8eeded", // 6
  "#1da3a3", // 7
  "#23c8c8"  // 8
  // en açık ton
];

var colorPalette2 = [
  "#ff0000", // 0
  "#ff0000", // 1
  "#ff8c00", // 2
  "#ffd700", // 3
  "#008000", // 4
  "#0000ff", // 5
  "#4b0082", // 6
  "#9400d3", // 7
  "#ff1493"  // 8
  // diğer tonlar
];

var chartInstance;

function createChart(data) {
  data.sort((a, b) => a.CabName.localeCompare(b.CabName));
  data.sort((a, b) => {
    const lastDigitA = parseInt(a.CellName.toString().slice(-1));
    const lastDigitB = parseInt(b.CellName.toString().slice(-1));
    const firstDigitA = parseInt(a.CellName.toString().charAt(0));
    const firstDigitB = parseInt(b.CellName.toString().charAt(0));

    if (lastDigitA !== lastDigitB) {
      return lastDigitA - lastDigitB;
    } else {
      return firstDigitA - firstDigitB;
    }
  });

  var uniqueCabNames = [...new Set(data.map(item => item.CabName))];
  var uniqueCellNames = [...new Set(data.map(item => item.CellName))];
  var datasets = [];

  uniqueCellNames.forEach(cellName => {
    var palette = cellName.toString().endsWith('1') ? colorPalette1 : colorPalette2; // Renk paletini seç

    var totalUsersData = [];
    uniqueCabNames.forEach(cabName => {
      var filteredData = data.filter(item => item.CellName === cellName && item.CabName === cabName);
      var totalUsers = filteredData.length > 0 ? filteredData.reduce((sum, item) => sum + item.TotalUsers, 0) : 0;
      totalUsersData.push(totalUsers);
    });

    var firstChar = cellName.toString().charAt(0);
    var number = parseInt(firstChar);
    var color = palette[number % palette.length];

    datasets.push({
      label: cellName,
      data: totalUsersData,
      backgroundColor: color,
      borderColor: 'white',
      borderWidth: 0.5
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
      responsive: true,
      maintainAspectRatio: false
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
