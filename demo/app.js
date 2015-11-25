(function ($) {
  'use strict';

  $(function () {
    $('.sudoku')
      .sudoku()
      .on('value:finded', function (event, data) {
        var lineClass   = '.line-' + data.line;
        var columnClass = '.column-' + data.column;
        var blockClass  = '.block-' + data.block;
        var $cell = $(lineClass + columnClass, this);

        $('.value', $cell).val(data.value);
        $('.candidate', $cell).text('');

        $('.candidate-' + data.value, lineClass + ', ' + columnClass + ', ' + blockClass).text('');
      })
      .on('finished', function () {
        var $this = $(this);
        var $title = $this.prev();
        var $status = $('.status', $title);

        $status.removeClass('status-default status-success status-error').addClass('status-success');
      })
      .on('stucked', function () {
        var $this = $(this);
        var $title = $this.prev();
        var $status = $('.status', $title);

        $status.removeClass('status-default status-success status-error').addClass('status-error');
      })
      .each(function () {
        var $this = $(this);
        var $next = $(document.createElement('button')).attr('type', 'button').text('Prochaine étape');
        var $resolve = $(document.createElement('button')).attr('type', 'button').text('Résoudre');
        var $status = $(document.createElement('span')).addClass('status status-default');
        var $title = $this.prev();

        $next.on('click', function () {
          $this.sudoku('next');
        });

        $resolve.on('click', function () {
          $this.sudoku('resolve');
        });

        $title.append([$next, $resolve, $status]);
      })
    ;
  });
})(window.jQuery);
