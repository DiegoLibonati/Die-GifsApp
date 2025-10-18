import { BsFacebook, BsInstagram, BsGithub } from "react-icons/bs";

import "@src/components/Header/Header.css";

export const Header = (): JSX.Element => {
  return (
    <header className="header-wrapper">
      <nav className="header-wrapper__nav">
        <ul className="header-wrapper__nav-list">
          <li className="header-wrapper__nav-list-item">
            <a
              href="#"
              aria-label="go to facebook"
              target="_blank"
              className="header-wrapper__link"
            >
              <BsFacebook className="header-wrapper__link-icon" />
            </a>
          </li>
          <li className="header-wrapper__nav-list-item">
            <a
              href="#"
              aria-label="go to instagram"
              target="_blank"
              className="header-wrapper__link"
            >
              <BsInstagram className="header-wrapper__link-icon" />
            </a>
          </li>
          <li className="header-wrapper__nav-list-item">
            <a
              href="#"
              aria-label="go to github"
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
