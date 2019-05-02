const { io } = require("lastejobb");

map("naturvernområde_4326.geojson", "naturvernområde_4326");
map("naturvernområde_25833.geojson", "naturvernområde_25833");

function map(srcPath, navn) {
  const geo = io.lesDatafil(srcPath);
  geo.features.forEach(f => {
    f.geometry.coordinates = reducePrecision(
      f.geometry.coordinates,
      geo.crs && geo.crs.properties && geo.crs.properties.name
    );
  });
  geo.features.sort((a, b) => (a.properties.id > b.properties.id ? 1 : -1));
  const dstPath = navn + ".geojson";
  io.skrivBuildfil(dstPath, geo);
}

function mapNavn(navn) {
  return navn.reduce((acc, n) => {
    // https://en.wikipedia.org/wiki/List_of_ISO_639-2_codes
    acc[n.sprak] = n.navn;
    return acc;
  }, {});
}

function reducePrecision(coords, crs) {
  return coords.map(c => {
    if (Array.isArray(c)) return reducePrecision(c, crs);
    if (crs === "urn:ogc:def:crs:EPSG::25833") return Math.round(c);
    return Math.round(1e6 * c) / 1e6;
  });
}
