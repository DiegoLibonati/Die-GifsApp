import { useRef } from "react";
import { GifItemProps } from "../entities/entities";

export const GifItem = ({
  title,
  url,
  avatar,
  avatarName,
  avatarDescription,
  avatarProfileUrl,
  gifDownload,
  setShowImg,
}: GifItemProps): JSX.Element => {
  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleShowImg: React.MouseEventHandler<HTMLParagraphElement> = (e) => {
    const imgSrc = imageRef.current!.src;
    const imgAlt = imageRef.current!.alt;
    setShowImg([imgSrc, imgAlt]);

    const target = e.target as HTMLElement;

    const containerShowImg = target?.parentNode?.parentNode?.parentNode
      ?.parentNode?.parentNode?.parentNode?.lastChild as HTMLElement;

    containerShowImg!.style.display = "Flex";
    document.body.style.overflow = "Hidden";
  };

  return (
    <div className="gifs_container_category_list_card">
      <div className="gifs_container_category_list_card_img">
        <img
          data-testid="test-title"
          src={url}
          alt={title}
          ref={imageRef}
        ></img>
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
