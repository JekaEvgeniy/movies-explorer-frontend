import React from "react";
import { Link } from "react-router-dom";

function Page404() {
  // const navigate = useNavigate();

  return (
    <section className="page404">
      <div className="page404__container">
        <div className="page404__content">
          <h1 className="page404__header">404</h1>
          <p className="page404__caption">Страница не найдена</p>
        </div>

        {/* <Link onClick={() => navigate("/", { replace: true })}  className="page404__link" type="button">Назад</Link> */}
        <Link to='/' className="page404__link" type="button">Назад</Link>

      </div>
    </section>
  );
}

export default Page404;
