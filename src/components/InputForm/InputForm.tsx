import type { JSX } from "react";
import type { InputFormProps } from "@/types/props";

const InputForm = ({
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

export default InputForm;
