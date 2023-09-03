// const express = require('express');
// const app = express();
// const cors = require('cors');
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

pool.getConnection((err, connection) => {
    if(err) console.log(err)
    else {
        console.log("Connected Successfully");
    }
})

module.exports = pool.promise()

// app.use(cors());
// app.use(express.json());

// const db = mysql.createConnection({
//     user: 'root',
//     host: 'localhost',
//     password: '7263990306750Rndy,./',
//     database: 'emailDB',
//     port: 3001
// });

// app.post('/send', (req, res) => {
//     const email = req.body.email;

//     db.query("INSERT INTO emails (email) VALUES (?)",
//     [email],
//     (err, result) => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.send("Email added successfully.");
//         }
//     });
// });

// app.get('/grabEmails', (req, res) => {
//     console.log("Attempting to Grab...");
//     db.query("SELECT * FROM emails",
//     (err, data) => {
//         if (err) {
//             console.log(err);
//         }else{
//             console.log("Emails retrieved.");
//             res.send(data);
//         }
//     });
// })

// app.listen(3001, () => {
//     console.log("Server running on port 3001.");
// })