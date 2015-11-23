(function (window) {
  'use strict';

  var Sudoku = function (grid) {
    var that = this;

    this.init();

    if (grid && grid.length === 81) {
      grid.forEach(function (value, index) {
        var line   = Math.floor(index / 9);
        var column = index % 9;

        if (value) {
          that.addValue(value, line, column);
        }
      });
    }
  };

  Sudoku.prototype.init = function () {
    this.finished = false;
    this.stuck = false;

    this.lines   = [[], [], [], [], [], [], [], [], []];
    this.columns = [[], [], [], [], [], [], [], [], []];
    this.blocks  = [[], [], [], [], [], [], [], [], []];
    this.grid    = [];

    this.eventHandler = {};
    this.eventHandler.finded = function () {};

    for (var index = 0; index < 81; index++) {
      var line   = Math.floor(index / 9);
      var column = index % 9;
      var block  = Math.floor(line / 3) * 3 + Math.floor(column / 3);

      var cell = {
        value: null,
        candidates: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        revocated: [],
        line: line,
        column: column,
        block: block,
        index: index,
      };

      this.lines[ line ].push(cell);
      this.columns[ column ].push(cell);
      this.blocks[ block ].push(cell);
      this.grid[ index ] = cell;
    }

    return this;
  };

  Sudoku.prototype.on = function (type, callback) {
    if (type in this.eventHandler && 'function' === typeof callback) {
      this.eventHandler[type] = callback;
    }

    return this;
  };

  Sudoku.prototype.each = function (callback) {
    var that = this;

    if ('function' === typeof callback) {
      this.grid.forEach(function (cell) {
        callback.call(that, {line: cell.line, column: cell.column});
      });
    }

    return this;
  };

  Sudoku.prototype.isFinished = function () {
    return this.finished;
  };

  Sudoku.prototype.isStuck = function () {
    return this.stuck;
  };

  Sudoku.prototype.getValue = function (line, column) {
    return this.lines[ line ][ column ].value;
  };

  Sudoku.prototype.getCandidates = function (line, column) {
    return this.lines[ line ][ column ].candidates;
  };

  Sudoku.prototype.addValue = function (value, line, column) {
    var block = this.lines[ line ][ column ].block;
    var hasNullValue = false;

    this.grid.map(function (cell) {
      if (cell.line === line && cell.column === column) {
        cell.value = value;
        cell.candidates = [];
      }

      if (cell.line === line || cell.column === column || cell.block === block) {
        var position = cell.candidates.indexOf(value);

        if (position != -1) {
          cell.candidates.splice(position, 1);
        }

        if (cell.revocated.indexOf(value) != -1) {
          cell.revocated.push(value);
        }
      }

      if (!cell.value) {
        hasNullValue = true;
      }
    });

    this.finished = !hasNullValue;

    return this;
  };

  Sudoku.prototype.findLonelyCandidate = function () {
    var that = this;
    var count = 0;

    this.grid.map(function (cell) {
      if (!cell.value && cell.candidates.length === 1) {
        that.addValue(cell.candidates[0], cell.line, cell.column);

        that.eventHandler.finded.call(that, cell.candidates[0], {line: cell.line, column: cell.column});
        count++;
      }
    });

    return count;
  };

  Sudoku.prototype.findHiddenSingle = function () {
    var that = this;
    var count = 0;

    this.grid.map(function (cell) {
      if (!cell.value) {
        var value;

        cell.candidates.forEach(function (candidate) {
          var testInLines = that.lines[ cell.line ].filter(function (val) {
            return val.candidates.indexOf(candidate) != -1;
          }).length;

          var testInColumns = that.columns[ cell.column ].filter(function (val) {
            return val.candidates.indexOf(candidate) != -1;
          }).length;

          var testInBlocks = that.blocks[ cell.block ].filter(function (val) {
            return val.candidates.indexOf(candidate) != -1;
          }).length;

          if (testInLines === 1 || testInColumns === 1 || testInBlocks === 1) {
            value = candidate;
          }
        });

        if (value) {
          that.addValue(value, cell.line, cell.column);

          that.eventHandler.finded.call(that, value, {line: cell.line, column: cell.column});
          count++;
        }
      }
    });

    return count;
  };

  Sudoku.prototype.resolve = function () {
    while (!this.isFinished() && !this.isStuck()) {
      if (!this.findLonelyCandidate()) {
        if (!this.findHiddenSingle()) {
          this.stuck = true;
        }
      }
    }

    return this;
  };

  window.Sudoku = Sudoku;
})(window);
