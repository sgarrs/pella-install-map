const fetch = require('node-fetch');
const {API_KEY, GEOCODE_URL} = require('./constants/ApiConstants.js');

const markers = [
  {address: '1335 Garrick Way Marietta GA 30068-2169', text: 'S'},
  {address: '5267 Manhasset Ct Atlanta GA 30338-3409', text: 'I'},
  {address: '2848 N Hill Dr NE Atlanta GA 30305-3210', text: 'I'},
];

const addressArray = markers.map((marker, i) => marker.address.replace(/\s/g, '+'));
let coordinates = [];

async function fetchCoordinates(address) {
  const url = `${GEOCODE_URL}json?address=${address}&key=${API_KEY}`;

  const coordinates = await fetch(url)
    .then((res) => res.json())
    .then((json) => json.results[0].geometry.location);

  return coordinates;
}

addressArray.forEach((address) => coordinates.push(fetchCoordinates(address)).then((coords) => console.log(coords)));
