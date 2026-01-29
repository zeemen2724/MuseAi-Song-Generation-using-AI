'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Sparkles } from "lucide-react";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AmbientBg } from "@/components/shared/ambient-bg";
import Link from "next/link";

export default function ResetPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="relative z-10 min-h-screen bg-transparent overflow-hidden">
      <Navigation />
      <AmbientBg variant="1" opacity={0.55} blur="blur-[100px]" />
      <AmbientBg variant="2" opacity={0.35} blur="blur-[110px]" />
      <main className="pt-16">
        <div className="relative flex min-h-[70vh] items-center justify-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 w-full max-w-md rounded-3xl glass-surface p-8"
          >
            <div className="mb-8 flex justify-center">
              <div className="flex items-center gap-3">
                <Sparkles className="h-10 w-10 text-accent-blue" />
                <span className="text-2xl font-bold bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
                  MuseAI
                </span>
              </div>
            </div>

            <div className="mb-8 text-center">
              <h2 className="mb-2 text-2xl font-semibold">Set New Password</h2>
              <p className="text-text-muted">Enter and confirm your new password</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">New Password</label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="pl-12"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Confirm Password</label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
                  <Input
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="pl-12"
                  />
                </div>
              </div>

              <Button type="submit" className="mt-4 w-full" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Password"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-text-muted">
              Remembered your password?{" "}
              <Link href="/auth/login" className="font-medium text-accent-blue hover:text-accent-purple">
                Sign in
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

