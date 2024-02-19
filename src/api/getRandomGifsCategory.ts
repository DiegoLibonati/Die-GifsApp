import { Gif } from "../entities/entities";

export const getRandomGifsCategory = async (): Promise<string> => {
  // @ts-ignore:next-line
  const API_KEY = import.meta.env.VITE_API_KEY;
  const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=&rating=g`;

  const request = (await fetch(url)).json();

  const { data }: { data: Gif } = await request;

  const gifTitle = data.title;

  return gifTitle;
};
