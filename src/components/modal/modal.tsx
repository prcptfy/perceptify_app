import React, { useEffect, KeyboardEvent, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import "./modal.css";

interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  show: boolean;
  persistant?: boolean | null;
}

const Modal: React.FC<ModalProps> = (props) => {

  const children = useRef<HTMLDivElement>(null)

  const closeModal = () => {
    console.log(children.current)
    if(props.persistant) {
      const div = children.current
      if (div && !div.classList.contains('shake')) {
        div.classList.add('shake');
        setTimeout(() => {
          div.classList.remove('shake');
        }, 500);
      }
      return;
    }
    props.onClose()
  }

  useEffect(() => {
  }, []);

  return (
    <CSSTransition
        in={props.show}
        unmountOnExit
        timeout={{ enter: 0, exit: 300 }}
      >
        <div className="modal backdrop-blur z-50" onClick={closeModal}>
          <div className="modal-content flex justify-center">
            <div ref={children} className="children flex justify-center" onClick={e => e.stopPropagation()}>
              {props.children}
            </div>
          </div>
        </div>
      </CSSTransition>
  );
};

export default Modal;
