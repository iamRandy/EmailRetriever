const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});


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

app.listen(3001, () => {
    console.log("Server running on port 3001.");
})