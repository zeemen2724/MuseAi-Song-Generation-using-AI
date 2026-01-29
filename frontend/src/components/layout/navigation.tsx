'use client';

import { usePathname, useRouter } from "next/navigation";
import type { Route } from "next";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Sparkles, User, X, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { isDevAuthActive, clearDevAuth } from "@/lib/dev-auth";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "Explore", href: "/explore" },
  { name: "Studio", href: "/studio", locked: true },
];

interface NavigationProps {
  showDashboard?: boolean;
}

export function Navigation({ showDashboard = false }: NavigationProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(isDevAuthActive());
    };
    
    // Check auth on mount and route change
    checkAuth();
    
    // Listen for storage changes (when auth state changes in other tabs/components)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'dev-auth' || e.key === null) {
        checkAuth();
      }
    };
    
    // Listen for custom auth state change events
    const handleAuthChange = () => {
      checkAuth();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('auth-state-changed', handleAuthChange);
    
    // Also check periodically to catch same-tab changes (less frequent to avoid performance issues)
    const interval = setInterval(checkAuth, 2000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth-state-changed', handleAuthChange);
      clearInterval(interval);
    };
  }, [pathname]); // Re-check on route change

  const links = showDashboard
    ? [...NAV_LINKS, { name: "Dashboard", href: "/dashboard" }]
    : NAV_LINKS;

  const handleNav = (href: string) => {
    router.push(href as Route);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    clearDevAuth();
    setIsAuthenticated(false);
    router.push("/auth/login");
    setMobileOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-surface border-b border-white/5">
        <div className="content-container container-padding">
          <div className="flex h-16 items-center justify-between">
            <button
              onClick={() => handleNav("/")}
              className="group flex items-center gap-2"
            >
              <div className="relative">
                <Sparkles className="h-7 w-7 text-accent-blue" />
                <div className="absolute inset-0 bg-accent-blue blur-lg opacity-50 transition-opacity duration-300 group-hover:opacity-70" />
              </div>
              <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-xl font-bold text-transparent">
                MuseAI
              </span>
            </button>

            <div className="hidden items-center gap-8 md:flex">
              {links.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className={cn(
                    "relative text-sm font-medium transition-colors duration-200 flex items-center gap-1",
                    pathname === link.href
                      ? "text-white"
                      : "text-text-muted hover:text-white",
                  )}
                >
                  <span>{link.name}</span>
                  {link.locked && !isAuthenticated && (
                    <span className="text-[10px] rounded-full px-2 py-0.5 bg-white/10 border border-white/15">
                      Login
                    </span>
                  )}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-gradient-to-r from-accent-blue to-accent-purple"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="hidden items-center gap-3 md:flex">
              {isAuthenticated ? (
                <Button
                  variant="outline"
                  size="md"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="md"
                    onClick={() => handleNav("/auth/login")}
                  >
                    Login
                  </Button>
                  <Button size="md" onClick={() => handleNav("/auth/signup")}>
                    Sign Up
                  </Button>
                </>
              )}
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-white md:hidden"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-16 right-0 bottom-0 z-50 w-[280px] border-l border-white/5 glass-surface md:hidden"
          >
            <div className="flex flex-col gap-3 p-6">
              {links.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className={cn(
                    "h-11 rounded-xl px-4 text-left text-sm transition-all duration-200",
                    pathname === link.href
                      ? "border border-accent-blue/30 bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 text-white"
                      : "text-text-muted hover:bg-white/5 hover:text-white",
                  )}
                >
                  <span className="flex items-center gap-2">
                    {link.name}
                    {link.locked && !isAuthenticated && (
                      <span className="text-[10px] rounded-full px-2 py-0.5 bg-white/10 border border-white/15">
                        Login
                      </span>
                    )}
                  </span>
                </button>
              ))}

              <div className="my-4 border-t border-white/10" />

              {isAuthenticated ? (
                <Button
                  variant="outline"
                  className="w-full text-red-400 hover:text-red-300 hover:bg-red-400/10"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleNav("/auth/login")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                  <Button className="w-full" onClick={() => handleNav("/auth/signup")}>
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

