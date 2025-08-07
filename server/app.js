const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
})


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})