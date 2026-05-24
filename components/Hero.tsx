"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Shuffle, ListOrdered, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Sparkles,
    title: "Наглядные примеры",
    description: "Каждая функция показана с кодом, визуализацией и пошаговым объяснением.",
    color: "cyan",
  },
  {
    icon: Shuffle,
    title: "Случайная генерация задач",
    description: "Кнопка «Сгенерировать пример» создаёт новые задачи каждый раз.",
    color: "violet",
  },
  {
    icon: ListOrdered,
    title: "Пошаговое объяснение",
    description: "Разбираем работу функции шаг за шагом — понятно даже новичку.",
    color: "emerald",
  },
  {
    icon: GraduationCap,
    title: "Подходит для изучения Python",
    description: "31 функция и метод — всё, что нужно для школьного курса информатики.",
    color: "blue",
  },
];

const colorMap: Record<string, string> = {
  cyan: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30 text-cyan-400",
  violet: "from-violet-500/20 to-violet-500/5 border-violet-500/30 text-violet-400",
  emerald: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30 text-emerald-400",
  blue: "from-blue-500/20 to-blue-500/5 border-blue-500/30 text-blue-400",
};

export function Hero() {
  return (
    <section className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm text-cyan-300"
          >
            <Sparkles className="h-4 w-4" />
            Школьный проект · 11 класс · Информатика
          </motion.div>

          <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="gradient-text neon-text-cyan">PyLens</span>
          </h1>
          <p className="mx-auto mb-6 max-w-2xl text-xl text-muted-foreground sm:text-2xl">
            Наглядное изучение функций Python
          </p>
          <p className="mx-auto mb-10 max-w-3xl text-base text-muted-foreground/80 sm:text-lg">
            Интерактивное веб-приложение для наглядного изучения функций и методов языка Python.
            Выбирай функцию, смотри пример, генерируй новые задачи и тренируйся в режиме викторины.
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/functions"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 px-8 py-4 text-lg font-semibold text-white shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-shadow hover:shadow-[0_0_40px_rgba(34,211,238,0.6)]"
            >
              Начать изучение
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className={cn(
                  "glass glass-hover rounded-2xl p-6 bg-gradient-to-br border",
                  colorMap[feature.color]
                )}
              >
                <Icon className={cn("mb-4 h-8 w-8", colorMap[feature.color].split(" ").pop())} />
                <h3 className="mb-2 font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
