
var site_location = {lat: 41.559469, lon: (-87.669026)}

function doMap(siteLocation) {
  var mapOptions = {
    center: new google.maps.LatLng(siteLocation.lat, siteLocation.lon),
    zoom: 20,
    tilt: 0,
    mapTypeId: google.maps.MapTypeId.SATELLITE
  };

  var map = new google.maps.Map(document.getElementById('mapspace'),
    mapOptions);

  return map
}

var map = doMap(site_location);

function drawThing() {
  rw = document.getElementById('rows').value
  cls = document.getElementById('columns').value
  shapesDrawer.drawBoxes(rw,cls)
}

shapesDrawer = {
    drawBoxes: function(rows, cols) {
      boxNum = 0;

      function drawExistingShapes(points) {
        var shape = new google.maps.Polygon({
          paths: points,
          fillColor: '#ffff00',
          fillOpacity: 0.15,
          strokeWeight: 2,
          clickable: true,
          editable: false,
          zIndex: 3,
          map: map
        });
        google.maps.event.addListener(shape, 'click', hide);
        return shape;
      };

      function hide() {
        boxNum -= 1
        updateBoxNum(boxNum)
        this.setMap();
      }

      function origin() {
        return map.getBounds().getSouthWest()
      }

      function calculateRow(bottomLeft, columns) {
        var rowStartPoints = [];
        for (var i = 0; i < columns; i++){rowStartPoints.push([(bottomLeft.lat + 1/10000), (bottomLeft.lng + (0.0001 + i/30000))])};
        return rowStartPoints
      }

      function boxPoints(startPoint) {
        return [new google.maps.LatLng(startPoint[0], startPoint[1]),
                new google.maps.LatLng((startPoint[0] + 0.00003), startPoint[1]),
                new google.maps.LatLng((startPoint[0] + 0.00003), (startPoint[1] + 0.00003)),
                new google.maps.LatLng(startPoint[0], (startPoint[1] + 0.00003))
        ]
      }

      rowsList = [];
      for (var i = 0; i < rows; i++) {
        org = {lat: (origin().lat() + i/30000), lng: origin().lng()}
        rowsList.push(calculateRow(org, cols));
      }

      klaxon = rowsList.map(function(startpnt) {return startpnt.map(function(stp) {return boxPoints(stp)})});
      llll = klaxon.map(function(cls){return cls.map(function(shp){return drawExistingShapes(shp)})});

      llll.forEach(function(m){m.forEach(function(){boxNum += 1})});

      updateBoxNum(boxNum);
      return llll
    }
}

function btnThing() {
  btn = document.getElementById('submitButton');
  btn.addEventListener('click', drawThing, false);
}

function updateBoxNum(bxn) {
  document.getElementById('boxNum').innerHTML = bxn;
}

window.onload = function() {
  btnThing()
}