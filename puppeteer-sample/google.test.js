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
    // id=result-statsの要素に`約 5,880,000 件`と表示されていることをチェック(件数はテストが通るように書き換えてください)
    await expect(page).toMatchElement('#result-stats', { text: '約 6,070,000 件' });
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