import type { Gif } from "@/types/app";

import envs from "@/constants/envs";

const API_KEY = envs.VITE_API_KEY;

const gifService = {
  getAll: async (
    category: string,
    numberOfGifs: number
  ): Promise<{
    data: Gif[];
    meta: {
      status: number;
      msg: string;
      response_id: string;
    };
    pagination: {
      total_count: number;
      count: number;
      offset: number;
    };
  }> => {
    const response = await fetch(
      `/v1/gifs/search?api_key=${API_KEY}&q=${category}&limit=${numberOfGifs}&offset=0&rating=r&lang=en`
    );

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    return (await response.json()) as {
      data: Gif[];
      meta: {
        status: number;
        msg: string;
        response_id: string;
      };
      pagination: {
        total_count: number;
        count: number;
        offset: number;
      };
    };
  },
  getRandomGifsByCategory: async (): Promise<{
    data: Gif;
    meta: {
      status: number;
      msg: string;
      response_id: string;
    };
  }> => {
    const response = await fetch(`/v1/gifs/random?api_key=${API_KEY}&tag=&rating=g`);

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    return (await response.json()) as {
      data: Gif;
      meta: {
        status: number;
        msg: string;
        response_id: string;
      };
    };
  },
};

export default gifService;
