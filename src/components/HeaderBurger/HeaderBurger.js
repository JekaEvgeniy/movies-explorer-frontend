import React from "react";

import Sprite from '../../images/common/sprite.svg';

function HeaderBurger(){
  return (
    <button className="header__burger" type="button" aria-label="Открыть мобильное меню">
      <svg className="image-contain" xmlns="http://www.w3.org/2000/svg">
        <use href={`${Sprite}#header-burger`}></use>
      </svg>
    </button>
  );
}

export default HeaderBurger;
