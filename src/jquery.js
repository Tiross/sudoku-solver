(function ($, Sudoku) {
  'use strict';

  $.fn.sudoku = function (method, value) {
    return this.each(function () {
      var $this  = $(this);
      var sudoku = $this.data('sudoku');

      if (!sudoku) {
        $this.data('sudoku', sudoku = new Sudoku($this.data('grid')));

        var $cell = $(document.createElement('div')).addClass('cell');
        var $candidate = $(document.createElement('div')).addClass('candidate');
        var $input = $(document.createElement('input')).addClass('value').attr('type', 'text');

        sudoku
          .each(function (position) {
            var value = sudoku.getValue(position.line, position.column);
            var candidates = sudoku.getCandidates(position.line, position.column);
            var classList = [
              'line-' + position.line,
              'column-' + position.column,
              'block-' + position.block,
            ];
            var $currentCell = $cell.clone().addClass(classList.join(' ')).data(position).appendTo($this);

            for (var index = 1; index <= 9; index++) {
              $candidate
                .clone()
                .addClass('candidate-' + index)
                .text(candidates.indexOf(index) != -1 ? index : null)
                .appendTo($currentCell)
              ;
            }

            $input
              .clone()
              .data(position)
              .val(value)
              .appendTo($currentCell)
              .on('change', function (event) {
                var $this = $(this);

                sudoku.addValue($this.val(), $this.data('line'), $this.data('column'));
              })
            ;
          })
          .on('finded', function (value, position) {
            $this.trigger('value:finded', $.extend({}, {value: value}, position));
          })
          .on('candidates', function (value, position) {
            $this.trigger('candidates:change', $.extend({}, {candidates: value}, position));
          })
          .on('finished', function () {
            $this.trigger('finished');
          })
          .on('stucked', function () {
            $this.trigger('stucked');
          })
        ;
      }

      if (method && method in sudoku) {
        sudoku[ method ](value);
      }
    });
  };
})(window.jQuery, window.Sudoku);
