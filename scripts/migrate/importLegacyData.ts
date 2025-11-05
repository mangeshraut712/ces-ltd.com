import { promises as fs } from 'node:fs';
import path from 'node:path';
import {
  companyInfo,
  globalOffices,
  solutions,
  businessLines,
  serviceCategories,
} from '@/lib/cesData';

export interface LegacyMigrationPayload {
  companyInfo: typeof companyInfo;
  offices: typeof globalOffices;
  solutions: typeof solutions;
  businessLines: typeof businessLines;
  serviceCategories: typeof serviceCategories;
  generatedAt: string;
}

/**
 * Writes a snapshot of the in-repo legacy data to disk so it can be inspected,
 * transformed, or imported into a target database during migration dry-runs.
 */
export async function exportLegacySnapshot(outputDir = 'tmp/migration-snapshots') {
  const payload: LegacyMigrationPayload = {
    companyInfo,
    offices: globalOffices,
    solutions,
    businessLines,
    serviceCategories,
    generatedAt: new Date().toISOString(),
  };

  const directory = path.resolve(process.cwd(), outputDir);
  await fs.mkdir(directory, { recursive: true });

  const filePath = path.join(directory, `legacy-data-${Date.now()}.json`);
  await fs.writeFile(filePath, JSON.stringify(payload, null, 2), 'utf8');

  return filePath;
}

/**
 * Stub function representing the future data-loading pipeline. Implementers
 * should map the legacy payload to the chosen persistence layer (e.g. Prisma,
 * Hasura, Strapi) and apply upsert semantics with transaction safety.
 */
export async function migrateLegacyData() {
  const snapshotPath = await exportLegacySnapshot();
  console.log(
    `[migration] Legacy snapshot exported to ${snapshotPath}. ` +
      'Implement transformation + persistence logic in migrateLegacyData().',
  );
}
