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
2. Typescript
3. CSS3

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/25`](https://www.diegolibonati.com.ar/#/project/25)

## Video

https://user-images.githubusercontent.com/99032604/199622812-e16c172a-1481-4a8d-bc93-bbfdfae5cbb1.mp4

## Documentation

### hooks/useFetchGif.tsx

In this route we will find the only CustomHook of this application, this CustomHook is `useFetchGif` allows to obtain the information of the API to be able to render it later:

```
import { useEffect, useState } from "react";
import { getGifs } from "../api/getGifs";
import { Gif, MinGif, UseFetchGif } from "../entities/entities";

export const useFetchGif = (
  category: string,
  numberOfGifs: number
): UseFetchGif => {
  const [images, setImages] = useState<MinGif[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getImages = async () => {
    const newImages = await getGifs(category, numberOfGifs);

    setImages(newImages);
    setLoading(false);
  };

  useEffect(() => {
    getImages();
  }, []);

  return {
    images,
    loading,
  };
};
```

### api/getGifs.ts

It is a function that will allow us to obtain all the gifs of the category that we pass to it as a parameter:

```
import { Gif, MinGif } from "../entities/entities";

export const getGifs = async (
  category: string,
  numberOfGifs: number
): Promise<MinGif[]> => {
  // @ts-ignore:next-line
  const API_KEY = import.meta.env.VITE_API_KEY;
  const limitGifs = numberOfGifs;
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${category}&limit=${limitGifs}&offset=0&rating=r&lang=en`;

  const request = await fetch(url);
  const { data }: { data: Gif[] } = await request.json(); // Obtenemos data unicamente de la respuesta

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

### api/getRandomGifsCategory.ts

It is a function that will allow us to obtain a category of gifs randomly:

```
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
```


### components/Main.tsx

In addition to other components in the `components` folder, we are going to highlight the `Main.tsx` component since it is one of the main ones and it also has 3 important states that we handle. The `categories` state will be an array that will contain all our categories, the `howManyGif` state with which we can modify the number of gifs that we bring with each call to the API and finally the `showImg` that will serve as a modal to show a specific gif:

```
const [categories, setCategories] = useState<string[]>([]);
const [howManyGif, setHowManyGif] = useState<number>(10);
const [showImg, setShowImg] = useState<string[]>([]);
```
