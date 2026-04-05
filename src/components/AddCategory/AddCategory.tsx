import React, { useState } from "react";

import type { JSX } from "react";
import type { AddCategoryProps } from "@/types/props";

import InputForm from "@/components/InputForm/InputForm";

import "@/components/AddCategory/AddCategory.css";

const AddCategory = ({
  numberOfGifs,
  addCategory,
  setNumberOfGifs,
}: AddCategoryProps): JSX.Element => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
    setInputValue(e.target.value);
  };

  const handleInputNumberChange: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
    setNumberOfGifs(Number(e.target.value));
  };

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (e): void => {
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
          aria-label="Search GIFs by category"
        >
          GO
        </button>
      </form>
    </article>
  );
};

export default AddCategory;
