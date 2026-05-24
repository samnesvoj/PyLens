"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import type { TrainerQuestion } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./CodeBlock";

interface TrainerQuestionProps {
  question: TrainerQuestion;
  selected: string | null;
  onSelect: (answer: string) => void;
  showResult: boolean;
}

export function TrainerQuestionCard({ question, selected, onSelect, showResult }: TrainerQuestionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-violet-500/20 border border-violet-500/40 px-3 py-1 text-sm font-mono text-violet-300">
          {question.functionName}
        </span>
      </div>

      <CodeBlock code={question.code} />

      <p className="text-lg font-medium">Какой будет результат?</p>

      <div className="grid gap-3 sm:grid-cols-2">
        {question.options.map((option, i) => {
          const isSelected = selected === option;
          const isCorrect = option === question.correctAnswer;
          const showCorrect = showResult && isCorrect;
          const showWrong = showResult && isSelected && !isCorrect;

          return (
            <motion.button
              key={i}
              whileHover={!showResult ? { scale: 1.02 } : {}}
              whileTap={!showResult ? { scale: 0.98 } : {}}
              disabled={showResult}
              onClick={() => onSelect(option)}
              className={cn(
                "relative rounded-xl border p-4 text-left font-mono text-sm transition-all",
                !showResult && "glass glass-hover hover:border-cyan-500/40",
                isSelected && !showResult && "border-cyan-500/50 bg-cyan-500/10",
                showCorrect && "border-emerald-500/50 bg-emerald-500/15 shadow-[0_0_20px_rgba(52,211,153,0.2)]",
                showWrong && "border-red-500/50 bg-red-500/10"
              )}
            >
              <span className="mr-2 text-muted-foreground">{String.fromCharCode(65 + i)}.</span>
              {option}
              {showCorrect && <CheckCircle2 className="absolute right-3 top-3 h-5 w-5 text-emerald-400" />}
              {showWrong && <XCircle className="absolute right-3 top-3 h-5 w-5 text-red-400" />}
            </motion.button>
          );
        })}
      </div>

      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "rounded-xl border p-4",
            selected === question.correctAnswer
              ? "border-emerald-500/30 bg-emerald-500/10"
              : "border-amber-500/30 bg-amber-500/10"
          )}
        >
          <p className="font-medium mb-1">
            {selected === question.correctAnswer ? "Верно!" : "Неверно"}
          </p>
          <p className="text-sm text-muted-foreground">{question.explanation}</p>
        </motion.div>
      )}
    </motion.div>
  );
}
