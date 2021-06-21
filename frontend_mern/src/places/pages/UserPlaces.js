import React from "react";
import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList";



const UsersPlaces = (props) => {
  const DUMMY_PLACES = [
    {
      id: "p1",
      title: "Las Vegas",
      description: "AAAAAAAAAAAAAAAAAAAAA",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/3/3c/Vue_de_nuit_de_la_Place_Stanislas_%C3%A0_Nancy.jpg",
      address: "asçhdjkashkjdhasljhdasjkhdkljas",
      location: {
        lat: 36.13485205871512,
        lng: -115.14431928958926,
      },
      creator: "u1",
    },
    {
      id: "p2",
      title: "México",
      description: "Guadalajara",
      imageUrl:
        "https://media-cdn.tripadvisor.com/media/photo-s/10/65/41/12/place-stanislas.jpg",
      address: "asçhdjkashkjdhasljhdasjkhdkljas",
      location: {
        lat: 20.660044596493982,
        lng: -103.34850003359931,
      },
      creator: "u2",
    },
  ];

  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);
  return <PlaceList items={loadedPlaces} />;
};

export default UsersPlaces;
