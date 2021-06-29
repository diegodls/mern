const express = require("express");
const dotenv = require("dotenv");

const HttpError = require("./models/http-error");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Pagina não disponível!", 400);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "Erro desconhecido!" });
});

app.listen(process.env.PORT);
