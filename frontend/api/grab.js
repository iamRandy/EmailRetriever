const mysql = require('mysql2');

module.exports = async (req, res) => {

    const db = mysql.createConnection({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
    });

    try {
        console.log("Attempting to Grab...");
        db.query("SELECT * FROM emails", (err, data) => {
            if (err) {
                console.error("Error:", err);
                res.status(500).json({ message: "Internal Server Error" });
            } else {
                console.log("Emails Successfully Retrieved.");
                res.status(200).json(data);
            }
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
