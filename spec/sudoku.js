
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

  it('should have a full list of candidates at start', function () {
    var sudoku = new Sudoku;

    var line   = Math.floor(Math.random() * 9);
    var column = Math.floor(Math.random() * 9);

    expect(sudoku.getCandidates(line, column)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});
