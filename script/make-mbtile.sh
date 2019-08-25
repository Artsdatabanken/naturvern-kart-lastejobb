#! /bin/bash -
file=$1
dir=$(dirname ${file%.*})
cd $dir
ogr2ogr polygon.3857.mbtiles polygon.4326.geojson -dsco MAXZOOM=7 -lco NAME=polygons -dsco BUFFER=0
