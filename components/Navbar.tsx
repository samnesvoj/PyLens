"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Code2, Home, BookOpen, Dumbbell, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Главная", icon: Home },
  { href: "/functions", label: "Функции", icon: BookOpen },
  { href: "/trainer", label: "Тренажёр", icon: Dumbbell },
  { href: "/about", label: "О проекте", icon: Info },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-shadow">
            <Code2 className="h-5 w-5 text-cyan-400" />
          </div>
          <span className="text-lg font-bold gradient-text">PyLens</span>
        </Link>

        <ul className="flex items-center gap-1 sm:gap-2">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-all sm:px-3",
                    active
                      ? "bg-cyan-500/15 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="hidden sm:inline">{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </motion.header>
  );
}
