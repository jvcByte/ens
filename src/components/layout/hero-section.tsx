import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { RecentActivity } from "../RecentActivity";

export default function HeroSection() {
  return (
    <>
      <main className="">
        <section className="bg-linear-to-b to-muted from-background min-h-screen flex items-center">
          <div className="relative z-10 mx-auto w-full max-w-5xl px-6 text-center">
            <div className="items-center">
              <h1 className="text-balance text-5xl font-bold md:text-6xl tracking-widest leading-[1.5]">
                Your <span className="text-[#fa0707]">Identity</span> On-Chain
              </h1>
              <p className="text-xl text-muted-foreground mt-4 mb-8 max-w-2xl mx-auto">
                Register your .eth domain and own your digital identity forever
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-3 max-w-2xl mx-auto mt-8">
                <div className="relative flex-1 w-full">
                  <Input
                    type="text"
                    className="h-12 border-zinc-400 pl-4 pr-16"
                    placeholder="yourname"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                    .eth
                  </span>
                </div>
                <Button
                  size="lg"
                  className="px-8 w-full md:w-auto text-lg h-12"
                >
                  Check Availability
                </Button>
              </div>
              <div className="text-start rounded-3xl border bg-card p-6 mt-5 shadow-lg">
                <h3 className="text-lg font-semibold mb-4">
                  Recent Activities
                </h3>
                <RecentActivity limit={5} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
