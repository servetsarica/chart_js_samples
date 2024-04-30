var colorPalette = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];

// Bu renklerin daha koyu tonları için bir palet oluşturabiliriz.
var darkerPalette = colorPalette.map(color => shadeColor(color, -20));

function shadeColor(color, percent) {
    var f = parseInt(color.slice(1), 16),
        t = percent < 0 ? 0 : 255,
        p = percent < 0 ? percent * -1 : percent,
        R = f >> 16,
        G = f >> 8 & 0x00FF,
        B = f & 0x0000FF;
    return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
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
                var colorIndex = index % colorPalette.length; // Temel renkler için
                // veya
                // var colorIndex = index % darkerPalette.length; // Daha koyu tonlar için

                dataset.backgroundColor = colorPalette[colorIndex];
                // veya
                // dataset.backgroundColor = darkerPalette[colorIndex];
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
