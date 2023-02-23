const { geospatial, io, json } = require("@artsdatabanken/lastejobb");

try{
  task_06();
  //console.log("(skipping 06)");
}catch(e){
  console.error(e);
  console.error(e.stack);
}


function task_06(){// : void
  const meta = io.lesTempJson("meta.json");
  let vo = io.lesTempJson("naturvernområde_4326.geojson");
  
  const r = [];
  vo.features.forEach(v => {
    const node = meta[v.properties.id];
    node.kode = "VV-" + parseInt(node.id.substring(2));
    node.bbox = geospatial.axisAlignedBoundingBox(v.geometry.coordinates);
    r.push(node);
  });
  io.skrivBuildfil("type.json", r);
}