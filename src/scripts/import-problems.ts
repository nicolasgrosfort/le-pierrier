import { DEFAULT_DB_PROBLEMS, GRADES } from "@/lib/config";
import type { DbProblems } from "@/lib/types";
import { createUUID } from "@/lib/utils";
import { readdir, readFile } from "fs/promises";
import { JSONFilePreset } from "lowdb/node";
import { join } from "path";

async function importProblems(folderPath: string) {
  const problems = await JSONFilePreset<DbProblems>(
    "src/db/problems.json",
    DEFAULT_DB_PROBLEMS,
  );

  const files = await readdir(folderPath);
  const jsonFiles = files.filter((file) => file.endsWith(".json"));

  console.log(`Trouvé ${jsonFiles.length} fichiers JSON à importer...`);

  for (const file of jsonFiles) {
    try {
      const filePath = join(folderPath, file);
      const fileContent = await readFile(filePath, "utf-8");
      const problem = JSON.parse(fileContent);

      const existingIndex = problems.data.problems.findIndex(
        (p) => p.id === problem.id,
      );

      if (
        !problem.grade ||
        Object.keys(problem.holds || {}).length === 0 ||
        GRADES.includes(problem.grade?.toLowerCase()) === false
      ) {
        console.log(`✗ Ignoré (incomplet): ${file}`);
        continue;
      }

      if (existingIndex !== -1) {
        problems.data.problems[existingIndex] = problem;
        console.log(`✓ Mis à jour: ${file}`);
      } else {
        delete problem.rate;
        problem.name = problem.name.trim();
        problem.author = problem.author.trim();
        problem.date = problem.date
          ? new Date(
              problem.date
                .split(".")
                .reverse()
                .map((part: string, index: number) =>
                  index === 1 ? part.padStart(2, "0") : part,
                )
                .join("-"),
            )
              .toISOString()
              .split("T")[0]
          : new Date().toISOString().split("T")[0];
        problem.feet = problem.feet ? "free-feet" : "feet-hand";
        problem.id = createUUID();
        problems.data.problems.push(problem);
        console.log(`✓ Ajouté: ${file}`);
      }
    } catch (error) {
      console.error(`✗ Erreur avec ${file}:`, error);
    }
  }

  await problems.write();
  console.log(
    `\nImportation terminée! ${problems.data.problems.length} problèmes au total.`,
  );
}

const folderPath = process.argv[2] || "src/server/problems";
importProblems(folderPath).catch(console.error);
