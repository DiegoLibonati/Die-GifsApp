import { BsFacebook, BsInstagram, BsGithub } from "react-icons/bs";

export const Header = (): JSX.Element => {
  return (
    <header className="header_container">
      <nav className="header_container_nav">
        <ul className="header_container_nav_ul">
          <li className="header_container_nav_ul_li">
            <a href="#" aria-label="go to facebook" target="_blank">
              <BsFacebook className="icon" />
            </a>
          </li>
          <li className="header_container_nav_ul_li">
            <a href="#" aria-label="go to instagram" target="_blank">
              <BsInstagram className="icon" />
            </a>
          </li>
          <li className="header_container_nav_ul_li">
            <a href="#" aria-label="go to github" target="_blank">
              <BsGithub className="icon" />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
