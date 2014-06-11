
var site_location = {lat: 41.026024, lon: (-91.960903)}

function doMap(siteLocation) {
  var mapOptions = {
    center: new google.maps.LatLng(siteLocation.lat, siteLocation.lon),
    zoom: 20,
    tilt: 0,
    mapTypeId: google.maps.MapTypeId.SATELLITE
  };

  map = new google.maps.Map(document.getElementById('mapspace'),
    mapOptions);
}

doMap(site_location);
