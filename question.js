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
 return data.sort((a, b) => {
  // Sort by CabName first (ascending order)
  if (a.CabName.localeCompare(b.CabName) !== 0) {
   return a.CabName.localeCompare(b.CabName);
  }
  // Within the same CabName, sort by CellName (ascending order)
  return a.CellName - b.CellName;
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


my sorted data is 

0: {eventId: 364, DateTime: '2024-05-01 13:26:00', CabName: '01883', CellName: 11, TotalUsers: 7}
1: {eventId: 364, DateTime: '2024-05-01 13:26:00', CabName: '01883', CellName: 12, TotalUsers: 1}
2: {eventId: 364, DateTime: '2024-05-01 13:26:00', CabName: '01883', CellName: 13, TotalUsers: 0}
3: {eventId: 364, DateTime: '2024-05-01 13:26:00', CabName: '01883', CellName: 31, TotalUsers: 6}
4: {eventId: 364, DateTime: '2024-05-01 13:26:00', CabName: '01883', CellName: 32, TotalUsers: 18}
5: {eventId: 364, DateTime: '2024-05-01 13:26:00', CabName: '01883', CellName: 33, TotalUsers: 3}
6: {eventId: 364, DateTime: '2024-05-01 13:26:00', CabName: '01883', CellName: 81, TotalUsers: 33}
7: {eventId: 364, DateTime: '2024-05-01 13:26:00', CabName: '01883', CellName: 82, TotalUsers: 31}
8: {eventId: 364, DateTime: '2024-05-01 13:26:00', CabName: '01883', CellName: 83, TotalUsers: 12}
9: {eventId: 364, DateTime: '2024-05-01 13:26:00', CabName: 'E5596', CellName: 11, TotalUsers: 3}
10: {eventId: 364, DateTime: '2024-05-01 13:26:00', CabName: 'E5596', CellName: 12, TotalUsers: 6}
11: {eventId: 364, DateTime: '2024-05-01 13:26:00', CabName: 'E5596', CellName: 31, TotalUsers: 21}
12: {eventId: 364, DateTime: '2024-05-01 13:26:00', CabName: 'E5596', CellName: 32, TotalUsers: 18}
13: {eventId: 364, DateTime: '2024-05-01 13:26:00', CabName: 'M7210', CellName: 11, TotalUsers: 1}
14: {eventId: 364, DateTime: '2024-05-01 13:26:00', CabName: 'M7210', CellName: 12, TotalUsers: 2}
15: {eventId: 364, DateTime: '2024-05-01 13:26:00', CabName: 'M7210', CellName: 13, TotalUsers: 14}
16: {eventId: 364, DateTime: '2024-05-01 13:26:00', CabName: 'M7210', CellName: 31, TotalUsers: 20}
17: {eventId: 364, DateTime: '2024-05-01 13:26:00', CabName: 'M7210', CellName: 32, TotalUsers: 5}
18: {eventId: 364, DateTime: '2024-05-01 13:26:00', CabName: 'M7210', CellName: 33, TotalUsers: 47}
19: {eventId: 364, DateTime: '2024-05-01 13:26:00', CabName: 'M7210', CellName: 51, TotalUsers: 138}
20: {eventId: 364, DateTime: '2024-05-01 13:26:00', CabName: 'M7210', CellName: 52, TotalUsers: 46}
21: {eventId: 364, DateTime: '2024-05-01 13:26:00', CabName: 'M7210', CellName: 53, TotalUsers: 167}
22: {eventId: 364, DateTime: '2024-05-01 13:26:00', CabName: 'M7210', CellName: 71, TotalUsers: 7}
23: {eventId: 364, DateTime: '2024-05-01 13:26:00', CabName: 'M7210', CellName: 72, TotalUsers: 2}
24: {eventId: 364, DateTime: '2024-05-01 13:26:00', CabName: 'M7210', CellName: 73, TotalUsers: 38}
25: {eventId: 364, DateTime: '2024-05-01 13:26:00', CabName: 'M7210', CellName: 81, TotalUsers: 40}
26: {eventId: 364, DateTime: '2024-05-01 13:26:00', CabName: 'M7210', CellName: 82, TotalUsers: 20}
27: {eventId: 364, DateTime: '2024-05-01 13:26:00', CabName: 'M7210', CellName: 83, TotalUsers: 68}

I want to sort my data like 

0: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: '01883', CellName: 11, TotalUsers: 7}
1: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: '01883', CellName: 31, TotalUsers: 6}
2: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: '01883', CellName: 81, TotalUsers: 27}
3: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: '01883', CellName: 12, TotalUsers: 2}
4: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: '01883', CellName: 32, TotalUsers: 13}
5: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: '01883', CellName: 82, TotalUsers: 16}
6: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: '01883', CellName: 13, TotalUsers: 0}
7: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: '01883', CellName: 33, TotalUsers: 3}
8: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: '01883', CellName: 83, TotalUsers: 20}
9: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'E5596', CellName: 11, TotalUsers: 3}
10: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'E5596', CellName: 31, TotalUsers: 25}
11: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'E5596', CellName: 12, TotalUsers: 4}
12: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'E5596', CellName: 32, TotalUsers: 14}
13: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 11, TotalUsers: 5}
14: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 31, TotalUsers: 26}
15: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 51, TotalUsers: 162}
16: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 71, TotalUsers: 4}
17: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 81, TotalUsers: 56}
18: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 12, TotalUsers: 1}
19: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 32, TotalUsers: 5}
20: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 52, TotalUsers: 31}
21: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 72, TotalUsers: 6}
22: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 82, TotalUsers: 9}
23: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 13, TotalUsers: 10}
24: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 33, TotalUsers: 13}
25: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 53, TotalUsers: 58}
26: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 73, TotalUsers: 35}
