import React from "react";
import oftv_icon from "../images/oftvIcon.png";
import { Link } from "react-router-dom";

export default function Header() {
  React.useEffect(() => {
    //   Dark mode button
    function darkMode() {
      document.querySelector("#search").classList.toggle("dark-mode");
      document.querySelector("body").classList.toggle("dark-mode");
      document.querySelector("nav").classList.toggle("dark-mode");
      document.querySelector(".fade-left").classList.toggle("dark-mode");
      document.querySelector("i").classList.toggle("dark-mode");
      document
        .querySelectorAll(".fade-left-minor")
        .forEach(fade => fade.classList.toggle("dark-mode"));
      document.querySelector(".fade-right").classList.toggle("dark-mode");
      document
        .querySelectorAll(".fade-right-minor")
        .forEach(fade => fade.classList.toggle("dark-mode"));
      document
        .querySelectorAll(".swiper-slide")
        .forEach(slide => slide.classList.toggle("dark-mode"));
      document
        .querySelectorAll("button")
        .forEach(button => button.classList.toggle("dark-mode"));
      document
        .querySelectorAll("a")
        .forEach(a => a.classList.toggle("dark-mode"));
      document.querySelector("header").classList.toggle("dark-mode");
    }

    document
      .querySelector(".fa-circle-half-stroke")
      .addEventListener("click", darkMode);

    return () => {
      document
        .querySelector(".fa-circle-half-stroke")
        .removeEventListener("click", darkMode);
    };
  }, []);

  return (
    <header id="top">
      {/* <!-- Regular Header --> */}
      <nav id="pc-header" className="flex-row">
        <section>
          <ul className="flex-row">
            <li>
              <Link to="/">
                <img className="icon" src={oftv_icon} alt="OF.TV Icon" />
              </Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a href="https://of.tv/creators/">Creators</a>
            </li>
            <li>
              <a href="https://of.tv/download/">Get the app</a>
            </li>
            <li>
              <Link to="/addVideo">Submit Videos</Link>
            </li>
          </ul>
        </section>
        <section>
          <ul className="flex-row nav-actions">
            <li>
              <form
                className="flex-row"
                action="#"
                id="searchform"
                method="get"
              >
                <input
                  type="text"
                  id="search"
                  name="search"
                  placeholder="Search"
                />
                <button className="search-button">
                  <i className="fa fa-search"></i>
                </button>
              </form>
            </li>
            <li>
              <button>
                <i className="fa-solid fa-circle-half-stroke"></i>
              </button>
            </li>
          </ul>
        </section>
      </nav>

      {/* <!-- Hamburger Header For Smaller Devices --> */}
      <section className="p-menu1">
        <nav id="navbar" className="navigation" role="navigation">
          <input id="toggle1" type="checkbox" />
          <label className="hamburger1" for="toggle1">
            <div className="top"></div>
            <div className="meat"></div>
            <div className="bottom"></div>
          </label>

          <nav className="menu1">
            <a href="https://of.tv/">
              <img className="icon" src={oftv_icon} alt="OF.TV Icon" />
            </a>
            <a className="link1" href="#top">
              Home
            </a>
            <a className="link1" href="https://of.tv/creators/">
              Creators
            </a>
            <a className="link1" href="https://of.tv/download/">
              Get the app
            </a>
            <form
              className="flex-row link1"
              action="#"
              id="searchform"
              method="get"
            >
              <input
                type="text"
                id="search"
                name="search"
                placeholder="Search"
              />
              <button className="search-button">
                <i className="fa fa-search"></i>
              </button>
            </form>
          </nav>
        </nav>
      </section>
    </header>
  );
}
