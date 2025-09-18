import { HeroHeader } from "@/components/layout/header";
import { createFileRoute } from "@tanstack/react-router";
import HeroSection from "@/components/layout/hero-section";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="h-screen overflow-auto">
      <HeroHeader />
      <HeroSection />
    </div>
  );
}
