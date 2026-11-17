import { expect, test, type Page } from '@playwright/test';

async function fillContactForm(page: Page) {
  await page.getByLabel('Full name').fill('Test Visitor');
  await page.getByLabel('Work email').fill('visitor@example.com');
  await page.getByLabel('Project goals').fill('Please share a high-level overview of this test initiative.');
}

test('subpage contact calls to action point to the home contact section', async ({ page }) => {
  const contactCallsToAction = [
    { path: '/innovation', label: 'Start a Conversation' },
    { path: '/solutions/generation', label: 'Contact Our Team' },
    { path: '/solutions/distributed', label: 'Contact Our Team' },
    { path: '/solutions/emerging', label: 'Contact Our Team' },
    { path: '/solutions/retail', label: 'Contact Our Team' },
    { path: '/careers', label: 'Contact Us About Opportunities' },
  ];

  for (const { path, label } of contactCallsToAction) {
    await page.goto(path);
    await expect(page.getByRole('link', { name: label })).toHaveAttribute('href', '/#contact');
  }
});

test('contact submission makes one request on success', async ({ page }) => {
  let requestCount = 0;
  await page.route('**/api/contact', async (route) => {
    requestCount += 1;
    await route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify({ success: true }),
    });
  });

  await page.goto('/');
  await fillContactForm(page);
  await page.getByRole('button', { name: 'Send message' }).click();

  await expect(page.getByText('Thanks! A regional strategist will reach out within one business day.')).toBeVisible();
  await expect.poll(() => requestCount).toBe(1);
});

test('contact submission surfaces an HTML API failure without a browser alert', async ({ page }) => {
  let requestCount = 0;
  await page.route('**/api/contact', async (route) => {
    requestCount += 1;
    await route.fulfill({
      status: 404,
      contentType: 'text/html',
      body: '<!doctype html><title>Not found</title>',
    });
  });

  await page.goto('/');
  await fillContactForm(page);
  await page.getByRole('button', { name: 'Send message' }).click();

  await expect(page.locator('form [role="alert"]')).toContainText(
    'We could not send your message. Please try again later.',
  );
  await expect.poll(() => requestCount).toBe(1);
});

test('the site does not block browser zoom', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('meta[name="viewport"]')).not.toHaveAttribute(
    'content',
    /maximum-scale=1/,
  );
});

test('contact controls remain labelled and reachable at a mobile width', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');

  await expect(page.getByLabel('Full name')).toBeVisible();
  await expect(page.getByLabel('Work email')).toBeVisible();
  await expect(page.getByLabel('Project goals')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Send message' })).toBeVisible();
});
