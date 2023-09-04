const db = require("../../backend/index.js")

module.exports = async (req, res) => {
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
