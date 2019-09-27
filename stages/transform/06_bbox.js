const { geospatial, io, json } = require("lastejobb");

const meta = io.lesDatafil("meta.json");
let vo = io.lesDatafil("naturvernområde_4326.geojson");

vo.features.forEach(v => {
  const node = meta[v.properties.id];
  node.kode = node.id;
  delete node.id;
  node.bbox = geospatial.axisAlignedBoundingBox(v.geometry.coordinates);
});

io.skrivBuildfil("naturvernområde_meta.json", meta);
