const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; //Authorization: 'Bearer TOKEN'

    if (!token) {
      throw new Error("Erro ao autenticar", 401);
    }

    const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

    req.userData = { userId: decodedToken.userId };

    next();
  } catch (err) {
    const error = new HttpError("Erro ao autenticar", 403);
    return next(error);
  }
};
