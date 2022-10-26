import React, { useEffect, useState } from "react";
import { getGifs } from "../helpers/getGifs";

export const useFetchGif = (category, howManyGifs) => {
  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(true);

  const getImages = async () => {
    const newImages = await getGifs(category, howManyGifs);
    setImagenes(newImages);
    setLoading(false);
  };

  useEffect(() => {
    getImages();
  }, []); // ejecutara getgifs. Si el [[ ] queda vacio, se carga una vez sola. Si pasamos [counter] -> counter se va a renderizar y modificara su estado por ende llamara otra vez esa funcion

  return {
    imagenes,
    loading,
  };
};
