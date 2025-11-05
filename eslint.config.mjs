import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    files: [
      "src/app/careers/page.tsx",
      "src/app/careers/senior-full-stack-dotnet-developer/page.tsx",
      "src/app/innovation/page.tsx"
    ],
    rules: {
      "react/no-unescaped-entities": "off"
    }
  }
]);

export default eslintConfig;
