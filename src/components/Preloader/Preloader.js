import React from 'react'

const Preloader = ({ ...props }) => {
  let className = 'preloader';
  if (props.currentPosition &&  props.currentPosition === 'fullscreen') {
    className += ` preloader_position_fixed`;
  }else {
    className += ` preloader_position_absolute`;
  }
  return (
    <div className={className}>
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
  )
};

export default Preloader;
