fetch('data/bus.json')
  .then(res => res.json())
  .then(data => app.bus = data);

function getBusLists(stop_id) {
  if (! stop_id in app.bus) {
    return [];
  }
  let dbg = document.querySelector('#dbg');
  if (dbg) {
    dbg.innerText += app.stops.filter((x) => x.id === stop_id)[0].name_en + ' (#' + stop_id + ') - ' + app.bus[stop_id].join(',') + "\r\n";
  }
  return app.bus[stop_id];
}