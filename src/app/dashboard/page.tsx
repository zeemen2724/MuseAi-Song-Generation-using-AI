'use client';

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Clock,
  CreditCard,
  Download,
  Edit3,
  Folder,
  Heart,
  Home,
  LogOut,
  Music,
  Play,
  Plus,
  Settings,
  Share2,
  TrendingUp,
  Zap,
  Pause,
} from "lucide-react";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { clearDevAuth } from "@/lib/dev-auth";
import { useRouter } from "next/navigation";
import { AmbientBg } from "@/components/shared/ambient-bg";

export default function DashboardPage() {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState("overview");
  const [playingSongId, setPlayingSongId] = useState<number | null>(null);

  const handleLogout = () => {
    clearDevAuth();
    router.push("/auth/login");
  };

  const sidebarItems = useMemo(
    () => [
      { id: "overview", label: "Dashboard", icon: Home },
      { id: "songs", label: "My Songs", icon: Music },
      { id: "projects", label: "Projects", icon: Folder },
      { id: "favorites", label: "Favorites", icon: Heart },
      { id: "billing", label: "Billing", icon: CreditCard },
      { id: "settings", label: "Settings", icon: Settings },
    ],
    [],
  );

  const stats = useMemo(
    () => [
      { label: "Total Songs", value: "24", icon: Music, color: "#3D7CFF" },
      { label: "Credits Used", value: "156", icon: Zap, color: "#8A3DFF" },
      { label: "Credits Left", value: "844", icon: TrendingUp, color: "#FF3D9A" },
      { label: "Hours Created", value: "2.3", icon: Clock, color: "#3D7CFF" },
    ],
    [],
  );

  const recentSongs = useMemo(
    () => [
      { id: 1, title: "Neon Dreams", genre: "Electronic", duration: "3:24", createdAt: "2 hours ago", plays: 45 },
      { id: 2, title: "Ocean Waves", genre: "Ambient", duration: "4:12", createdAt: "1 day ago", plays: 89 },
      { id: 3, title: "Urban Pulse", genre: "Hip Hop", duration: "3:45", createdAt: "2 days ago", plays: 156 },
      { id: 4, title: "Starlight Serenade", genre: "Pop", duration: "3:18", createdAt: "3 days ago", plays: 234 },
    ],
    [],
  );

  const projects = useMemo(
    () => [
      { id: 1, name: "Album 2024", songs: 12, updatedAt: "1 day ago" },
      { id: 2, name: "Experimental Tracks", songs: 8, updatedAt: "3 days ago" },
      { id: 3, name: "Client Work", songs: 15, updatedAt: "1 week ago" },
    ],
    [],
  );

  const renderContent = () => {
    switch (currentSection) {
      case "overview":
        return (
          <div className="space-y-8">
            <div>
              <h2 className="mb-6">Welcome back, Creator!</h2>
              <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="rounded-2xl glass-surface p-6"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <div
                          className="flex h-12 w-12 items-center justify-center rounded-xl"
                          style={{ background: `linear-gradient(135deg, ${stat.color}, ${stat.color}40)` }}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <BarChart3 className="h-5 w-5 text-text-muted" />
                      </div>
                      <h3 className="mb-1 text-2xl font-semibold">{stat.value}</h3>
                      <p className="text-sm text-text-muted">{stat.label}</p>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mb-8 rounded-2xl glass-surface p-6">
                <h4 className="mb-4">Quick Actions</h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <ActionCard icon={Plus} title="New Song" description="Create music" />
                  <ActionCard icon={Folder} title="New Project" description="Organize songs" />
                  <ActionCard icon={TrendingUp} title="Explore" description="Discover music" />
                </div>
              </div>

              <div className="rounded-2xl glass-surface p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h4>Recent Songs</h4>
                  <Button variant="ghost" className="text-accent-blue" onClick={() => setCurrentSection("songs")}>
                    View All
                  </Button>
                </div>
                <div className="space-y-3">
                  {recentSongs.map((song) => (
                    <div
                      key={song.id}
                      className="flex items-center gap-4 rounded-xl p-4 transition-colors hover:bg-white/5"
                    >
                      <button
                        onClick={() => setPlayingSongId(playingSongId === song.id ? null : song.id)}
                        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-accent-blue to-accent-purple hover:shadow-glow"
                      >
                        {playingSongId === song.id ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5" />}
                      </button>
                      <div className="min-w-0 flex-1">
                        <h5 className="truncate">{song.title}</h5>
                        <p className="text-sm text-text-muted">
                          {song.genre} • {song.duration}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-text-muted">
                        <Play className="h-4 w-4" />
                        <span>{song.plays}</span>
                      </div>
                      <div className="flex gap-1">
                        <IconButton icon={Download} />
                        <IconButton icon={Share2} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "songs":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2>My Songs</h2>
              <Button>
                <Plus className="mr-2 h-5 w-5" />
                New Song
              </Button>
            </div>
            <div className="overflow-hidden rounded-2xl glass-surface">
              <table className="w-full">
                <thead className="bg-surface-primary">
                  <tr>
                    <th className="px-6 py-4 text-left">Song</th>
                    <th className="px-6 py-4 text-left">Genre</th>
                    <th className="px-6 py-4 text-left">Duration</th>
                    <th className="px-6 py-4 text-left">Created</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSongs.map((song) => (
                    <tr key={song.id} className="border-t border-white/5 hover:bg-white/5">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setPlayingSongId(playingSongId === song.id ? null : song.id)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-accent-blue to-accent-purple hover:shadow-glow"
                          >
                            {playingSongId === song.id ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
                          </button>
                          <span className="font-medium">{song.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-text-muted">{song.genre}</td>
                      <td className="px-6 py-4 text-text-muted">{song.duration}</td>
                      <td className="px-6 py-4 text-text-muted">{song.createdAt}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <IconButton icon={Edit3} />
                          <IconButton icon={Download} />
                          <IconButton icon={Share2} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "projects":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2>Projects</h2>
              <Button>
                <Plus className="mr-2 h-5 w-5" />
                New Project
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <div key={project.id} className="rounded-2xl glass-surface p-6 transition-all hover:border-white/20">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple">
                      <Folder className="h-6 w-6" />
                    </div>
                    <IconButton icon={Edit3} />
                  </div>
                  <h4 className="mb-2">{project.name}</h4>
                  <p className="mb-4 text-sm text-text-muted">
                    {project.songs} songs • Updated {project.updatedAt}
                  </p>
                  <Button variant="ghost" className="px-0 text-accent-blue hover:text-accent-purple">
                    Open Project →
                  </Button>
                </div>
              ))}
            </div>
          </div>
        );

      case "billing":
        return (
          <div className="space-y-6">
            <h2>Billing & Subscription</h2>
            <div className="rounded-2xl glass-surface p-8">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="mb-2 text-xl font-semibold">Creator Plan</h3>
                  <p className="text-text-muted">$29/month</p>
                </div>
                <Button variant="outline">Change Plan</Button>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-text-muted">
                  <span>Next billing date</span>
                  <span>Jan 9, 2026</span>
                </div>
                <div className="flex justify-between text-text-muted">
                  <span>Payment method</span>
                  <span>•••• 4242</span>
                </div>
              </div>
            </div>
            <div className="rounded-2xl glass-surface p-6">
              <h4 className="mb-4">Invoices</h4>
              <div className="space-y-3">
                {["December 2025", "November 2025", "October 2025"].map((month) => (
                  <div key={month} className="flex items-center justify-between rounded-xl bg-surface-primary p-4">
                    <div>
                      <p className="font-medium">{month}</p>
                      <p className="text-sm text-text-muted">$29.00</p>
                    </div>
                    <Button variant="ghost" className="px-0 text-accent-blue hover:text-accent-purple">
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="space-y-6">
            <h2>Settings</h2>
            <div className="space-y-6">
              <div className="rounded-2xl glass-surface p-6">
                <h4 className="mb-4">Profile</h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  <InputField label="Name" value="Demo User" />
                  <InputField label="Email" value="user@example.com" />
                </div>
              </div>
              <div className="rounded-2xl glass-surface p-6">
                <h4 className="mb-4">API Keys</h4>
                <p className="mb-4 text-sm text-text-muted">Generate API keys to integrate MuseAI into your applications</p>
                <Button>Generate API Key</Button>
              </div>
              <div className="rounded-2xl glass-surface p-6">
                <h4 className="mb-4">Password</h4>
                <Button variant="ghost" className="px-0 text-accent-blue hover:text-accent-purple">
                  Change Password →
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative z-10 min-h-screen bg-transparent overflow-hidden">
      <Navigation showDashboard />
      <AmbientBg variant="1" opacity={0.4} blur="blur-[110px]" />
      <AmbientBg variant="2" opacity={0.3} blur="blur-[120px]" />
      <main className="pt-16">
        <div className="content-container container-padding py-8 relative z-10">
          <div className="flex flex-col gap-6 lg:flex-row">
            <aside className="lg:w-64 flex-shrink-0">
              <div className="sticky top-24 rounded-2xl glass-surface p-4">
                <nav className="space-y-2">
                  {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setCurrentSection(item.id)}
                        className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all ${
                          currentSection === item.id
                            ? "border border-accent-blue/30 bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 text-white"
                            : "text-text-muted hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        {item.label}
                      </button>
                    );
                  })}
                  <div className="my-4 border-t border-white/10" />
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-red-400 hover:bg-red-400/10"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </button>
                </nav>
              </div>
            </aside>

            <main className="flex-1">
              <motion.div
                key={currentSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </main>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ActionCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <button className="group rounded-xl bg-surface-primary p-4 text-left transition-all hover:border-white/20">
      <Icon className="mb-2 h-6 w-6 text-accent-blue transition-colors group-hover:text-accent-purple" />
      <p className="font-medium">{title}</p>
      <p className="text-sm text-text-muted">{description}</p>
    </button>
  );
}

function IconButton({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <button className="rounded-lg p-2 transition-colors hover:bg-white/5">
      <Icon className="h-4 w-4" />
    </button>
  );
}

function InputField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="mb-2 block text-sm text-text-muted">{label}</label>
      <input
        defaultValue={value}
        className="h-11 w-full rounded-xl border border-white/10 bg-surface-primary px-4 text-sm focus:border-accent-blue/50"
      />
    </div>
  );
}

