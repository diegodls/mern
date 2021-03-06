const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const User = require("../models/user");

const getUsers = async (req, res, next) => {
  let users;

  try {
    users = await User.find({}, "-password");
  } catch (err) {
    error = new HttpError("Não foi possível localizar os usuários!", 500);
    return next(error);
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Campos inválidos fornecidos, por favor corrija-os", 422)
    );
  }

  const { name, email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    error = new HttpError(
      "Campos inválidos fornecidos, por favor corrija-os",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError("Usuário existente, tente fazer o login!", 422);

    return next(error);
  }

  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Não foi possível criar o usuário, tente novamente mais tarde!",
      500
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    image: req.file.path,
    places: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    error = new HttpError(
      "Não foi possível criar o usuário, tente novamente mais tarde",
      500
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.JWT_PRIVATE_KEY,
      { expiresIn: "1h" }
    );
  } catch (err) {
    error = new HttpError(
      "Não foi possível criar o usuário, tente novamente mais tarde",
      500
    );
    return next(error);
  }

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token: token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    error = new HttpError(
      "Campos inválidos fornecidos, por favor corrija-os!",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    error = new HttpError(
      "Não foi possível efetuar o login, credenciais invalidas!",
      403
    );
    return next(error);
  }

  let isValidPassword = false;

  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Não foi possível logar, verifique suas credenciais e tente novamente mais tarde!",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    error = new HttpError(
      "Não foi possível efetuar o login, credenciais invalidas!",
      403
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email},
      process.env.JWT_PRIVATE_KEY,
      { expiresIn: "1h" }
    );
  } catch (err) {
    error = new HttpError(
      "Não foi possível logar, tente novamente mais tarde",
      500
    );
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
  });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
