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
    <article className="gifs_container_form">
      <form onSubmit={handleSubmit}>
        <InputForm
          type="text"
          placeholder="Buscar Gif"
          value={inputValue}
          className="gifs_container_form_inputValue"
          onChange={handleInputChange}
        ></InputForm>

        <InputForm
          type="number"
          placeholder=""
          value={numberOfGifs}
          className="gifs_container_form_inputValueNumber"
          onChange={handleInputNumberChange}
        ></InputForm>

        <button
          type="submit"
          className="gifs_container_form_button"
          aria-label="search gifs"
        >
          GO
        </button>
      </form>
    </article>
  );
};
