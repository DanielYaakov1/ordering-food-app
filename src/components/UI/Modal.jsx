import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

const BackdropOverlay = props => {
     return <div className={classes.backdrop} onClick={props.onHide}></div>;
};
const ModOverlay = props => {
     return (
          <div className={classes.modal}>
               <div className={classes.content}>{props.children}</div>
          </div>
     );
};
const portalEl = document.getElementById('overlay');

const Modal = props => {
     return (
          <Fragment>
               {ReactDOM.createPortal(<BackdropOverlay onHide={props.onHide} />, portalEl)}
               {ReactDOM.createPortal(<ModOverlay>{props.children}</ModOverlay>, portalEl)}
          </Fragment>
     );
};
export default Modal;
