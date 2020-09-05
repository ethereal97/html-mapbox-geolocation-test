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
        let rts = findRoutes(start, dest);
        
        if (typeof rts === 'Number') {
          
          return;
        }
      };
    }
  }
});

function findRoutes(start, end) {
  let stt = getBusLists(start);
  let dst = getBusLists(end);
  
  for (let i in dst) {
    if (stt.includes(dst[i])) {
      return dst[i];
    }
    
  }
}