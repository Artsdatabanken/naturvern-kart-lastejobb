#!/bin/bash
echo "Make folder and copy files"
ls -l
mkdir naturvern
cp ../../build/polygon.4326.geojson naturvern/polygon_med_undertyper.4326.geojson
cp ../../build/polygon.25833.geojson naturvern/polygon_med_undertyper.25833.geojson
cp ../../temp/kildedata.4326.geojsonl naturvern/

echo "Create archive"
tar --directory=naturvern -zcf naturvern.tar.gz .

echo "Send archive to host"
#sshpass -p $1 scp -v -o StrictHostKeyChecking=no naturvern.tar.gz  $2@$3/

curl -X POST -H 'Content-type: application/json' --data '{"text":"deploy naturvern-kart-lastejobb"}' $1