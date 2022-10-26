import { useState } from "react";
import { getRandomGifsCategory } from "../helpers/getRandomGifsCategory";
import { removeAllCategories } from "../helpers/removeAllCategories";
import { AddCategory, GifGrid } from "./index";
import { OptionBtn } from "./OptionBtn";

export const Main = () => {
  const [categories, setCategories] = useState([]);
  const [howManyGif, setHowManyGif] = useState(10);
  const [showImg, setShowImg] = useState([]);

  const handleAddCategory = (value) => {
    if (!categories.includes(value)) {
      setCategories([value, ...categories]); // Agregar un dato al array del use state
    }
  };

  const handleRemoveAllCategories = () => {
    removeAllCategories(categories, setCategories);
  };

  const handleSurprise = async () => {
    const getTitle = await getRandomGifsCategory();

    const newTitle = getTitle.split("by");

    if (newTitle == "" || newTitle == " ") {
      handleSurprise();
    } else {
      setHowManyGif(howManyGif);
      handleAddCategory(newTitle[0].trim());
    }
  };

  const showImage = (e) => {
    const showImgContainer = e.target.parentNode.parentNode;

    setShowImg([]);

    showImgContainer.style.display = "None";
    document.body.style.overflow = "auto";
  };
  return (
    <>
      <main>
        <section className="gifs_container">
          {/*Titulo*/}
          <h1>Die GifApp</h1>

          {/*Input*/}
          <AddCategory
            addCategory={handleAddCategory}
            howManyGif={setHowManyGif}
            howManyGifs={howManyGif}
          ></AddCategory>
          {/* Listado de Gif */}

          <article className="gifs_container_options">
            <OptionBtn
              func={handleRemoveAllCategories}
              description="REMOVE ALL CATEGORIES"
            ></OptionBtn>

            <OptionBtn func={handleSurprise} description="SURPRISE"></OptionBtn>
          </article>

          {categories.map((category) => (
            <GifGrid
              key={category}
              category={category}
              categories={categories}
              resetCategory={setCategories}
              howManyGifs={howManyGif}
              setShowImg={setShowImg}
            />
          ))}
        </section>

        <section className="showGif_container">
          <article className="showGif_container_center">
            <img src={showImg[0]} alt={showImg[1]}></img>
            <button onClick={(e) => showImage(e)}>X</button>
          </article>
        </section>
      </main>

      <p data-testid="testcategories">{categories.length}</p>
    </>
  );
};
