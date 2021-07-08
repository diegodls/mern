const { v4: uuidV4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Place = require("../models/places");

const getCoordsForAddress = require("../util/location");

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Pirâmide de Quéfren",
    description:
      "Maior piramide do Egito, construída com ajuda de extraterrestres",
    location: {
      lat: "29.976218537816557",
      lng: "31.131069626363487",
    },
    address: "Al Haram, Giza Governorate, Egito",
    creator: "u1",
  },
];

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;

  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Não foi possível localizar o lugar pelo ID sugerido",
      500
    );
    return next(error);
  }

  if (!place) {
    const error = new HttpError(
      "Não foi possível encontrar um lugar com o ID informado.",
      404
    );
    return next(error);
  }
  res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let places;

  try {
    places = await Place.find({ creator: userId });
  } catch (err) {
    const error = new HttpError("Não foi possível encontrar o lugar!", 500);

    return next(error);
  }

  if (!places || places.length === 0) {
    return next(
      new HttpError(
        "Não foi possível encontrar um lugares com o ID de usuário informado.",
        404
      )
    );
  }

  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  });
};

const createPlaces = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Campos inválidos fornecidos, por favor corrija-os", 422)
    );
  }

  const { title, description, address, creator } = req.body;

  let coordinates;

  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image:
      "https://s1.static.brasilescola.uol.com.br/be/conteudo/images/big-ben.jpg",
    creator,
  });

  try {
    await createdPlace.save();
  } catch (err) {
    const error = new HttpError("Erro ao criar um novo lugar", 500);
    return next(error);
  }

  res.status(200).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Campos inválidos fornecidos, por favor corrija-os", 422)
    );
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  let place;

  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError("Não foi possível atualizar o Lugar,", 500);

    return next(error);
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {
    const error = new HttpError("Não foi possível atualizar o Lugar,", 500);
    return next(error);
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;

  try {
    place = await Place.findById(placeId);
  } catch (err) {
    error = new HttpError("Não foi possível deletar o Lugar solicitado", 500);
    return next(error);
  }

  try {
    await place.remove();
  } catch (err) {
    error = new HttpError("Não foi possível deletar o Lugar solicitado", 500);
    return next(error);
  }

  res.status(200).json({ message: "Deletado com sucesso" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlaces = createPlaces;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
