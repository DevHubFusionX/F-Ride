import React from "react";
import { Metadata } from "next";
import { 
  VisionHero, 
  TheParadox, 
  Principles, 
  FutureNetwork, 
  BuildWithUs 
} from "@/components/company/EditorialContent";
import Footer from "@/components/home/Footer";

export const metadata: Metadata = {
  title: "Company | FrankRide — The Smart Mobility Network",
  description: "Our mission to optimize the journey of every vehicle on the road and build a seamless transport layer for our cities.",
};

export default function CompanyPage() {
  return (
    <main className="min-h-screen bg-white">
      <VisionHero />
      <TheParadox />
      <Principles />
      <FutureNetwork />
      <BuildWithUs />
      <Footer />
    </main>
  );
}
