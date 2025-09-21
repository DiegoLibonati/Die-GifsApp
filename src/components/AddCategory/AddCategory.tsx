import React, { useState } from "react";

import { InputForm } from "@src/components/InputForm/InputForm";

import "@src/components/AddCategory/AddCategory.css";

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
    <article className="add-category-wrapper">
      <form onSubmit={handleSubmit} className="add-category-wrapper__form">
        <InputForm
          type="text"
          placeholder="Buscar Gif"
          value={inputValue}
          className="add-category-wrapper__form-input-text"
          onChange={handleInputChange}
        ></InputForm>

        <InputForm
          type="number"
          placeholder=""
          value={numberOfGifs}
          className="add-category-wrapper__form-input-number"
          onChange={handleInputNumberChange}
        ></InputForm>

        <button
          type="submit"
          className="add-category-wrapper__form-btn-go"
          aria-label="search gifs"
        >
          GO
        </button>
      </form>
    </article>
  );
};
