interface OptionBtnProps {
  description: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const OptionBtn = ({
  description,
  onClick,
}: OptionBtnProps): JSX.Element => {
  return (
    <button onClick={onClick} aria-label={`${description} button`}>
      {description}
    </button>
  );
};
