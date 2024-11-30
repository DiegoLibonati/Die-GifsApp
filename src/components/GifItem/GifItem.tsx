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
    <div className="gifs_container_category_list_card">
      <div className="gifs_container_category_list_card_img">
        <img data-testid="test-title" src={url} alt={title}></img>
        <div className="gifs_container_category_list_card_img_description">
          <div className="gifs_container_category_list_card_img_description_header">
            <img src={avatar} alt={avatarName}></img>
            <h3>{avatarName}</h3>
          </div>
          <p>{avatarDescription}</p>
          <a
            href={avatarProfileUrl}
            target="_blank"
            aria-label="go to user profile"
          >
            Go to user Profile
          </a>
          <a href={gifDownload} target="_blank" aria-label="download gif">
            Download
          </a>
        </div>
      </div>

      <div className="gifs_container_category_list_card_div">
        <p onClick={() => handleOpenModalImage(url, title)}>{title}</p>
      </div>
    </div>
  );
};
