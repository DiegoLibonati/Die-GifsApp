import PropTypes from "prop-types";

export const GifItem = ({
  title,
  url,
  avatar,
  avatarName,
  avatarDescription,
  avatarProfileUrl,
  gifDownload,
  setShowImg,
}) => {
  const handleShowImg = (e) => {
    const imgSrc = e.target.parentNode.parentNode.children[0].children[0].src;
    const imgAlt = e.target.parentNode.parentNode.children[0].children[0].alt;
    setShowImg([imgSrc, imgAlt]);

    const containerShowImg =
      e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
        .lastChild;

    containerShowImg.style.display = "Flex";
    document.body.style.overflow = "Hidden";
  };

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
          <a href={avatarProfileUrl} target="_blank">
            Go to user Profile
          </a>
          <a href={gifDownload} target="_blank">
            Download
          </a>
        </div>
      </div>

      <div className="gifs_container_category_list_card_div">
        <p onClick={(e) => handleShowImg(e)}>{title}</p>
      </div>
    </div>
  );
};

GifItem.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  avatarName: PropTypes.string.isRequired,
  avatarDescription: PropTypes.string.isRequired,
  avatarProfileUrl: PropTypes.string.isRequired,
  gifDownload: PropTypes.string.isRequired,
  setShowImg: PropTypes.func.isRequired,
};

/* GifItem.defaultProps = {
  // Si no se le pasa nada a las props, se cargan esto de forma default
  title: "Gif",
  url: "...",
}; */
