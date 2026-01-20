import { Maximize2, Wifi, ZoomIn, ZoomOut } from "lucide-react";

export const Toolbar = () => {
  return (
    <div className="z-10 flex justify-center p-4">
      <div className="p-2 px-4 border flex gap-8 bg-background">
        <Wifi size={20} />
        <div className="flex gap-4">
          <ZoomIn size={20} />
          <span>100%</span>
          <ZoomOut size={20} />
        </div>
        <Maximize2 size={20} />
      </div>
    </div>
  );
};
