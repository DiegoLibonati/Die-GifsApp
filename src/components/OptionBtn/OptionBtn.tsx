import { OptionBtnProps } from "@src/entities/props";

import "@src/components/OptionBtn/OptionBtn.css";

export const OptionBtn = ({
  description,
  onClick,
}: OptionBtnProps): JSX.Element => {
  return (
    <button
      onClick={onClick}
      aria-label={`${description} button`}
      className="option-btn"
    >
      {description}
    </button>
  );
};
