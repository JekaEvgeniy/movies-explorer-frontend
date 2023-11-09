import React from "react";
import Sprite from '../../images/common/sprite.svg';

function HeaderBurger({ setIsMenuOpened, isPageIndex }){
  return (
    <button
      // className="header__burger"
      className={`header__burger ${isPageIndex ? 'header__burger_color_white': ''} `}

      onClick={() => setIsMenuOpened(true)} type="button" aria-label="Открыть мобильное меню">
      <svg aria-hidden="true" className="image-contain" xmlns="http://www.w3.org/2000/svg">
        <use href={`${Sprite}#header-burger`}></use>
      </svg>
    </button>
  );
}

export default HeaderBurger;
