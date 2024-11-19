import { MainNav } from "@/app/components/Navbar/MainNav";
import Hero from "./components/hero/Hero";
import { ThemeProvider } from "./theme-provider";
import Features from "./components/features/Features";
import MusicPosts from "./components/Posts/Posts";
// import TestimonialsSection from "./components/testmonials/Testmonials";

export default function Home() {
  return (
    <ThemeProvider>
      <main className="container bg-background">
        <div className="mx-auto fixed top-0 left-0 w-full z-50 transition-all duration-300 ">
          <MainNav/>
        </div>
        <section className="pt-24 pb-12 md:pt-32 md:pb-20">
          <Hero/>
          <Features/>
          <MusicPosts/>
          {/* <TestimonialsSection/> */}
        </section>
      </main>
    </ThemeProvider>
  );
}