'use client';

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Download,
  Globe,
  Heart,
  Mic,
  Music,
  Palette,
  Pause,
  Play,
  Share2,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { AmbientBg } from "@/components/shared/ambient-bg";

export default function LandingPage() {
  const router = useRouter();
  const [demoText, setDemoText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSong, setGeneratedSong] = useState<{
    title: string;
    duration: string;
    waveform: number[];
  } | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const features = useMemo(
    () => [
      {
        icon: Music,
        title: "Text-to-Music",
        description:
          "Transform your ideas into complete songs with AI-powered generation",
        color: "#3D7CFF",
      },
      {
        icon: Mic,
        title: "Voice Libraries",
        description:
          "Choose from hundreds of realistic AI voices and vocal styles",
        color: "#8A3DFF",
      },
      {
        icon: Palette,
        title: "Genre Styles",
        description: "From jazz to EDM, create music in any genre imaginable",
        color: "#FF3D9A",
      },
      {
        icon: Zap,
        title: "Advanced Controls",
        description: "Fine-tune tempo, mood, energy, and every musical element",
        color: "#3D7CFF",
      },
      {
        icon: Sparkles,
        title: "Lyric Generation",
        description: "AI-powered lyrics that match your style and message",
        color: "#8A3DFF",
      },
      {
        icon: Music,
        title: "Multi-Track Studio",
        description: "Professional editing tools for perfect production",
        color: "#FF3D9A",
      },
    ],
    [],
  );

  const exampleSongs = useMemo(
    () => [
      {
        id: 1,
        title: "Neon Dreams",
        artist: "Alex Johnson",
        genre: "Synthwave",
        likes: 1243,
        plays: 12453,
        image: "/assets/ai/neon-dreams.svg",
      },
      {
        id: 2,
        title: "Ocean Waves",
        artist: "Sarah Chen",
        genre: "Ambient",
        likes: 892,
        plays: 8921,
        image: "/assets/ai/ocean-waves.svg",
      },
      {
        id: 3,
        title: "Urban Pulse",
        artist: "Marcus Williams",
        genre: "Hip Hop",
        likes: 2156,
        plays: 21560,
        image: "/assets/ai/urban-pulse.svg",
      },
      {
        id: 4,
        title: "Starlight Serenade",
        artist: "Emma Davis",
        genre: "Pop",
        likes: 1678,
        plays: 16780,
        image: "/assets/ai/starlight-serenade.svg",
      },
    ],
    [],
  );

  useEffect(() => {
    if (!isGenerating) return;
    const timer = setTimeout(() => {
      setGeneratedSong({
        title: `${demoText.slice(0, 30)}...`,
        duration: "3:24",
        waveform: Array.from({ length: 50 }, () => Math.random() * 100),
      });
      setIsGenerating(false);
    }, 2400);
    return () => clearTimeout(timer);
  }, [demoText, isGenerating]);

  const handleGenerate = () => {
    if (!demoText.trim()) return;
    setIsGenerating(true);
  };

  return (
    <div className="relative z-10 min-h-screen bg-transparent">
      <Navigation />

      <main className="pt-16">
        <section className="relative section-spacing overflow-hidden">
          <AmbientBg variant="1" opacity={0.65} blur="blur-[70px]" />
          <AmbientBg variant="2" opacity={0.4} blur="blur-[90px]" />
          <div className="absolute inset-0 pointer-events-none bg-grid" />

          <div className="relative z-10 content-container container-padding">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mx-auto max-w-[900px] text-center"
            >
              <h1 className="mb-6 bg-gradient-to-r from-white via-accent-blue to-accent-purple bg-clip-text text-transparent">
                Create Music From Pure Imagination
              </h1>
              <p className="mx-auto mb-12 max-w-[700px] text-xl text-text-muted">
                MuseAI turns your text ideas into full songs. Professional quality music generation powered by advanced AI.
              </p>

              <div className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" onClick={() => router.push("/studio")}>
                  Generate Music
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => document.getElementById("demo-section")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Try Demo
                </Button>
              </div>

              <div className="mx-auto flex h-24 max-w-xl items-end justify-center gap-1">
                {Array.from({ length: 60 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 rounded-full bg-gradient-to-t from-accent-blue to-accent-purple"
                    animate={{
                      height: [
                        `${20 + Math.sin(Date.now() / 1000 + i * 0.2) * 30}%`,
                        `${20 + Math.sin(Date.now() / 1000 + i * 0.2 + Math.PI) * 30}%`,
                      ],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.03 }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="demo-section" className="section-spacing">
          <div className="content-container container-padding">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-[900px]"
            >
              <div className="mb-12 text-center">
                <h2 className="mb-4">Try Text-to-Music</h2>
                <p className="text-text-muted">Describe the music you want to create</p>
              </div>

              <div className="glass-surface rounded-2xl p-8">
                <textarea
                  value={demoText}
                  onChange={(e) => setDemoText(e.target.value)}
                  placeholder="Describe your song... (e.g., 'Upbeat electronic dance track with energetic drums and catchy synth melody')"
                  className="h-32 w-full resize-none rounded-xl border border-white/10 bg-surface-primary px-4 py-3 text-white placeholder:text-text-muted/50 focus:border-accent-blue/50"
                />

                <Button
                  size="lg"
                  className="mt-6 w-full sm:w-auto"
                  disabled={isGenerating || !demoText.trim()}
                  onClick={handleGenerate}
                >
                  {isGenerating ? "Generating..." : "Generate Music"}
                </Button>

                {isGenerating && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-8 text-center"
                  >
                    <div className="mb-4 flex items-center justify-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-accent-blue animate-pulse" />
                      <div className="h-2 w-2 rounded-full bg-accent-purple animate-pulse" />
                      <div className="h-2 w-2 rounded-full bg-[#FF3D9A] animate-pulse" />
                    </div>
                    <p className="text-text-muted">Creating your masterpiece...</p>
                  </motion.div>
                )}

                {generatedSong && !isGenerating && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 rounded-xl bg-surface-primary p-6"
                  >
                    <div className="mb-4 flex items-center gap-4">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-accent-blue to-accent-purple hover:shadow-glow"
                      >
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5" />}
                      </button>
                      <div className="min-w-0 flex-1">
                        <h4 className="mb-1 truncate">{generatedSong.title}</h4>
                        <p className="text-sm text-text-muted">Duration: {generatedSong.duration}</p>
                      </div>
                      <button className="rounded-lg p-2 hover:bg-white/5">
                        <Download className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="flex h-16 items-end gap-0.5">
                      {generatedSong.waveform.map((height, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-sm bg-gradient-to-t from-accent-blue to-accent-purple"
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
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
              className="mb-16 text-center"
            >
              <h2 className="mb-4">Powerful Features</h2>
              <p className="text-text-muted">Everything you need to create professional music</p>
            </motion.div>

            <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group glass-surface rounded-2xl p-6 transition-all duration-300 hover:border-white/20"
                  >
                    <div
                      className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-all group-hover:shadow-[0_0_20px_rgba(61,124,255,0.3)]"
                      style={{ background: `linear-gradient(135deg, ${feature.color}, ${feature.color}40)` }}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h4 className="mb-2">{feature.title}</h4>
                    <p className="text-sm text-text-muted">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-spacing relative overflow-hidden">
          <AmbientBg variant="2" opacity={0.35} blur="blur-[80px]" />
          <div className="content-container container-padding relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 text-center"
            >
              <h2 className="mb-4">Created with MuseAI</h2>
              <p className="text-text-muted">Discover what others are creating</p>
            </motion.div>

            <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {exampleSongs.map((song, index) => (
                <motion.div
                  key={song.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group glass-surface cursor-pointer overflow-hidden rounded-2xl transition-all hover:border-white/20"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={song.image}
                      alt={song.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(min-width: 1024px) 260px, (min-width: 640px) 45vw, 90vw"
                      priority={index < 2}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                      <button className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors hover:bg-white/30">
                        <Play className="h-8 w-8 ml-1" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h5 className="mb-1 truncate">{song.title}</h5>
                    <p className="mb-3 text-sm text-text-muted">{song.artist}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="rounded-full bg-accent-blue/20 px-3 py-1 text-xs text-accent-blue">
                        {song.genre}
                      </span>
                      <div className="flex items-center gap-1 text-text-muted">
                        <Heart className="h-4 w-4" />
                        <span>{song.likes}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
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
              <h2 className="mb-4">Why Choose MuseAI</h2>
              <p className="text-text-muted">The most advanced AI music platform</p>
            </motion.div>

            <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Zap, title: "Lightning Fast", description: "Generate professional tracks in seconds" },
                { icon: Globe, title: "Multi-Lingual", description: "Create music in any language" },
                { icon: Users, title: "Realistic Vocals", description: "Human-like voice synthesis" },
                { icon: TrendingUp, title: "Advanced AI", description: "State-of-the-art music models" },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="glass-surface rounded-2xl p-6 text-center"
                  >
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent-blue to-accent-purple">
                      <Icon className="h-8 w-8" />
                    </div>
                    <h5 className="mb-2">{item.title}</h5>
                    <p className="text-sm text-text-muted">{item.description}</p>
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
              className="relative mx-auto max-w-[1000px] overflow-hidden rounded-3xl p-12 text-center glass-surface"
            >
              <div className="gradient-orb pointer-events-none absolute right-0 top-0 h-96 w-96" />
              <div className="relative z-10">
                <h2 className="mb-4">Start Creating Today</h2>
                <p className="mx-auto mb-8 max-w-[600px] text-text-muted">
                  Choose the perfect plan for your music creation needs
                </p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Button size="lg" onClick={() => router.push("/pricing")}>
                    View Pricing
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => router.push("/studio")}>
                    Try for Free
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

