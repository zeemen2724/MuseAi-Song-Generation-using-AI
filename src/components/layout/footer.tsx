import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="section-spacing border-t border-white/5">
      <div className="content-container container-padding">
        <div className="mx-auto mb-12 grid max-w-[1200px] grid-cols-1 gap-12 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-accent-blue" />
              <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text font-bold text-transparent">
                MuseAI
              </span>
            </div>
            <p className="text-sm text-text-muted">
              Create professional music with AI-powered generation.
            </p>
          </div>

          <div>
            <h5 className="mb-4 font-semibold">Product</h5>
            <ul className="space-y-2 text-sm text-text-muted">
              {["Features", "Pricing", "Studio", "Explore"].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="mb-4 font-semibold">Company</h5>
            <ul className="space-y-2 text-sm text-text-muted">
              {["About", "Blog", "Careers", "Contact"].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="mb-4 font-semibold">Legal</h5>
            <ul className="space-y-2 text-sm text-text-muted">
              {["Privacy", "Terms", "Licenses", "Copyright"].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-auto max-w-[1200px] border-t border-white/5 pt-8 text-center text-sm text-text-muted">
          <p>&copy; 2025 MuseAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

