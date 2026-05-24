"use client";

import { motion } from "framer-motion";

export function AnimatedBackground() {
  const codeLines = [
    'def learn_python():',
    '    data = ["red", "blue", "green"]',
    '    result = len(data)',
    '    return result',
    '',
    'for i in range(5):',
    '    print(f"Step {i}")',
    '',
    'names = ["Anna", "Ivan"]',
    'scores = dict(zip(names, [5, 4]))',
  ];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-40" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl" />

      <motion.div
        className="absolute top-20 right-10 hidden lg:block opacity-20 font-mono text-xs text-cyan-400/60"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        {codeLines.map((line, i) => (
          <div key={i} className="whitespace-pre">
            {line || "\u00A0"}
          </div>
        ))}
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-10 hidden lg:block opacity-15 font-mono text-xs text-violet-400/60"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        {['items = {"a": 1, "b": 2}', "keys = list(items.keys())", "total = sum([1, 2, 3])"].map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </motion.div>
    </div>
  );
}
