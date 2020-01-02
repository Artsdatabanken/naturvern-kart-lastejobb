const { io, wfs } = require("lastejobb");

const url =
  "https://kart.miljodirektoratet.no/arcgis/rest/services/vern/MapServer/0/query?where=1=1&outfields=*&f=geojson";

io.mkdir("temp");
wfs.mirror(url, "temp/kildedata.4326.geojsonl");
