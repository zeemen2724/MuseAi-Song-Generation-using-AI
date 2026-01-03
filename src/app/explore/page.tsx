'use client';

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Play, Pause, Share2, Download, Sparkles, TrendingUp, Clock, X } from "lucide-react";
import Image from "next/image";
import { Navigation } from "@/components/layout/navigation";
import { Footer }from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { AmbientBg } from "@/components/shared/ambient-bg";

export default function ExplorePage() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedSong, setSelectedSong] = useState<any>(null);
  const [playingSongId, setPlayingSongId] = useState<number | null>(null);
  const [likedSongs, setLikedSongs] = useState<Set<number>>(new Set());

  const filters = useMemo(
    () => [
      { id: "all", label: "All", icon: Sparkles },
      { id: "trending", label: "Trending", icon: TrendingUp },
      { id: "new", label: "New", icon: Clock },
    ],
    [],
  );

  const genres = useMemo(
    () => ["All", "Pop", "Rock", "Hip Hop", "Electronic", "Jazz", "Classical", "Ambient", "Country"],
    [],
  );

  const songs = useMemo(
    () => [
      {
        id: 1,
        title: "Neon Dreams",
        artist: "Alex Johnson",
        genre: "Electronic",
        duration: "3:24",
        likes: 1243,
        plays: 12453,
        image: "/assets/ai/neon-dreams.svg",
        description: "A euphoric journey through synthwave soundscapes",
        tags: ["Synthwave", "Energetic", "Retro"],
      },
      {
        id: 2,
        title: "Ocean Waves",
        artist: "Sarah Chen",
        genre: "Ambient",
        duration: "4:12",
        likes: 892,
        plays: 8921,
        image: "/assets/ai/ocean-waves.svg",
        description: "Calming ambient textures inspired by the sea",
        tags: ["Ambient", "Relaxing", "Nature"],
      },
      {
        id: 3,
        title: "Urban Pulse",
        artist: "Marcus Williams",
        genre: "Hip Hop",
        duration: "3:45",
        likes: 2156,
        plays: 21560,
        image: "/assets/ai/urban-pulse.svg",
        description: "Hard-hitting beats with urban energy",
        tags: ["Hip Hop", "Energetic", "Urban"],
      },
      {
        id: 4,
        title: "Starlight Serenade",
        artist: "Emma Davis",
        genre: "Pop",
        duration: "3:18",
        likes: 1678,
        plays: 16780,
        image: "/assets/ai/starlight-serenade.svg",
        description: "Dreamy pop with celestial vibes",
        tags: ["Pop", "Dreamy", "Romantic"],
      },
      {
        id: 5,
        title: "Midnight Jazz",
        artist: "James Brown",
        genre: "Jazz",
        duration: "5:32",
        likes: 945,
        plays: 9450,
        image: "/assets/ai/ocean-waves.svg",
        description: "Smooth jazz for late night listening",
        tags: ["Jazz", "Smooth", "Chill"],
      },
      {
        id: 6,
        title: "Electric Storm",
        artist: "Luna Rodriguez",
        genre: "Rock",
        duration: "4:05",
        likes: 1821,
        plays: 18210,
        image: "/assets/ai/urban-pulse.svg",
        description: "Heavy rock with electrifying guitar solos",
        tags: ["Rock", "Heavy", "Intense"],
      },
    ],
    [],
  );

  const toggleLike = (id: number) => {
    const next = new Set(likedSongs);
    next.has(id) ? next.delete(id) : next.add(id);
    setLikedSongs(next);
  };

  const togglePlay = (id: number) => {
    setPlayingSongId(playingSongId === id ? null : id);
  };

  return (
    <div className="relative z-10 min-h-screen bg-transparent">
      <Navigation />
      <main className="pt-16 relative overflow-hidden">
        <AmbientBg variant="1" opacity={0.4} blur="blur-[90px]" className="-z-20" />
        <AmbientBg variant="2" opacity={0.3} blur="blur-[100px]" className="-z-20" />
        <section className="border-b border-white/5 py-12 relative">
          <div className="content-container container-padding">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="mb-4">Explore Music</h1>
              <p className="text-text-muted">Discover amazing tracks created with MuseAI</p>
            </motion.div>
          </div>
        </section>

        <div className="content-container container-padding py-12">
          <div className="flex flex-col gap-8 lg:flex-row">
            <aside className="lg:w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-8 rounded-2xl glass-surface p-6">
                <div>
                  <h4 className="mb-4">Filters</h4>
                  <div className="space-y-2">
                    {filters.map((filter) => {
                      const Icon = filter.icon;
                      return (
                        <button
                          key={filter.id}
                          onClick={() => setSelectedFilter(filter.id)}
                          className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all ${
                            selectedFilter === filter.id
                              ? "border border-accent-blue/30 bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 text-white"
                              : "text-text-muted hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          {filter.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h5 className="mb-4">Genres</h5>
                  <div className="flex flex-wrap gap-2">
                    {genres.map((genre) => (
                      <span
                        key={genre}
                        className="rounded-lg border border-white/10 bg-surface-primary px-3 py-1.5 text-sm text-text-muted"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            <main className="flex-1">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {songs.map((song, index) => (
                  <motion.div
                    key={song.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="group cursor-pointer overflow-hidden rounded-2xl glass-surface transition-all hover:border-white/20"
                  >
                    <div className="relative aspect-square overflow-hidden" onClick={() => setSelectedSong(song)}>
                      <Image
                        src={song.image}
                        alt={song.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(min-width: 1280px) 280px, (min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            togglePlay(song.id);
                          }}
                          className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors hover:bg-white/30"
                        >
                          {playingSongId === song.id ? (
                            <Pause className="h-8 w-8" />
                          ) : (
                            <Play className="ml-1 h-8 w-8" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h5 className="mb-1 truncate">{song.title}</h5>
                      <p className="mb-3 text-sm text-text-muted">{song.artist}</p>
                      <div className="mb-3 flex items-center justify-between text-sm">
                        <span className="rounded-full bg-accent-blue/20 px-3 py-1 text-xs text-accent-blue">{song.genre}</span>
                        <span className="text-text-muted">{song.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-text-muted">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleLike(song.id);
                            }}
                            className="flex items-center gap-1 hover:text-accent-pink transition-colors"
                          >
                            <Heart
                              className={`h-4 w-4 ${likedSongs.has(song.id) ? "fill-accent-pink text-accent-pink" : ""}`}
                            />
                            <span>{song.likes + (likedSongs.has(song.id) ? 1 : 0)}</span>
                          </button>
                          <span className="text-xs">{song.plays} plays</span>
                        </div>
                        <button className="rounded-lg p-2 hover:bg-white/5">
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </main>
          </div>
        </div>

        <AnimatePresence>
          {selectedSong && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
              onClick={() => setSelectedSong(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="w-full max-w-[820px] overflow-hidden rounded-3xl glass-surface"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <button
                    onClick={() => setSelectedSong(null)}
                    className="absolute right-6 top-6 z-10 rounded-full bg-black/50 p-2 backdrop-blur-sm transition-colors hover:bg-black/70"
                  >
                    <X className="h-6 w-6" />
                  </button>
                  <div className="relative aspect-video overflow-hidden rounded-t-3xl">
                    <Image
                      src={selectedSong.image}
                      alt={selectedSong.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 800px, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <Button
                        onClick={() => togglePlay(selectedSong.id)}
                        className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-accent-blue to-accent-purple hover:shadow-glow"
                      >
                        {playingSongId === selectedSong.id ? (
                          <Pause className="h-8 w-8" />
                        ) : (
                          <Play className="ml-1 h-8 w-8" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="mb-2">{selectedSong.title}</h2>
                      <p className="text-text-muted">by {selectedSong.artist}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="h-11"
                        onClick={() => toggleLike(selectedSong.id)}
                      >
                        <Heart
                          className={`h-5 w-5 ${likedSongs.has(selectedSong.id) ? "fill-accent-pink text-accent-pink" : ""}`}
                        />
                      </Button>
                      <Button variant="outline" className="h-11">
                        <Share2 className="h-5 w-5" />
                      </Button>
                      <Button variant="outline" className="h-11">
                        <Download className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="rounded-xl border border-white/10 bg-surface-primary px-4 py-2">
                      <span className="text-accent-blue">{selectedSong.genre}</span>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-surface-primary px-4 py-2 text-text-muted">
                      {selectedSong.duration}
                    </div>
                  </div>

                  <p className="text-text-muted">{selectedSong.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {selectedSong.tags.map((tag: string) => (
                      <span key={tag} className="rounded-lg border border-white/10 bg-surface-primary px-3 py-1 text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-8 text-sm text-text-muted">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      <span>{selectedSong.likes + (likedSongs.has(selectedSong.id) ? 1 : 0)} likes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Play className="h-4 w-4" />
                      <span>{selectedSong.plays} plays</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

