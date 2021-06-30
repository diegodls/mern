const axios = require("axios");
const HttpError = require("../models/http-error");

async function getCoordsForAddress(address) {
  const response = await axios.get(
    `https://nominatim.openstreetmap.org/search?format=json&limit=3&q=${encodeURIComponent(
      address
    )}`
  );

  const data = response.data;

  if (!data || data.length <= 0) {
    const error = new HttpError(
      "Não foi possível encontrar a localização com o endereço solicitado.",
      422
    );

    throw error;
  }

  const { lat, lon } = data[0];

  return { lat, lng: lon };
  //DUMMY
  //return {lat: 40.7484474, lng: -73.9871516}

  //Foi necessário utilizar o nominatim devido ao leaflet não possuir um meio próprio de busca de endereços. :´(
  //E também devido ao curso utilizar o google, que requer pagamento. =P
}

module.exports = getCoordsForAddress;
