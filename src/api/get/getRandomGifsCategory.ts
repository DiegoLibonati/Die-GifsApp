import { GetRandomGifsCategoryResponse } from "@src/entities/responses";

import envs from "@src/constants/envs";

const API_KEY = envs.VITE_API_KEY;

export const getRandomGifsCategory =
  async (): Promise<GetRandomGifsCategoryResponse> => {
    try {
      const url = `/v1/gifs/random?api_key=${API_KEY}&tag=&rating=g`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Error fetching random gifs category.");
      }

      const data: GetRandomGifsCategoryResponse = await response.json();

      return data;
    } catch (e) {
      throw new Error(`Error fetching random gifs category: ${e}.`);
    }
  };
