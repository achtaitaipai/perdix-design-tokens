import z from "zod";

const rulesSchema = z.object({
  tokens: z.record(z.string()),
  patterns: z.record(z.string()),
});

const configSchema = z.object({
  outputPath: z.string(),
  rules: z.union([z.array(rulesSchema), z.string()]),
});

export type Config = z.infer<typeof configSchema>;

export type Rule = z.infer<typeof rulesSchema>;

export const parseConfig = (config: unknown) =>
  configSchema.parse(config) satisfies Config;

export const parseTokens = (token: unknown) =>
  z.array(rulesSchema).parse(token) satisfies Rule[];
