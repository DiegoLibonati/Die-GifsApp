import { BsTrash } from "react-icons/bs";

import { GifItem } from "@src/components/GifItem/GifItem";

import { useFetchGif } from "@src/hooks/useFetchGif";

import "@src/components/GifGrid/GifGrid.css";

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
    <article className="gif-grid" id={category}>
      <div className="gif-grid__header">
        <h3 className="gif-grid__title">{category}</h3>
        <button
          onClick={() => handleDeleteCategory(category)}
          aria-label={`delete ${category}`}
          className="gif-grid__btn-delete"
        >
          <BsTrash
            id="trash"
            pointerEvents="none"
            className="gif-grid__btn-delete-icon"
          ></BsTrash>
        </button>
      </div>

      <ol className="gif-grid__gifs">
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
