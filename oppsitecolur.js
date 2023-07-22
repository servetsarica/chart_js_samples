var oppositeColors = [];

// Zıt renkleri hesaplayın ve yeni diziye ekleyin
for (var i = 0; i < colorPalette.length; i++) {
  var currentColor = colorPalette[i];
  var oppositeColor = "#";
  
  for (var j = 1; j < currentColor.length; j += 2) {
    var colorValue = parseInt(currentColor.substr(j, 2), 16);
    var oppositeValue = 255 - colorValue;
    var oppositeHex = oppositeValue.toString(16).padStart(2, "0");
    oppositeColor += oppositeHex;
  }
  
  oppositeColors.push(oppositeColor);
}
