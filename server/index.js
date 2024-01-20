require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./routes/router");
const cors = require("cors")

app.use(cors())
app.use(express.json());
app.use(router)

app.listen(process.env.PORT, () => {
    console.log(`server start at port no :${process.env.PORT}`)
})