'use client';

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Database,
  Edit3,
  Globe,
  Layers,
  Mic,
  Music,
  Palette,
  Settings,
  Sliders,
  Sparkles,
  Wand2,
  Zap,
} from "lucide-react";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { AmbientBg } from "@/components/shared/ambient-bg";

export default function FeaturesPage() {
  const router = useRouter();

  const mainFeatures = [
    {
      icon: Music,
      title: "Text-to-Music Generation",
      description:
        "Transform simple text descriptions into complete musical compositions. Our advanced AI understands musical theory, emotion, and genre to create exactly what you envision.",
      details: [
        "Natural language processing",
        "Multiple genre support",
        "Emotion detection",
        "Context-aware generation",
      ],
      color: "#3D7CFF",
      demo: 'Type: "Upbeat pop song with catchy chorus" → Get: Full production',
    },
    {
      icon: Mic,
      title: "Voice Libraries",
      description:
        "Access hundreds of AI-generated voices with different styles, accents, and characteristics. From smooth jazz vocals to powerful rock voices.",
      details: ["200+ voice styles", "Male/Female options", "Multiple languages", "Custom voice training"],
      color: "#8A3DFF",
      demo: "Choose voice → Apply to lyrics → Realistic vocal performance",
    },
    {
      icon: Palette,
      title: "Genre & Style Control",
      description:
        "Create music in any genre with precise style controls. Mix and match elements from different genres for unique sounds.",
      details: ["50+ genres", "Style mixing", "Era selection", "Sub-genre precision"],
      color: "#FF3D9A",
      demo: "Select Jazz + Electronic → Get: Jazz-fusion with electronic beats",
    },
    {
      icon: Edit3,
      title: "MIDI Editing",
      description: "Full MIDI editor for fine-tuning every note. Export MIDI files for use in your favorite DAW.",
      details: ["Piano roll editor", "Quantization tools", "MIDI export", "DAW integration"],
      color: "#3D7CFF",
      demo: "Edit notes → Adjust timing → Perfect arrangement",
    },
    {
      icon: Sparkles,
      title: "Lyric Generation",
      description:
        "AI-powered lyric writing that matches your theme, style, and mood. Get suggestions, rhymes, and complete verses.",
      details: ["Theme-based writing", "Rhyme suggestions", "Multiple languages", "Style adaptation"],
      color: "#8A3DFF",
      demo: "Input theme → Get structured lyrics → Edit to perfection",
    },
    {
      icon: Layers,
      title: "Multi-Track Studio",
      description:
        "Professional multi-track editing with individual control over vocals, instruments, and effects.",
      details: ["Unlimited tracks", "Individual mixing", "Effects library", "Master controls"],
      color: "#FF3D9A",
      demo: "Separate tracks → Mix individually → Professional result",
    },
  ];

  const advancedFeatures = [
    { icon: Sliders, title: "Advanced Controls", description: "Tempo, key, time signature, mood, energy levels" },
    { icon: Wand2, title: "Smart Suggestions", description: "AI-powered recommendations for improvement" },
    { icon: Globe, title: "Multi-Language", description: "Create music and lyrics in 40+ languages" },
    { icon: Zap, title: "Real-Time Processing", description: "Generate and preview instantly" },
    { icon: Database, title: "Cloud Storage", description: "Unlimited cloud storage for your projects" },
    { icon: Settings, title: "API Access", description: "Integrate MuseAI into your workflow" },
  ];

  const comparisonData = [
    { feature: "Text-to-Music", museai: true, competitors: "Limited" },
    { feature: "Voice Quality", museai: "Professional", competitors: "Good" },
    { feature: "Genre Options", museai: "50+", competitors: "10-20" },
    { feature: "MIDI Export", museai: true, competitors: false },
    { feature: "Multi-Track", museai: true, competitors: false },
    { feature: "API Access", museai: true, competitors: "Enterprise Only" },
    { feature: "Commercial Rights", museai: true, competitors: "Limited" },
  ];

  return (
    <div className="relative z-10 min-h-screen bg-transparent">
      <Navigation />
      <main className="pt-16">
        <section className="relative section-spacing overflow-hidden">
          <AmbientBg variant="1" opacity={0.6} blur="blur-[80px]" />
          <AmbientBg variant="2" opacity={0.35} blur="blur-[90px]" />
          <div className="relative z-10 content-container container-padding">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mx-auto max-w-[900px] text-center"
            >
              <h1 className="mb-6">Powerful Features for Music Creation</h1>
              <p className="mb-12 text-xl text-text-muted">
                Professional-grade tools powered by cutting-edge AI technology. Everything you need to create, edit, and
                perfect your music.
              </p>
              <Button size="lg" onClick={() => router.push("/studio")}>
                Try It Now
              </Button>
            </motion.div>
          </div>
        </section>

        <section className="section-spacing">
          <div className="content-container container-padding">
            <div className="mx-auto flex max-w-[1200px] flex-col gap-24">
              {mainFeatures.map((feature, index) => {
                const Icon = feature.icon;
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className={`grid items-center gap-12 md:grid-cols-2 ${isEven ? "" : "md:grid-flow-dense"}`}
                  >
                    <div className={isEven ? "" : "md:col-start-2"}>
                      <div
                        className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl"
                        style={{ background: `linear-gradient(135deg, ${feature.color}, ${feature.color}40)` }}
                      >
                        <Icon className="h-8 w-8" />
                      </div>
                      <h2 className="mb-4">{feature.title}</h2>
                      <p className="mb-6 text-text-muted">{feature.description}</p>
                      <ul className="mb-6 space-y-3">
                        {feature.details.map((detail) => (
                          <li key={detail} className="flex items-center gap-3 text-text-muted">
                            <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: feature.color }} />
                            {detail}
                          </li>
                        ))}
                      </ul>
                      <div
                        className="glass-surface border-l-4 rounded-xl p-4"
                        style={{ borderColor: feature.color }}
                      >
                        <p className="text-sm text-text-muted">
                          <span className="font-medium text-white">Example:</span> {feature.demo}
                        </p>
                      </div>
                    </div>
                    <div className={isEven ? "" : "md:col-start-1 md:row-start-1"}>
                      <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl glass-surface p-8">
                        <div
                          className="absolute inset-0 opacity-20"
                          style={{ background: `radial-gradient(circle at center, ${feature.color} 0%, transparent 70%)` }}
                        />
                        <Icon className="relative z-10 h-32 w-32" style={{ color: feature.color }} />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-spacing">
          <div className="content-container container-padding">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 text-center"
            >
              <h2 className="mb-4">Advanced Capabilities</h2>
              <p className="text-text-muted">Even more tools to enhance your workflow</p>
            </motion.div>

            <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {advancedFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group glass-surface rounded-2xl p-6 transition-all hover:border-white/20"
                  >
                    <Icon className="mb-4 h-10 w-10 text-accent-blue transition-colors group-hover:text-accent-purple" />
                    <h4 className="mb-2">{feature.title}</h4>
                    <p className="text-sm text-text-muted">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-spacing">
          <div className="content-container container-padding">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 text-center"
            >
              <h2 className="mb-4">How We Compare</h2>
              <p className="text-text-muted">See why MuseAI stands out from the competition</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-[900px] overflow-hidden rounded-2xl glass-surface"
            >
              <table className="w-full">
                <thead className="bg-surface-primary">
                  <tr>
                    <th className="px-6 py-4 text-left">Feature</th>
                    <th className="px-6 py-4 text-center">MuseAI</th>
                    <th className="px-6 py-4 text-center">Others</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row) => (
                    <tr key={row.feature} className="border-t border-white/5">
                      <td className="px-6 py-4">{row.feature}</td>
                      <td className="px-6 py-4 text-center">
                        {typeof row.museai === "boolean" ? (
                          <span className={row.museai ? "text-green-400" : "text-red-400"}>
                            {row.museai ? "✓" : "✗"}
                          </span>
                        ) : (
                          <span className="font-medium text-accent-blue">{row.museai}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center text-text-muted">
                        {typeof row.competitors === "boolean" ? (
                          <span className={row.competitors ? "text-green-400" : "text-red-400"}>
                            {row.competitors ? "✓" : "✗"}
                          </span>
                        ) : (
                          row.competitors
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </section>

        <section className="section-spacing">
          <div className="content-container container-padding">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative mx-auto max-w-[1000px] overflow-hidden rounded-3xl p-12 text-center glass-surface"
            >
              <div className="gradient-orb pointer-events-none absolute right-0 top-0 h-96 w-96" />
              <div className="relative z-10">
                <h2 className="mb-4">Ready to Create?</h2>
                <p className="mx-auto mb-8 max-w-[600px] text-text-muted">
                  Start making professional music today with all these powerful features
                </p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Button size="lg" onClick={() => router.push("/studio")}>
                    Start Creating
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => router.push("/pricing")}>
                    View Pricing
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

