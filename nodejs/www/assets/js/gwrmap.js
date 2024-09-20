var map = L.map('map').setView([18.791033135957957, 98.95274108701764], 15);

var gmap = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20, subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20, subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

var t_suthep = L.tileLayer.wms("http://localhost:8080/geoserver/shp499/wms?", {
    layers: "shp499:tam_suthep_4326",
    format: "image/png",
    transparent: true,
    maxZoom: 20,
    // minZoom: 14,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

var a_mueang = L.tileLayer.wms("http://localhost:8080/geoserver/shp499/wms?", {
    layers: "shp499:am_mueang_4326",
    format: "image/png",
    transparent: true,
    maxZoom: 20,
    // minZoom: 14,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});
var predicted_gwr = L.tileLayer.wms("http://localhost:8080/geoserver/shp499/wms?", {
    layers: "shp499:predicted_gwr",
    format: "image/png",
    transparent: true,
    maxZoom: 20,
    // minZoom: 14,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

var overlayMap = {
    "ขอบเขตตำบลสุเทพ": t_suthep,
    "ขอบเขตอำเภอเมือง": a_mueang,
    "พื้นที่เสี่ยงอุบัติเหตุ": predicted_gwr
};

var basemap = {
    "Google satellite map": gmap,
    "OpenStreetMap": osm.addTo(map)
};
L.control.layers(basemap, overlayMap).addTo(map);

// Locate user and set map view to their location
map.locate({ setView: true, maxZoom: 10 });

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
    var circle = L.circle(e.latlng, radius).addTo(map);

    // ปรับขอบเขตการมองเห็นของแผนที่ให้ครอบคลุมทั้ง Marker และ Circle พร้อมกับเพิ่มการ Padding
    map.fitBounds(bounds, { padding: [50, 50] }); // เพิ่ม padding 50 พิกเซลในทุกทิศทาง
}

// Handle location errors
function onLocationError(e) {
    alert(e.message);
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);