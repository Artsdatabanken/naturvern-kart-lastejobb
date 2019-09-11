rsync -avz --delete --progress grunnkart@hydra:~/tilesdata/Naturvernområde .   
cd Naturvernområde
find -name "*.4326.geojson" -type f -exec ../make-mbtile.sh {} \;
rsync -avz ./ --progress grunnkart@hydra:~/tilesdata/Naturvernområde/ 

