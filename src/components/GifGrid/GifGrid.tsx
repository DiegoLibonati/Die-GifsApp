import { GifItem } from "../GifItem/GifItem";

import { useFetchGif } from "../../hooks/useFetchGif";

import { BsTrash } from "react-icons/bs";

interface GifGridProps {
  category: string;
  numberOfGifs: number;
  handleDeleteCategory: (category: string) => void;
  handleOpenModalImage: (src: string, alt: string) => void;
}

export const GifGrid = ({
  category,
  numberOfGifs,
  handleDeleteCategory,
  handleOpenModalImage,
}: GifGridProps): JSX.Element => {
  const { images, loading } = useFetchGif(category, numberOfGifs);

  return (
    <article className="gifs_container_category" id={category}>
      <div className="gifs_container_category_title">
        <h3>{category}</h3>
        <button
          onClick={() => handleDeleteCategory(category)}
          aria-label={`delete ${category}`}
        >
          <BsTrash id="trash" pointerEvents="none"></BsTrash>
        </button>
      </div>

      <ol className="gifs_container_category_list">
        {loading ? (
          <div className="spinner"></div>
        ) : (
          images.map((image) => (
            <GifItem
              key={image.id}
              title={image.title}
              avatar={image.avatar}
              avatarName={image.avatarName}
              avatarDescription={image.avatarDescription}
              avatarProfileUrl={image.avatarProfileUrl}
              gifDownload={image.gifDownload}
              url={image.url}
              handleOpenModalImage={handleOpenModalImage}
            ></GifItem>
          ))
        )}
      </ol>
    </article>
  );
};
