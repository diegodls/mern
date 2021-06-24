const express = require("express");

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Pirâmide de Quéfren",
    description:
      "Maior piramide do Egito, construída com ajuda de extraterrestres",
    location: {
      lat: "29.976218537816557",
      lng: "31.131069626363487",
      address: "Al Haram, Giza Governorate, Egito",
      creator: "u1",
    },
  },
];

router.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });
  res.json({ place });
});

module.exports = router;