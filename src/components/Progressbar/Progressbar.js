import React from "react";

function Progressbar(){
  return (
    <div className="progress-bar">
      <p className="progress-bar__line progress-bar__line_bg_green">1 неделя</p>
      <p className="progress-bar__line progress-bar__line_bg_silver">4 недели</p>
      <p className="progress-bar__caption">Back-end</p>
      <p className="progress-bar__caption">Front-end</p>
    </div>
  );
}

export default Progressbar;
