import React, { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ image, handleCloseModal }) => {
  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    const handleKeyPress = e => {
      if (e.code === 'Escape') {
        handleCloseModal();
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleCloseModal]);

  return (
    <div className={css.overlay} onClick={handleOverlayClick}>
      <div className={css.modal}>
        <img
          className={css.modalImg}
          src={image.largeImageURL}
          alt={image.tags}
        />
      </div>
    </div>
  );
};
