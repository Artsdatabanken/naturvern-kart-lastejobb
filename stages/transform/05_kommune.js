var PolygonLookup = require("polygon-lookup");
const { geospatial, io, log } = require("@artsdatabanken/lastejobb");

const kommuner = io.lesTempJson("kommune.geojson");
var lookup = new PolygonLookup(kommuner);

let vo = io.lesTempJson("naturvernområde_25833.geojson");

let treff = 0;
manglerKommune = [];
let r = {};
vo.features.forEach(v => {
  v.properties = { id: v.properties.id };
  const kommuner = finnOverlappendeKommuner(v.geometry);
  const fylker = finnFylker(kommuner);
  if (kommuner.length <= 0) manglerKommune.push(v.properties.id);
  const areal = Math.round(geospatial.calculateArea(v.geometry.coordinates));
  const bbox = geospatial.axisAlignedBoundingBox(v.geometry.coordinates);
  r[v.properties.id] = { id: v.properties.id, kommuner, fylker, areal, bbox };
});

const total = Object.keys(vo).length;
if (treff < total)
  log.info(`${total - treff} områder ligger utenfor alle kommuner`);

io.skrivDatafil("meta.json", r);

function finnOverlappendeKommuner(geometry) {
  let nater = geometry.coordinates;
  while (Array.isArray(nater[0][0])) nater = nater[0];

  let hits = {};
  for (var i = 0; i < nater.length; i++) {
    const punkt = nater[i];
    var poly = lookup.search(punkt[0], punkt[1]);
    if (!poly) continue;
    const kommunenummer = poly.properties.autorkode;
    hits[kommunenummer] = 1;
    treff++;
  }
  return Object.keys(hits);
}

function finnFylker(kommuner) {
  const fylker = kommuner.reduce((acc, k) => {
    acc[k.substring(0, 2)] = true;
    return acc;
  }, {});
  return Object.keys(fylker);
}
