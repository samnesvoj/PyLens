export type Category =
  | "Строки"
  | "Списки"
  | "Словари"
  | "Циклы"
  | "Преобразование типов"
  | "Функциональные инструменты";

export interface StepExplanation {
  title: string;
  description: string;
}

export interface GeneratedExample {
  code: string;
  inputLabel: string;
  inputValue: string;
  outputLabel: string;
  outputValue: string;
  steps: StepExplanation[];
  visualization: {
    before: string[];
    after: string[];
    type: "string-split" | "list-transform" | "dict-transform" | "zip-pair" | "type-convert" | "filter-map" | "simple";
  };
}

export interface PythonFunction {
  slug: string;
  name: string;
  category: Category;
  shortDescription: string;
  fullDescription: string;
  defaultCode: string;
  defaultInput: string;
  defaultOutput: string;
  defaultSteps: StepExplanation[];
  defaultVisualization: GeneratedExample["visualization"];
  applications: string[];
  sampleInput: string;
  sampleOutput: string;
}

export interface TrainerQuestion {
  functionSlug: string;
  functionName: string;
  code: string;
  correctAnswer: string;
  options: string[];
  explanation: string;
}

export const CATEGORIES: Category[] = [
  "Строки",
  "Списки",
  "Словари",
  "Циклы",
  "Преобразование типов",
  "Функциональные инструменты",
];

export const FAVORITES_KEY = "pylens-favorites";
