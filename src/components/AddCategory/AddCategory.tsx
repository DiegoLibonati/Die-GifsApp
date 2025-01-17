import React, { useState } from "react";

import { InputForm } from "../InputForm/InputForm";

interface AddCategoryProps {
  numberOfGifs: number;
  setNumberOfGifs: (howManyGif: number) => void;
  addCategory: (value: string) => void;
}

export const AddCategory = ({
  numberOfGifs,
  addCategory,
  setNumberOfGifs,
}: AddCategoryProps): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ): void => {
    setInputValue(e.target.value);
  };

  const handleInputNumberChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ): void => {
    setNumberOfGifs(Number(e.target.value));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e): void => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    setNumberOfGifs(numberOfGifs);
    addCategory(inputValue.trim());
    setInputValue("");
  };

  return (
    <article className="form__wrapper__gifs">
      <form onSubmit={handleSubmit}>
        <InputForm
          type="text"
          placeholder="Buscar Gif"
          value={inputValue}
          className="form__wrapper__gifs__input__text"
          onChange={handleInputChange}
        ></InputForm>

        <InputForm
          type="number"
          placeholder=""
          value={numberOfGifs}
          className="form__wrapper__gifs__input__number"
          onChange={handleInputNumberChange}
        ></InputForm>

        <button
          type="submit"
          className="form__wrapper__gifs__btn"
          aria-label="search gifs"
        >
          GO
        </button>
      </form>
    </article>
  );
};
