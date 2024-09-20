
const express = require('express');

const app = express();
const axios = require('axios');
const { Pool } = require("pg");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000

// // const pg = new Pool({
const db = new Pool({
    host: 'postgis',
    database: 'geo377',
    user: 'postgres',
    password: '123',
    port: 5432,
});


app.use(express.json());

app.use('/acd', express.static('www'))

app.get("/api/", (req, res) => {
    res.send("OK")
})

// เรียกข้อมูลทั้งหมด
app.get("/acd/api/database/", (req, res) => {
    let sql = `SELECT * FROM accident_data`;
    db.query(sql)
        .then(r => {
            // ส่งข้อมูลในรูปแบบ JSON
            res.status(200).json(r.rows);
        })
        .catch(err => {
            console.error('Database error:', err);
            res.status(500).json({ error: "Database error" });
        });
});


// บันทึกข้อมูล
app.post('/acd/service/api/accident_data', (req, res) => {
    const {
        accident_date,
        latitude,
        longitude,
        vehicle_type,
        injured_fatalities_count,
        road_condition,
        weather_condition
    } = req.body;

    console.log(req.body);

    const sql = `
    INSERT INTO accident_data (
      accident_date,
      latitude,
      longitude,
      vehicle_type,
      injured_fatalities_count,
      road_condition,
      weather_condition
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)`;

    const values = [
        accident_date,
        latitude,
        longitude,
        vehicle_type,
        injured_fatalities_count,
        road_condition,
        weather_condition
    ];

    db.query(sql, values)
        .then(() => {
            res.status(200).json({ status: "success!" });
        })
        .catch((err) => {
            console.error('Database error:', err);
            res.status(500).json({ error: "Database error" });
        });
});


// app.post("/post/:accident_date/:injured_fatalities_count/:latitude/:longitude/:road_condition/:vehicle_type/:weather_condition", (req, res) => {
//     const { accident_date, latitude, longitude, road_condition, vehicle_type, weather_condition } = req.body

//     // console.log(accident_date);

//     const sql = `INSERT INTO  houses (address, mkname, geom) values
//         ('${address}', '${mkname}',
//          ST_makePoint(${lng},${lat}))`
//     db.query(sql).then(() => {
//         res.status(200).json({ status: "success!" })
//     })
// })





// app.post('/service/api/accident_data', (req, res) => {
//     const accidentData = req.body;
//     console.log('Received accident data:', accidentData);
//     res.status(200).json({ message: 'Data received successfully' });
// });

// app.post('/service/api/accident_data', (req, res) => {
//     const {
//         accident_date,
//         latitude,
//         longitude,
//         vehicle_type,
//         injured_fatalities_count,
//         road_condition,
//         weather_condition } = req.params;

//     console.log(req.body);


//     const sql = `
//     INSERT INTO accident_data (
//       accident_date,
//       latitude,
//       longitude,
//       vehicle_type,
//       injured_fatalities_count,
//       road_condition,
//       weather_condition

//     )
//     VALUES (${accident_date}, ${latitude}, ${longitude}, ${vehicle_type}, ${injured_fatalities_count}, ${road_condition}, ${weather_condition})`;
//     // const values = [
//     //     accident_date,
//     //     latitude,
//     //     longitude,
//     //     vehicle_type,
//     //     injured_fatalities_count,
//     //     road_condition,
//     //     weather_condition

//     // ];
//     // console.log(sql);



//     db.query(sql)
//         .then(() => {
//             res.status(200).json({ status: "success!" });
//         })
//         .catch((err) => {
//             console.error('Database error:', err);
//             res.status(500).json({ error: "Database error" });
//         });
// });


// app.post('/api3/:accident_date/:latitude/:longitude/:vehicle_type/:injured_fatalities_count/:road_condition/:weather_condition/', (req, res) => {
//     const {
//         accident_date,
//         latitude,
//         longitude,
//         vehicle_type,
//         injured_fatalities_count,
//         road_condition,
//         weather_condition
//     } = req.params;
//     console.log(req.body);


//     const sql = `
//     INSERT INTO accident_data (
//       accident_date,
//       latitude,
//       longitude,
//       vehicle_type,
//       injured_fatalities_count,
//       road_condition,
//       weather_condition

//     )
//     VALUES ($1, $2, $3, $4, $5, $6, $7)`;
//     const values = [
//         accident_date,
//         latitude,
//         longitude,
//         vehicle_type,
//         injured_fatalities_count,
//         road_condition,
//         weather_condition

//     ];
//     console.log(sql);



//     db.query(sql, values)
//         .then(() => {
//             res.status(200).json({ status: "success!" });
//         })
//         .catch((err) => {
//             console.error('Database error:', err);
//             res.status(500).json({ error: "Database error" });
//         });
// });

app.listen(port, () => {
    console.log("http://localhost:3600");

})
