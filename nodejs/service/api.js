const express = require('express');
const router = express.Router();
const Pool = require('pg').Pool;

// Set up PostgreSQL connection
const db = new Pool({
  host: 'postgis',
  database: 'geo377',
  user: 'postgres',
  password: '1234',
  port: 5433,
});

// Event listener for database errors
db.on('error', (err) => {
  console.error('Unexpected error on idle database client:', err);
  process.exit(-1);
});

// Insert accident data
router.post('/accident_data', (req, res) => {
  const {
    accident_date,
    latitude,
    longitude,
    vehicle_type,
    injured_fatalities_count,
    road_condition,
    weather_condition
  } = req.body;

  const sql = `
    INSERT INTO accident_data (
      accident_date,
      latitude,
      longitude,
      vehicle_type,
      injured_fatalities_count,
      road_condition,
      weather_condition
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
  `;
  const values = [
    accident_date,
    latitude,
    longitude,
    vehicle_type,
    injured_fatalities_count,
    road_condition,
    weather_condition
  ];

  // Log the query and values
  console.log('Executing query:', sql);
  console.log('With values:', values);

  db.query(sql, values)
    .then(() => {
      console.log('Data inserted successfully.');
      res.status(200).json({ status: "success!" });
    })
    .catch((err) => {
      console.error('Database error during data insertion:', err.message);
      res.status(500).json({ error: `Database error: ${err.message}` });
    });

});

// app.get("/test", (req, res) => {
//   let sql = 'select * from accident_data'
//   db.query(sql)
//     .then(r => {
//       console.log(r.rows)
//     })
// })


module.exports = router;
