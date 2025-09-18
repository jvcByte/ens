import { createFileRoute } from "@tanstack/react-router";
import { RecentActivity } from "@/components/recent-activity";
import { HeroHeader } from "@/components/layout/header";

export const Route = createFileRoute("/activities")({
  component: Activities,
});

function Activities() {
  return (
    <div className="h-screen overflow-hidden relative">
      <HeroHeader />
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="text-start rounded-3xl border bg-card p-6 min-h-[50vh] max-w-7xl mx-auto shadow-lg bg-gradient-to-tl from-muted to-background">
          <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
          <RecentActivity limit={5} />
        </div>
      </div>
    </div>
  );
}
