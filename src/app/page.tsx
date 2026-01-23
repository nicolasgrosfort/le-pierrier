import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Map } from "@/components/map";
import { Sidebar } from "@/components/sidebar";

export default function Page() {
  return (
    <div className="grid grid-cols-[100%_100%] md:grid-cols-[minmax(0,1fr)_auto] h-full overflow-x-scroll overflow-y-hidden md:overflow-visible snap-x snap-mandatory">
      <main className="grid grid-rows-[auto_1fr_auto] h-full overflow-visible snap-start">
        <Header />
        <Map />
        <Footer />
      </main>
      <Sidebar />
    </div>
  );
}
