
var rand = function () {
  return Math.floor(Math.random() * 9);
};

// jscs:disable
var oneMissingGrid = [
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

var hiddenCandidate = [
  3, 0, 0, 0, 0, 0, 0, 0, 0,
  9, 7, 0, 2, 1, 0, 0, 0, 0,
  6, 0, 0, 5, 8, 3, 0, 0, 0,
  2, 0, 0, 0, 0, 0, 9, 0, 0,
  5, 0, 0, 6, 2, 1, 0, 0, 3,
  0, 0, 8, 0, 0, 0, 0, 0, 5,
  0, 0, 0, 4, 3, 5, 0, 0, 2,
  0, 0, 0, 0, 9, 0, 0, 5, 6,
  0, 0, 0, 0, 0, 0, 0, 0, 1,
];

var easyGrid = [
  0, 0, 0, 1, 0, 5, 0, 0, 0,
  1, 4, 0, 0, 0, 0, 6, 7, 0,
  0, 8, 0, 0, 0, 2, 4, 0, 0,
  0, 6, 3, 0, 7, 0, 0, 1, 0,
  9, 0, 0, 0, 0, 0, 0, 0, 3,
  0, 1, 0, 0, 9, 0, 5, 2, 0,
  0, 0, 7, 2, 0, 0, 0, 8, 0,
  0, 2, 6, 0, 0, 0, 0, 3, 5,
  0, 0, 0, 4, 0, 9, 0, 0, 0,
];

var gentleGrid = [
  0, 0, 0, 0, 0, 4, 0, 2, 8,
  4, 0, 6, 0, 0, 0, 0, 0, 5,
  1, 0, 0, 0, 3, 0, 6, 0, 0,
  0, 0, 0, 3, 0, 1, 0, 0, 0,
  0, 8, 7, 0, 0, 0, 1, 4, 0,
  0, 0, 0, 7, 0, 9, 0, 0, 0,
  0, 0, 2, 0, 1, 0, 0, 0, 3,
  9, 0, 0, 0, 0, 0, 5, 0, 7,
  6, 7, 0, 4, 0, 0, 0, 0, 0,
];

var moderateGrid = [
  4, 0, 0, 0, 1, 0, 0, 0, 0,
  0, 0, 0, 3, 0, 9, 0, 4, 0,
  0, 7, 0, 0, 0, 5, 0, 0, 9,
  0, 0, 0, 0, 6, 0, 0, 2, 1,
  0, 0, 4, 0, 7, 0, 6, 0, 0,
  1, 9, 0, 0, 5, 0, 0, 0, 0,
  9, 0, 0, 4, 0, 0, 0, 7, 0,
  0, 3, 0, 6, 0, 8, 0, 0, 0,
  0, 0, 0, 0, 3, 0, 0, 0, 6,
];

var firstTestGrid = [
  0, 7, 6, 0, 1, 0, 0, 4, 3,
  0, 0, 0, 7, 0, 2, 9, 0, 0,
  0, 9, 0, 0, 0, 6, 0, 0, 0,
  0, 0, 0, 0, 6, 3, 2, 0, 4,
  4, 6, 0, 0, 0, 0, 0, 1, 9,
  1, 0, 5, 4, 2, 0, 0, 0, 0,
  0, 0, 0, 2, 0, 0, 0, 9, 0,
  0, 0, 4, 8, 0, 7, 0, 0, 1,
  9, 1, 0, 0, 5, 0, 7, 2, 0,
];

var secondTestGrid = [
  0, 7, 6, 0, 1, 0, 0, 4, 3,
  0, 0, 0, 7, 0, 2, 9, 0, 0,
  0, 9, 0, 0, 0, 6, 0, 0, 0,
  0, 0, 0, 0, 6, 3, 2, 0, 4,
  4, 6, 0, 0, 0, 0, 0, 1, 9,
  1, 0, 5, 4, 2, 0, 0, 0, 0,
  0, 0, 0, 2, 0, 0, 0, 9, 0,
  0, 0, 4, 8, 0, 7, 0, 0, 1,
  9, 1, 0, 0, 5, 0, 7, 2, 0,
];
// jscs:enable

describe('Sudoku', function () {
  describe('start behavior', function () {
    it('should be reset with init()', function () {
      var sudoku = new Sudoku;

      var value  = rand();
      var line   = rand();
      var column = rand();

      expect(sudoku.addValue(value, line, column).init().getValue(line, column)).toBeNull();
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
      var value = rand();
      var grid = new Array(10);

      grid[0] = value;

      var sudoku = new Sudoku(grid);

      expect(sudoku.getValue(0, 0)).toBeNull();
    });

    it('should use argument to add values', function () {
      var value = rand();
      var grid = new Array(81);

      grid[0] = value;

      var sudoku = new Sudoku(grid);

      expect(sudoku.getValue(0, 0)).toEqual(value);
    });
  });

  describe('adding values', function () {
    var sudoku = new Sudoku;

    var value  = rand();
    var line   = rand();
    var column = rand();

    var count = 0;

    sudoku.on('founded', function () {
      count++;
    });

    it('should return itself when adding a value', function () {
      expect(sudoku.addValue(value, line, column)).toBe(sudoku);
    });

    it('should not trigger events', function () {
      expect(count).toBe(0);
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
      var sudoku = new Sudoku(oneMissingGrid);

      expect(sudoku.isFinished()).toBe(false);
      expect(sudoku.addValue(4, 0, 0).isFinished()).toBe(true);
    });
  });

  describe('resolutions, ', function () {
    describe('findLonelyCandidate', function () {
      var sudoku = new Sudoku(oneMissingGrid);
      var count = 0;

      sudoku.on('finded', function () {
        count++;
      });

      it('should return how much values was founded', function () {
        expect(sudoku.findLonelyCandidate()).toBe(1);
      });

      it('should trigger finded event', function () {
        expect(count).toBe(1);
      });

      it('will add value', function () {
        expect(sudoku.getValue(0, 0)).toBe(4);
      });
    });

    describe('findHiddenSingle', function () {
      var sudoku = new Sudoku(hiddenCandidate);
      var count = 0;

      sudoku.on('finded', function () {
        count++;
      });

      it('should return how much values was founded', function () {
        expect(sudoku.findHiddenSingle()).toBe(4);
      });

      it('should trigger finded event', function () {
        expect(count).toBe(4);
      });

      it('will add value', function () {
        expect(sudoku.getValue(0, 1)).toBe(8);
        expect(sudoku.getValue(3, 4)).toBe(5);
        expect(sudoku.getValue(7, 3)).toBe(1);
        expect(sudoku.getValue(8, 1)).toBe(5);
      });
    });

    xdescribe('resolve', function () {
      // Comment tester que la méthode en utilise d'autres
    });
  });

  describe('each', function () {
    it('should iterate on every cell', function () {
      var sudoku = new Sudoku;
      var count = 0;

      sudoku.each(function (position) {
        count++;
      });

      expect(count).toBe(81);
    });
  });

  describe('can resolve', function () {
    it('the easy grid', function () {
      var sudoku = new Sudoku(easyGrid);

      expect(sudoku.resolve().isFinished()).toBe(true);
    });

    xit('the gentle grid', function () {
      var sudoku = new Sudoku(gentleGrid);

      expect(sudoku.resolve().isFinished()).toBe(true);
    });

    xit('the moderate grid', function () {
      var sudoku = new Sudoku(moderateGrid);

      expect(sudoku.resolve().isFinished()).toBe(true);
    });

    it('the first test grid', function () {
      var sudoku = new Sudoku(firstTestGrid);

      expect(sudoku.resolve().isFinished()).toBe(true);
    });

    it('the second test grid', function () {
      var sudoku = new Sudoku(secondTestGrid);

      expect(sudoku.resolve().isFinished()).toBe(true);
    });
  });
});
