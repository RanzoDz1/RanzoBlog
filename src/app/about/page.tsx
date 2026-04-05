import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import About from "@/components/sections/About";
import ClientShell from "@/components/ClientShell";
import PageHero from "@/components/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | RanzoDz",
  description: "The story of Abdullah Khalfi — from Algeria to 50+ countries across 6 continents.",
};

export default function AboutPage() {
  return (
    <>
      <ClientShell />
      <Navbar />
      <PageHero page="about" eyebrow="My Story" title="From Algeria," titleAccent="to everywhere." />
      <About />
      <Footer />
    </>
  );
}
