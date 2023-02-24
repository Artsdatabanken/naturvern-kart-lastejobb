const { processes, dops} = require("@artsdatabanken/lastejobb");
//const {}  = require("@artsdatabanken/lastejobb");
//var dops = require("./docker_operations");

//const {}  = require("07_simpler");,
try{
  //return reproject("naturvernområde_4326.geojson", "naturvernområde_25833.geojson");
  var n = dops.start_ogr_containerNImage(dops.create_container_name('nkl-image'));
  //simplify naturvernområde_25833
  return reproj_w_docker(n, "naturvernområde_4326.geojson", "naturvernområde_25833.geojson");
  clean_container(n);
}catch(e){
  console.error(e);
  console.error(e.stack);
}

function reproj_w_docker(dc_cont_name, src, target, epsg = "EPSG:25833"){
  var cmd = `ogr2ogr -f GeoJSON -t_srs ${epsg} tmp/${target} tmp/${src}`
  dops.exec_docker(dc_cont_name, cmd);
}
