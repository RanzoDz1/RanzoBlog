import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import ClientShell from "@/components/ClientShell";

const Platforms  = dynamic(() => import("@/components/sections/Platforms"),  { ssr: false });
const About      = dynamic(() => import("@/components/sections/About"),      { ssr: false });
const Travels    = dynamic(() => import("@/components/sections/Travels"),    { ssr: false });
const Stories    = dynamic(() => import("@/components/sections/Stories"),    { ssr: false });
const TravelApps = dynamic(() => import("@/components/sections/TravelApps"), { ssr: false });
const Collab     = dynamic(() => import("@/components/sections/Collab"),     { ssr: false });

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
