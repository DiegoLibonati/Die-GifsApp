import { GetGifsResponse } from "@src/entities/responses";

import envs from "@src/constants/envs";

const API_KEY = envs.VITE_API_KEY;

export const getGifs = async (
  category: string,
  numberOfGifs: number
): Promise<GetGifsResponse> => {
  try {
    const url = `/v1/gifs/search?api_key=${API_KEY}&q=${category}&limit=${numberOfGifs}&offset=0&rating=r&lang=en`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error fetching gifs.");
    }

    const data: GetGifsResponse = await response.json();

    return data;
  } catch (e) {
    throw new Error(`Error fetching gifs: ${e}.`);
  }
};
