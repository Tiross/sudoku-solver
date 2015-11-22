
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

    it('should not contains value on candidates', function () {
      expect(sudoku.getCandidates(line, column).indexOf(value)).toBe(-1);
      expect(sudoku.getCandidates(rand(), column).indexOf(value)).toBe(-1);
      expect(sudoku.getCandidates(line, rand()).indexOf(value)).toBe(-1);
    });
  });
});
