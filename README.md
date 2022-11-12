# Gifs-App-Page

## Getting Started

1. Clone the repository
2. Join to the correct path of the clone
3. Install node_modules with npm install
4. Use npm start to run the app page

## Description

I made a web application that allows the user to search for gifs. The same user will be able to enter the name of a category by the input, when pressing go, it will search through an API the amount of gifs previously selected from that specific category. Of that category will appear the name and also you can delete it, there is also a button to delete all the categories and if you click on the surprise button it makes a random search of that API and it will bring a random category. If you click on a gif you will be able to see that gif in a modal.

## Technologies used

1. React JS
2. CSS3

## Galery

![Gifs-App-Page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/React/Imagenes/gifappreact-0.jpg)

![Gifs-App-Page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/React/Imagenes/gifappreact-1.jpg)

![Gifs-App-Page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/React/Imagenes/gifappreact-2.jpg)

![Gifs-App-Page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/React/Imagenes/gifappreact-3.jpg)

![Gifs-App-Page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/React/Imagenes/gifappreact-4.jpg)

## Portfolio Link

`https://diegolibonati.github.io/DiegoLibonatiWeb/#/projects?q=Gifs%20app%20page`

## Video

https://user-images.githubusercontent.com/99032604/199622812-e16c172a-1481-4a8d-bc93-bbfdfae5cbb1.mp4

## Documentation

### hooks/useFetchGif.js

In this route we will find the only CustomHook of this application, this CustomHook is `useFetchGif` allows to obtain the information of the API to be able to render it later:

```
export const useFetchGif = (category, howManyGifs) => {
  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(true);

  const getImages = async () => {
    const newImages = await getGifs(category, howManyGifs);
    setImagenes(newImages);
    setLoading(false);
  };

  useEffect(() => {
    getImages();
  }, []); // ejecutara getgifs. Si el [[ ] queda vacio, se carga una vez sola. Si pasamos [counter] -> counter se va a renderizar y modificara su estado por ende llamara otra vez esa funcion

  return {
    imagenes,
    loading,
  };
};
```

### helpers/getGifs.js

It is a function that will allow us to obtain all the gifs of the category that we pass to it as a parameter:

```
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
```

### helpers/getRandomGifsCategory.js

It is a function that will allow us to obtain a category of gifs randomly:

```
export const getRandomGifsCategory = async () => {
  const API_KEY = "kIPZq4OKN6AFRmzsALTEikjodezyTP7F";
  const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=&rating=g`;

  const resp = await fetch(url);
  const { data } = await resp.json(); // Obtenemos data unicamente de la respuesta

  const gifTitle = await data.title;

  return gifTitle;
};
```

### helpers/removeAllCategories.js

It is a function that will allow us to delete all the gifs, that is, to be able to empty the state that we pass to it as a parameter:

```
export const removeAllCategories = (categories, setCategories) => {
  categories = [];
  setCategories(categories);
  return categories;
};
```

### helpers/removeCategory.js

It is a function that will allow to remove a category from the state that we pass to it as a parameter, it will remove that specific category only:

```
export const removeCategory = (e, categories, resetCategory) => {
  const categoryName =
    e.target.parentElement.parentElement.children[0].outerText;

  for (let i = 0; i < categories.length; i++) {
    if (categoryName === categories[i]) {
      categories.splice(categories.indexOf(categoryName), 1);
    }
  }

  return resetCategory([...categories]);
};
```

### components/Main.jsx

In addition to other components in the `components` folder, we are going to highlight the `Main.jsx` component since it is one of the main ones and it also has 3 important states that we handle. The `categories` state will be an array that will contain all our categories, the `howManyGif` state with which we can modify the number of gifs that we bring with each call to the API and finally the `showImg` that will serve as a modal to show a specific gif:

```
const [categories, setCategories] = useState([]);
const [howManyGif, setHowManyGif] = useState(10);
const [showImg, setShowImg] = useState([]);
```
