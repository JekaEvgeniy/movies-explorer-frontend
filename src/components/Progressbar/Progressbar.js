import React from "react";

function Progressbar(){
  return (
    <div className="progressbar">
      <div className="progressbar__line progressbar__line_bg_green">1 неделя</div>
      <div className="progressbar__line progressbar__line_bg_silver">4 недели</div>
      <div className="progressbar__caption">Back-end</div>
      <div className="progressbar__caption">Front-end</div>
    </div>
  );
}

export default Progressbar;
