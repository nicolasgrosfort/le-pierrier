import { Grade } from "@/components/grade";
import { GRADES } from "@/lib/config";
import { Grade as GradeType } from "@/lib/types";

type GradeSelectorProps =
  | {
      mode?: "single";
      value: GradeType;
      label?: string;
      onChange: (grade: GradeType) => void;
    }
  | {
      mode: "multiple";
      value: GradeType[];
      label?: string;

      onChange: (grades: GradeType[]) => void;
    };

export function GradeSelector(props: GradeSelectorProps) {
  const isMultiple = props.mode === "multiple";

  const isSelected = (grade: GradeType) =>
    isMultiple ? props.value.includes(grade) : props.value === grade;

  const toggle = (grade: GradeType) => {
    if (isMultiple) {
      props.onChange(
        props.value.includes(grade)
          ? props.value.filter((g) => g !== grade)
          : [...props.value, grade],
      );
    } else {
      props.onChange(grade);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {props.label && <span className="text-xs">{props.label}</span>}
      <div className="grid grid-cols-8 gap-1">
        {GRADES.map((grade) => {
          const selected = isSelected(grade);

          return (
            <button
              key={grade}
              type="button"
              onClick={() => toggle(grade)}
              aria-pressed={selected}
              className="cursor-pointer"
            >
              <Grade inverse={!selected} grade={grade} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
