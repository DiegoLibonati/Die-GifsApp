import { useFetchGif } from "../hooks/useFetchGif";
import { GifItem } from "./GifItem";
import { BsTrash } from "react-icons/bs";
import { GifGridProps } from "../entities/entities";

export const GifGrid = ({
  category,
  categories,
  numberOfGifs,
  resetCategory,
  setShowImg,
}: GifGridProps): JSX.Element => {
  const { images, loading } = useFetchGif(category, numberOfGifs);

  const handleDeleteCategory: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    const newCategoryList = categories.filter((cat) => cat !== category);

    return resetCategory(newCategoryList);
  };

  return (
    <article className="gifs_container_category" id={category}>
      <div className="gifs_container_category_title">
        <h3>{category}</h3>
        <button onClick={(e) => handleDeleteCategory(e)}>
          <BsTrash id="trash" pointerEvents="none"></BsTrash>
        </button>
      </div>

      <ol className="gifs_container_category_list">
        {loading ? (
          <div className="spinner"></div>
        ) : (
          images.map((image) => (
            <GifItem
              key={image.id}
              {...image}
              setShowImg={setShowImg}
            ></GifItem>
          ))
        )}
      </ol>
    </article>
  );
};
