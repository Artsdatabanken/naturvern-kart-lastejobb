const { io, json } = require("lastejobb");

let vo = io.lesDatafil("naturvern.geojson");
let verneområder = vo.features;
if (vo.features.length < 2500)
  throw new Error(
    "Nedlastet fil mangler data, har bare " + verneområder.length + " områder"
  );
verneområder = verneområder.map(vo => {
  vo.properties = { id: vo.properties.naturvernId };
  delete vo.id;
  return vo;
});

const voo = verneområder.reduce((acc, vo) => {
  const key = vo.properties.id;
  if (!acc[key]) {
    acc[key] = vo;
    return acc;
  }
  const geom = acc[key].geometry;
  geom.coordinates = [...geom.coordinates, ...vo.geometry.coordinates];
  return acc;
}, {});

vo.features = json.objectToArray(voo);

io.skrivDatafil("naturvernområde_4326.geojson", vo);
