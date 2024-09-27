var map = L.map('map').setView([18.791033135957957, 98.95274108701764], 18);

var gmap = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20, subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20, subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

// var t_suthep = L.tileLayer.wms("http://localhost:8080/geoserver/shp499/wms?", {
//     layers: "shp499:tam_suthep_4326",
//     format: "image/png",
//     transparent: true,
//     maxZoom: 20,
//     // minZoom: 14,
//     // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
// });

// var a_mueang = L.tileLayer.wms("http://localhost:8080/geoserver/shp499/wms?", {
//     layers: "shp499:am_mueang_4326",
//     format: "image/png",
//     transparent: true,
//     maxZoom: 20,
//     // minZoom: 14,
//     // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
// });
// var predicted_gwr = L.tileLayer.wms("http://localhost:8080/geoserver/shp499/wms?", {
//     layers: "shp499:predicted_gwr",
//     format: "image/png",
//     transparent: true,
//     maxZoom: 20,
//     // minZoom: 14,
//     // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
// });

var overlayMap = {
    // "ขอบเขตตำบลสุเทพ": t_suthep,
    // "ขอบเขตอำเภอเมือง": a_mueang,
    // "พื้นที่เสี่ยงอุบัติเหตุ": predicted_gwr.addTo(map)

};


var basemap = {
    "Google satellite map": gmap,
    "OpenStreetMap": osm.addTo(map)
};
L.control.layers(basemap, overlayMap).addTo(map);

// Locate user and set map view to their location
map.locate({ setView: true, maxZoom: 18 });

// Add a marker to the user's location หาตำแหน่งปัจจุบันของผู้ใช้.
function onLocationFound(e) {
    var radius = e.accuracy / 2;
    // var radius = 300;

    // คำนวณขอบเขตของวงกลม
    var bounds = L.latLngBounds([
        [e.latlng.lat - radius / 111320, e.latlng.lng - radius / (Math.cos(e.latlng.lat * Math.PI / 180) * 111320)],
        [e.latlng.lat + radius / 111320, e.latlng.lng + radius / (Math.cos(e.latlng.lat * Math.PI / 180) * 111320)]
    ]);

    // เพิ่มมาร์คเกอร์ที่ตำแหน่งของผู้ใช้
    var marker = L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point")
        .openPopup();

    // เพิ่มวงกลมรอบตำแหน่งของผู้ใช้
    // var circle = L.circle(e.latlng, radius).addTo(map);
    // เพิ่มวงกลมรอบตำแหน่งของผู้ใช้ (ใช้สีเฉพาะสำหรับวงกลม)
    var circle = L.circle(e.latlng, {
        color: '#3388ff', // สีขอบของวงกลม
        // fillColor: '#3388ff', // สีเติมภายในวงกลม
        fillOpacity: 0.1, // ความโปร่งแสงของวงกลม
        radius: radius
    }).addTo(map);

    // ปรับซูมแผนที่แบบคงที่แทนที่จะใช้ fitBounds
    map.setView(e.latlng, 18); // ซูมไปที่ตำแหน่งผู้ใช้ที่ระดับ 18
}

// ปรับขอบเขตการมองเห็นของแผนที่ให้ครอบคลุมทั้ง Marker และ Circle พร้อมกับเพิ่มการ Padding
// map.fitBounds(bounds, { padding: [50, 50], maxZoom: 18 }); // เพิ่ม padding 50 พิกเซลในทุกทิศทาง


// Handle location errors
function onLocationError(e) {
    alert(e.message);
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);


// function getColor(d) {
//     console.log(d);
function getColor(d) {
    return d > 183441.59 ? '#B8001F' :
        d > 98585.95 ? '#E85C0D' :
            d > 47916.81 ? '#FFEB55' :
                d > 15584.59 ? '#9ADE7B' :
                    d > -37058.24 ? '#5D9C59' :
                        '#FFEDA0';
}


function style(feature) {
    return {
        fillColor: getColor(feature.properties.Predicted),
        weight: 1,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.8
    };
}


L.geoJSON(json__1, { style: style, }).addTo(map)

// layer__1.addTo(map)
