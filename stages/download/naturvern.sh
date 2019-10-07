#/bin/bash
set -e

URL="https://kart.miljodirektoratet.no/arcgis/rest/services/vern/MapServer/0/query?where=1=1&outfields=*&f=geojson";

mkdir -p data
ogr2ogr data/kildedata.4326.geojson $URL
