const { processes } = require("@artsdatabanken/lastejobb");

return
reproject("naturvernområde_4326.geojson", "naturvernområde_25833.geojson");

function reproject(src, target, epsg = "EPSG:25833") {
  processes.exec(
    `ogr2ogr -f GeoJSON -t_srs ${epsg} temp/${target} temp/${src}`
  );
}
