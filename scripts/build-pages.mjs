import { existsSync } from 'node:fs';
import { rename, rm } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const apiDir = path.join(repoRoot, 'src/app/api');
const stashDir = path.join(repoRoot, '.api-routes-stash');
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

const stashed = await stashApiRoutes();
try {
  await run('npx', ['next', 'build']);
} finally {
  if (stashed) {
    await restoreApiRoutes();
  }
}
