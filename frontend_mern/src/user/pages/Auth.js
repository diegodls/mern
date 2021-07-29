import React, { useState, useContext } from "react";
import "./Auth.css";

import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

import {
  MESSAGE_VALIDEMAIL,
  MESSAGE_VALIDPASSWORD,
  MESSAGE_LOGIN,
  MESSAGE_SIGNUP,
} from "../../shared/util/messages";

import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";

import { AuthContext } from "../../shared/context/auth-context";

const Auth = (props) => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/users/login`,
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    } else {
      try {
        const formData = new FormData();

        formData.append("email", formState.inputs.email.value);
        formData.append("name", formState.inputs.name.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);

        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/users/signup`,
          "POST",
          formData
        );

        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    }
  };

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        { ...formState.inputs, name: undefined, image: undefined },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
          image: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode(!isLoginMode);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className='authentication'>
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Necessário</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element='input'
              id='name'
              type='text'
              label='Nome'
              validators={[VALIDATOR_REQUIRE()]}
              errorText='Digite um nome valido.'
              onInput={inputHandler}
            />
          )}
          {!isLoginMode && (
            <ImageUpload
              id='image'
              center
              onInput={inputHandler}
              errorText='Selecione uma imagem!'
            />
          )}
          <Input
            element='input'
            id='email'
            type='email'
            label='E-Mail'
            validators={[VALIDATOR_EMAIL()]}
            errorText={MESSAGE_VALIDEMAIL}
            onInput={inputHandler}
          />
          <Input
            element='input'
            id='password'
            type='password'
            label='Senha'
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText={MESSAGE_VALIDPASSWORD}
            onInput={inputHandler}
          />
          <Button type='submit' disabled={!formState.isValid}>
            {isLoginMode ? MESSAGE_LOGIN : MESSAGE_SIGNUP}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          {isLoginMode ? MESSAGE_SIGNUP : MESSAGE_LOGIN}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
