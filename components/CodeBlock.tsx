"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  className?: string;
}

function highlightPython(code: string): React.ReactNode[] {
  const lines = code.split("\n");
  return lines.map((line, lineIdx) => {
    const parts: React.ReactNode[] = [];
    let remaining = line;
    let key = 0;

    const patterns: [RegExp, string][] = [
      [/^(\s*)(#.*)$/, "comment"],
      [/^(\s*)(["'].*?["'])/, "string"],
      [/(\b(?:def|return|for|in|lambda|if|else|True|False|None)\b)/, "keyword"],
      [/(\b(?:len|sum|max|min|sorted|range|enumerate|zip|map|filter|int|str|float|list|tuple|set)\b)/, "builtin"],
      [/(\b(?:append|pop|remove|sort|upper|lower|split|replace|strip|find|keys|values|items|get)\b)/, "method"],
      [/(\bresult\b|\btext\b|\bnumbers\b|\bdata\b|\bnames\b|\bscores\b)/, "variable"],
      [/(\d+\.?\d*)/, "number"],
    ];

    while (remaining.length > 0) {
      let matched = false;
      for (const [regex, type] of patterns) {
        const m = remaining.match(regex);
        if (m && m.index === 0) {
          const text = m[0];
          const colorClass =
            type === "comment"
              ? "text-gray-500"
              : type === "string"
                ? "text-emerald-400"
                : type === "keyword"
                  ? "text-violet-400"
                  : type === "builtin"
                    ? "text-cyan-400"
                    : type === "method"
                      ? "text-amber-400"
                      : type === "variable"
                        ? "text-blue-300"
                        : type === "number"
                          ? "text-orange-400"
                          : "text-foreground";
          parts.push(
            <span key={`${lineIdx}-${key++}`} className={colorClass}>
              {text}
            </span>
          );
          remaining = remaining.slice(text.length);
          matched = true;
          break;
        }
      }
      if (!matched) {
        parts.push(
          <span key={`${lineIdx}-${key++}`} className="text-foreground/90">
            {remaining[0]}
          </span>
        );
        remaining = remaining.slice(1);
      }
    }

    return (
      <div key={lineIdx} className="leading-relaxed">
        <span className="mr-4 inline-block w-6 select-none text-right text-muted-foreground/40">
          {lineIdx + 1}
        </span>
        {parts.length > 0 ? parts : "\u00A0"}
      </div>
    );
  });
}

export function CodeBlock({ code, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("relative overflow-hidden rounded-xl glass neon-border", className)}>
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500/80" />
          <div className="h-3 w-3 rounded-full bg-amber-500/80" />
          <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Скопировано" : "Копировать"}
        </button>
      </div>
      <motion.pre
        key={code}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="overflow-x-auto p-4 font-mono text-sm"
      >
        <code>{highlightPython(code)}</code>
      </motion.pre>
    </div>
  );
}
