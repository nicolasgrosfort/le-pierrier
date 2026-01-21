type InputFieldProps = {
  type: "text" | "date";
  value?: string;
  onChange?: (value: string) => void;
  label: string;
  autofocus?: boolean;
  placeholder?: string;
};

export const InputField = ({
  type,
  label,
  value,
  onChange,
  autofocus,
  placeholder,
}: InputFieldProps) => {
  return (
    <label className="flex flex-col gap-1 text-xs">
      {label}
      <input
        type={type}
        value={value}
        autoFocus={autofocus}
        onChange={(e) => onChange && onChange(e.target.value)}
        className="border p-2"
        placeholder={placeholder}
      />
    </label>
  );
};
