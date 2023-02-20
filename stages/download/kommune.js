const { http, log } = require("@artsdatabanken/lastejobb");

http
  .downloadBinary(
    "https://github.com/Artsdatabanken/kommune-kart/raw/master/kommune_25833.geojson",
    `kommune.geojson`
  )
  .then(() => {})
  .catch(err => {
    log.fatal(err);
    process.exit(1);
  });
