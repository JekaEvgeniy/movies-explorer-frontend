import React from "react";
import { useNavigate } from "react-router-dom";

function Page404() {
  const navigate = useNavigate();

  function handleClick() {
    navigate(-1);
  };

  return (
    <section className="page404">
      <div className="page404__container">
        <div className="page404__content">
          <h1 className="page404__header">404</h1>
          <p className="page404__caption">Страница не найдена</p>
        </div>

        <button type="button" onClick={handleClick} className="page404__link">Назад</button>

      </div>
    </section>
  );
}

export default Page404;
