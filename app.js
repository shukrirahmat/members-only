const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("HELLO");
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
})
