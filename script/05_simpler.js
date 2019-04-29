const { io } = require("lastejobb");
const execSync = require("child_process").execSync;

simplify(
  "naturvernområde_25833.geojson",
  "naturvernområde_25833_simple.geojson",
  2
);

simplify(
  "naturvernområde_4326.geojson",
  "naturvernområde_4326_simple.geojson",
  5e-5
);

function simplify(src, target, tolerance) {
  execSync(
    `ogr2ogr -f GeoJSON -simplify ${tolerance} data/${target} data/${src}`
  );
}
