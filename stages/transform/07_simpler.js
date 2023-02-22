
const { processes } = require("@artsdatabanken/lastejobb");
const execSync = require("child_process").execSync;

//main();

function main(){
    // start container / image
    var cid = start_ogr_containerNImage(create_container_name('nkl-image'));
    //simplify naturvernområde_25833
    exec_docker(n, "ogr2ogr -f GeoJSON -simplify 5 /tmp/naturvernområde_25833_simple.geojson /tmp/naturvernområde_25833.geojson");
    //simplify naturvernområde_25833
    exec_docker(n, "ogr2ogr -f GeoJSON -simplify 9e-5 /tmp/naturvernområde_4326_simple.geojson /tmp/naturvernområde_4326.geojson");
    clean_container(n); // dispose of container when finished
}

function create_container_name(name){
    let d = new Date().getTime();
    return name+d;
}

function start_ogr_containerNImage(name){// : void
    let cmd = `docker run --name ${name} -di --restart unless-stopped -v $PWD/temp/:/tmp:rw osgeo/gdal:alpine-normal-latest`
    run_in_shell(cmd);
    console.log(name);
}

function clean_container(container_name){// : void
    run_in_shell(`docker rm -f ${container_name}`);
}

/**  PRIVATE **/
function run_in_shell(cmd) {// : string
    var out = execSync(cmd, { skipThrow: false });
    var out_string = new TextDecoder('utf-8').decode(out);
    return out_string;
}

function exec_docker(name, cmd){
    var wholecmd = `docker exec -i ${name} sh -c "${cmd}"`;   
    return run_in_shell(wholecmd);
}