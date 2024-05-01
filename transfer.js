
function createChart(data) {
  // CabName'e göre sıralama
  data.sort((a, b) => a.CabName.localeCompare(b.CabName));
  
  // CellName'e göre sıralama
  data.sort((a, b) => {
    // Extract numeric part from CellName
    const cellA = parseInt(a.CellName.toString().match(/\d+/)[0]);
    const cellB = parseInt(b.CellName.toString().match(/\d+/)[0]);
    return cellA - cellB;
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
      borderWidth: 3
    });
  });

  // Create chart using datasets
}






0: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: '01883', CellName: 11, TotalUsers: 7}
1: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: '01883', CellName: 12, TotalUsers: 2}
2: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: '01883', CellName: 13, TotalUsers: 0}
3: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'E5596', CellName: 11, TotalUsers: 3}
4: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'E5596', CellName: 12, TotalUsers: 4}
5: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 11, TotalUsers: 5}
6: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 12, TotalUsers: 1}
7: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 13, TotalUsers: 10}
8: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: '01883', CellName: 31, TotalUsers: 6}
9: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: '01883', CellName: 32, TotalUsers: 13}
10: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: '01883', CellName: 33, TotalUsers: 3}
11: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'E5596', CellName: 31, TotalUsers: 25}
12: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'E5596', CellName: 32, TotalUsers: 14}
13: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 31, TotalUsers: 26}
14: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 32, TotalUsers: 5}
15: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 33, TotalUsers: 13}
16: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 51, TotalUsers: 162}
17: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 52, TotalUsers: 31}
18: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 53, TotalUsers: 58}
19: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 71, TotalUsers: 4}
20: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 72, TotalUsers: 6}
21: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 73, TotalUsers: 35}
22: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: '01883', CellName: 81, TotalUsers: 27}
23: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: '01883', CellName: 82, TotalUsers: 16}
24: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: '01883', CellName: 83, TotalUsers: 20}
25: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 81, TotalUsers: 56}
26: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 82, TotalUsers: 9}

1: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: '01883', CellName: 11, TotalUsers: 7}
2: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'E5596', CellName: 11, TotalUsers: 3}
3: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 11, TotalUsers: 5}
4: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: '01883', CellName: 31, TotalUsers: 6}
5: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'E5596', CellName: 31, TotalUsers: 25}
6: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 31, TotalUsers: 26}
7: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 51, TotalUsers: 162}
8: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 71, TotalUsers: 4}
9: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: '01883', CellName: 81, TotalUsers: 27}
10: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 81, TotalUsers: 56}
11: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: '01883', CellName: 12, TotalUsers: 2}
12: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'E5596', CellName: 12, TotalUsers: 4}
13: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 12, TotalUsers: 1}
14: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: '01883', CellName: 32, TotalUsers: 13}
15: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'E5596', CellName: 32, TotalUsers: 14}
16: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 32, TotalUsers: 5}
17: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 52, TotalUsers: 31}
18: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 72, TotalUsers: 6}
19: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: '01883', CellName: 82, TotalUsers: 16}
20: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 82, TotalUsers: 9}
21: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: '01883', CellName: 13, TotalUsers: 0}
22: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 13, TotalUsers: 10}
23: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: '01883', CellName: 33, TotalUsers: 3}
24: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 33, TotalUsers: 13}
25: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 53, TotalUsers: 58}
26: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 73, TotalUsers: 35}
27: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: '01883', CellName: 83, TotalUsers: 20}


1: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: '01883', CellName: 11, TotalUsers: 7}
2: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: '01883', CellName: 31, TotalUsers: 6}
3: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: '01883', CellName: 81, TotalUsers: 27}
4: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: '01883', CellName: 12, TotalUsers: 2}
5: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: '01883', CellName: 32, TotalUsers: 13}
6: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: '01883', CellName: 82, TotalUsers: 16}
7: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: '01883', CellName: 13, TotalUsers: 0}
8: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: '01883', CellName: 33, TotalUsers: 3}
9: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: '01883', CellName: 83, TotalUsers: 20}
10: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'E5596', CellName: 11, TotalUsers: 3}
11: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'E5596', CellName: 31, TotalUsers: 25}
12: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'E5596', CellName: 12, TotalUsers: 4}
13: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'E5596', CellName: 32, TotalUsers: 14}
14: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 11, TotalUsers: 5}
15: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 31, TotalUsers: 26}
16: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 51, TotalUsers: 162}
17: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 71, TotalUsers: 4}
18: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 81, TotalUsers: 56}
19: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 12, TotalUsers: 1}
20: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 32, TotalUsers: 5}
21: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 52, TotalUsers: 31}
22: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 72, TotalUsers: 6}
23: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 82, TotalUsers: 9}
24: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 13, TotalUsers: 10}
25: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 33, TotalUsers: 13}
26: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 53, TotalUsers: 58}
27: {eventId: 364, DateTime: '2024-05-01 10:58:00', CabName: 'M7210', CellName: 73, TotalUsers: 35}


var colorPalette = ['#dfff00', '#96bff1', '#d6005d', '#ff1981', '#67ebeb', '#fb8d38', '#b3d4cf', '#ff93ac']; // Color palette for unique numbers

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
      backgroundColor: color,
      borderColor: 'white',
      borderWidth: 3
    });
  });
