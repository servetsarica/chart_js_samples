var colorPalette = ['green', 'blue', 'red', 'yellow', 'cyan', 'orange', 'black', 'pink']; // Color palette for unique numbers

var chartInstance;


function createChart(data) {
    data.sort((a, b) => a.CabName.localeCompare(b.CabName));
    
    // Daha sonra cellName'e göre sıralama
    data.sort((a, b) => a.CellName - b.CellName);

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
      backgroundColor: color
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
