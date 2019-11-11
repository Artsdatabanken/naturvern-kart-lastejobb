#/bin/bash
set -e

URL="https://kart.miljodirektoratet.no/arcgis/rest/services/vern/MapServer/0/query?where=1=1&outfields=*&f=geojson";

mkdir -p temp
ogr2ogr temp/kildedata.4326.geojson $URL
