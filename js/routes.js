fetch('data/bus.json')
  .then(res => res.json())
  .then(data => app.bus = data);

function getBusLists(stop_id) {
  if (! stop_id in app.bus) {
    return [];
  }
  return app.bus[stop_id];
}