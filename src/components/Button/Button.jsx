import React, { forwardRef } from 'react';
import css from './Button.module.css';

export const Button = forwardRef(({ onClick }, ref) => {
  return (
    <div ref={ref} className={css.btnWrapper}>
      <button className={css.button} onClick={onClick}>
        Load more
      </button>
    </div>
  );
});
