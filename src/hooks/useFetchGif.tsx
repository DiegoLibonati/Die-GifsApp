import { useEffect, useState } from "react";
import { getGifs } from "../api/getGifs";
import { Gif, MinGif, UseFetchGif } from "../entities/entities";

export const useFetchGif = (
  category: string,
  numberOfGifs: number
): UseFetchGif => {
  const [images, setImages] = useState<MinGif[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getImages = async () => {
    const newImages = await getGifs(category, numberOfGifs);

    setImages(newImages);
    setLoading(false);
  };

  useEffect(() => {
    getImages();
  }, []);

  return {
    images,
    loading,
  };
};
