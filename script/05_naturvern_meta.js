var PolygonLookup = require("polygon-lookup");
const { geospatial, io, log, json } = require("lastejobb");

const kommuner = io.lesDatafil("kommune.geojson");
var lookup = new PolygonLookup(kommuner);

let vo = io.lesDatafil("naturvernområde_25833.geojson");

let treff = 0;
manglerKommune = [];
let r = {};
vo.features.forEach(v => {
  v.properties = { id: v.properties.id };
  const kommuner = finnOverlappendeKommuner(v.geometry);
  if (kommuner.length <= 0) manglerKommune.push(v.properties.id);
  const areal = Math.round(geospatial.calculateArea(v.geometry.coordinates));
  const bbox = geospatial.axisAlignedBoundingBox(v.geometry.coordinates);
  r[v.properties.id] = { id: v.properties.id, kommuner, areal, bbox };
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
    if (poly) {
      const kommunenummer = poly.properties.kommunenummer;
      hits[kommunenummer] = 1;
      treff++;
    }
  }
  return Object.keys(hits);
}
