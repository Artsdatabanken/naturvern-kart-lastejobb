const { http, log } = require("lastejobb");

http
  .downloadBinary(
    "https://data.test.artsdatabanken.no/Naturvernområde/Geonorge_Naturvernområder_4326.geojson",
    `naturvern.geojson`
  )
  .catch(err => {
    log.fatal(err);
    process.exit(1);
  });
