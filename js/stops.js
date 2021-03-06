fetch('data/stops.json')
  .then(res => res.json())
  .then(data => {
    app.stops = data;
  });

function addStopsOnMap(map) {
  let ico = new mapboxgl.Marker();
  
  app.map.on('load', function (err, img) {
    if (err) return alert(err.message);
  });
}

function getNearbyStops(btn) {
  if (!app.stops || !app.lat || !app.lng) return;
  
  var nearby = [];

  for (let i in app.stops) {
    var {
      lat,
      lng,
      name_en
    }= app.stops[i];
    
    var x = lat - app.lat;
    var y = lng - app.lng;
    
    if (x > 0 && x < 0.01 && y > 0 && y < 0.01) {
      var stop = app.stops[i];
      var diff = Number((Number(x + y) * 1000).toFixed(0));
      
      nearby[diff] = stop;
    }
  }

  nearby = nearby.sort();
    
  app.nearby = nearby;
  
  Object.values(app.nearby).forEach(stop => {
    var {
      id,
      name_en,
      name_mm,
      township_en,
      township_mm,
      lat,
      lng
    } = stop;
    
    var info = `${name_en}, ${township_en} (${name_mm}, ${township_mm})`;
    var buses = getBusLists(id);

    let bus_stop = new mapboxgl.Marker()
                    .setLngLat([lng, lat])
                    .setPopup(new mapboxgl.Popup().setHTML('<p>' + info + '<br><code>' + buses.join(',') + '</code></p>'))
                    .addTo(app.map);

    stop = document.createElement('li');
    stop.innerText = info
    stop.className = 'item'
    
    var el = document.querySelector('#nearby');
    el && el.appendChild(stop);
  });
  
  btn && btn.remove();
}