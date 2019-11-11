const { log, processes } = require("lastejobb");

const url =
  "https://kart.miljodirektoratet.no/arcgis/rest/services/vern/MapServer/0/query?where=1=1&outfields=*&f=geojson";

const cmd = `ogr2ogr temp/kildedata.4326.geojson "${url}"`;
log.info(cmd);
processes.exec(cmd);
