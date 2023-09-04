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
        const { email } = req.body;

        db.query(
            "INSERT INTO emails (email) VALUES (?)",
            [email],
            (err, result) => {
                if (err) {
                    console.error("Error:", err);
                    res.status(500).json({ message: "Internal Server Error" });
                } else {
                    console.log(result);
                    res.status(200).json({ message: "Successfully Added Email." });
                }
            }
        );
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
