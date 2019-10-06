const { io } = require("lastejobb");

map("naturvernområde_4326_simple.geojson", "polygon.4326");
map("naturvernområde_25833_simple.geojson", "polygon.25833");

function map(srcPath, navn) {
  const geo = io.lesDatafil(srcPath);
  geo.features.forEach(f => {
    f.geometry.coordinates = reducePrecision(
      f.geometry.coordinates,
      geo.crs && geo.crs.properties && geo.crs.properties.name
    );
    const id = parseInt(f.properties.id.substring(2));
    const props = f.properties;
    props.kode = id.toString();
    props.code = "VV-" + id;
  });
  geo.features.sort((a, b) => (a.properties.id > b.properties.id ? 1 : -1));
  const dstPath = navn + ".geojson";
  io.skrivBuildfil(dstPath, geo);
}

// https://en.wikipedia.org/wiki/List_of_ISO_639-2_codes

function reducePrecision(coords, crs) {
  return coords.map(c => {
    if (Array.isArray(c)) return reducePrecision(c, crs);
    if (crs === "urn:ogc:def:crs:EPSG::25833") return Math.round(c);
    return Math.round(1e6 * c) / 1e6;
  });
}
