const express = require("express");
const dotenv = require("dotenv");

const placesRoutes = require("./routes/places-routes");

dotenv.config();

const app = express();

app.use("/api/places", placesRoutes);

app.listen(process.env.PORT);
