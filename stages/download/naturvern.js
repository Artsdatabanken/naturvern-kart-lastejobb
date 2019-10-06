const { log } = require("lastejobb");
const execSync = require("child_process").execSync;

const url =
  "https://kart.miljodirektoratet.no/arcgis/rest/services/vern/MapServer/0/query?where=1=1&outfields=*&f=geojson";

const cmd = `ogr2ogr data/naturvern.geojson "${url}"`;
log.info(cmd);
execSync(cmd);
