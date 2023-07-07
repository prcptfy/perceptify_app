import React, { useEffect, KeyboardEvent, useRef } from "react";
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
  }, []);

  return (
    <CSSTransition
        in={props.show}
        unmountOnExit
        timeout={{ enter: 0, exit: 300 }}
        
      >
        <div className="modal backdrop-blur z-50" onClick={props.onClose}>
          <div className="modal-content flex justify-center">
            <div className="children flex justify-center" onClick={e => e.stopPropagation()}>
              {props.children}
            </div>
          </div>
        </div>
      </CSSTransition>
  );
};

export default Modal;
