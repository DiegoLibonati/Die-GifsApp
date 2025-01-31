import "./GifItem.css";

interface GifItemProps {
  title: string;
  url: string;
  avatar: string;
  avatarName: string;
  avatarDescription: string;
  avatarProfileUrl: string;
  gifDownload: string;
  handleOpenModalImage: (src: string, alt: string) => void;
}

export const GifItem = ({
  title,
  url,
  avatar,
  avatarName,
  avatarDescription,
  avatarProfileUrl,
  gifDownload,
  handleOpenModalImage,
}: GifItemProps): JSX.Element => {
  return (
    <div className="gif-item">
      <div className="gif-item__picture">
        <img
          id="gif"
          src={url}
          alt={title}
          className="gif-item__img"
        ></img>
        <div className="gif-item__information">
          <div className="gif-item__author">
            <img
              id="avatar"
              src={avatar}
              alt={avatarName}
              className="gif-item__avatar"
            ></img>
            <h3 className="gif-item__username">
              {avatarName}
            </h3>
          </div>
          <p className="gif-item__description">
            {avatarDescription}
          </p>
          <a
            href={avatarProfileUrl}
            target="_blank"
            aria-label="go to user profile"
            className="gif-item__link"
          >
            Go to user Profile
          </a>
          <a
            href={gifDownload}
            target="_blank"
            aria-label="download gif"
            className="gif-item__link"
          >
            Download
          </a>
        </div>
      </div>

      <div className="gif-item__content">
        <p
          onClick={() => handleOpenModalImage(url, title)}
          className="gif-item__title"
        >
          {title}
        </p>
      </div>
    </div>
  );
};
