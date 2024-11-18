import { MainNav } from "@/app/components/Navbar/MainNav";
import Hero from "./components/hero/Hero";
import { ThemeProvider } from "./theme-provider";

export default function Home() {
  return (
    <ThemeProvider>
      <main className="container bg-background">
        <MainNav />
        <section className="pt-24 pb-12 md:pt-32 md:pb-20">
          <Hero/>
        </section>
      </main>
    </ThemeProvider>
  );
}