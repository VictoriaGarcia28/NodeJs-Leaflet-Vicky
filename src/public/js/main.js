var map = L.map('map-template').setView([51.505, -0.09], 3);

const tileURL = 'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png' 
const tileURL2 ='https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';

const tile = L.tileLayer(tileURL).addTo(map);

// Socket Io
const socket = io.connect();

// Marker
//const marker = L.marker([50.5, 30.5]); // kiev, ukraine
//marker.bindPopup('HolaHola!');
//map.addLayer(marker);

// Geolocation
map.locate({enableHighAccuracy: true})
map.on('locationfound', e => {
  const coords = [e.latlng.lat, e.latlng.lng];
  const marker = L.marker(coords);
  marker.bindPopup('You are here!');
  map.addLayer(marker);
  socket.emit('userCoordinates', e.latlng);
});

socket.on("newUserCoordinates", (coords) => {
console.log("Nuevo usuario conectado")
const marker = L.marker([coords.lat, coords.lng]);
marker.bindPopup('Hello there');
map.addLayer(marker);
});

// socket new User connected
//socket.on('newUserCoordinates', (coords) => {
  //console.log(coords);
  //const userIcon = L.icon({
    //iconUrl: '/img/icon2.png',
    //iconSize: [38, 42],
  //})
  //const newUserMarker = L.marker([coords.lat, coords.lng], {
    //icon: userIcon 
  //});
  //newUserMarker.bindPopup('New User!');
  //map.addLayer(newUserMarker);
//}); 

map.addLayer(tile);

