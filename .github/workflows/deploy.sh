#!/bin/bash
echo "Make folder and copy files"
mkdir naturvern
cp build/polygon.4326.geojson naturvern/polygon_med_undertyper.4326.geojson
cp build/polygon.25833.geojson naturvern/polygon_med_undertyper.25833.geojson
cp temp/kildedata.4326.geojsonl naturvern/
cp build/polygon.4326.geojson destinationRepo/polygon_med_undertyper.4326.geojson
cp build/polygon.25833.geojson destinationRepo/polygon_med_undertyper.25833.geojson
cp build/type.json destinationRepo/type.json
cp build/type.schema.json destinationRepo/type.schema.json
cp temp/kildedata.4326.geojsonl destinationRepo/
