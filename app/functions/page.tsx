"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Star } from "lucide-react";
import { pythonFunctions } from "@/lib/python-functions";
import { FunctionCard } from "@/components/FunctionCard";
import { CATEGORIES, FAVORITES_KEY, type Category } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function FunctionsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | "all">("all");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) setFavorites(JSON.parse(stored));
    } catch {
      setFavorites([]);
    }
  }, []);

  const toggleFavorite = (slug: string) => {
    setFavorites((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
      return next;
    });
  };

  const filtered = useMemo(() => {
    return pythonFunctions.filter((fn) => {
      const matchSearch =
        search === "" ||
        fn.name.toLowerCase().includes(search.toLowerCase()) ||
        fn.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
        fn.category.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "all" || fn.category === category;
      const matchFav = !favoritesOnly || favorites.includes(fn.slug);
      return matchSearch && matchCategory && matchFav;
    });
  }, [search, category, favoritesOnly, favorites]);

  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="mb-2 text-3xl font-bold sm:text-4xl">
            <span className="gradient-text">Функции Python</span>
          </h1>
          <p className="text-muted-foreground">
            {pythonFunctions.length} функций и методов · выбери для изучения
          </p>
        </motion.div>

        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск по названию или описанию..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl glass border border-white/10 bg-transparent py-3 pl-10 pr-4 text-sm outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30"
            />
          </div>

          <button
            onClick={() => setFavoritesOnly(!favoritesOnly)}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all",
              favoritesOnly
                ? "border-amber-500/50 bg-amber-500/15 text-amber-300"
                : "glass border-white/10 text-muted-foreground hover:text-foreground"
            )}
          >
            <Star className={cn("h-4 w-4", favoritesOnly && "fill-amber-400")} />
            Избранное
          </button>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setCategory("all")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-all",
              category === "all"
                ? "border-cyan-500/50 bg-cyan-500/15 text-cyan-300"
                : "border-white/10 bg-white/5 text-muted-foreground hover:border-white/20"
            )}
          >
            <Filter className="h-3.5 w-3.5" />
            Все
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm transition-all",
                category === cat
                  ? "border-cyan-500/50 bg-cyan-500/15 text-cyan-300"
                  : "border-white/10 bg-white/5 text-muted-foreground hover:border-white/20"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center text-muted-foreground">
            Ничего не найдено. Попробуйте изменить фильтры.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((fn, i) => (
              <FunctionCard
                key={fn.slug}
                fn={fn}
                index={i}
                isFavorite={favorites.includes(fn.slug)}
                onToggleFavorite={() => toggleFavorite(fn.slug)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
