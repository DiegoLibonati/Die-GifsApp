export const getRandomGifsCategory = async () => {
  const API_KEY = "kIPZq4OKN6AFRmzsALTEikjodezyTP7F";
  const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=&rating=g`;

  const resp = await fetch(url);
  const { data } = await resp.json(); // Obtenemos data unicamente de la respuesta

  const gifTitle = await data.title;

  return gifTitle;
};
