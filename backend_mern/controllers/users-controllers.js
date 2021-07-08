const { v4: uuidV4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const User = require("../models/user");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "teste1",
    email: "teste1@teste1.com",
    password: "teste1",
  },
];

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

  const createdUser = new User({
    id: uuidV4(),
    name,
    email,
    password,
    image: "https://live.staticflickr.com/5748/30564172665_345907b287_b.jpg",
    places: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    error = new HttpError(
      "Não foi possível criar o Usuário, tente novamente mais tarde",
      500
    );

    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

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

  if (!existingUser || existingUser.password !== password) {
    error = new HttpError(
      "Não foi possível efetuar o login, credenciais invalidas!",
      401
    );
    return next(error);
  }
  res.json({ message: "Logado com sucesso" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
