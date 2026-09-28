import { expect, test } from '@playwright/test';

const moduleIds = [
  'ai-dashboard',
  'iot-dashboard',
  'project-map',
  'project-showcase',
  'sustainability',
  'market-intelligence',
  'web3-nfts',
  'ai-personalization',
  'vr-preview',
] as const;

const errorPagePattern =
  /This page couldn.?t load|Application error: a client-side exception|useDashboardSettings must be used within DashboardSettingsProvider/i;

test.describe('Innovation Launch Module', () => {
  test('clicking Launch Module on each card opens the module without a client error page', async ({
    page,
  }) => {
    const providerErrors: string[] = [];
    page.on('pageerror', (error) => {
      if (errorPagePattern.test(error.message)) {
        providerErrors.push(error.message);
      }
    });

    for (const moduleId of moduleIds) {
      await page.goto('/innovation');
      await page.getByTestId(`launch-module-${moduleId}`).click();

      await expect(page.getByTestId('active-module')).toBeVisible();
      await expect(page.getByTestId('close-module')).toBeVisible();
      await expect(page.locator('body')).not.toHaveText(errorPagePattern);
      expect(providerErrors, `client exception launching ${moduleId}`).toEqual([]);

      if (moduleId === 'ai-dashboard') {
        await expect(page.getByTestId('ai-dashboard')).toBeVisible({ timeout: 15_000 });
        await expect(page.getByText('AI-Powered Predictive Dashboard')).toBeVisible();
      }

      if (moduleId === 'iot-dashboard') {
        await expect(page.getByTestId('iot-dashboard')).toBeVisible({ timeout: 15_000 });
      }
    }
  });
});
