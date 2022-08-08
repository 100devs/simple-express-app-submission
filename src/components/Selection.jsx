// import Coffee from "../Coffee";
// import { useState } from "react";
import { Link } from "react-router-dom";
// import Nav from "./Nav";

const Selection = () => {
  // const [maker, newMaker] = useState('coffee');
  return (
    <section>
      {/* <Nav /> */}
      <Link
        to="/coffee"
        onClick={() => sessionStorage.setItem("selection", "v60")}
      >
        v60
      </Link>
      <Link
        to="/coffee"
        onClick={() => sessionStorage.setItem("selection", "aeropress")}
      >
        Aeropress
      </Link>
      <Link
        to="/coffee"
        onClick={() => sessionStorage.setItem("selection", "chemex")}
      >
        Chemex
      </Link>
      <Link
        to="/coffee"
        onClick={() => sessionStorage.setItem("selection", "french press")}
      >
        French Press
      </Link>
      <Link
        to="/coffee"
        onClick={() => sessionStorage.setItem("selection", "moka pot")}
      >
        Moka Pot
      </Link>
      <Link
        to="/coffee"
        onClick={() => sessionStorage.setItem("selection", "clever dripper")}
      >
        Clever Dripper
      </Link>
      <Link
        to="/coffee"
        onClick={() => sessionStorage.setItem("selection", "vacuum pot")}
      >
        Vacuum Pot
      </Link>
    </section>
  );
};

export default Selection;
