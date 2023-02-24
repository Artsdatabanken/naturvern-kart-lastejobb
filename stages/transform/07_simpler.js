const { processes, dops} = require("@artsdatabanken/lastejobb");
//var dops = require("./docker_operations");

main();

function main(){
    // start container / image
    var n = dops.start_ogr_containerNImage(dops.create_container_name('nkl-image'));
    //simplify naturvernområde_25833
    dops.exec_docker(n, "ogr2ogr -f GeoJSON -simplify 5 /tmp/naturvernområde_25833_simple.geojson /tmp/naturvernområde_25833.geojson");
    //simplify naturvernområde_4326
    dops.exec_docker(n, "ogr2ogr -f GeoJSON -simplify 9e-5 /tmp/naturvernområde_4326_simple.geojson /tmp/naturvernområde_4326.geojson");
    dops.clean_container(n); // dispose of container when finished
}
