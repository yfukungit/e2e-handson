const { add } = require('./calc');

describe('足し算のテスト', () => {
  test('1と2を渡すと3が返ること', () => {
    expect(add(1, 2)).toBe(3);
  });
});