import React from "react";

import UsersList from "../components/UsersList";
const pages = () => {
  const USERS = [
    {
      id: "u1",
      name: "Teste",
      image:
        "https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg",
      places: 3,
    },
    {
      id: "u2",
      name: "AAAAAAA",
      image:
        "https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg",
      places: 1,
    },
    {
      id: "u3",
      name: "CCCCCC",
      image:
        "https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg",
      places: 0,
    },
    {
      id: "u4",
      name: "BBBBB",
      image:
        "https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg",
        places: 300
    },
  ];

  return <UsersList items={USERS} />;
};

export default pages;
