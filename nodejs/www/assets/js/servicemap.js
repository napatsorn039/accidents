// Initialize the map
var map = L.map('map').setView([18.789892142092373, 98.95330879974432], 14);

// Add base map layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Variable to store the current marker
let currentMarker = null;

// Handle map click events
map.on('click', (event) => {
    // Remove the old marker if it exists
    if (currentMarker) {
        map.removeLayer(currentMarker);
    }

    // Log the clicked coordinates
    console.log(event.latlng);

    // Format the latitude and longitude to 5 decimal places
    let lat = event.latlng.lat.toFixed(5);
    let lng = event.latlng.lng.toFixed(5);

    // Set the latitude and longitude values in the form inputs
    document.getElementById("mapClick_lat").value = lat;
    document.getElementById("mapClick_lng").value = lng;

    // Add a new marker at the clicked location
    currentMarker = L.marker(event.latlng).addTo(map)
        .bindPopup(`<br>Latitude: ${lat}<br>Longitude: ${lng}`)
        .openPopup();
});

// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    "use strict";

    // Get the form element
    const form = document.getElementById('accidentForm');

    // Handle form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Create a FormData object and convert it to a plain object
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Log the form data to the console for debugging
        console.log('Form Data:', data);

        // Send the data to the server
        fetch('/service/api/accident_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); // Parse the JSON response
            })
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });
});
