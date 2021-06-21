import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PlaceForm.css";

import { useForm } from "../../shared/hooks/form-hook";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";

import {
  MESSAGE_MINDESCRIPTION,
  MESSAGE_VALIDTITLE,
} from "../../shared/util/messages";

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

const UpdatePlace = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  const placeId = useParams().placeId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);
  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true,
          },
          description: {
            value: identifiedPlace.description,
            isValid: true,
          },
        },
        true
      );
    }

    setIsLoading(false);
  }, [identifiedPlace, setFormData]);

  const placeUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedPlace) {
    return (
      <div className='center'>
        <Card>
          <h2>Não foi possível encontrar o lugar!</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='center'>
        <Card>
          <h2>Carregando...</h2>
        </Card>
      </div>
    );
  }

  return (
    <form className='place-form' onSubmit={placeUpdateSubmitHandler}>
      <Input
        id='title'
        element='input'
        type='text'
        label='Titulo'
        validators={[VALIDATOR_REQUIRE()]}
        errorText={MESSAGE_VALIDTITLE}
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id='description'
        element='textarea'
        label='Descrição'
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText={MESSAGE_MINDESCRIPTION}
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type='submit' disabled={!formState.isValid}>
        Atualizar Lugar
      </Button>
    </form>
  );
};

export default UpdatePlace;
