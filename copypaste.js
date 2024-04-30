function createChart(data) {
    var uniqueCabNames = [...new Set(data.map(item => item.CabName))];
    var uniqueCellNames = [...new Set(data.map(item => item.CellName))];

    var datasets = [];
    uniqueCellNames.forEach((cellName, index) => {
        var totalUsersData = [];
        uniqueCabNames.forEach((cabName, cabIndex) => {
            var filteredData = data.filter(item => item.CellName === cellName && item.CabName === cabName);
            var totalUsers = filteredData.length > 0 ? filteredData.reduce((sum, item) => sum + item.TotalUsers, 0) : 0;
            totalUsersData.push(totalUsers);
        });

        datasets.push({
            label: cellName,
            data: totalUsersData,
            backgroundColor: generateColorPalette(index)
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

function generateColorPalette(index) {
    var colorPalette = [];
    var shadeCount = 5; // Farklı ton sayısı
    var baseColor = '#' + (index * 10000 + index * 1000 + index * 100 + index * 10 + index).toString(16).slice(-6); // Temel renk oluşturur
    for (var i = 0; i < shadeCount; i++) {
        var shade = Math.floor(255 - i * (255 / shadeCount)); // Renk tonunu ayarlar
        var color = baseColor + shade.toString(16).padStart(2, '0'); // Farklı renkleri oluşturur
        colorPalette.push(color);
    }
    return colorPalette;
}
