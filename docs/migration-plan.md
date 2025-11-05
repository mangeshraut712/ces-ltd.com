# Legacy Data Migration Plan

This document captures the initial runbook for lifting structured content from the historical CES Ltd. site into the new platform.

## Preparation
- Confirm the target persistence layer (e.g., Postgres + Prisma, headless CMS) and provision dev/test environments with rollback support.
- Gather full exports of legacy content: solutions, services, office locations, news, careers, multimedia assets, translations.
- Normalize input files to JSON/CSV and store raw snapshots under `data/legacy/` (keep read-only).

## Migration Workflow
1. Run `exportLegacySnapshot()` in `scripts/migrate/importLegacyData.ts` to produce a baseline JSON snapshot from repository seed data.
2. Extend `migrateLegacyData()` with transformation logic that maps legacy records into the new schema. Use idempotent upserts within a transaction.
3. Log transformation summaries and write verification reports (counts, checksums, missing fields) to `tmp/migration-reports/`.
4. Execute automated validation (unit tests + smoke queries) to confirm migrated entities are queryable by APIs/pages.
5. Upon approval, promote the migration script to production, tagging the repo and storing the final snapshot + report.

## Open Questions
- Which CMS/database will own the primary content going forward?
- Are historical media assets available in a centralized repository?
- What translation sources are available for Japanese and Hindi variants?
- Who signs off on data completeness before cutover?
