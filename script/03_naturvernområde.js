const { io, json } = require("lastejobb");

let vo = io.lesDatafil("naturvern.geojson");
const verneområder = vo.features.filter(
  x => x.properties.objekttype === "Naturvernområde"
);

const voo = verneområder.reduce((acc, vo) => {
  const key = vo.properties.ident_lokalid;
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
