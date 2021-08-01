import React, { useState, useContext } from "react";

import "./PlaceItem.css";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import { AuthContext } from "../../shared/context/auth-context";

import { useHttpClient } from "../../shared/hooks/http-hook";

const PlaceItem = (props) => {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [showMap, setShowMap] = useState(false);

  const [showConfirmModal, setShowConformModal] = useState(false);

  const openMapHandler = () => {
    setShowMap(!showMap);
  };

  const showDeleteWarningHandler = () => {
    setShowConformModal(!showConfirmModal);
  };

  const confirmDeleteHandler = async () => {
    setShowConformModal(false);
    try {
      await sendRequest(
        `${process.env.REACT_APP_API_URL}/places/${props.id}`,
        "DELETE",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      props.onDelete(props.id);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={openMapHandler}
        header={props.address}
        contentCLass='place-item__modal_content'
        footerClass='place-item__modal-actions'
        footer={<Button onClick={openMapHandler}>FECHAR</Button>}
      >
        <div className='map-container'>
          <Map coordinates={props.coordinates} zoom={13} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={showDeleteWarningHandler}
        header='Deseja continuar'
        footerClass='place-item__modal-actions'
        footer={""}
      >
        <p>Deseja realmente deletar? Esta ação não pode ser desfeita</p>
        <React.Fragment>
          <Button inverse onClick={showDeleteWarningHandler}>
            CANCELAR
          </Button>
          <Button danger onClick={confirmDeleteHandler}>
            DELETAR
          </Button>
        </React.Fragment>
      </Modal>
      <li className='place-item'>
        <Card className='user-item__content'>
          {isLoading && <LoadingSpinner asOverlay />}
          <div className='place-item__image'>
            <img
              src={`http://localhost:5000/${props.image}`}
              alt={props.title}
            />
          </div>
          <div className='place-item__info'>
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className='place-item__actions'>
            <Button inverse onClick={openMapHandler}>
              VER NO MAPA
            </Button>
            {auth.userId === props.creatorId && (
              <Button to={`/places/${props.id}`}>EDITAR</Button>
            )}
            {auth.userId === props.creatorId && (
              <Button danger onClick={showDeleteWarningHandler}>
                DELETAR
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
