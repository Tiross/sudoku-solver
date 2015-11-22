
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

    it('should not be marked finished or stuck', function () {
      var sudoku = new Sudoku;

      expect(sudoku.isFinished()).toBe(false);
      expect(sudoku.isStuck()).toBe(false);
    });

    it('should ignore argument if it\'s not a list of 81 cells', function () {
      expect(new Sudoku([rand()])).toEqual(new Sudoku);
    });

    it('should use argument to add values', function () {
      var sudoku = new Sudoku;
      var value = rand();
      var grid = new Array(81);

      sudoku.addValue(value, 0, 0);

      grid[0] = value;

      expect(new Sudoku(grid)).toEqual(sudoku);
    });
  });

  describe('adding values', function () {
    var sudoku = new Sudoku;

    var value  = rand();
    var line   = rand();
    var column = rand();

    it('should return itself when adding a value', function () {
      expect(sudoku.addValue(value, line, column)).toBe(sudoku);
    });

    it('should now return the new value', function () {
      expect(sudoku.getValue(line, column)).toBe(value);
    });

    it('should not have any candidates on cell with value', function () {
      expect(sudoku.getCandidates(line, column)).toEqual([]);
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

    it('will mark sudoku as finish', function () {
      // jscs:disable
      var grid = [
        0, 5, 9, 7, 1, 6, 3, 8, 2,
        6, 1, 2, 3, 8, 9, 7, 4, 5,
        8, 7, 3, 2, 4, 5, 1, 6, 9,
        3, 8, 7, 9, 6, 4, 5, 2, 1,
        5, 2, 4, 1, 7, 3, 6, 9, 8,
        1, 9, 6, 8, 5, 2, 4, 3, 7,
        9, 6, 5, 4, 2, 1, 8, 7, 3,
        7, 3, 1, 6, 9, 8, 2, 5, 4,
        2, 4, 8, 5, 3, 7, 9, 1, 6,
      ];
      // jscs:enable

      var sudoku = new Sudoku(grid);

      expect(sudoku.isFinished()).toBe(false);
      expect(sudoku.addValue(4, 0, 0).isFinished()).toBe(true);
    });
  });
});
