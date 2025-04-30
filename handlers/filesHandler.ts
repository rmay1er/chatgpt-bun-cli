import { readdir } from "node:fs/promises";
import { dirname } from "node:path";

// Получаем путь к директории, где лежит бинарник
const appDir = dirname(process.execPath);
const files = await readdir(appDir);

export const handleFiles = async () => {
  console.log(`Файлы в ${appDir}:\n${files.join("\n")}`);
};
