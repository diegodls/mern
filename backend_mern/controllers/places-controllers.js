const { uuid } = require("uuidv4");
const HttpError = require("../models/http-error");

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

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });

  if (!place) {
    throw new HttpError(
      "Não foi possível encontrar um lugar com o ID informado.",
      404
    );
  }
  res.json({ place });
};

const getPlaceByUser = (req, res, next) => {
  const userId = req.params.uid;

  const place = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });

  if (!place) {
    return next(
      new HttpError(
        "Não foi possível encontrar um lugar com o ID de usuário informado.",
        404
      )
    );
  }

  res.json({ place });
};

const createPlaces = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;

  const createdPlace = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(createdPlace);

  res.status(200).json({ place: createdPlace });
};

const updatePlace = (req, res, next) => {
  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);

  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;

  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
  res.status(200).json({ message: "Deletado com sucesso" });
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUser = getPlaceByUser;
exports.createPlaces = createPlaces;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
