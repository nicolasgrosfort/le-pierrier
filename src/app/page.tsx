"use client";

import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { SocketSync } from "@/components/socket-sync";
import { Toolbar } from "@/components/toolbar";
import Wall from "@/components/wall";
import { PanZoom } from "@/lib/types";
import { useRef } from "react";

export default function Page() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const panzoomRef = useRef<PanZoom | null>(null);

  return (
    <div className="grid grid-cols-[1fr_auto] h-full">
      <main className="grid grid-rows-[auto_1fr_auto] h-full overflow-visible">
        <Header />
        <Wall svgRef={svgRef} panzoomRef={panzoomRef} />
        <Toolbar panzoomRef={panzoomRef} />
      </main>
      <Sidebar />
      <SocketSync />
    </div>
  );
}
