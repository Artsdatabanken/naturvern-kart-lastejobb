var PolygonLookup = require("polygon-lookup");
const { io, log } = require("lastejobb");

const kommuner = io.lesDatafil("kommune.geojson");
var lookup = new PolygonLookup(kommuner);

let vo = io.lesDatafil("naturvern.geojson");
vo.features = vo.features.filter(
  x => x.properties.objekttype === "Naturvernområde"
);
let treff = 0;
manglerKommune = [];
const r = [];

vo.features.forEach(v => {
  v.properties = { id: v.properties.ident_lokalid };
  const kommuner = finnOverlappendeKommuner(v.geometry);
  if (kommuner.length <= 0) manglerKommune.push(v.properties.ident_lokalid);
  r.push({ lokal_id: v.properties.ident_lokalid, kommuner: kommuner });
});

const total = Object.keys(vo).length;
if (treff < total)
  log.info(`${total - treff} områder ligger utenfor alle kommuner`);

io.skrivBuildfil("naturvernområde_i_kommune.json", r);
io.skrivDatafil("naturvernområde_4326.geojson", vo);

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
