import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import ClientShell from "@/components/ClientShell";
import dynamic from "next/dynamic";

const Platforms  = dynamic(() => import("@/components/sections/Platforms"));
const About      = dynamic(() => import("@/components/sections/About"));
const Travels    = dynamic(() => import("@/components/sections/Travels"));
const Stories    = dynamic(() => import("@/components/sections/Stories"));
const TravelApps = dynamic(() => import("@/components/sections/TravelApps"));
const Collab     = dynamic(() => import("@/components/sections/Collab"));

export default function Home() {
  return (
    <>
      <ClientShell />
      <Navbar />
      <Hero />
      <div className="divider" />
      <Platforms />
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
