import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Travels from "@/components/sections/Travels";
import Stories from "@/components/sections/Stories";
import TravelApps from "@/components/sections/TravelApps";
import Collab from "@/components/sections/Collab";
import ClientShell from "@/components/ClientShell";

export default function Home() {
  return (
    <>
      <ClientShell />
      <Navbar />
      <Hero />
      <div className="divider" />
      <About />
      <div className="divider" />
      <Travels />
      <div className="divider" />
      <Stories />
      <div className="divider" />
      <TravelApps />
      <div className="divider" />
      <Collab />
      <Footer />
    </>
  );
}
