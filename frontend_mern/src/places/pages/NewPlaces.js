import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import "./PlaceForm.css";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

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

import { AuthContext } from "../../shared/context/auth-context";

import { useHttpClient } from "../../shared/hooks/http-hook";

const NewPlaces = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

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

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_API_URL}/places`,
        "POST",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          creator: auth.userId,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      history.push("/");
    } catch (err) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <form className='place-form' onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
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
    </>
  );
};
export default NewPlaces;
