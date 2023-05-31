import React from "react";
import "./Navbar.css";
import background from "../../Helpers/App-background/background.jpg";

function Navbar() {
  return (
    <section className="nav">
      <img src={background} alt="bg" />
      <div data-aos="fade-right" data-aos-duration="1000">
        <h1>
          T&nbsp;O&nbsp;<span>D</span>&nbsp;<span>O</span>
        </h1>
      </div>
    </section>
  );
}

export default Navbar;
