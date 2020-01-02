const { io, json } = require("lastejobb");

let linjer = io
  .lesDataRå("kildedata.4326.geojsonl")
  .toString()
  .trim()
  .split("\n");
if (linjer.length < 2500)
  throw new Error(
    "Nedlastet fil mangler data, har bare " + linjer.length + " områder"
  );
linjer = linjer.map(linje => {
  const vo = JSON.parse(linje);
  vo.properties = { id: vo.properties.naturvernId };
  delete vo.id;
  return vo;
});

const voo = linjer.reduce((acc, vo) => {
  const key = vo.properties.id;
  if (!acc[key]) {
    acc[key] = vo;
    return acc;
  }
  const geom = acc[key].geometry;
  geom.coordinates = [...geom.coordinates, ...vo.geometry.coordinates];
  return acc;
}, {});

const vo = { type: "FeatureCollection", name: "naturvernområde_4326" };
vo.features = json.objectToArray(voo);

io.skrivDatafil("naturvernområde_4326.geojson", vo);
