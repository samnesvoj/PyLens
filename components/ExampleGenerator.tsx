"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Shuffle } from "lucide-react";
import type { GeneratedExample } from "@/lib/types";
import { generateExample } from "@/lib/example-generators";
import { CodeBlock } from "./CodeBlock";
import { VisualizationPanel } from "./VisualizationPanel";

interface ExampleGeneratorProps {
  slug: string;
  initialExample: GeneratedExample;
  stepsTitle?: string;
}

export function ExampleGenerator({ slug, initialExample, stepsTitle = "Пошаговое объяснение" }: ExampleGeneratorProps) {
  const [example, setExample] = useState<GeneratedExample>(initialExample);
  const [key, setKey] = useState(0);

  const handleGenerate = useCallback(() => {
    const next = generateExample(slug);
    setExample(next);
    setKey((k) => k + 1);
  }, [slug]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold">Пример кода</h2>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGenerate}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500/80 to-cyan-500/80 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(167,139,250,0.3)] hover:shadow-[0_0_30px_rgba(167,139,250,0.5)] transition-shadow"
        >
          <Shuffle className="h-4 w-4" />
          Сгенерировать пример
        </motion.button>
      </div>

      <motion.div key={key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <CodeBlock code={example.code} />
      </motion.div>

      <VisualizationPanel example={example} />

      <div className="glass rounded-2xl p-6">
        <h3 className="mb-4 text-lg font-semibold">{stepsTitle}</h3>
        <ol className="space-y-4">
          {example.steps.map((step, i) => (
            <motion.li
              key={`${key}-${i}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 border border-cyan-500/40 text-sm font-bold text-cyan-300">
                {i + 1}
              </span>
              <div>
                <p className="font-medium text-foreground">{step.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  );
}
