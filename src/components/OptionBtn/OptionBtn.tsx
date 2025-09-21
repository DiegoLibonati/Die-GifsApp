import "@src/components/OptionBtn/OptionBtn.css";

interface OptionBtnProps {
  description: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

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
