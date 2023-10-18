import React from "react";
import promoLogo from '../../images/promo/logo.webp';

function Promo(){
  return (
    <section className="promo">
      <img src={promoLogo} alt="Логотип" className="promo__pic" />
        <h1 className="promo__header">Учебный проект студента факультета Веб&#8209;разработки.</h1>
        <p className="promo__desc">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>

        <div className="promo__actions">
          <a href="#about-project" className="button-stroke">Узнать больше</a>
        </div>
    </section>
  )
}

export default Promo;
