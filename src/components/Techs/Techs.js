import React from "react";

function Techs(){
  return (
    <section className="technologies">
      <h2 className="section-header">Технологии</h2>
      <h3 className="technologies__header">7 технологий</h3>
      <p className="technologies__desc">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>

      <ul className="technologies-stack">
        <li className="technologies-stack__item">HTML</li>
        <li className="technologies-stack__item">CSS</li>
        <li className="technologies-stack__item">JS</li>
        <li className="technologies-stack__item">React</li>
        <li className="technologies-stack__item">Git</li>
        <li className="technologies-stack__item">Express.js</li>
        <li className="technologies-stack__item">mongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;
