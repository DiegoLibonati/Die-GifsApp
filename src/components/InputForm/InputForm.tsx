import { InputFormProps } from "@/types/props";

const InputForm = ({ type, placeholder, value, className, onChange }: InputFormProps) => {
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
