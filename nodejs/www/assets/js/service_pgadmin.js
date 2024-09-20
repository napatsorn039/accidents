// // เรียกAPI จาก pgadmin

// const express = require('express');
// const app = express();
// const Pool = require('pg').Pool

// const db = new Pool({
//     host: 'localhost',
//     database: 'geo377',
//     user: 'postgres',
//     password: '123',
//     port: 5432,
// });

// const express = require('express');
// const app = express();

// const bodyParser = require('body-parser')
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({
//     extended: true
// }))


// app.get("/api", (req, res) => {
//     // console.log("hello");
//     res.status(200).json({ "status": "success" })
// })


// app.get("/api/v1/village/", (req, res) => {
//     const sql = "select * from public.cm_dwr_village_4326";
//     db.query(sql).then((r) => {
//         console.log(r.rows);
//         res.status(200).json(r.rows)
//     })
// })


// // เพิ่ม
// // app.post("/api/accident_data", (req, res) => {
// //     const { accident_date,
// //         latitude,
// //         longitude,
// //         vehicle_type,
// //         injured_fatalities_count,
// //         road_condition,
// //         weather_condition,
// //         image_url,
// //         data_submission_time } = req.body

// //     const sql = `INSERT INTO accident_data ( accident_date,
// //         latitude,
// //         longitude,
// //         vehicle_type,
// //         injured_fatalities_count,
// //         road_condition,
// //         weather_condition,
// //         image_url,
// //         data_submission_time) values
// //         ('${address}', '${mkname}',
// //          ST_makePoint(${lng},${lat}))`
// //     db.query(sql).then(() => {
// //         res.status(200).json({ status: "success!" })
// //     })
// // })
// app.use('/', express.static('www'))
// app.use(require('./service'))

// app.listen(3000, () => { console.log("http://localhost:3000") });