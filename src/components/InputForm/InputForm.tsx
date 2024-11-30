interface InputFormProps {
  type: string;
  placeholder: string;
  value: string | number;
  className: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

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
