type InputFieldProps = {
  type: "text" | "date" | "password";
  value?: string;
  onChange?: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  label: string;
  autofocus?: boolean;
  placeholder?: string;
};

export const InputField = ({
  type,
  label,
  value,
  onChange,
  onKeyDown,
  autofocus,
  placeholder,
}: InputFieldProps) => {
  return (
    <label className="flex flex-col gap-1 text-xs font-medium">
      {label}
      <input
        type={type}
        value={value}
        autoFocus={autofocus}
        onChange={(e) => onChange && onChange(e.target.value)}
        onKeyDown={onKeyDown}
        className="border p-2 text-sm font-medium outline-0"
        placeholder={placeholder}
      />
    </label>
  );
};
