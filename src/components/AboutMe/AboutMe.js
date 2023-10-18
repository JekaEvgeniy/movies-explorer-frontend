import React from "react";
import Photo from '../../images/about-me/photo.webp';


function AboutMe(){
  return (
    <section className="about-me">
      <h2 className="section-header">Студент</h2>

      <div className="about-me-columns">
        <div className="about-me-columns__content">
          <h3 className="about-me__header">Евгений</h3>
          <h4 className="about-me__subtitle">Фронтенд-разработчик, 35 лет</h4>
          <p className="about-me__text">Живу в Ярославле, закончил факультет "прикладная информатика в экономике" МЭСИ. Люблю горы, треккинг, хайкинг, сплавляться на байдарках. Также люблю слушать музыку, от которой аж мурашки по коже.</p>

          <div className="about-me__actions">
            <a href="https://github.com/JekaEvgeniy" target="_blank" className="about-me__action">Github</a>
          </div>
        </div>
        <aside className="about-me-columns__aside">
          <picture className="about-me__photo">
            <img className="about-me__photo-img image-cover" src={Photo} loading="lazy" alt="" />
          </picture>
        </aside>
      </div>
    </section>
  );
}

export default AboutMe;
