const { geospatial, io, json } = require("lastejobb");

const meta = io.lesDatafil("meta.json");
let vo = io.lesDatafil("naturvernområde_4326.geojson");

vo.features.forEach(v => {
  const node = meta[v.properties.id];
  node.bbox = geospatial.axisAlignedBoundingBox(v.geometry.coordinates);
});

let r = json.objectToArray(meta);
r = r.sort((a, b) => (a.id > b.id ? 1 : -1));
io.skrivBuildfil("naturvernområde_meta.json", r);
