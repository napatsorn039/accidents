// สร้างแผนที่และกำหนดตำแหน่งเชียงใหม่
var map = L.map('map').setView([18.78707847149431, 98.91926687656576], 15);

// เพิ่มแผนที่จาก OpenStreetMap
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20, subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

var gmap = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20, subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

var t_suthep = L.tileLayer.wms("http://localhost:8080/geoserver/shp499/wms?", {
    layers: "shp499:tam_suthep_4326",
    format: "image/png",
    transparent: true,
    maxZoom: 12,
    // minZoom: 14,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

var ac_suthep = L.tileLayer.wms("http://localhost:8080/geoserver/shp499/wms?", {
    layers: "shp499:ac_suthep_heatmap",
    format: "image/png",
    transparent: true,
    maxZoom: 12,
    // minZoom: 14,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

var overlayMap = {
    "ขอบเขตตำบลสุเทพ": t_suthep.addTo(map),
    "จุดเกิดอุบัติเหตุ": ac_suthep.addTo(map)
};
var basemap = {
    "Google satellite map": gmap,
    "OpenStreetMap": osm.addTo(map)
};

L.control.layers(basemap, overlayMap).addTo(map);

// เพิ่ม marker ในแผนที่
//var marker = L.marker([18.7889, 98.9853]).addTo(map);

// เพิ่ม popup ข้อความ
marker.bindPopup("<b>เชียงใหม่</b><br>จุดสำคัญในแผนที่นี้").openPopup();
