"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import type { PythonFunction } from "@/lib/types";
import { cn } from "@/lib/utils";

const categoryColors: Record<string, string> = {
  Строки: "border-cyan-500/40 text-cyan-400 bg-cyan-500/10",
  Списки: "border-violet-500/40 text-violet-400 bg-violet-500/10",
  Словари: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10",
  Циклы: "border-blue-500/40 text-blue-400 bg-blue-500/10",
  "Преобразование типов": "border-amber-500/40 text-amber-400 bg-amber-500/10",
  "Функциональные инструменты": "border-pink-500/40 text-pink-400 bg-pink-500/10",
};

interface FunctionCardProps {
  fn: PythonFunction;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  index?: number;
}

export function FunctionCard({ fn, isFavorite, onToggleFavorite, index = 0 }: FunctionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group glass glass-hover rounded-2xl p-5 flex flex-col h-full"
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <span
          className={cn(
            "inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium",
            categoryColors[fn.category] ?? "border-white/20 text-muted-foreground"
          )}
        >
          {fn.category}
        </span>
        {onToggleFavorite && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite();
            }}
            className="rounded-lg p-1.5 transition-colors hover:bg-white/10"
            aria-label={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
          >
            <Star
              className={cn("h-4 w-4", isFavorite ? "fill-amber-400 text-amber-400" : "text-muted-foreground")}
            />
          </button>
        )}
      </div>

      <h3 className="mb-2 font-mono text-lg font-bold text-foreground group-hover:text-cyan-300 transition-colors">
        {fn.name}
      </h3>
      <p className="mb-4 flex-1 text-sm text-muted-foreground line-clamp-2">{fn.shortDescription}</p>

      <div className="mb-4 space-y-1.5 rounded-lg bg-black/30 p-3 font-mono text-xs">
        <div className="text-muted-foreground">
          <span className="text-emerald-400/70">in:</span> {fn.sampleInput}
        </div>
        <div className="text-muted-foreground">
          <span className="text-cyan-400/70">out:</span> {fn.sampleOutput}
        </div>
      </div>

      <Link
        href={`/functions/${fn.slug}`}
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-4 py-2.5 text-sm font-medium text-cyan-300 transition-all hover:bg-cyan-500/20 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
      >
        Открыть
        <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.div>
  );
}
