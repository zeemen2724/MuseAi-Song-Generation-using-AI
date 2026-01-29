import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import StudioContent from "./studio-content";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { AmbientBg } from "@/components/shared/ambient-bg";

export default async function StudioPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");

  return (
    <div className="relative z-10 min-h-screen bg-transparent overflow-hidden">
      <Navigation />
      <AmbientBg variant="1" opacity={0.45} blur="blur-[100px]" />
      <AmbientBg variant="2" opacity={0.3} blur="blur-[110px]" />
      <main className="pt-16">
        <div className="content-container container-padding py-8 relative z-10">
          <StudioContent />
        </div>
      </main>
      <Footer />
    </div>
  );
}

