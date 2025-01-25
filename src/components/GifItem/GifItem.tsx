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
          className="gif-item__picture-img"
        ></img>
        <div className="gif-item__picture-information">
          <div className="gif-item__picture-information-author">
            <img
              id="avatar"
              src={avatar}
              alt={avatarName}
              className="gif-item__picture-information-author-img"
            ></img>
            <h3 className="gif-item__picture-information-author-name">
              {avatarName}
            </h3>
          </div>
          <p className="gif-item__picture-information-description">
            {avatarDescription}
          </p>
          <a
            href={avatarProfileUrl}
            target="_blank"
            aria-label="go to user profile"
            className="gif-item__picture-information-link"
          >
            Go to user Profile
          </a>
          <a
            href={gifDownload}
            target="_blank"
            aria-label="download gif"
            className="gif-item__picture-information-link"
          >
            Download
          </a>
        </div>
      </div>

      <div className="gif-item__title">
        <p
          onClick={() => handleOpenModalImage(url, title)}
          className="gif-item__title-text"
        >
          {title}
        </p>
      </div>
    </div>
  );
};
