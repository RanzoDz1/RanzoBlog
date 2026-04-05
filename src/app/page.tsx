import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import ClientShell from "@/components/ClientShell";
import dynamic from "next/dynamic";

const Platforms = dynamic(() => import("@/components/sections/Platforms"));

export default function Home() {
  return (
    <>
      <ClientShell />
      <Navbar />
      <Hero />
      <div className="divider" />
      <Platforms />
      <Footer />
    </>
  );
}
