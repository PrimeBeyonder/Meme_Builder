import { MainNav } from "./components/Navbar/MainNav"
import Hero from "./components/hero/Hero"
import { ThemeProvider } from "./theme-provider"
import Features from "./components/features/Features"
import MusicPosts from "./components/Posts/Posts"
import Testimonials from "./components/testmonials/Testmonials"
import Footer from "./components/footer/Footer"

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main className="bg-background min-h-screen">
        <MainNav />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <section className="pt-24 pb-12 md:pt-32 md:pb-20">
            <Hero />
            <Features />
            <MusicPosts />
            <Testimonials />
            <Footer />
          </section>
        </div>
      </main>
    </ThemeProvider>
  )
}
