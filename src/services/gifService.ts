import type { Gif } from "@/types/app";
import type { ResponseMetaData } from "@/types/responses";

import envs from "@/constants/envs";

const API_KEY = envs.VITE_API_KEY;

const gifService = {
  getAll: async (category: string, numberOfGifs: number): Promise<ResponseMetaData<Gif[]>> => {
    const response = await fetch(
      `/v1/gifs/search?api_key=${API_KEY}&q=${category}&limit=${numberOfGifs}&offset=0&rating=r&lang=en`
    );

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    return (await response.json()) as ResponseMetaData<Gif[]>;
  },
  getRandomGifsByCategory: async (): Promise<ResponseMetaData<Gif>> => {
    const response = await fetch(`/v1/gifs/random?api_key=${API_KEY}&tag=&rating=g`);

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    return (await response.json()) as ResponseMetaData<Gif>;
  },
};

export default gifService;
