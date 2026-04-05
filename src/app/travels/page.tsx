import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Travels from "@/components/sections/Travels";
import TravelApps from "@/components/sections/TravelApps";
import ClientShell from "@/components/ClientShell";
import PageHero from "@/components/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travels | RanzoDz",
  description: "50+ countries, 6 continents. Every destination, every story.",
};

export default function TravelsPage() {
  return (
    <>
      <ClientShell />
      <Navbar />
      <PageHero page="travels" eyebrow="The Journey" title="50+ Countries," titleAccent="6 Continents." />
      <Travels />
      <div className="divider" />
      <TravelApps />
      <Footer />
    </>
  );
}
