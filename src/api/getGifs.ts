import { Gif, MinGif } from "@src/entities/entities";

import { CONFIG } from "@src/constants/config";

export const getGifs = async (
  category: string,
  numberOfGifs: number
): Promise<MinGif[]> => {
  const API_KEY = CONFIG.VITE_API_KEY;
  const url = `/v1/gifs/search?api_key=${API_KEY}&q=${category}&limit=${numberOfGifs}&offset=0&rating=r&lang=en`;

  const request = await fetch(url);
  const { data }: { data: Gif[] } = await request.json();

  try {
    const gifs = data.map((img) => ({
      id: img.id,
      title: img.title,
      url: img.images.original.url,
      avatar: img.user.avatar_url,
      avatarName: img.user.username,
      avatarDescription: img.user.description,
      avatarProfileUrl: img.user.profile_url,
      gifDownload: img.images.original.webp,
    }));

    return gifs;
  } catch (e) {
    const gifs = data.map((img) => ({
      id: img.id,
      title: img.title,
      url: img.images.original.url,
      avatar: "It is a private profile",
      avatarName: "It is a private profile",
      avatarDescription: "It is a private profile",
      avatarProfileUrl: "#",
      gifDownload: img.images.original.webp,
    }));

    return gifs;
  }
};
