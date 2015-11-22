
describe('Sudoku', function () {
  it('should be reset with init()', function () {
    var sudoku = new Sudoku;

    expect(sudoku.init()).toEqual(new Sudoku);
  });
});
