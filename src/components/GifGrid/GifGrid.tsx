import { useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";

import { MinGif } from "@src/entities/app";
import { GifGridProps } from "@src/entities/props";

import { GifItem } from "@src/components/GifItem/GifItem";

import { getGifs } from "@src/api/get/getGifs";

import "@src/components/GifGrid/GifGrid.css";

export const GifGrid = ({
  category,
  numberOfGifs,
  handleDeleteCategory,
  handleOpenModalImage,
}: GifGridProps): JSX.Element => {
  const [gifs, setGifs] = useState<MinGif[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleGetGifs = async () => {
    setLoading(true);

    const response = await getGifs(category, numberOfGifs);
    const gifs = response.data;

    const newGifs = gifs.map((img) => ({
      id: img.id,
      title: img.title,
      url: img.images.original.url,
      avatar: img.user?.avatar_url ?? "It is a private profile",
      avatarName: img.user?.username ?? "It is a private profile",
      avatarDescription: img.user?.description ?? "It is a private profile",
      avatarProfileUrl: img.user?.profile_url ?? "#",
      gifDownload: img.images.original.webp,
    }));

    setGifs(newGifs);

    setLoading(false);
  };

  useEffect(() => {
    handleGetGifs();
  }, []);

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
          gifs.map((gif) => (
            <GifItem
              key={gif.id}
              title={gif.title}
              avatar={gif.avatar}
              avatarName={gif.avatarName}
              avatarDescription={gif.avatarDescription}
              avatarProfileUrl={gif.avatarProfileUrl}
              gifDownload={gif.gifDownload}
              url={gif.url}
              handleOpenModalImage={handleOpenModalImage}
            ></GifItem>
          ))
        )}
      </ol>
    </article>
  );
};
