import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { Toolbar } from "@/components/toolbar";
import Wall from "@/components/wall";

export default function Page() {
  return (
    <div className="grid grid-cols-[100%_100%] lg:grid-cols-[1fr_auto] h-full overflow-x-scroll overflow-y-hidden lg:overflow-visible snap-x snap-mandatory">
      <main className="grid grid-rows-[auto_1fr_auto] h-full overflow-visible snap-start">
        <Header />
        <Wall />
        <Toolbar />
      </main>
      <Sidebar />
    </div>
  );
}
