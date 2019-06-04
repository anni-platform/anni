// https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md
// await page.screenshot({path: 'integration/screenshots/screenshot.png'});

beforeAll(async () => {
  await page.goto('http://localhost:8080');
  await page.waitForNavigation();
});

test('Home', async () => {
  const pageContent = await page.content();
  expect(pageContent).toMatch('Home');
});

describe('Dashboard', async () => {
  beforeAll(async () => {
    await page.click('a[href="/dashboard/"]');
    await page.waitForSelector('#dashboard-screen');
  });

  test('load empty projects', async () => {
    const pageContent = await page.content();
    expect(pageContent).toMatch('Projects');
    expect(pageContent).toMatch('No projects');
    expect(pageContent).toMatch('Create project');
    await page.screenshot({
      path: 'integration/screenshots/no-projects.png',
    });
  });

  test('create a new project', async () => {
    await page.type('input#projectName', 'Huzzah!');
    await page.click('#create-project-form-button');
    await page.waitForSelector('a[href="/huzzah/"]');
    await page.screenshot({
      path: 'integration/screenshots/create-project.png',
    });
  });

  test('delete a project', async () => {
    await page.click('button[aria-label="Remove Huzzah! project"]');
    await page.waitForFunction(
      () => !document.querySelector('a[href="/huzzah/"]')
    );
    await page.screenshot({
      path: 'integration/screenshots/delete-project.png',
    });
  });
});
