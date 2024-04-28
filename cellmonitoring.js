var colorPalette = [];
for (var i = 0; i < colorPalette.length; i++) {
    var currentColor = colorPalette[i];
    var oppositeColor = "#";

    for (var j = 1; j < currentColor.length; j += 2) {
        var colorValue = parseInt(currentColor.substr(j, 2), 16);
        var oppositeValue = 255 - colorValue;
        var oppositeHex = oppositeValue.toString(16).padStart(2, "0");
        oppositeColor += oppositeHex;
    }
    colorPalette.push(oppositeColor);
}


var chartInstance;

function createChart(data) {
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

        datasets.push({
            label: cellName,
            data: totalUsersData,
            backgroundColor: ""
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
            datasets: datasets.map(function(dataset, index) {
                var colorIndex = index % colorPalette.length;
                dataset.backgroundColor = colorPalette[colorIndex];
                return dataset;
            })
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
                            enabled: true,
                        },
                        pinch: {
                            enabled: true
                        },
                        mode: 'x',
                    },
                    pan: {
                        enabled: true,
                        mode: 'x',
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
