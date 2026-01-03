'use client';

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Download,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Save,
  Settings as SettingsIcon,
  Share2,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

export default function StudioContent() {
  const [prompt, setPrompt] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("male-pop");
  const [selectedGenre, setSelectedGenre] = useState("pop");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTracks, setGeneratedTracks] = useState<any[]>([]);
  const [playingTrackIndex, setPlayingTrackIndex] = useState<number | null>(null);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [tempo, setTempo] = useState(120);
  const [energy, setEnergy] = useState(70);
  const [mood, setMood] = useState("happy");

  const voices = useMemo(
    () => [
      { id: "male-pop", name: "Male Pop", description: "Smooth and modern" },
      { id: "female-pop", name: "Female Pop", description: "Bright and energetic" },
      { id: "male-rock", name: "Male Rock", description: "Powerful and gritty" },
      { id: "female-soul", name: "Female Soul", description: "Rich and emotional" },
      { id: "male-rap", name: "Male Rap", description: "Clear and dynamic" },
    ],
    [],
  );

  const genres = useMemo(
    () => ["Pop", "Rock", "Hip Hop", "Electronic", "Jazz", "Classical", "R&B", "Country", "Indie", "Ambient"],
    [],
  );

  const moods = useMemo(() => ["Happy", "Sad", "Energetic", "Calm", "Dark", "Uplifting"], []);

  useEffect(() => {
    if (!isGenerating) return;
    const timer = setTimeout(() => {
      const newTracks = [
        {
          id: Date.now(),
          title: `${prompt.slice(0, 30)}...`,
          duration: "3:24",
          waveform: Array.from({ length: 80 }, () => Math.random() * 100),
          lyrics: lyrics || "Generated lyrics will appear here...",
        },
        {
          id: Date.now() + 1,
          title: `${prompt.slice(0, 30)}... (Variation)`,
          duration: "3:18",
          waveform: Array.from({ length: 80 }, () => Math.random() * 100),
          lyrics: lyrics || "Generated lyrics will appear here...",
        },
      ];
      setGeneratedTracks(newTracks);
      setIsGenerating(false);
    }, 3800);
    return () => clearTimeout(timer);
  }, [isGenerating, prompt, lyrics]);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
  };

  const generateLyrics = () => {
    setLyrics(
      `[Verse 1]\n${prompt}\nCreated with AI magic\nMusic flowing through the night\n\n[Chorus]\nThis is just a sample\nOf what MuseAI can create\nYour imagination\nIs all it takes\n\n[Verse 2]\nEvery beat and melody\nCrafted just for you\nWith MuseAI's technology\nDreams can come true`,
    );
  };

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <aside className="lg:w-96 flex-shrink-0">
        <div className="sticky top-24 space-y-6 rounded-2xl glass-surface p-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent-blue" />
            <h3 className="text-lg font-semibold">Create Music</h3>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Describe Your Song</label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g., 'Upbeat electronic dance track with energetic drums and catchy synth melody'"
              className="h-32"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium">Lyrics (Optional)</label>
              <button
                onClick={generateLyrics}
                className="text-xs font-medium text-accent-blue hover:text-accent-purple"
              >
                Generate
              </button>
            </div>
            <Textarea
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
              placeholder="Enter your lyrics or generate them..."
              className="h-40"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Voice Style</label>
            <Select value={selectedVoice} onChange={(e) => setSelectedVoice(e.target.value)}>
              {voices.map((voice) => (
                <option key={voice.id} value={voice.id}>
                  {voice.name} - {voice.description}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Genre</label>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre.toLowerCase())}
                  className={`rounded-lg px-3 py-1.5 text-sm transition-all ${
                    selectedGenre === genre.toLowerCase()
                      ? "bg-gradient-to-r from-accent-blue to-accent-purple text-white"
                      : "border border-white/10 bg-surface-primary text-text-muted hover:border-accent-blue/40"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          <div>
            <button
              onClick={() => setAdvancedOpen(!advancedOpen)}
              className="mb-2 flex w-full items-center justify-between text-sm font-medium hover:text-accent-blue"
            >
              <span>Advanced Settings</span>
              {advancedOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            <AnimatePresence>
              {advancedOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-4 overflow-hidden"
                >
                  <div>
                    <label className="mb-2 block text-sm">Tempo: {tempo} BPM</label>
                    <input
                      type="range"
                      min="60"
                      max="180"
                      value={tempo}
                      onChange={(e) => setTempo(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm">Energy: {energy}%</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={energy}
                      onChange={(e) => setEnergy(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm">Mood</label>
                    <Select value={mood} onChange={(e) => setMood(e.target.value)}>
                      {moods.map((m) => (
                        <option key={m} value={m.toLowerCase()}>
                          {m}
                        </option>
                      ))}
                    </Select>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Button onClick={handleGenerate} disabled={isGenerating || !prompt.trim()} className="w-full">
            {isGenerating ? (
              <>
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Generate Music
              </>
            )}
          </Button>
        </div>
      </aside>

      <main className="flex-1">
        <div className="min-h-[600px] rounded-2xl glass-surface p-8">
          {isGenerating ? (
            <div className="flex h-full flex-col items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="mb-6 h-20 w-20 rounded-full border-4 border-accent-blue/20 border-t-accent-blue"
              />
              <h3 className="mb-2">Creating Your Masterpiece</h3>
              <p className="text-text-muted">This will take a few moments...</p>
              <div className="mt-8 w-full max-w-md">
                <div className="flex h-32 items-end justify-center gap-1">
                  {Array.from({ length: 50 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 rounded-full bg-gradient-to-t from-accent-blue to-accent-purple"
                      animate={{
                        height: [`${20 + Math.random() * 60}%`, `${20 + Math.random() * 60}%`],
                      }}
                      transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.02 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : generatedTracks.length > 0 ? (
            <div className="space-y-6">
              <div className="mb-6 flex items-center justify-between">
                <h3>Generated Variations</h3>
                <div className="flex gap-2">
                  <Button variant="outline" className="h-11 w-11 p-0">
                    <Plus className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" className="h-11 w-11 p-0" onClick={handleGenerate}>
                    <RotateCcw className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {generatedTracks.map((track, index) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className="rounded-xl glass-surface p-6"
                >
                  <div className="mb-4 flex items-center gap-4">
                    <Button
                      variant="default"
                      className="h-14 w-14 rounded-full p-0"
                      onClick={() => setPlayingTrackIndex(playingTrackIndex === index ? null : index)}
                    >
                      {playingTrackIndex === index ? <Pause className="h-6 w-6" /> : <Play className="ml-0.5 h-6 w-6" />}
                    </Button>
                    <div className="flex-1">
                      <h4 className="mb-1">{track.title}</h4>
                      <p className="text-sm text-text-muted">Duration: {track.duration}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="h-11 w-11 p-0">
                        <Save className="h-5 w-5" />
                      </Button>
                      <Button variant="outline" className="h-11 w-11 p-0">
                        <Download className="h-5 w-5" />
                      </Button>
                      <Button variant="outline" className="h-11 w-11 p-0">
                        <Share2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  <div className="mb-4 flex h-24 items-end gap-0.5">
                    {track.waveform.map((height: number, i: number) => (
                      <motion.div
                        key={i}
                        className={`flex-1 rounded-sm ${
                          playingTrackIndex === index
                            ? "bg-gradient-to-t from-accent-blue to-accent-purple"
                            : "bg-text-muted/30"
                        }`}
                        style={{ height: `${height}%` }}
                        animate={playingTrackIndex === index ? { opacity: [0.5, 1, 0.5] } : undefined}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.01 }}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <Button variant="ghost" className="px-0 text-accent-blue hover:text-accent-purple">
                      Edit MIDI
                    </Button>
                    <Button variant="ghost" className="px-0 text-accent-blue hover:text-accent-purple">
                      Adjust Mix
                    </Button>
                    <Button variant="ghost" className="px-0 text-accent-blue hover:text-accent-purple">
                      View Lyrics
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-accent-blue/20 to-accent-purple/20">
                <Sparkles className="h-16 w-16 text-accent-blue" />
              </div>
              <h3 className="mb-2">Ready to Create</h3>
              <p className="max-w-md text-text-muted">
                Describe the music you want to create, customize your settings, and hit generate!
              </p>
            </div>
          )}
        </div>
      </main>

      <aside className="lg:w-80 flex-shrink-0">
        <div className="sticky top-24 rounded-2xl glass-surface p-6">
          <h4 className="mb-6">Song Details</h4>
          {generatedTracks.length > 0 ? (
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm text-text-muted">Title</label>
                <Input placeholder="Enter song title..." />
              </div>
              <div>
                <label className="mb-2 block text-sm text-text-muted">Artist Name</label>
                <Input placeholder="Your name..." />
              </div>
              <div>
                <label className="mb-2 block text-sm text-text-muted">Description</label>
                <Textarea placeholder="Describe your song..." className="h-24" />
              </div>
              <div>
                <label className="mb-2 block text-sm text-text-muted">Download Format</label>
                <Select>
                  <option>WAV (Lossless)</option>
                  <option>MP3 (320kbps)</option>
                  <option>MP3 (192kbps)</option>
                  <option>MIDI</option>
                </Select>
              </div>
              <Button className="w-full">Save to Dashboard</Button>
            </div>
          ) : (
            <div className="py-12 text-center text-text-muted">
              <SettingsIcon className="mx-auto mb-4 h-12 w-12 opacity-40" />
              Song details will appear here after generation.
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

