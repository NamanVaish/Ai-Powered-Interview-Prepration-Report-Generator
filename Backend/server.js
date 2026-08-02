require("dotenv").config();
const app = require("./src/app.js");
const connectDB = require("./src/config/database.js");

connectDB();

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log("server is running on port 3000");
});
