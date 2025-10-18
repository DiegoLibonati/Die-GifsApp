import { InputFormProps } from "@src/entities/props";

export const InputForm = ({
  type,
  placeholder,
  value,
  className,
  onChange,
}: InputFormProps): JSX.Element => {
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
