var colorPalette = ['#dfff00', '#96bff1', '#d6005d', '#ff1981', '#67ebeb', '#fb8d38', '#b3d4cf', '#ff93ac']; // Color palette for unique numbers

var chartInstance;

function createChart(data) {
  // Sort data by CabName and then CellName (ascending)
  const sortedData = sortData(data);
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
  return data.sort((a, b) => {
    // Sort by CabName first (ascending order)
    if (a.CabName !== b.CabName) {
      return a.CabName.localeCompare(b.CabName);
    }
    // Extract the numerical part of CellName for comparison
    const cellA = parseInt(a.CellName.toString().match(/\d+/)[0]);
    const cellB = parseInt(b.CellName.toString().match(/\d+/)[0]);
    // Compare the numerical part of CellName
    return cellA - cellB;
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
