import React from "react";

function Progressbar(){
  return (
    <div className="progress-bar">
      <div className="progress-bar__line progress-bar__line_bg_green">1 неделя</div>
      <div className="progress-bar__line progress-bar__line_bg_silver">4 недели</div>
      <div className="progress-bar__caption">Back-end</div>
      <div className="progress-bar__caption">Front-end</div>
    </div>
  );
}

export default Progressbar;
