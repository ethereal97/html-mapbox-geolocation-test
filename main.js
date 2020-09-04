//* 2020, Ethereal.

window.addEventListener('load', function (event) {
  if ('onload' in app) {
    app.onload.forEach(callback => callback.call(event));
  }
});

if (document.body) {
  document.body.style.hidden = true;
  window.addEventListener('load', () => document.body.style.hidden=false);
}

let attemptGeoPerm = [0, 5];

function accessGeoPermission(btn) {
  btn.classList.add('disabled');
  btn.setAttribute('disabled', true);
  
  if (! 'geolocation' in window.navigator) {
    console.error('Your device or browser does not support location service.');
    return false;
  }
  
  let geoloc = window.navigator.geolocation;
  let curpos;
  
  let callback = function (currentPosition) {
    let tof = attemptGeoPerm.pop();
    clearTimeout(tof);
    
    if (! currentPosition) {
      alert('Failed to access location services.')
      if (attemptGeoPerm[0] >= attemptGeoPerm[1]) {
        return;
      }
      attemptGeoPerm[0]++;
    } else {
      curpos = currentPosition;
      setCurrentGeo(curpos);
    }
    btn.remove();
  }
  
  geoloc.watchPosition(callback);
  
  attemptGeoPerm.push(setTimeout(function () {
    btn.classList.remove('disabled');
    btn.removeAttribute('disabled');
    attemptGeoPerm.pop();
    alert('Too long to resolve your current location');
  }, 5000));
  
  console.log('Button Action has been triggered');
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
  
  if (status.id === 'x') {
    status.id = 'o';
  } else {
    status.id = 'x';
  }
  
  try {
    if(!app.pin) {
      app.pin = new mapboxgl.Marker()
       .setLngLat([longitude, latitude])
       .addTo(app.map)
       .setPopup(new mapboxgl.Popup().setHTML('<p class="ui text-muted">Current Location</p>'))
    } else {
      app.pin.setLngLat([longitude, latitude])
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