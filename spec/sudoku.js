
describe('Sudoku', function () {
  it('should be reset with init()', function () {
    var sudoku = new Sudoku;

    expect(sudoku.init()).toEqual(new Sudoku);
  });

  it('should have null value if none inserted', function () {
    var sudoku = new Sudoku;

    var line   = Math.floor(Math.random() * 9);
    var column = Math.floor(Math.random() * 9);

    expect(sudoku.getValue(line, column)).toBeNull();
  });
});
