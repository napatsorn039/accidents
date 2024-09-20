
var map = L.map('map').setView([18.782247245102734, 98.93796916167885], 15);


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
var overlayMap = {
    "ขอบเขตตำบลสุเทพ": t_suthep,
    "ขอบเขตอำเภอเมือง": a_mueang
};
var basemap = {
    "Google satellite map": gmap,
    "OpenStreetMap": osm.addTo(map)
};


L.control.layers(basemap, overlayMap).addTo(map);

// googleMap = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{ maxZoom: 20, subdomains:['mt0','mt1','mt2','mt3'] });


// const marker = L.marker([51.5, -0.09]).addTo(map);

// const circle = L.circle([51.508, -0.11], {
//   color: 'red',
//   fillColor: '#f03',
//   fillOpacity: 0.5,
//   radius: 500
// }).addTo(map);

// const polygon = L.polygon([
//   [51.509, -0.08],
//   [51.503, -0.06],
//   [51.51, -0.047]
// ]).addTo(map);


document.addEventListener('DOMContentLoaded', () => {
    "use strict";

    /**
     * Preloader
     */
    var preloader = document.querySelector('#preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.remove();
        });
    }

    /**
     * Sticky header on scroll
     */
    var selectHeader = document.querySelector('#header');
    if (selectHeader) {
        document.addEventListener('scroll', () => {
            window.scrollY > 100 ? selectHeader.classList.add('sticked') : selectHeader.classList.remove('sticked');
        });
    }

    /**
     * Scroll top button
     */
    var scrollTop = document.querySelector('.scroll-top');
    if (scrollTop) {
        const togglescrollTop = function () {
            window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
        }
        window.addEventListener('load', togglescrollTop);
        document.addEventListener('scroll', togglescrollTop);
        scrollTop.addEventListener('click', window.scrollTo({
            top: 0,
            behavior: 'smooth'
        }));
    }

    /**
     * Mobile nav toggle
     */
    var mobileNavShow = document.querySelector('.mobile-nav-show');
    var mobileNavHide = document.querySelector('.mobile-nav-hide');

    document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
        el.addEventListener('click', function (event) {
            event.preventDefault();
            mobileNavToogle();
        })
    });

    function mobileNavToogle() {
        document.querySelector('body').classList.toggle('mobile-nav-active');
        mobileNavShow.classList.toggle('d-none');
        mobileNavHide.classList.toggle('d-none');
    }

    /**
     * Hide mobile nav on same-page/hash links
     */
    document.querySelectorAll('#navbar a').forEach(navbarlink => {

        if (!navbarlink.hash) return;

        let section = document.querySelector(navbarlink.hash);
        if (!section) return;

        navbarlink.addEventListener('click', () => {
            if (document.querySelector('.mobile-nav-active')) {
                mobileNavToogle();
            }
        });

    });

    /**
     * Toggle mobile nav dropdowns
     */
    var navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

    navDropdowns.forEach(el => {
        el.addEventListener('click', function (event) {
            if (document.querySelector('.mobile-nav-active')) {
                event.preventDefault();
                this.classList.toggle('active');
                this.nextElementSibling.classList.toggle('dropdown-active');

                let dropDownIndicator = this.querySelector('.dropdown-indicator');
                dropDownIndicator.classList.toggle('bi-chevron-up');
                dropDownIndicator.classList.toggle('bi-chevron-down');
            }
        })
    });

    /**
     * Initiate pURE cOUNTER
     */
    new PureCounter();

    /**
     * Initiate glightbox
     */
    var glightbox = GLightbox({
        selector: '.glightbox'
    });

    /**
     * Init swiper slider with 1 slide at once in desktop view
     */
    new Swiper('.slides-1', {
        speed: 600,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        slidesPerView: 'auto',
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });

    /**
     * Animation on scroll function and init
     */
    function aos_init() {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }
    window.addEventListener('load', () => {
        aos_init();
    });
    // เพิ่ม shp geoservice

});
// Locate user and set map view to their location
map.locate({ setView: true, maxZoom: 15 });

// Add a marker to the user's location
function onLocationFound(e) {
    // ค่าความแม่นยำของตำแหน่งที่หาได้ในหน่วยเมตรโดยรัศมีจะถูกกำหนดให้เป็นครึ่งหนึ่งของค่าความแม่นยำนี้
    var radius = e.accuracy / 2;

    // เพิ่มมาร์คเกอร์ที่ตำแหน่งของผู้ใช้ 
    L.marker(e.latlng).addTo(map)
        // แสดงข้อความในป๊อปอัพที่บอกว่าผู้ใช้อยู่ภายในระยะกี่เมตรจากจุดนี้
        .bindPopup("You are within " + radius.toFixed(2) + " meters from this point").openPopup();
    // เพิ่มวงกลมรอบตำแหน่งของผู้ใช้:
    L.circle(e.latlng, radius).addTo(map);
}

// Handle location errors
function onLocationError(e) {
    alert(e.message);
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);