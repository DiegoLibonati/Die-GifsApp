import { useFetchGif } from "../hooks/useFetchGif";
import { GifItem } from "./GifItem";
import { BsTrash } from "react-icons/bs";
import { removeCategory } from "../helpers/removeCategory";

export const GifGrid = ({
  category,
  categories,
  resetCategory,
  howManyGifs,
  setShowImg,
}) => {
  /* const [counter, setCounter] = useState(0); // Pequeño contador */

  const { imagenes, loading } = useFetchGif(category, howManyGifs);

  const handleDeleteCategory = (e) => {
    removeCategory(e, categories, resetCategory);
  };

  return (
    <>
      <article className="gifs_container_category" id={category}>
        <div className="gifs_container_category_title">
          <h3>{category}</h3>
          <button onClick={(e) => handleDeleteCategory(e)}>
            <BsTrash id="trash" pointerEvents="none"></BsTrash>
          </button>
        </div>
        {/*         <h2>{counter}</h2>
        <button onClick={()=>setCounter(counter+1)}>+1</button> */}

        <ol className="gifs_container_category_list">
          {/**/}
          {loading ? (
            <div className="spinner"></div>
          ) : (
            imagenes.map((imagen) => (
              <GifItem
                key={imagen.id}
                {...imagen}
                setShowImg={setShowImg}
              ></GifItem>
            ))
          )}
        </ol>
      </article>
    </>
  );
};
