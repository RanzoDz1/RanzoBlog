import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Stories from "@/components/sections/Stories";
import ClientShell from "@/components/ClientShell";
import PageHero from "@/components/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stories | RanzoDz",
  description: "Real stories from the edges of the world. Unfiltered, unscripted.",
};

export default function StoriesPage() {
  return (
    <>
      <ClientShell />
      <Navbar />
      <PageHero page="stories" eyebrow="Stories from the Road" title="Unfiltered." titleAccent="Unscripted." subtitle="Real experiences from 50+ countries. Each one changed me forever." />
      <Stories />
      <Footer />
    </>
  );
}
