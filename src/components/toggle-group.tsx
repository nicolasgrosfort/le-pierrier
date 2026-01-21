export type ToggleOption<T extends string> = {
  value: T;
  label: string;
  Icon?: React.ComponentType<{ size?: number }>;
};

type ToggleGroupProps<T extends string> = {
  value: T;
  label?: string;
  options: ToggleOption<T>[];
  onChange: (value: T) => void;
  className?: string;
};

export function ToggleGroup<T extends string>({
  value,
  options,
  onChange,
  label,
}: ToggleGroupProps<T>) {
  return (
    <div className="flex flex-col gap-2">
      {label && <span className="text-xs">{label}</span>}
      <div
        className={`grid  gap-1`}
        style={{
          gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))`,
        }}
      >
        {options.map(({ value: option, label, Icon }) => {
          const isActive = value === option;

          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              aria-pressed={isActive}
              className={`
              border flex flex-col items-center gap-1 p-2
              cursor-pointer transition-colors
              ${isActive ? "bg-foreground text-background" : ""}
            `}
            >
              <span className="text-xs">{label}</span>
              {Icon && <Icon size={14} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
