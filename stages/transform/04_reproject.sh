#!/bin/bash 
set -e


ogr2ogr() {
    echo $@
    docker run --rm -v /home:/home osgeo/gdal:alpine-small-latest ogr2ogr $@
}

echo "Reprojecting"
ogr2ogr -t_srs EPSG:25833 $PWD/temp/naturvernområde_25833.geojson $PWD/temp/naturvernområde_4326.geojson
