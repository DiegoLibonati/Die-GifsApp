import { InputsFormProps } from "../entities/entities";

export const InputsForm = ({
  type,
  placeholder,
  value,
  className,
  onChange,
}: InputsFormProps): JSX.Element => {
  return (
    <input
      className={className}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    ></input>
  );
};
