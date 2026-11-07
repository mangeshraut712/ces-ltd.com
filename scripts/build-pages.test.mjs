import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { chmod, cp, mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const scriptsDirectory = path.dirname(fileURLToPath(import.meta.url));
const buildScript = path.join(scriptsDirectory, 'build-pages.mjs');

test('preserves the Next upgrade retry receipt while clearing the build cache', async () => {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'ces-build-pages-'));

  try {
    const tempScriptsDirectory = path.join(tempRoot, 'scripts');
    const apiDirectory = path.join(tempRoot, 'src', 'app', 'api');
    const retryDirectory = path.join(
      tempRoot,
      '.next',
      'cache',
      'next-agentic-upgrade-retries',
    );
    const fakeBinDirectory = path.join(tempRoot, 'bin');
    const retryReceipt = path.join(retryDirectory, 'retry.json');

    await Promise.all([
      mkdir(tempScriptsDirectory, { recursive: true }),
      mkdir(apiDirectory, { recursive: true }),
      mkdir(retryDirectory, { recursive: true }),
      mkdir(fakeBinDirectory, { recursive: true }),
    ]);
    await cp(buildScript, path.join(tempScriptsDirectory, 'build-pages.mjs'));
    await Promise.all([
      writeFile(path.join(apiDirectory, 'route.ts'), 'export {}\n'),
      writeFile(retryReceipt, '{"issuedAt":1}\n'),
      writeFile(
        path.join(fakeBinDirectory, 'npx'),
        '#!/bin/sh\n'
          + 'test -f "$PWD/.next/cache/next-agentic-upgrade-retries/retry.json"\n',
      ),
    ]);
    await chmod(path.join(fakeBinDirectory, 'npx'), 0o755);

    const result = spawnSync(process.execPath, ['scripts/build-pages.mjs'], {
      cwd: tempRoot,
      encoding: 'utf8',
      env: {
        ...process.env,
        PATH: `${fakeBinDirectory}:${process.env.PATH}`,
      },
    });

    assert.equal(result.status, 0, result.stderr);
    assert.equal(await readFile(retryReceipt, 'utf8'), '{"issuedAt":1}\n');
    assert.equal(
      await readFile(path.join(apiDirectory, 'route.ts'), 'utf8'),
      'export {}\n',
    );
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
});
