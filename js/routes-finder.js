app.onload.push(function () {
  let acb;
  let rff = document.querySelector('form#route-finder');

  if (rff) { 
    var query = new URLSearchParams(location.search);
    
    try {
     setTimeout(function () {
      getNearbyStops();
     
      setTimeout(function () {
        let nearest = Object.values(app.nearby)[0];
        rff.start.value = nearest.id;
        if (acb) acb();
       }, 2400);
      }, 2400);
    } catch (e) {
      alert(e.message);
    }
    
    if (query.has('start') && query.has('dest')) {
      var start = query.get('start');
      var dest = query.get('dest');
      rff.start.value = start;
      rff.dest.value = dest;
      acb = () => {
        try {
          let rts = findRoutes(start, dest);
          let rst = document.querySelector('#routes-result');
          
          rts.forEach(r => showDirectRoute(rst, r));
        } catch (e) {
          alert(e.message);
        }
      };
    }
  }
});

function findRoutes(start, end) {
  let stt = getBusLists(start);
  let dst = getBusLists(end);
  
  let lines = [];
  
  for (let i in dst) {
    var a = dst[i];
    if (stt.includes(Number(a)) || stt.includes(a)) {
      lines.push(a);
    }
  }
  
  return lines;
}

function showDirectRoute(parent, line) {
  let el = document.createElement('a');
  let img = document.createElement('img');
  img.src = 'bus-icon.jpg';
  img.alt = 'line';
  el.className = 'ui image label';
  el.append(img);
  el.innerHTML += "\r\n" + line;
  return parent ? parent.appendChild(el) : el;
}