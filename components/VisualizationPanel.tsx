"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { GeneratedExample } from "@/lib/types";
import { cn } from "@/lib/utils";

interface VisualizationPanelProps {
  example: GeneratedExample;
}

function DataChip({ value, variant }: { value: string; variant: "input" | "output" | "neutral" }) {
  return (
    <motion.span
      layout
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        "inline-flex items-center rounded-lg border px-3 py-1.5 font-mono text-sm",
        variant === "input" && "border-violet-500/40 bg-violet-500/10 text-violet-200",
        variant === "output" && "border-emerald-500/40 bg-emerald-500/10 text-emerald-200 shadow-[0_0_15px_rgba(52,211,153,0.2)]",
        variant === "neutral" && "border-white/20 bg-white/5 text-foreground"
      )}
    >
      {value}
    </motion.span>
  );
}

export function VisualizationPanel({ example }: VisualizationPanelProps) {
  const { visualization, inputLabel, inputValue, outputLabel, outputValue } = example;
  const { before, after, type } = visualization;

  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="mb-6 text-lg font-semibold text-foreground">Визуализация</h3>

      <AnimatePresence mode="wait">
        <motion.div
          key={inputValue + outputValue}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <div>
            <p className="mb-3 text-sm font-medium text-muted-foreground">{inputLabel}</p>
            <div className="flex flex-wrap gap-2">
              {type === "string-split" && before[0] ? (
                <div className="flex flex-wrap items-center gap-2">
                  <DataChip value={`"${before[0]}"`} variant="input" />
                  {before[0].split(/\s|,|-/).length > 1 && (
                    <>
                      <span className="text-muted-foreground">→</span>
                      {before[0].split(/\s|,|-/).map((part, i) => (
                        <DataChip key={i} value={`"${part.trim()}"`} variant="neutral" />
                      ))}
                    </>
                  )}
                </div>
              ) : (
                before.map((item, i) => (
                  <DataChip key={i} value={item.startsWith('"') || item.startsWith("[") || item.startsWith("{") ? item : `"${item}"`} variant={item === "➕" ? "neutral" : "input"} />
                ))
              )}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <motion.div
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-500/30"
            >
              <ArrowRight className="h-5 w-5 text-cyan-400" />
            </motion.div>
          </div>

          <div>
            <p className="mb-3 text-sm font-medium text-muted-foreground">{outputLabel}</p>
            <div className="flex flex-wrap gap-2">
              {(type === "string-split" || type === "list-transform" || type === "filter-map" ? after : after).map(
                (item, i) => (
                  <DataChip
                    key={i}
                    value={
                      item.startsWith('"') ||
                      item.startsWith("[") ||
                      item.startsWith("{") ||
                      item.startsWith("(") ||
                      !isNaN(Number(item))
                        ? item
                        : `"${item}"`
                    }
                    variant="output"
                  />
                )
              )}
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 font-mono text-sm text-emerald-300"
            >
              result = {outputValue}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
