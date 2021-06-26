const express = require("express");
const dotenv = require("dotenv");

const placesRoutes = require("./routes/places-routes");

dotenv.config();

const app = express();

app.use("/api/places", placesRoutes);
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "Erro desconhecido!" });
});

app.listen(process.env.PORT);
