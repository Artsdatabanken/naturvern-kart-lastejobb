const { io } = require("lastejobb");
const execSync = require("child_process").execSync;

reproject("naturvernområde_4326.geojson", "naturvernområde_25833.geojson");

function reproject(src, target, epsg = "EPSG:25833") {
  execSync(`ogr2ogr -f GeoJSON -t_srs ${epsg} data/${target} data/${src}`);
}
