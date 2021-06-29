const { v4: uuidV4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "teste1",
    email: "teste1@teste1.com",
    password: "teste1",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError(
      "Campos inválidos fornecidos, por favor corrija-os",
      422
    );
  }

  const { name, email, password } = req.body;

  const hadUser = DUMMY_USERS.find((u) => u.email === email);
  if (hadUser) {
    throw new HttpError(
      "Não foi possível criar o usuário, email já utilizado.",
      422
    );
  }

  const createdUser = {
    id: uuidV4(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);
  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      "Nenhum usuário cadastrado com este email ou senha.",
      401
    );
  }
  res.json({ message: "Logado com sucesso" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
