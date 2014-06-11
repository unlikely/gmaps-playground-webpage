
var site_location = {lat: 41.026024, lon: (-91.960903)}

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

shapesDrawer = {
    drawBoxes: function() {
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
        this.setMap();
      }

      function startPoint() {
        return map.getBounds().getSouthWest()
      }

      startp = startPoint();
      var startPoints = []
      for (var i = 0; i < 10; i++){startPoints.push([startp.lat(), (startp.lng() + i/10000)])}
      function boxPoints(startPoint) {
        return [new google.maps.LatLng(startPoint[0], startPoint[1]),
                new google.maps.LatLng((startPoint[0] + 0.00005), startPoint[1]),
                new google.maps.LatLng((startPoint[0] + 0.00005), (startPoint[1] + 0.00005)),
                new google.maps.LatLng(startPoint[0], (startPoint[1] + 0.00005))
        ]
      }

      var llop = startPoints.map(function(stp) {return boxPoints(stp)})

      drawnShapes = llop.map(function(shp){return drawExistingShapes(shp)})
      return drawnShapes
    }
}
