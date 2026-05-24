"use client";

import { motion } from "framer-motion";
import {
  Target,
  CheckCircle2,
  Cpu,
  BookOpen,
  Users,
  Lightbulb,
} from "lucide-react";

const sections = [
  {
    icon: BookOpen,
    title: "Актуальность проекта",
    content:
      "Python — один из самых популярных языков программирования в мире. Его изучают в школе, на курсах и в университетах. Многим ученикам сложно понять, как работают встроенные функции и методы, потому что в учебнике они описаны только текстом. Интерактивное веб-приложение помогает увидеть результат работы кода наглядно и запомнить материал быстрее.",
  },
  {
    icon: Target,
    title: "Цель проекта",
    content:
      "Разработать интерактивное веб-приложение PyLens, которое помогает школьникам наглядно изучать функции и методы языка Python через примеры кода, визуализацию и тренажёр с вопросами.",
  },
  {
    icon: CheckCircle2,
    title: "Задачи проекта",
    content: [
      "Изучить основные функции и методы Python, используемые в школьной программе.",
      "Спроектировать удобный интерфейс для просмотра примеров и объяснений.",
      "Реализовать генерацию случайных примеров для каждой функции.",
      "Создать тренажёр для проверки знаний.",
      "Разместить приложение в интернете для доступа с любого устройства.",
    ],
  },
  {
    icon: Cpu,
    title: "Используемые технологии",
    content: [
      "Next.js 15 — фреймворк для React-приложений с маршрутизацией App Router.",
      "TypeScript — типизированный JavaScript для надёжности кода.",
      "Tailwind CSS — утилитарные стили для современного дизайна.",
      "Framer Motion — плавные анимации интерфейса.",
      "Lucide React — иконки.",
      "Vercel — платформа для деплоя веб-приложения.",
    ],
  },
  {
    icon: Users,
    title: "Практическая значимость",
    content:
      "Приложение можно использовать на уроках информатики для самостоятельного изучения темы «Встроенные функции Python». Ученики могут повторять материал дома, генерировать новые примеры и проверять себя в тренажёре. Учителю не нужно устанавливать Python на каждый компьютер — достаточно открыть сайт в браузере.",
  },
  {
    icon: Lightbulb,
    title: "Вывод",
    content:
      "В ходе работы было создано веб-приложение PyLens с 31 функцией и методом Python, визуализацией, генератором примеров и тренажёром. Проект показывает, что современные веб-технологии позволяют создавать полезные образовательные инструменты без сложного серверного окружения. Приложение готово к использованию в учебном процессе и может быть развито добавлением новых тем.",
  },
];

export default function AboutPage() {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <h1 className="mb-2 text-3xl font-bold sm:text-4xl">
            <span className="gradient-text">О проекте</span>
          </h1>
          <p className="text-muted-foreground">
            Школьный проект · 11 класс · Информатика · 2025–2026
          </p>
        </motion.div>

        <div className="space-y-6">
          {sections.map((section, i) => {
            const Icon = section.icon;
            return (
              <motion.section
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 sm:p-8"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/15 border border-cyan-500/30">
                    <Icon className="h-5 w-5 text-cyan-400" />
                  </div>
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                </div>
                {Array.isArray(section.content) ? (
                  <ul className="space-y-2">
                    {section.content.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-muted-foreground">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="leading-relaxed text-muted-foreground">{section.content}</p>
                )}
              </motion.section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
