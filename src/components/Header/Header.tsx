import { BsFacebook, BsInstagram, BsGithub } from "react-icons/bs";

import type { JSX } from "react";

import "@/components/Header/Header.css";

const Header = (): JSX.Element => {
  return (
    <header className="header-wrapper">
      <nav className="header-wrapper__nav">
        <ul className="header-wrapper__nav-list">
          <li className="header-wrapper__nav-list-item">
            <a
              href="#"
              aria-label="Visit Facebook page"
              target="_blank"
              className="header-wrapper__link"
            >
              <BsFacebook className="header-wrapper__link-icon" />
            </a>
          </li>
          <li className="header-wrapper__nav-list-item">
            <a
              href="#"
              aria-label="Visit Instagram page"
              target="_blank"
              className="header-wrapper__link"
            >
              <BsInstagram className="header-wrapper__link-icon" />
            </a>
          </li>
          <li className="header-wrapper__nav-list-item">
            <a
              href="#"
              aria-label="Visit GitHub repository"
              target="_blank"
              className="header-wrapper__link"
            >
              <BsGithub className="header-wrapper__link-icon" />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
