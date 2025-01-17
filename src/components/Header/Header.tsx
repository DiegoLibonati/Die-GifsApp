import { BsFacebook, BsInstagram, BsGithub } from "react-icons/bs";

export const Header = (): JSX.Element => {
  return (
    <header className="header">
      <nav className="header__nav">
        <ul className="header__nav__list">
          <li className="header__nav__list__item">
            <a href="#" aria-label="go to facebook" target="_blank">
              <BsFacebook className="icon" />
            </a>
          </li>
          <li className="header__nav__list__item">
            <a href="#" aria-label="go to instagram" target="_blank">
              <BsInstagram className="icon" />
            </a>
          </li>
          <li className="header__nav__list__item">
            <a href="#" aria-label="go to github" target="_blank">
              <BsGithub className="icon" />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
