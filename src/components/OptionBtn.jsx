import React from "react";

export const OptionBtn = ({ func, description }) => {
  return <button onClick={() => func()}>{description}</button>;
};
