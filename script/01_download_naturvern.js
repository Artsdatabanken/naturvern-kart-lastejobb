const { http, log } = require("lastejobb");
const path = require("path");

http
  .downloadBinary(
    "https://data.artsdatabanken.no/Naturvernomr%C3%A5de/Geonorge_Naturvernomr%C3%A5der_32633.geojson",
    `naturvern.geojson`
  )
  .catch(err => {
    log.fatal(err);
    process.exit(1);
  });
