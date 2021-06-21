import React from "react";
import "./PlaceForm.css";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";

import { useForm } from "../../shared/hooks/form-hook";

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

import {
  MESSAGE_MINDESCRIPTION,
  MESSAGE_VALIDTITLE,
  MESSAGE_VALIDADDRESS,
} from "../../shared/util/messages";

const NewPlaces = () => {
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const placeSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    //enviar para o servidor
  };

  return (
    <form className='place-form' onSubmit={placeSubmitHandler}>
      <Input
        id='title'
        element='input'
        type='text'
        label='Titulo'
        validators={[VALIDATOR_REQUIRE()]}
        errorText={MESSAGE_VALIDTITLE}
        onInput={inputHandler}
      />
      <Input
        id='description'
        element='textarea'
        label='Descrição'
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        errorText={MESSAGE_MINDESCRIPTION}
        onInput={inputHandler}
      />
      <Input
        id='address'
        element='input'
        label='Endereço'
        validators={[VALIDATOR_REQUIRE()]}
        errorText={MESSAGE_VALIDADDRESS}
        onInput={inputHandler}
      />
      <Button type='submit' disabled={!formState.isValid}>
        ADICIONAR LUGAR
      </Button>
    </form>
  );
};
export default NewPlaces;
