const db = require("../../backend/index.js")

module.exports = async (req, res) => {
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
