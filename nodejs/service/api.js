// const express = require('express');
// const app = express();
// // const Pool = require('pg').Pool;

// const { Pool } = require('pg')
const express = require('express');
const app = express();
// const axios = require('axios');
const { Pool } = require("pg");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = new Pool({
  host: 'localhost',
  database: 'geo377',
  user: 'postgres',
  password: '123',
  port: 5432,
});


// app.get('/alldata', (req, res) => {
//   db.query('select * from public.accident_data').then((r) => {
//     // console.log(r.rows)
//     res.status(200).json(r.rows)
//   })
// })

// app.get('/alldata/:id', (req, res) => {
//   const id = req.params.id
//   db.query('select * from public.accident_data where id = ' + id).then((r) => {
//     // console.log(r.rows)
//     res.status(200).json(r.rows)
//   })
// })

// app.post('/service/api/accident_data', (req, res) => {
//   const accidentData = req.body;
//   console.log('Received accident data:', accidentData);
//   res.status(200).json({ message: 'Data received successfully' });
// });


//   db.query(sql, values)
//     .then(() => {
//       res.status(200).json({ status: "success!" });
//     })
//     .catch((err) => {
//       console.error('Database error:', err);
//       res.status(500).json({ error: "Database error" });
//     });
// });

// app.get("/tygffg/", (req, res) => {
//   res.send("OK")
// })



module.exports = app;


