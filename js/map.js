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

function changeLat() {
  let desc = "Input to set the current latitude"
  let inp = prompt(desc, app.lat || '');
  
  app.pin.setLngLat([inp, app.lng|| 0]);
  
  if (! inp) return;
  
  let coords = {
    latitude: app.lat,
    longitude: inp,
    attutude: null,
    accuracy: 10,
    speed: null
  };
  
  setCurrentGeo({
    coords,
    timestamp: (new Date).getTime()
  });
}

function changeLng() {
  let desc = "Input to set the current longitude"
  let inp = prompt(desc, app.lng);
  
  if (! inp) return;
  
  app.pin.setLngLat([inp, app.lat]);
  
  let coords = {
    latitude: inp,
    longitude: app.lng,
    attutude: null,
    accuracy: 10,
    speed: null
  };
  
  setCurrentGeo({
    coords,
    timestamp: (new Date).getTime()
  });
}