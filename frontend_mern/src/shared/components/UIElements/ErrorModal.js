import React from 'react';

import Modal from './Modal';
import Button from '../FormElements/Button';

const ErrorModal = props => {
  return (
    <Modal
      onCancel={props.onCLear}
      header="Atenção!"
      show={!!props.error}
      footer={<Button onClick={props.onClear}>Ok</Button>}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
