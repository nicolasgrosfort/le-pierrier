import { Maximize2, Wifi, ZoomIn, ZoomOut } from "lucide-react";

export const Toolbar = () => {
  return (
    <div className="z-10 flex justify-between p-4">
      <div />
      <div className="p-2 px-4 border flex gap-8 bg-background">
        <Wifi size={18} />
        <div className="flex gap-4">
          <ZoomIn size={18} />
          <span className="text-sm">100%</span>
          <ZoomOut size={18} />
        </div>
        <Maximize2 size={18} />
      </div>
      <div className="">
        <span className="font-medium text-sm p-2 flex items-center gap-6">
          <span className="flex gap-2 items-center">
            Départ <span className="h-3 w-3 rounded-lg border bg-start" />
          </span>
          <span className="flex gap-2 items-center">
            Mains <span className="h-3 w-3 rounded-lg border bg-hands" />
          </span>
          <span className="flex gap-2 items-center">
            Pieds <span className="h-3 w-3 rounded-lg border bg-feet" />
          </span>
        </span>
      </div>
    </div>
  );
};
