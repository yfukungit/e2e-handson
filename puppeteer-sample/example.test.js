describe('example', () => {
  beforeAll(async () => {
    await page.goto('https://example.com');
  });

  test('example.comにアクセスできること', async () => {
    const result = await page.title(); // ページのタイトルを取得
    const expected = 'Example Domain';
    expect(result).toBe(expected);
  });
});