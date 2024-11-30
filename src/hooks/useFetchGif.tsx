import { useEffect, useState } from "react";

import { MinGif } from "../entities/entities";

import { getGifs } from "../api/getGifs";

type UseFetchGif = {
  images: MinGif[];
  loading: boolean;
};

export const useFetchGif = (
  category: string,
  numberOfGifs: number
): UseFetchGif => {
  const [images, setImages] = useState<MinGif[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getImages = async () => {
    const newImages = await getGifs(category, numberOfGifs);

    setImages(newImages);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getImages();
  }, []);

  return {
    images: images,
    loading: loading,
  };
};
