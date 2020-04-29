#!/bin/bash
set -e

ogr2ogr() {
    echo $@
    docker run --rm -v /home:/home osgeo/gdal:alpine-normal-latest ogr2ogr $@
}

ogr2ogr -f GeoJSON -simplify 5 $PWD/temp/naturvernområde_25833_simple.geojson $PWD/temp/naturvernområde_25833.geojson
ogr2ogr -f GeoJSON -simplify 9e-5 $PWD/temp/naturvernområde_4326_simple.geojson $PWD/temp/naturvernområde_4326.geojson
