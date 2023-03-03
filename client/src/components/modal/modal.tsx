import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect, useRef } from 'react';

const Modal = ({ onClose = () => {}, children }) => {

  return (
    <div className="modal_overlay">
      <div className="modal_container">
        <div className='modal_header'>
          <div>
            <h2 className='modal_header_text'>YOUR CART</h2>
          </div>
          <div className='modal_header_close_button' onClick={onClose}>
            <i className='fa fa-times'><FontAwesomeIcon icon={faTimes}></FontAwesomeIcon></i>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
};

export default Modal;