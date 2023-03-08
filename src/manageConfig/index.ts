import { cosmiconfig } from "cosmiconfig";
import { readFileSync } from "fs";
import { glob } from "glob";
import {
  parseConfig,
  parseTokens as parseRules,
  Rule,
  type Config,
} from "./schemas";

// const config = {
//   outputDir: "css",
//   outputFile: "tokens.css",
//   tokens: "tokens/*.json",
// };

export const loadConfig = async () => {
  const explorer = cosmiconfig("perdix");
  const result = await explorer.search();

  if (!result) {
    throw new Error("No configuration file found.");
  }

  try {
    const config = parseConfig(result.config);
    const rules = await loadRules(config);
    return { ...config, rules };
  } catch (error) {
    throw new Error(`Invalid configuration: ${error}`);
  }
};

const loadRules = async ({ rules: globPattern }: Config): Promise<Rule[]> => {
  if (typeof globPattern !== "string") return globPattern satisfies Rule[];
  const rulesPath = await glob(globPattern);
  return rulesPath.flatMap((path) => {
    const file = readFileSync(path, "utf-8");
    try {
      return parseRules(JSON.parse(file)) satisfies Rule[];
    } catch (error) {
      throw new Error(`Invalid file at ${path}: ${error}`);
    }
  });
};
