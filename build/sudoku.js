(function () {
  'use strict';

  var Sudoku = function () {
    this.init();
  };

  Sudoku.prototype.init = function () {
    this.lines   = [[], [], [], [], [], [], [], [], []];
    this.columns = [[], [], [], [], [], [], [], [], []];
    this.blocks  = [[], [], [], [], [], [], [], [], []];
    this.grid    = [];

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
  };

  Sudoku.prototype.getValue = function (line, column) {
    return this.lines[ line ][ column ].value;
  };

  Sudoku.prototype.getCandidates = function (line, column) {
    return this.lines[ line ][ column ].candidates;
  };

  Sudoku.prototype.addValue = function (value, line, column) {
    this.grid.map(function (cell) {
      if (cell.line === line && cell.column === column) {
        cell.value = value;
      }

      if (cell.line === line || cell.column === column) {
        var position = cell.candidates.indexOf(value);

        if (position != -1) {
          cell.candidates.splice(position, 1);
        }

        if (cell.revocated.indexOf(value) != -1) {
          cell.revocated.push(value);
        }
      }
    });

    return this;
  };

  window.Sudoku = Sudoku;
})();
