const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZXRoZXJpbzk3IiwiYSI6ImNrZW40MDBsZDF1MWgyc3BjM244cDMwc28ifQ.CSdPX8LP3F18eQMQGds91g';

app.onload.push(function () {
  mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
  
  if (! app.map) {
    app.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v10',
      zoom: 10,
      center: [
        96.119378, // lng
        16.871311  // lat
      ]
    });
  }
});

function flyTo(lat, lng) {
  if (!app.map || !lat || !lng) {
    return false;
  }
  app.map.flyTo({
    center: [ lng, lat ],
    essential: true
  });
}

function stopWatching(el) {
  if (!app.watched) {
    console.info('location is not watching...');
    return false;
  }
  
  el && el.remove();
  
  window.navigator.geolocation.clearWatch(app.watched);
  
  app.watched = null;
  
  let status = document.querySelector('span.status');
  
  if (status) status.style.background = 'red';
}