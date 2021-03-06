const { geospatial, io, json } = require("lastejobb");

const meta = io.lesTempJson("meta.json");
let vo = io.lesTempJson("naturvernområde_4326.geojson");

const r = [];
vo.features.forEach(v => {
  const node = meta[v.properties.id];
  node.kode = "VV-" + parseInt(node.id.substring(2));
  node.bbox = geospatial.axisAlignedBoundingBox(v.geometry.coordinates);
  r.push(node);
});

io.skrivBuildfil("type.json", r);
