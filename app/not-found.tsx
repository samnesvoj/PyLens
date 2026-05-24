import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-6xl font-bold gradient-text">404</h1>
      <p className="mb-8 text-muted-foreground">Функция не найдена</p>
      <Link
        href="/functions"
        className="rounded-xl bg-cyan-500/20 border border-cyan-500/40 px-6 py-3 text-cyan-300 hover:bg-cyan-500/30 transition-colors"
      >
        К списку функций
      </Link>
    </div>
  );
}
