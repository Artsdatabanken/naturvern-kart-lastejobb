const { http, log } = require("lastejobb");

http
  .downloadBinary(
    "https://data.test.artsdatabanken.no/Naturvernomr%C3%A5de/Geonorge_Naturvernomr%C3%A5der_4326.geojson",
    `naturvern.geojson`
  )
  .catch(err => {
    log.fatal(err);
    process.exit(1);
  });
