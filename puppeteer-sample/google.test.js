describe('Googleでpuppeteerを検索してリポジトリにアクセスする', () => {
  beforeAll(async () => {
    // デフォルトのタイムアウトが5000msなので長めに設定し直す
    jest.setTimeout(30000);
  });

  test('Googleにアクセス', async () => {
    await page.goto('https://google.com');
    await page.screenshot({ path: 'screenshots/1.png', fullPage: true });
  });

  test('検索ワードを入力', async () => {
    await expect(page).toFill('input[name="q"]', 'puppeteer');
    await page.screenshot({ path: 'screenshots/2.png', fullPage: true });
  });

  test('検索ボタンを押して結果表示', async () => {
    await Promise.all([
      expect(page).toClick('input[name="btnK"]'),
      page.waitForNavigation(),
    ]);
    // id=searchの要素が画面にあることをチェック
    await expect(page).toMatchElement('#search');

    await page.screenshot({ path: 'screenshots/3.png', fullPage: true });
  });

  test('Puppeteerのリポジトリを選択して遷移', async () => {
    await Promise.all([
      expect(page).toClick('a[href="https://github.com/puppeteer/puppeteer"]'),
      page.waitForNavigation(),
    ]);
    // `puppeteer/puppeteer`という文字列が画面上にあることをチェック
    await expect(page).toMatch('puppeteer/puppeteer');
    await page.screenshot({ path: 'screenshots/4.png', fullPage: true });
  });
});