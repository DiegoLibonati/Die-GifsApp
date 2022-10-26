import React from "react";

export const InputsForm = ({ type, placeholder, value, eventfunc, classN }) => {
  return (
    <input
      className={classN}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={eventfunc}
    ></input>
  );
};
