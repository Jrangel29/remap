import React from "react"
import styled from 'styled-components'
import Broken from '../../Images/BrokenHouse.svg';
import Background from '../../Images/Background2.svg';
//import Logo from '../../Images/check.svg'
import {Modal,Button} from "react-bootstrap"




function ModalEdificioCoordenadas (props) {


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal">
        Localização do edifício
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4></h4>
        <p>
          Já existe um edifício na localização selecionada, por favor tente novamente num novo local.
        </p>
      </Modal.Body>
      <Modal.Footer>
      <span className="w-100">
          <button style={{float: 'right'}} class="botaoFotografia" onClick={props.onHide}>Confirmar</button>
        </span>
      </Modal.Footer>
    </Modal>
      );  
    
};

export default ModalEdificioCoordenadas

