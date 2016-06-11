const Canvas = require('canvas');
const Chart = require('nchart');
const fs = require('fs');

function generateGraph(message) {
  return new Promise((resolve, reject) => {
    const canvas = new Canvas(400, 400);
    const ctx = canvas.getContext('2d');
    const totals = message.result.totals.sort((left, right) => left.type - right.type);
    
    const data = {
      labels: totals.map((item) => `Tipo ${item.type} - ${item.total} pts`),
      datasets : [{
        fillColor: "rgba(151,187,205,0.5)",
        strokeColor : "rgba(151,187,205,1)",
        pointColor : "rgba(151,187,205,1)",
        pointStrokeColor : "#fff",
        data: totals.map((item) => item.total)
     }]
    };
    
    new Chart(ctx).Radar(data, {
      scaleShowValues: true, 
      scaleFontSize: 24
    });
    
    canvas.toDataURL('image/png', (err, png) => {
      if (err) {
        return reject(err);
      }
      
      message.graphDataBase64 = png + '';
      
      const data = png.replace(/^data:image\/\w+;base64,/,"");
      
      message.graphData = new Buffer(data, 'base64');
      
      return resolve(message);
    });
  });
}

module.exports = generateGraph;