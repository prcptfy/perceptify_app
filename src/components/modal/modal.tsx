import React, { useEffect, KeyboardEvent } from "react";
import { CSSTransition } from "react-transition-group";
import "./modal.css";

interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  show: boolean;
}

const Modal: React.FC<ModalProps> = (props) => {

  useEffect(() => {
    // const handleKeyDown = (e: KeyboardEvent) => closeOnEscapeKeyDown(e);

    // document.body.addEventListener("keydown", handleKeyDown);
    // return () => {
    //   document.body.removeEventListener("keydown", handleKeyDown);
    // };
    console.log('here')
  }, [props.show]);

  return (
    <CSSTransition
        in={props.show}
        unmountOnExit
        timeout={{ enter: 0, exit: 300 }}
      >
        <div className="modal z-50" onClick={props.onClose}>
          <div className="modal-content flex justify-center" onClick={e => e.stopPropagation()}>
            {/* <div className="modal-header">
              <h4 className="modal-title">{props.title}</h4>
            </div>
            <div className="modal-body">{props.children}</div>
            <div className="modal-footer">
              <button onClick={props.onClose} className="button">
                Close
              </button>
            </div> */}
            <div className="children flex">
              {props.children}
            </div>
          </div>
        </div>
      </CSSTransition>
  );
};

export default Modal;
