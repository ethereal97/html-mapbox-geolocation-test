const bus_stops = fetch('/stops.json')
  .then(res => res.json())
  .then(data => {
    app.bus_stops = data;
    return data;
  });
  
function addStopsOnMap(map) {
  let ico = new mapboxgl.Marker();
  
  app.map.on('load', function (err, img) {
    if (err) return alert(err.message);
  });
}
