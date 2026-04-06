import { useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";

import type { JSX } from "react";
import type { MinGif } from "@/types/app";
import type { GifGridProps } from "@/types/props";

import GifItem from "@/components/GifItem/GifItem";

import gifService from "@/services/gifService";

import "@/components/GifGrid/GifGrid.css";

const GifGrid = ({
  category,
  numberOfGifs,
  handleDeleteCategory,
  handleOpenModalImage,
}: GifGridProps): JSX.Element => {
  const [gifs, setGifs] = useState<MinGif[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGetGifs = async (): Promise<void> => {
    setLoading(true);

    const response = await gifService.getAll(category, numberOfGifs);
    const gifs = response.data;

    const newGifs = gifs.map((img) => ({
      id: img.id,
      title: img.title,
      url: img.images.original.url,
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      avatar: img.user?.avatar_url ?? "It is a private profile",
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      avatarName: img.user?.username ?? "It is a private profile",
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      avatarDescription: img.user?.description ?? "It is a private profile",
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      avatarProfileUrl: img.user?.profile_url ?? "#",
      gifDownload: img.images.original.webp,
    }));

    setGifs(newGifs);

    setLoading(false);
  };

  useEffect(() => {
    void handleGetGifs();
  }, []);

  return (
    <article className="gif-grid" id={category}>
      <div className="gif-grid__header">
        <h3 className="gif-grid__title">{category}</h3>
        <button
          onClick={() => {
            handleDeleteCategory(category);
          }}
          aria-label={`Delete "${category}" category`}
          className="gif-grid__btn-delete"
        >
          <BsTrash id="trash" pointerEvents="none" className="gif-grid__btn-delete-icon"></BsTrash>
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

export default GifGrid;
