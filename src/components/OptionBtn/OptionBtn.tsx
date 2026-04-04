import { OptionBtnProps } from "@/types/props";

import "@/components/OptionBtn/OptionBtn.css";

const OptionBtn = ({ description, onClick }: OptionBtnProps) => {
  return (
    <button onClick={onClick} aria-label={description} className="option-btn">
      {description}
    </button>
  );
};

export default OptionBtn;
