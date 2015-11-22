
var rand = function () {
  return Math.floor(Math.random() * 9);
};

describe('Sudoku', function () {
  describe('start behavior', function () {
    it('should be reset with init()', function () {
      var sudoku = new Sudoku;

      expect(sudoku.init()).toEqual(new Sudoku);
    });

    it('should have null value if none inserted', function () {
      var sudoku = new Sudoku;

      var line   = rand();
      var column = rand();

      expect(sudoku.getValue(line, column)).toBeNull();
    });

    it('should have a full list of candidates at start', function () {
      var sudoku = new Sudoku;

      var line   = rand();
      var column = rand();

      expect(sudoku.getCandidates(line, column)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
  });

  describe('adding values', function () {
    var sudoku = new Sudoku;

    var value  = rand();
    var line   = rand();
    var column = rand();

    it('should return itself when adding a value', function () {
      expect(sudoku.addValue(value, line, column)).teBe(sudoku);
    });

    it('should now return the new value', function () {
      expect(sudoku.getValue(line, column)).toBe(value);
    });

    it('should not have any candidates on cell with value', function () {
      expect(sudoku.getCandidates(line, rand())).toEqual([]);
    });

    it('should not contains value on candidates in same line', function () {
      expect(sudoku.getCandidates(line, rand()).indexOf(value)).toBe(-1);
    });

    it('should not contains value on candidates in same column', function () {
      expect(sudoku.getCandidates(rand(), column).indexOf(value)).toBe(-1);
    });

    // Coupé pour le moment
    xit('should not contains value on candidates in same block', function () {
      var block  = Math.floor(line / 3) * 3 + Math.floor(column / 3);

      var otherLine;
      var otherColumn;

      expect(sudoku.getCandidates(otherLine, otherColumn).indexOf(value)).toBe(-1);
    });
  });
});
