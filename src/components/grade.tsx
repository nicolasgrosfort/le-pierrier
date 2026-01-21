import { DEFAULT_GRADE } from "@/lib/config";
import { Grade as GradeType } from "@/lib/types";
import { blobFromSeed } from "@/lib/utils";

type GradeProps = {
  grade?: GradeType;
  inverse?: boolean;
};

export const Grade = ({
  grade = DEFAULT_GRADE,
  inverse = false,
}: GradeProps) => {
  return (
    <div
      className={`w-8 h-8 ${inverse ? "bg-background text-foreground" : "bg-foreground text-background"} flex items-center justify-center border`}
      style={{ borderRadius: blobFromSeed(grade) }}
    >
      <span className="font-medium text-sm">{grade}</span>
    </div>
  );
};
