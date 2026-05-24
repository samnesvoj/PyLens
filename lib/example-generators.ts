import type { GeneratedExample } from "./types";
import { formatPythonValue, pickRandom } from "./utils";

type GeneratorFn = () => GeneratedExample;

const WORDS = ["python", "код", "данные", "список", "функция", "строка", "число", "массив"];
const COLORS = ["red", "blue", "green", "yellow", "purple", "orange"];
const NAMES = ["Anna", "Ivan", "Oleg", "Maria", "Dmitry", "Elena"];
const CITIES = ["Москва", "Казань", "Сочи", "Томск", "Омск"];

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomList(length = 5): number[] {
  return Array.from({ length }, () => randomInt(1, 20));
}

export const exampleGenerators: Record<string, GeneratorFn> = {
  len: () => {
    const type = pickRandom(["str", "list", "dict"] as const);
    if (type === "str") {
      const text = pickRandom(WORDS) + " " + pickRandom(WORDS);
      return {
        code: `text = "${text}"\nresult = len(text)`,
        inputLabel: "Строка",
        inputValue: `"${text}"`,
        outputLabel: "Длина",
        outputValue: String(text.length),
        steps: [
          { title: "Вызов len()", description: "Функция len() считает количество символов в строке." },
          { title: "Подсчёт", description: `В строке "${text}" — ${text.length} символов (включая пробелы).` },
        ],
        visualization: { before: [text], after: [String(text.length)], type: "simple" },
      };
    }
    if (type === "list") {
      const arr = randomList(randomInt(3, 6));
      return {
        code: `numbers = ${formatPythonValue(arr)}\nresult = len(numbers)`,
        inputLabel: "Список",
        inputValue: formatPythonValue(arr),
        outputLabel: "Длина",
        outputValue: String(arr.length),
        steps: [
          { title: "Вызов len()", description: "len() возвращает количество элементов в списке." },
          { title: "Результат", description: `В списке ${arr.length} элементов.` },
        ],
        visualization: { before: arr.map(String), after: [String(arr.length)], type: "simple" },
      };
    }
    const keys = pickRandom([["a", "b", "c"], ["name", "age"], ["x", "y", "z", "w"]]);
    const obj: Record<string, number> = {};
    keys.forEach((k) => (obj[k] = randomInt(1, 10)));
    return {
      code: `data = ${formatPythonValue(obj)}\nresult = len(data)`,
      inputLabel: "Словарь",
      inputValue: formatPythonValue(obj),
      outputLabel: "Длина",
      outputValue: String(keys.length),
      steps: [
        { title: "Вызов len()", description: "len() для словаря считает количество пар ключ-значение." },
        { title: "Результат", description: `В словаре ${keys.length} ключей.` },
      ],
      visualization: { before: keys, after: [String(keys.length)], type: "simple" },
    };
  },

  "str-upper": () => {
    const text = pickRandom(WORDS);
    const upper = text.toUpperCase();
    return {
      code: `text = "${text}"\nresult = text.upper()`,
      inputLabel: "Исходная строка",
      inputValue: `"${text}"`,
      outputLabel: "Результат",
      outputValue: `"${upper}"`,
      steps: [
        { title: "Метод upper()", description: "Преобразует все буквы строки в верхний регистр." },
        { title: "Преобразование", description: `"${text}" → "${upper}"` },
      ],
      visualization: { before: [text], after: [upper], type: "simple" },
    };
  },

  "str-lower": () => {
    const text = pickRandom(WORDS).toUpperCase();
    const lower = text.toLowerCase();
    return {
      code: `text = "${text}"\nresult = text.lower()`,
      inputLabel: "Исходная строка",
      inputValue: `"${text}"`,
      outputLabel: "Результат",
      outputValue: `"${lower}"`,
      steps: [
        { title: "Метод lower()", description: "Преобразует все буквы строки в нижний регистр." },
        { title: "Преобразование", description: `"${text}" → "${lower}"` },
      ],
      visualization: { before: [text], after: [lower], type: "simple" },
    };
  },

  "str-split": () => {
    const sep = pickRandom([" ", ",", "-"]);
    const parts = pickRandom([COLORS.slice(0, 3), COLORS.slice(0, 4)]);
    const text = parts.join(sep);
    return {
      code: `text = "${text}"\nresult = text.split("${sep}")`,
      inputLabel: "Строка",
      inputValue: `"${text}"`,
      outputLabel: "Список",
      outputValue: formatPythonValue(parts),
      steps: [
        { title: "Метод split()", description: `Разбивает строку по разделителю "${sep}".` },
        { title: "Результат", description: `Получается список из ${parts.length} элементов.` },
      ],
      visualization: { before: [text], after: parts, type: "string-split" },
    };
  },

  "str-replace": () => {
    const oldW = pickRandom(["cat", "dog", "old", "bad"]);
    const newW = pickRandom(["dog", "cat", "new", "good"]);
    const text = `The ${oldW} is here`;
    const result = text.replace(oldW, newW);
    return {
      code: `text = "${text}"\nresult = text.replace("${oldW}", "${newW}")`,
      inputLabel: "Строка",
      inputValue: `"${text}"`,
      outputLabel: "Результат",
      outputValue: `"${result}"`,
      steps: [
        { title: "Метод replace()", description: `Заменяет "${oldW}" на "${newW}".` },
        { title: "Результат", description: `Новая строка: "${result}"` },
      ],
      visualization: { before: [text], after: [result], type: "simple" },
    };
  },

  "str-strip": () => {
    const word = pickRandom(WORDS);
    const text = `   ${word}   `;
    const result = text.trim();
    return {
      code: `text = "${text}"\nresult = text.strip()`,
      inputLabel: "Строка с пробелами",
      inputValue: `"${text}"`,
      outputLabel: "Результат",
      outputValue: `"${result}"`,
      steps: [
        { title: "Метод strip()", description: "Удаляет пробелы в начале и конце строки." },
        { title: "Результат", description: `Остаётся "${result}" без лишних пробелов.` },
      ],
      visualization: { before: [text], after: [result], type: "simple" },
    };
  },

  "str-find": () => {
    const text = pickRandom(["hello world", "python code", "find me here"]);
    const search = pickRandom(text.split(" "));
    const idx = text.indexOf(search);
    return {
      code: `text = "${text}"\nresult = text.find("${search}")`,
      inputLabel: "Строка",
      inputValue: `"${text}"`,
      outputLabel: "Индекс",
      outputValue: String(idx),
      steps: [
        { title: "Метод find()", description: `Ищет подстроку "${search}" в строке.` },
        { title: "Результат", description: idx >= 0 ? `Найдено на позиции ${idx}.` : "Не найдено (-1)." },
      ],
      visualization: { before: [text, `→ "${search}"`], after: [String(idx)], type: "simple" },
    };
  },

  "list-append": () => {
    const arr = randomList(randomInt(3, 5));
    const val = randomInt(1, 99);
    const result = [...arr, val];
    return {
      code: `numbers = ${formatPythonValue(arr)}\nnumbers.append(${val})`,
      inputLabel: "Список",
      inputValue: formatPythonValue(arr),
      outputLabel: "После append",
      outputValue: formatPythonValue(result),
      steps: [
        { title: "Метод append()", description: `Добавляет элемент ${val} в конец списка.` },
        { title: "Результат", description: "Список увеличился на один элемент." },
      ],
      visualization: { before: arr.map(String), after: result.map(String), type: "list-transform" },
    };
  },

  "list-pop": () => {
    const arr = randomList(randomInt(3, 6));
    const popped = arr[arr.length - 1];
    const result = arr.slice(0, -1);
    return {
      code: `numbers = ${formatPythonValue(arr)}\nremoved = numbers.pop()`,
      inputLabel: "Список",
      inputValue: formatPythonValue(arr),
      outputLabel: "Удалённый элемент",
      outputValue: String(popped),
      steps: [
        { title: "Метод pop()", description: "Удаляет и возвращает последний элемент списка." },
        { title: "Результат", description: `Удалён ${popped}, список: ${formatPythonValue(result)}` },
      ],
      visualization: { before: arr.map(String), after: [...result.map(String), `✕ ${popped}`], type: "list-transform" },
    };
  },

  "list-remove": () => {
    const arr = randomList(5);
    const val = pickRandom(arr);
    const idx = arr.indexOf(val);
    const newArr = [...arr];
    newArr.splice(idx, 1);
    return {
      code: `numbers = ${formatPythonValue(arr)}\nnumbers.remove(${val})`,
      inputLabel: "Список",
      inputValue: formatPythonValue(arr),
      outputLabel: "После remove",
      outputValue: formatPythonValue(newArr),
      steps: [
        { title: "Метод remove()", description: `Удаляет первое вхождение значения ${val}.` },
        { title: "Результат", description: `Элемент ${val} удалён из списка.` },
      ],
      visualization: { before: arr.map(String), after: newArr.map(String), type: "list-transform" },
    };
  },

  "list-sort": () => {
    const arr = randomList(randomInt(4, 6));
    const sorted = [...arr].sort((a, b) => a - b);
    return {
      code: `numbers = ${formatPythonValue(arr)}\nnumbers.sort()`,
      inputLabel: "Список",
      inputValue: formatPythonValue(arr),
      outputLabel: "Отсортированный",
      outputValue: formatPythonValue(sorted),
      steps: [
        { title: "Метод sort()", description: "Сортирует список на месте по возрастанию." },
        { title: "Результат", description: "Элементы расположены от меньшего к большему." },
      ],
      visualization: { before: arr.map(String), after: sorted.map(String), type: "list-transform" },
    };
  },

  sorted: () => {
    const arr = randomList(randomInt(4, 6));
    const result = [...arr].sort((a, b) => a - b);
    return {
      code: `numbers = ${formatPythonValue(arr)}\nresult = sorted(numbers)`,
      inputLabel: "Список",
      inputValue: formatPythonValue(arr),
      outputLabel: "Новый список",
      outputValue: formatPythonValue(result),
      steps: [
        { title: "Функция sorted()", description: "Возвращает новый отсортированный список, исходный не меняется." },
        { title: "Результат", description: `Новый список: ${formatPythonValue(result)}` },
      ],
      visualization: { before: arr.map(String), after: result.map(String), type: "list-transform" },
    };
  },

  sum: () => {
    const arr = randomList(randomInt(3, 6));
    const total = arr.reduce((a, b) => a + b, 0);
    return {
      code: `numbers = ${formatPythonValue(arr)}\nresult = sum(numbers)`,
      inputLabel: "Список",
      inputValue: formatPythonValue(arr),
      outputLabel: "Сумма",
      outputValue: String(total),
      steps: [
        { title: "Функция sum()", description: "Складывает все числа в списке." },
        { title: "Результат", description: `${arr.join(" + ")} = ${total}` },
      ],
      visualization: { before: arr.map(String), after: [String(total)], type: "simple" },
    };
  },

  max: () => {
    const arr = randomList(randomInt(3, 6));
    const m = Math.max(...arr);
    return {
      code: `numbers = ${formatPythonValue(arr)}\nresult = max(numbers)`,
      inputLabel: "Список",
      inputValue: formatPythonValue(arr),
      outputLabel: "Максимум",
      outputValue: String(m),
      steps: [
        { title: "Функция max()", description: "Находит наибольшее значение." },
        { title: "Результат", description: `Наибольшее число — ${m}.` },
      ],
      visualization: { before: arr.map(String), after: [String(m)], type: "simple" },
    };
  },

  min: () => {
    const arr = randomList(randomInt(3, 6));
    const m = Math.min(...arr);
    return {
      code: `numbers = ${formatPythonValue(arr)}\nresult = min(numbers)`,
      inputLabel: "Список",
      inputValue: formatPythonValue(arr),
      outputLabel: "Минимум",
      outputValue: String(m),
      steps: [
        { title: "Функция min()", description: "Находит наименьшее значение." },
        { title: "Результат", description: `Наименьшее число — ${m}.` },
      ],
      visualization: { before: arr.map(String), after: [String(m)], type: "simple" },
    };
  },

  "dict-keys": () => {
    const keys = pickRandom([["name", "age", "city"], ["a", "b", "c"], ["x", "y"]]);
    const obj: Record<string, string | number> = {};
    keys.forEach((k) => (obj[k] = pickRandom([randomInt(1, 30), pickRandom(CITIES), pickRandom(NAMES)])));
    return {
      code: `person = ${formatPythonValue(obj)}\nresult = list(person.keys())`,
      inputLabel: "Словарь",
      inputValue: formatPythonValue(obj),
      outputLabel: "Ключи",
      outputValue: formatPythonValue(keys),
      steps: [
        { title: "Метод keys()", description: "Возвращает все ключи словаря." },
        { title: "Результат", description: `Ключи: ${keys.join(", ")}` },
      ],
      visualization: { before: keys, after: keys, type: "dict-transform" },
    };
  },

  "dict-values": () => {
    const obj = { name: pickRandom(NAMES), age: randomInt(14, 18), city: pickRandom(CITIES) };
    const vals = Object.values(obj);
    return {
      code: `person = ${formatPythonValue(obj)}\nresult = list(person.values())`,
      inputLabel: "Словарь",
      inputValue: formatPythonValue(obj),
      outputLabel: "Значения",
      outputValue: formatPythonValue(vals),
      steps: [
        { title: "Метод values()", description: "Возвращает все значения словаря." },
        { title: "Результат", description: `Значения: ${vals.map((v) => formatPythonValue(v)).join(", ")}` },
      ],
      visualization: { before: Object.keys(obj), after: vals.map((v) => String(v)), type: "dict-transform" },
    };
  },

  "dict-items": () => {
    const obj = { fruit: pickRandom(COLORS), count: randomInt(1, 10) };
    const items = Object.entries(obj).map(([k, v]) => `("${k}", ${formatPythonValue(v)})`);
    return {
      code: `data = ${formatPythonValue(obj)}\nresult = list(data.items())`,
      inputLabel: "Словарь",
      inputValue: formatPythonValue(obj),
      outputLabel: "Пары",
      outputValue: `[${items.join(", ")}]`,
      steps: [
        { title: "Метод items()", description: "Возвращает пары (ключ, значение)." },
        { title: "Результат", description: "Каждый элемент — кортеж из двух значений." },
      ],
      visualization: { before: Object.keys(obj), after: items, type: "dict-transform" },
    };
  },

  "dict-get": () => {
    const obj = { name: pickRandom(NAMES), grade: randomInt(3, 5) };
    const key = pickRandom(["name", "grade", "phone"]);
    const val = (obj as Record<string, unknown>)[key] ?? "None";
    return {
      code: `student = ${formatPythonValue(obj)}\nresult = student.get("${key}")`,
      inputLabel: "Словарь",
      inputValue: formatPythonValue(obj),
      outputLabel: "Значение",
      outputValue: formatPythonValue(val),
      steps: [
        { title: "Метод get()", description: `Безопасно получает значение по ключу "${key}".` },
        { title: "Результат", description: key in obj ? `Найдено: ${formatPythonValue(val)}` : "Ключ не найден → None" },
      ],
      visualization: { before: [key], after: [String(val)], type: "simple" },
    };
  },

  range: () => {
    const start = randomInt(0, 3);
    const end = start + randomInt(3, 6);
    const result = Array.from({ length: end - start }, (_, i) => start + i);
    return {
      code: `result = list(range(${start}, ${end}))`,
      inputLabel: "Диапазон",
      inputValue: `range(${start}, ${end})`,
      outputLabel: "Список",
      outputValue: formatPythonValue(result),
      steps: [
        { title: "Функция range()", description: `Создаёт последовательность от ${start} до ${end - 1}.` },
        { title: "Результат", description: `Список: ${formatPythonValue(result)}` },
      ],
      visualization: { before: [`${start}..${end - 1}`], after: result.map(String), type: "list-transform" },
    };
  },

  enumerate: () => {
    const items = pickRandom([COLORS.slice(0, 3), NAMES.slice(0, 4)]);
    const result = items.map((item, i) => `(${i}, "${item}")`);
    return {
      code: `fruits = ${formatPythonValue(items)}\nresult = list(enumerate(fruits))`,
      inputLabel: "Список",
      inputValue: formatPythonValue(items),
      outputLabel: "С индексами",
      outputValue: `[${result.join(", ")}]`,
      steps: [
        { title: "Функция enumerate()", description: "Добавляет индекс к каждому элементу." },
        { title: "Результат", description: "Получаются пары (номер, элемент)." },
      ],
      visualization: { before: items, after: result, type: "zip-pair" },
    };
  },

  zip: () => {
    const names = NAMES.slice(0, 3);
    const scores = names.map(() => randomInt(3, 5));
    const pairs = names.map((n, i) => `("${n}", ${scores[i]})`);
    return {
      code: `names = ${formatPythonValue(names)}\nscores = ${formatPythonValue(scores)}\nresult = list(zip(names, scores))`,
      inputLabel: "Два списка",
      inputValue: `${formatPythonValue(names)} + ${formatPythonValue(scores)}`,
      outputLabel: "Пары",
      outputValue: `[${pairs.join(", ")}]`,
      steps: [
        { title: "Функция zip()", description: "Объединяет элементы двух списков попарно." },
        { title: "Результат", description: "Каждая пара — кортеж из двух значений." },
      ],
      visualization: { before: [...names, "➕", ...scores.map(String)], after: pairs, type: "zip-pair" },
    };
  },

  map: () => {
    const arr = randomList(4);
    const doubled = arr.map((x) => x * 2);
    return {
      code: `numbers = ${formatPythonValue(arr)}\nresult = list(map(lambda x: x * 2, numbers))`,
      inputLabel: "Список",
      inputValue: formatPythonValue(arr),
      outputLabel: "×2",
      outputValue: formatPythonValue(doubled),
      steps: [
        { title: "Функция map()", description: "Применяет функцию к каждому элементу." },
        { title: "Результат", description: "Каждый элемент умножен на 2." },
      ],
      visualization: { before: arr.map(String), after: doubled.map(String), type: "filter-map" },
    };
  },

  filter: () => {
    const arr = randomList(6);
    const filtered = arr.filter((x) => x % 2 === 0);
    return {
      code: `numbers = ${formatPythonValue(arr)}\nresult = list(filter(lambda x: x % 2 == 0, numbers))`,
      inputLabel: "Список",
      inputValue: formatPythonValue(arr),
      outputLabel: "Чётные",
      outputValue: formatPythonValue(filtered),
      steps: [
        { title: "Функция filter()", description: "Оставляет только элементы, прошедшие проверку." },
        { title: "Результат", description: "Остались только чётные числа." },
      ],
      visualization: { before: arr.map(String), after: filtered.map(String), type: "filter-map" },
    };
  },

  lambda: () => {
    const a = randomInt(1, 10);
    const b = randomInt(1, 10);
    const result = a + b;
    return {
      code: `add = lambda x, y: x + y\nresult = add(${a}, ${b})`,
      inputLabel: "Аргументы",
      inputValue: `${a}, ${b}`,
      outputLabel: "Сумма",
      outputValue: String(result),
      steps: [
        { title: "Lambda-функция", description: "Анонимная функция для коротких операций." },
        { title: "Вызов", description: `add(${a}, ${b}) = ${result}` },
      ],
      visualization: { before: [String(a), String(b)], after: [String(result)], type: "simple" },
    };
  },

  int: () => {
    const str = String(randomInt(10, 999));
    return {
      code: `text = "${str}"\nresult = int(text)`,
      inputLabel: "Строка",
      inputValue: `"${str}"`,
      outputLabel: "Число",
      outputValue: str,
      steps: [
        { title: "Функция int()", description: "Преобразует строку в целое число." },
        { title: "Результат", description: `"${str}" → ${str} (тип int)` },
      ],
      visualization: { before: [str], after: [str], type: "type-convert" },
    };
  },

  str: () => {
    const num = randomInt(1, 100);
    return {
      code: `number = ${num}\nresult = str(number)`,
      inputLabel: "Число",
      inputValue: String(num),
      outputLabel: "Строка",
      outputValue: `"${num}"`,
      steps: [
        { title: "Функция str()", description: "Преобразует значение в строку." },
        { title: "Результат", description: `${num} → "${num}"` },
      ],
      visualization: { before: [String(num)], after: [`"${num}"`], type: "type-convert" },
    };
  },

  float: () => {
    const str = (randomInt(1, 99) + randomInt(1, 99) / 100).toFixed(2);
    return {
      code: `text = "${str}"\nresult = float(text)`,
      inputLabel: "Строка",
      inputValue: `"${str}"`,
      outputLabel: "Дробное",
      outputValue: str,
      steps: [
        { title: "Функция float()", description: "Преобразует строку в число с плавающей точкой." },
        { title: "Результат", description: `"${str}" → ${str}` },
      ],
      visualization: { before: [str], after: [str], type: "type-convert" },
    };
  },

  list: () => {
    const str = pickRandom(WORDS);
    const result = str.split("");
    return {
      code: `text = "${str}"\nresult = list(text)`,
      inputLabel: "Строка",
      inputValue: `"${str}"`,
      outputLabel: "Список символов",
      outputValue: formatPythonValue(result),
      steps: [
        { title: "Функция list()", description: "Преобразует итерируемый объект в список." },
        { title: "Результат", description: "Строка разбивается на отдельные символы." },
      ],
      visualization: { before: [str], after: result, type: "string-split" },
    };
  },

  tuple: () => {
    const arr = pickRandom([COLORS.slice(0, 3), COLORS.slice(0, 2), ["a", "b", "c"]]);
    return {
      code: `items = ${formatPythonValue(arr)}\nresult = tuple(items)`,
      inputLabel: "Список",
      inputValue: formatPythonValue(arr),
      outputLabel: "Кортеж",
      outputValue: `(${arr.map((a) => `"${a}"`).join(", ")})`,
      steps: [
        { title: "Функция tuple()", description: "Создаёт неизменяемый кортеж из списка." },
        { title: "Результат", description: "Кортеж нельзя изменить после создания." },
      ],
      visualization: { before: arr, after: arr.map((a) => `(${a})`), type: "list-transform" },
    };
  },

  set: () => {
    const arr = [...randomList(4), ...randomList(2).slice(0, 2)];
    const unique = [...new Set(arr)].sort((a, b) => a - b);
    return {
      code: `numbers = ${formatPythonValue(arr)}\nresult = set(numbers)`,
      inputLabel: "Список",
      inputValue: formatPythonValue(arr),
      outputLabel: "Множество",
      outputValue: `{${unique.join(", ")}}`,
      steps: [
        { title: "Функция set()", description: "Удаляет дубликаты, создаёт множество." },
        { title: "Результат", description: "Остаются только уникальные значения." },
      ],
      visualization: { before: arr.map(String), after: unique.map(String), type: "list-transform" },
    };
  },
};

export function generateExample(slug: string): GeneratedExample {
  const generator = exampleGenerators[slug];
  if (!generator) {
    throw new Error(`No generator for slug: ${slug}`);
  }
  return generator();
}
