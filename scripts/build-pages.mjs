import { existsSync } from 'node:fs';
import { mkdir, rename, rm } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const apiDir = path.join(repoRoot, 'src/app/api');
const stashDir = path.join(repoRoot, '.api-routes-stash');
const nextDir = path.join(repoRoot, '.next');
const upgradeRetryDir = path.join(nextDir, 'cache', 'next-agentic-upgrade-retries');
const upgradeRetryStashDir = path.join(repoRoot, '.next-upgrade-retries-stash');
const pagesBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '/ces-ltd.com';

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: repoRoot,
      stdio: 'inherit',
      env: {
        ...process.env,
        GITHUB_PAGES: 'true',
        NEXT_PUBLIC_BASE_PATH: pagesBasePath,
      },
    });
    child.on('error', reject);
    child.on('exit', code => {
      if (code === 0) {
        resolve(undefined);
        return;
      }
      reject(new Error(`${command} ${args.join(' ')} exited with code ${code}`));
    });
  });
}

async function stashApiRoutes() {
  if (!existsSync(apiDir)) {
    return false;
  }
  if (existsSync(stashDir)) {
    await rm(stashDir, { recursive: true, force: true });
  }
  await rename(apiDir, stashDir);
  return true;
}

async function restoreApiRoutes() {
  if (!existsSync(stashDir)) {
    return;
  }
  if (existsSync(apiDir)) {
    await rm(apiDir, { recursive: true, force: true });
  }
  await rename(stashDir, apiDir);
}

async function clearNextCache() {
  // Typecheck/dev leave `.next/dev/types/validator.ts` with imports for
  // `src/app/api/*/route.js`. Static export cannot include those routes, so
  // they are stashed first; a leftover validator then fails `next build`.
  if (!existsSync(nextDir)) {
    return;
  }

  // Next writes its one-time upgrade-notice retry receipt under `.next/cache`.
  // Keeping it lets the command continue when an agent retries after the
  // required acknowledgement, while the rest of the cache is still cleared.
  const hasUpgradeRetry = existsSync(upgradeRetryDir);
  if (hasUpgradeRetry) {
    if (existsSync(upgradeRetryStashDir)) {
      await rm(upgradeRetryStashDir, { recursive: true, force: true });
    }
    await rename(upgradeRetryDir, upgradeRetryStashDir);
  }

  try {
    await rm(nextDir, { recursive: true, force: true });
  } finally {
    if (hasUpgradeRetry) {
      await mkdir(path.dirname(upgradeRetryDir), { recursive: true });
      await rename(upgradeRetryStashDir, upgradeRetryDir);
    }
  }
}

const stashed = await stashApiRoutes();
try {
  await clearNextCache();
  await run('npx', ['next', 'build']);
} finally {
  if (stashed) {
    await restoreApiRoutes();
  }
}
