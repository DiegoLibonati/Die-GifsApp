import { Gif } from "@src/entities/entities";

import { CONFIG } from "@src/constants/config";

export const getRandomGifsCategory = async (): Promise<string> => {
  const API_KEY = CONFIG.VITE_API_KEY;
  const url = `/v1/gifs/random?api_key=${API_KEY}&tag=&rating=g`;

  const request = (await fetch(url)).json();

  const { data }: { data: Gif } = await request;

  const gifTitle = data.title;

  return gifTitle;
};
