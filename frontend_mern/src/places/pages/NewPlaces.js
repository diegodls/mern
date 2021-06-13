import React, { useCallback, useReducer } from "react";
import "./NewPlaces.css";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

const NewPlaces = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

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
        errorText='Digite um titulo valido.'
        onInput={inputHandler}
      />
      <Input
        id='description'
        element='textarea'
        label='Descrição'
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        errorText='Digite uma descrição valida (minimo 5 caracteres).'
        onInput={inputHandler}
      />
      <Input
        id='address'
        element='input'
        label='Endereço'
        validators={[VALIDATOR_REQUIRE()]}
        errorText='Digite um endereço valida.'
        onInput={inputHandler}
      />
      <Button type='submit' disabled={!formState.isValid}>
        ADICIONAR LUGAR
      </Button>
    </form>
  );
};
export default NewPlaces;
