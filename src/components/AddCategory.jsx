import React, { useState } from "react";
import PropTypes from "prop-types";
import { InputsForm } from "./InputsForm";

export const AddCategory = ({ addCategory, howManyGif, howManyGifs }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputNumberChange = (e) => {
    howManyGif(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.length > 0) {
      howManyGif(howManyGifs);
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
          eventfunc={handleInputChange}
          classN="gifs_container_form_inputValue"
        ></InputsForm>

        <InputsForm
          type="number"
          placeholder=""
          value={howManyGifs}
          eventfunc={handleInputNumberChange}
          classN="gifs_container_form_inputValueNumber"
        ></InputsForm>

        <button type="submit" className="gifs_container_form_button">
          GO
        </button>
      </form>
    </article>
  );
};

AddCategory.propType = {
  addCategory: PropTypes.func.isRequired,
};
