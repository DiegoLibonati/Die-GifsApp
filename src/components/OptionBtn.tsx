import { OptionBtnProps } from "../entities/entities";

export const OptionBtn = ({
  description,
  onClick,
}: OptionBtnProps): JSX.Element => {
  return <button onClick={onClick}>{description}</button>;
};
