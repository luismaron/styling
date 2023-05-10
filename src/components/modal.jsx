import PropTypes from 'prop-types';
import { useEffect, useRef } from "react";

function Modal(props) {
  const modalRef = useRef(null);

  useEffect(() => {
    const { current: el } = modalRef;
    if (props.open) {
      el.showModal();
    }
    else {
      el.close()
    }
  }, [props.open]);

  return (
    <dialog ref={modalRef} onClose={() => { props.onClose() }}
      onClick={() => { props.onClose() }}>
      {props.children}
    </dialog>)

}
Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default Modal;