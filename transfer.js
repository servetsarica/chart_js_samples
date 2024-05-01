var colorPalette = ['#dfff00', '#96bff1', '#d6005d', '#ff1981', '#67ebeb', '#fb8d38', '#b3d4cf', '#ff93ac']; // Color palette for unique numbers

var chartInstance;

function createChart(data) {
  // Sort data by CabName and then CellName (ascending)
  const sortedData = sortData(data);
  console.log(sortedData);
  var uniqueCabNames = [...new Set(sortedData.map(item => item.CabName))];
  var uniqueCellNames = [...new Set(sortedData.map(item => item.CellName))];
  var datasets = [];
  uniqueCellNames.forEach(cellName => {
    var totalUsersData = [];
    uniqueCabNames.forEach(cabName => {
      var filteredData = sortedData.filter(item => item.CellName === cellName && item.CabName === cabName);
      var totalUsers = filteredData.length > 0 ? filteredData.reduce((sum, item) => sum + item.TotalUsers, 0) : 0;
      totalUsersData.push(totalUsers);
    });

    // Get the first character of the cell name (assuming numbers are single digits)
    var firstChar = cellName.toString().charAt(0);
    // Convert the first character to a number
    var number = parseInt(firstChar);

    // Assign a color from the palette based on the number
    var color = colorPalette[number % colorPalette.length];

    datasets.push({
      label: cellName,
      data: totalUsersData,
      backgroundColor: color,
      borderColor: 'white',
      borderWidth: 4
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

function sortData(data) {
  // First, sort by CabName in ascending order
  data.sort((a, b) => a.CabName.localeCompare(b.CabName));
  
  // Then, sort within each CabName group by CellName in ascending order
  data.sort((a, b) => {
    if (a.CabName === b.CabName) {
      return a.CellName - b.CellName;
    }
    return 0;
  });

  return data;
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
      // Sort the data before creating the chart
      const sortedData = sortData(response);
      createChart(sortedData);
    }
  });
}

$(document).ready(function() {
  updateChart();
  setInterval(updateChart, setIntervalMinute);
});
