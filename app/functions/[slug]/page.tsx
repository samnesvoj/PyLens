import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Lightbulb } from "lucide-react";
import { getFunctionBySlug, getAllSlugs } from "@/lib/python-functions";
import { ExampleGenerator } from "@/components/ExampleGenerator";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function FunctionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fn = getFunctionBySlug(slug);

  if (!fn) {
    notFound();
  }

  const initialExample = {
    code: fn.defaultCode,
    inputLabel: "Входные данные",
    inputValue: fn.defaultInput,
    outputLabel: "Результат",
    outputValue: fn.defaultOutput,
    steps: fn.defaultSteps,
    visualization: fn.defaultVisualization,
  };

  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/functions"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-cyan-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Назад к списку
        </Link>

        <div className="mb-10">
          <span className="mb-3 inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
            {fn.category}
          </span>
          <h1 className="mb-4 font-mono text-4xl font-bold gradient-text sm:text-5xl">{fn.name}</h1>
          <p className="text-lg text-muted-foreground">{fn.fullDescription}</p>
        </div>

        <ExampleGenerator slug={slug} initialExample={initialExample} />

        <div className="mt-10 glass rounded-2xl p-6">
          <div className="mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-400" />
            <h3 className="text-lg font-semibold">Где применяется</h3>
          </div>
          <ul className="space-y-2">
            {fn.applications.map((app, i) => (
              <li key={i} className="flex items-start gap-2 text-muted-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                {app}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
