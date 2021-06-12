import React, { useState } from "react";

import "./PlaceItem.css";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";

const PlaceItem = (props) => {
  const [showMap, setShowMap] = useState(false);

  const openMapHandler = () => {
    setShowMap(!showMap);
  };

  return (
    <React.Fragment>
      <Modal
        show={showMap}
        onCancel={openMapHandler}
        header={props.address}
        contentCLass='place-item__modal_content'
        footerClass='place-item__modal-actions'
        footer={<Button onClick={openMapHandler}>CLOSE</Button>}
      >
        <div className='map-container'>
          <Map coordinates={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <li className='place-item'>
        <Card>
          <div className='place-item__image'>
            <img src={props.image} alt={props.title} />
          </div>
          <div className='place-item__info'>
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className='place-item__actions'>
            <Button inverse onClick={openMapHandler}>
              Ver no mapa
            </Button>
            <Button to={`/places/${props.id}`}>Editar</Button>
            <Button danger>Deletar</Button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
