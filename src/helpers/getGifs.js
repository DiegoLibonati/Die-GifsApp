export const getGifs = async (category, howManyGifs) => {
  const API_KEY = "kIPZq4OKN6AFRmzsALTEikjodezyTP7F";
  const limitGifs = howManyGifs;
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${category}&limit=${limitGifs}&offset=0&rating=r&lang=en`;

  const resp = await fetch(url);
  const { data } = await resp.json(); // Obtenemos data unicamente de la respuesta

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
