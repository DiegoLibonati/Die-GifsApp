import React, { useState } from "react";
import { InputsForm } from "./InputsForm";
import { AddCategoryProps } from "../entities/entities";

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
    if (inputValue.length > 0) {
      setNumberOfGifs(numberOfGifs);
      addCategory(inputValue.trim()); // Trim borra el espacio en blanco adelante y atras
      setInputValue("");
    }
    return;
  };

  return (
    <article className="gifs_container_form">
      <form onSubmit={handleSubmit}>
        <InputsForm
          type="text"
          placeholder="Buscar Gif"
          value={inputValue}
          className="gifs_container_form_inputValue"
          onChange={handleInputChange}
        ></InputsForm>

        <InputsForm
          type="number"
          placeholder=""
          value={numberOfGifs}
          className="gifs_container_form_inputValueNumber"
          onChange={handleInputNumberChange}
        ></InputsForm>

        <button type="submit" className="gifs_container_form_button">
          GO
        </button>
      </form>
    </article>
  );
};
