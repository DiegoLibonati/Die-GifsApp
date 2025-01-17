import { useState, useRef } from "react";

import { OptionBtn } from "../OptionBtn/OptionBtn";
import { AddCategory } from "../AddCategory/AddCategory";
import { GifGrid } from "../GifGrid/GifGrid";

import { getRandomGifsCategory } from "../../api/getRandomGifsCategory";

export const Main = (): JSX.Element => {
  const [gifState, setGifState] = useState<{
    categories: string[];
    howManyGif: number;
  }>({
    categories: [],
    howManyGif: 10,
  });
  const [showImg, setShowImg] = useState<{ src: string; alt: string }>({
    src: "",
    alt: "",
  });

  const containerImage = useRef<HTMLElement | null>(null);

  const handleAddCategory = (value: string): void => {
    if (gifState.categories.includes(value)) return;
    setGifState((state) => ({
      ...state,
      categories: [...state.categories, value],
    }));
  };

  const handleChangeCountGifs = (howManyGif: number): void => {
    setGifState((state) => ({ ...state, howManyGif: howManyGif }));
  };

  const handleRemoveAllCategories = (): void => {
    setGifState((state) => ({ ...state, categories: [] }));
  };

  const handleSurprise = async (): Promise<void> => {
    const getTitle = await getRandomGifsCategory();

    const newTitle = getTitle.split("by")[0];

    if (!newTitle.trim()) return handleSurprise();

    handleAddCategory(newTitle.trim());
  };

  const handleDeleteCategory = (category: string): void => {
    const newCategoryList = gifState.categories.filter(
      (cat) => cat !== category
    );

    setGifState((state) => ({ ...state, categories: newCategoryList }));
  };

  const handleOpenModalImage = (src: string, alt: string): void => {
    setShowImg({ src: src, alt: alt });
  };

  const handleCloseModalImage: React.MouseEventHandler<
    HTMLButtonElement
  > = (): void => {
    setShowImg({
      src: "",
      alt: "",
    });
  };

  return (
    <main className="main">
      <section className="gifs__wrapper">
        {/*Titulo*/}
        <h1>Die GifApp</h1>

        {/*Input*/}
        <AddCategory
          numberOfGifs={gifState.howManyGif}
          addCategory={handleAddCategory}
          setNumberOfGifs={handleChangeCountGifs}
        ></AddCategory>
        {/* Listado de Gif */}

        <article className="gifs__options">
          <OptionBtn
            description="REMOVE ALL CATEGORIES"
            onClick={handleRemoveAllCategories}
          ></OptionBtn>

          <OptionBtn
            description="SURPRISE"
            onClick={handleSurprise}
          ></OptionBtn>
        </article>

        {gifState.categories.map((category) => (
          <GifGrid
            key={category}
            category={category}
            numberOfGifs={gifState.howManyGif}
            handleDeleteCategory={handleDeleteCategory}
            handleOpenModalImage={handleOpenModalImage}
          />
        ))}
      </section>

      {showImg.src && showImg.alt && (
        <section className="gif__modal" ref={containerImage}>
          <article className="gif__modal__wrapper">
            <img src={showImg.src} alt={showImg.alt}></img>
            <button onClick={handleCloseModalImage} aria-label="close modal">
              X
            </button>
          </article>
        </section>
      )}
    </main>
  );
};
