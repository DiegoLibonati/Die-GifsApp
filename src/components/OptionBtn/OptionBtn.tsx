import type { JSX } from "react";
import type { OptionBtnProps } from "@/types/props";

import "@/components/OptionBtn/OptionBtn.css";

const OptionBtn = ({ description, onClick }: OptionBtnProps): JSX.Element => {
  return (
    <button onClick={onClick} aria-label={description} className="option-btn">
      {description}
    </button>
  );
};

export default OptionBtn;
