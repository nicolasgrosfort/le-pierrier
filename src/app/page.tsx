import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { Toolbar } from "@/components/toolbar";
import Wall from "@/components/wall";

export default function Page() {
  return (
    <div className="grid grid-cols-[1fr_auto] h-full">
      <main className="grid grid-rows-[auto_1fr_auto] h-full">
        <Header />
        <Wall />
        <Toolbar />
      </main>
      <Sidebar />
    </div>
  );
}
