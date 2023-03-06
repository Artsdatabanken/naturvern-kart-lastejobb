#Only works from local machine
set -e

echo Deploy polygon_med_undertyper.4326.geojson 
scp build/polygon.4326.geojson grunnkart@hydra:~/tilesdata/Naturvernområde/polygon_med_undertyper.4326.geojson

echo Deploy polygon_med_undertyper.25833.geojson 
scp build/polygon.25833.geojson grunnkart@hydra:~/tilesdata/Naturvernområde/polygon_med_undertyper.25833.geojson

echo Deploy kildedata.4326.geojsonl
scp temp/kildedata.4326.geojsonl grunnkart@hydra:~/tilesdata/Naturvernområde/
