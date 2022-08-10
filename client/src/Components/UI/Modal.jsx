import React from 'react';
import ReactDOM  from 'react-dom';
import classes from './Modal.module.css';

const Backdrop = (props) => {
  return (
    <div className={classes.backdrop} onClick={props.onClose}></div>
  )
}

export const ModalOverLay = (props) => {
  return(
    <div className={classes.modal}>
      <div>
        {props.children}
      </div>
    </div>
  )
}

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={props.onHideForm} />, portalElement)}
      {ReactDOM.createPortal(<ModalOverLay onClose={props.onHideForm}>{props.children}</ModalOverLay>, portalElement)}
    </React.Fragment>
  )
}

export default Modal