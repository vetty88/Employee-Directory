import React from "react";
import "./style.css";

function Hero(props) {
  return (
    <div className="hero text-center" style={{ backgroundportrait: `url(${props.backgroundportrait})` }}>
      {props.children}
    </div>
  );
}

export default Hero;
