import { Gif, MinGif } from "@src/entities/app";

import envs from "@src/constants/envs";

const API_KEY = envs.VITE_API_KEY;

export const getGifs = async (
  category: string,
  numberOfGifs: number
): Promise<MinGif[]> => {
  try {
    const url = `/v1/gifs/search?api_key=${API_KEY}&q=${category}&limit=${numberOfGifs}&offset=0&rating=r&lang=en`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error fetching gifs.");
    }

    const { data }: { data: Gif[] } = await response.json();

    const gifs = data.map((img) => ({
      id: img.id,
      title: img.title,
      url: img.images.original.url,
      avatar: img.user?.avatar_url ?? "It is a private profile",
      avatarName: img.user?.username ?? "It is a private profile",
      avatarDescription: img.user?.description ?? "It is a private profile",
      avatarProfileUrl: img.user?.profile_url ?? "#",
      gifDownload: img.images.original.webp,
    }));

    return gifs;
  } catch (e) {
    throw new Error(`Error fetching gifs: ${e}.`);
  }
};
