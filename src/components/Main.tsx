import { useState, useRef } from "react";
import { getRandomGifsCategory } from "../api/getRandomGifsCategory";
import { AddCategory, GifGrid } from "./index";
import { OptionBtn } from "./OptionBtn";

export const Main = (): JSX.Element => {
  const [categories, setCategories] = useState<string[]>([]);
  const [howManyGif, setHowManyGif] = useState<number>(10);
  const [showImg, setShowImg] = useState<string[]>([]);

  const containerImage = useRef<HTMLElement | null>(null);

  const handleAddCategory = (value: string): void => {
    if (!categories.includes(value)) {
      setCategories([value, ...categories]); // Agregar un dato al array del use state
    }
  };

  const handleRemoveAllCategories = (): void => {
    setCategories([]);
  };

  const handleSurprise = async (): Promise<void> => {
    const getTitle = await getRandomGifsCategory();

    const newTitle = getTitle.split("by")[0];

    if (newTitle === "" || newTitle === " ") {
      handleSurprise();
      return;
    }

    setHowManyGif(howManyGif);
    handleAddCategory(newTitle[0].trim());
  };

  const showImage: React.MouseEventHandler<HTMLButtonElement> = (): void => {
    const showImgContainer = containerImage.current;

    setShowImg([]);
    showImgContainer!.style.display = "None";
    document.body.style.overflow = "auto";
  };

  return (
    <main>
      <section className="gifs_container">
        {/*Titulo*/}
        <h1>Die GifApp</h1>

        {/*Input*/}
        <AddCategory
          numberOfGifs={howManyGif}
          addCategory={handleAddCategory}
          setNumberOfGifs={setHowManyGif}
        ></AddCategory>
        {/* Listado de Gif */}

        <article className="gifs_container_options">
          <OptionBtn
            description="REMOVE ALL CATEGORIES"
            onClick={handleRemoveAllCategories}
          ></OptionBtn>

          <OptionBtn
            description="SURPRISE"
            onClick={handleSurprise}
          ></OptionBtn>
        </article>

        {categories.map((category) => (
          <GifGrid
            key={category}
            category={category}
            categories={categories}
            numberOfGifs={howManyGif}
            resetCategory={setCategories}
            setShowImg={setShowImg}
          />
        ))}
      </section>

      <section className="showGif_container" ref={containerImage}>
        <article className="showGif_container_center">
          <img src={showImg[0]} alt={showImg[1]}></img>
          <button onClick={(e) => showImage(e)}>X</button>
        </article>
      </section>
    </main>
  );
};
