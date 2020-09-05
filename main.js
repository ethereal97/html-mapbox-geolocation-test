//* 2020, Ethereal.

window.addEventListener('load', function (event) {
  if ('onload' in app) {
    app.onload.forEach(callback => callback.call(event));
  }
  
  if (localStorage.getItem('geo_loc')) {
    accessGeoPermission();
  }
});

if (document.body) {
  document.body.style.hidden = true;
  window.addEventListener('load', () => document.body.style.hidden=false);
}

function accessGeoPermission(btn) {
  if (btn) {
    btn.classList.add('disabled');
    btn.setAttribute('disabled', true);
  } else {
    btn = document.querySelector('#givePerm');
  }
  
  if (! 'geolocation' in window.navigator) {
    console.info('Device not support geolocation');
    return false;
  }
  
  let geo = window.navigator.geolocation;
  
  let callback = function (pos) {
    if (! pos) {
      alert('Failed to access location services.');
      return;
    } else {
      app.target = pos;
      setCurrentGeo(pos);
    }
    btn.remove();
    localStorage.setItem('geo_loc', '1');
  };
  
  app.watched = geo.watchPosition(callback, ({message}) => alert(message));
}

function setCurrentGeo({coords, timestamp}) {
  let status = document.querySelector('span.status');
  
  let {
    latitude,
    longitude,
    accuracy,
    heading,
    speed
  } = coords;
  
  app.lat = latitude;
  app.lng = longitude;
  
  status.style.background = 'white';
  setTimeout(() =>   status.style.background = 'green', 500);
  
  try {
    if(!app.pin) {
      app.pin = new mapboxgl.Marker()
       .setLngLat([longitude, latitude])
       .addTo(app.map)
       .setPopup(new mapboxgl.Popup().setHTML('<p class="ui text-muted">Current Location</p>'))
    } else {
      app.pin.setLngLat([longitude, latitude]);
      flyTo(latitude, longitude)
    }
    document.querySelector('span#lat').innerText = latitude.toFixed(5)
    document.querySelector('span#lng').innerText = longitude.toFixed(5)
    document.querySelector('span#accuracy').innerText = accuracy.toFixed(2)

  } catch (e) {
    let div = document.createElement('div')
    let ico = document.createElement('i')
    let tit = document.createElement('div')
    let msg = document.createElement('p')
    
    div.className = 'ui negative message'
    ico.className = 'close icon'
    tit.className = 'header'
    
    tit.innerText = 'Opps! We got an serious error...'
    msg.innerText = e.message
    
    div.appendChild(ico)
    div.appendChild(tit)
    div.appendChild(msg)
    
    document.body.append(div)
    
    ico.addEventListener('click', () => div.remove())
  }
}