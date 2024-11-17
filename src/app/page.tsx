import { MainNav } from "@/app/components/Navbar/MainNav";
import Hero from "./components/hero/Hero";

export default function Home() {
  return (
    <main className="container bg-background">
      <MainNav />
      <section className="pt-24 pb-12 md:pt-32 md:pb-20">
        <Hero/>
      </section>
    </main>
  );
}