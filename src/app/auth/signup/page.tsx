'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Chrome, Github, Lock, Mail, Sparkles, User } from "lucide-react";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AmbientBg } from "@/components/shared/ambient-bg";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
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
        <div className="relative flex min-h-[80vh] items-center justify-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 w-full max-w-md rounded-3xl glass-surface p-8"
          >
            <div className="mb-8 flex justify-center">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Sparkles className="h-10 w-10 text-accent-blue" />
                  <div className="absolute inset-0 bg-accent-blue blur-xl opacity-50" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
                  MuseAI
                </span>
              </div>
            </div>

            <div className="mb-8 text-center">
              <h2 className="mb-2 text-2xl font-semibold">Create Account</h2>
              <p className="text-text-muted">Start creating music with AI</p>
            </div>

            <div className="mb-6 space-y-3">
              <Button variant="outline" className="w-full" disabled={isLoading}>
                <Chrome className="mr-3 h-5 w-5" />
                Continue with Google
              </Button>
              <Button variant="outline" className="w-full" disabled={isLoading}>
                <Github className="mr-3 h-5 w-5" />
                Continue with GitHub
              </Button>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-surface-primary px-4 text-text-muted">Or continue with email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Name</label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Your name"
                    className="pl-12"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Email</label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@email.com"
                    className="pl-12"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Password</label>
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

              <Button type="submit" className="mt-4 w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-text-muted">
              Already have an account?{" "}
              <Link href="/auth/login" className="font-medium text-accent-blue hover:text-accent-purple">
                Sign in
              </Link>
            </div>
            <p className="mt-6 text-center text-xs text-text-muted">
              By signing up, you agree to our{" "}
              <a className="text-accent-blue hover:text-accent-purple" href="#">
                Terms of Service
              </a>{" "}
              and{" "}
              <a className="text-accent-blue hover:text-accent-purple" href="#">
                Privacy Policy
              </a>
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

