"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, RotateCcw, ChevronRight } from "lucide-react";
import { generateTrainerQuestion } from "@/lib/python-functions";
import { TrainerQuestionCard } from "@/components/TrainerQuestion";
import type { TrainerQuestion } from "@/lib/types";

const TOTAL_QUESTIONS = 10;

export default function TrainerPage() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);
  const [question, setQuestion] = useState<TrainerQuestion>(() => generateTrainerQuestion());

  const handleSelect = (answer: string) => {
    if (showResult) return;
    setSelected(answer);
    setShowResult(true);
    if (answer === question.correctAnswer) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = useCallback(() => {
    if (questionIndex + 1 >= TOTAL_QUESTIONS) {
      setFinished(true);
      return;
    }
    setQuestionIndex((i) => i + 1);
    setQuestion(generateTrainerQuestion());
    setSelected(null);
    setShowResult(false);
  }, [questionIndex]);

  const handleRestart = () => {
    setQuestionIndex(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setFinished(false);
    setQuestion(generateTrainerQuestion());
  };

  const percent = Math.round((score / TOTAL_QUESTIONS) * 100);

  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
          <h1 className="mb-2 text-3xl font-bold sm:text-4xl">
            <span className="gradient-text">Тренажёр</span>
          </h1>
          <p className="text-muted-foreground">Угадай результат выполнения кода Python</p>
        </motion.div>

        {!finished ? (
          <>
            <div className="mb-6 flex items-center justify-between glass rounded-xl px-4 py-3">
              <span className="text-sm text-muted-foreground">
                Вопрос {questionIndex + 1} из {TOTAL_QUESTIONS}
              </span>
              <span className="font-mono text-sm text-cyan-300">
                Счёт: {score} / {questionIndex + (showResult ? 1 : 0)}
              </span>
            </div>

            <div className="mb-4 h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-violet-500"
                initial={{ width: 0 }}
                animate={{ width: `${((questionIndex + (showResult ? 1 : 0)) / TOTAL_QUESTIONS) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <AnimatePresence mode="wait">
              <TrainerQuestionCard
                key={questionIndex}
                question={question}
                selected={selected}
                onSelect={handleSelect}
                showResult={showResult}
              />
            </AnimatePresence>

            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 flex justify-center"
              >
                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 px-6 py-3 font-semibold text-white shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-shadow"
                >
                  {questionIndex + 1 >= TOTAL_QUESTIONS ? "Завершить" : "Следующий вопрос"}
                  <ChevronRight className="h-5 w-5" />
                </button>
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-10 text-center neon-border"
          >
            <Trophy className="mx-auto mb-4 h-16 w-16 text-amber-400" />
            <h2 className="mb-2 text-2xl font-bold">Результат тренировки</h2>
            <p className="mb-6 text-5xl font-bold gradient-text">
              {score} / {TOTAL_QUESTIONS}
            </p>
            <p className="mb-8 text-muted-foreground">
              {percent >= 80
                ? "Отлично! Ты хорошо знаешь функции Python."
                : percent >= 50
                  ? "Неплохо! Продолжай тренироваться."
                  : "Попробуй ещё раз — изучи функции на странице «Функции»."}
            </p>
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-6 py-3 font-medium text-cyan-300 hover:bg-cyan-500/20 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              Начать заново
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
