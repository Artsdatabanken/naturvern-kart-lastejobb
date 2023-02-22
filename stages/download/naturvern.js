const { io, wfs } = require("@artsdatabanken/lastejobb");

const options = { batchSize: 900, offset: 0 }
const url =
  "https://kart.miljodirektoratet.no/arcgis/rest/services/vern/MapServer/0/query?where=1=1&outfields=*&f=geojson&resultRecordCount=${resultRecordCount}&resultOffset=${resultOffset}";

io.mkdir("temp");
wfs.mirror(url, "temp/kildedata.4326.geojsonl", options);
