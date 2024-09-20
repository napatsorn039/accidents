document.addEventListener('DOMContentLoaded', () => {
    fetch('https://data.tmd.go.th/api/DailySeismicEvent/v1/?uid=api&ukey=api12345')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#seismicTable tbody');

            data.forEach(event => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${event.Date}</td>
                    <td>${event.Time}</td>
                    <td>${event.Magnitude}</td>
                    <td>${event.Depth}</td>
                    <td>${event.Location}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});