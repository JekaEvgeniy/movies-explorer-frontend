import React from 'react'

const Preloader = ({...props}) => {
  let className = 'preloader';
  if (props.currentPosition){
    className += ' preloader_position_fixed';
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
