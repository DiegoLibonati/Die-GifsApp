import React from "react";
import { BsFacebook, BsInstagram, BsGithub } from "react-icons/bs";

export const Header = () => {
  return (
    <>
      <header className="header_container">
        <img
          src="https://raw.githubusercontent.com/DiegoLibonati/Projects-JS/main/Games/breakout/templates/DL.png"
          alt="Logo Diego Libonati"
        ></img>

        <nav className="header_container_nav">
          <ul className="header_container_nav_ul">
            <li className="header_container_nav_ul_li">
              <a href="#">
                <BsFacebook className="icon" />
              </a>
            </li>
            <li className="header_container_nav_ul_li">
              <a href="#">
                <BsInstagram className="icon" />
              </a>
            </li>
            <li className="header_container_nav_ul_li">
              <a href="#">
                <BsGithub className="icon" />
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
