# PyLens

**Наглядное изучение функций Python** — интерактивное веб-приложение для школьного проекта (11 класс, информатика).

## Возможности

- 31 функция и метод Python с примерами и визуализацией
- Генерация случайных примеров
- Тренажёр с викториной (10 вопросов)
- Поиск, фильтр по категориям, избранное (localStorage)
- Тёмный современный интерфейс

## Запуск локально

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

## Сборка

```bash
npm run build
npm start
```

## Деплой на Vercel

1. Загрузите проект на GitHub
2. Импортируйте репозиторий на [vercel.com](https://vercel.com)
3. Vercel автоматически определит Next.js и выполнит сборку

Или через CLI:

```bash
npx vercel
```

## Стек

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

## Структура

```
app/           — страницы
components/    — UI-компоненты
lib/           — данные функций и генераторы примеров
```
