import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Collab from "@/components/sections/Collab";
import ClientShell from "@/components/ClientShell";
import PageHero from "@/components/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work With Me | RanzoDz",
  description: "Partner with RanzoDz for authentic travel content that resonates.",
};

export default function CollabPage() {
  return (
    <>
      <ClientShell />
      <Navbar />
      <PageHero page="collab" eyebrow="Work Together" title="Let's Create" titleAccent="Something Great." />
      <Collab />
      <Footer />
    </>
  );
}
