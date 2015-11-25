!function(window) {
    "use strict";
    var Sudoku = function(grid) {
        var that = this;
        this.init(), grid && 81 === grid.length && grid.forEach(function(value, index) {
            var line = Math.floor(index / 9), column = index % 9;
            value && that.addValue(value, line, column);
        });
    };
    Sudoku.prototype.init = function() {
        this.finished = !1, this.stuck = !1, this.lines = [ [], [], [], [], [], [], [], [], [] ], 
        this.columns = [ [], [], [], [], [], [], [], [], [] ], this.blocks = [ [], [], [], [], [], [], [], [], [] ], 
        this.grid = [], this.eventHandler = {}, this.eventHandler.finded = function() {}, 
        this.eventHandler.finished = function() {}, this.eventHandler.stucked = function() {}, 
        this.eventHandler.candidates = function() {};
        for (var index = 0; 81 > index; index++) {
            var line = Math.floor(index / 9), column = index % 9, block = 3 * Math.floor(line / 3) + Math.floor(column / 3), cell = {
                value: null,
                candidates: [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
                revocated: [],
                line: line,
                column: column,
                block: block,
                index: index
            };
            this.lines[line].push(cell), this.columns[column].push(cell), this.blocks[block].push(cell), 
            this.grid[index] = cell;
        }
        return this;
    }, Sudoku.prototype.on = function(type, callback) {
        return type in this.eventHandler && "function" == typeof callback && (this.eventHandler[type] = callback), 
        this;
    }, Sudoku.prototype.each = function(callback) {
        var that = this;
        return "function" == typeof callback && this.grid.forEach(function(cell) {
            callback.call(that, {
                line: cell.line,
                column: cell.column,
                block: cell.block
            });
        }), this;
    }, Sudoku.prototype.isFinished = function() {
        return this.finished;
    }, Sudoku.prototype.markFinished = function() {
        return this.finished = !0, this.eventHandler.finished.call(this), this;
    }, Sudoku.prototype.isStuck = function() {
        return this.stuck;
    }, Sudoku.prototype.markStuck = function() {
        return this.stuck = !0, this.eventHandler.stucked.call(this), this;
    }, Sudoku.prototype.getValue = function(line, column) {
        return this.lines[line][column].value;
    }, Sudoku.prototype.getCandidates = function(line, column) {
        return this.lines[line][column].candidates;
    }, Sudoku.prototype.addValue = function(value, line, column) {
        var block = this.lines[line][column].block, hasNullValue = !1, that = this;
        return this.lines[line][column].value ? this : (this.grid.map(function(cell) {
            if (cell.line === line && cell.column === column && (cell.value = value, cell.candidates = [], 
            that.eventHandler.finded.call(that, value, {
                line: line,
                column: column,
                block: block
            })), cell.line === line || cell.column === column || cell.block === block) {
                var position = cell.candidates.indexOf(value);
                -1 != position && (cell.candidates.splice(position, 1), that.eventHandler.candidates.call(that, cell.candidates, {
                    line: line,
                    column: column
                })), -1 != cell.revocated.indexOf(value) && cell.revocated.push(value);
            }
            cell.value || (hasNullValue = !0);
        }), hasNullValue || this.markFinished(), this);
    }, Sudoku.prototype.findLonelyCandidate = function() {
        var that = this, count = 0;
        return this.grid.map(function(cell) {
            cell.value || 1 !== cell.candidates.length || (that.addValue(cell.candidates[0], cell.line, cell.column), 
            count++);
        }), count;
    }, Sudoku.prototype.findHiddenSingle = function() {
        var that = this, count = 0;
        return this.grid.map(function(cell) {
            if (!cell.value) {
                var value;
                cell.candidates.forEach(function(candidate) {
                    var testInLines = that.lines[cell.line].filter(function(val) {
                        return -1 != val.candidates.indexOf(candidate);
                    }).length, testInColumns = that.columns[cell.column].filter(function(val) {
                        return -1 != val.candidates.indexOf(candidate);
                    }).length, testInBlocks = that.blocks[cell.block].filter(function(val) {
                        return -1 != val.candidates.indexOf(candidate);
                    }).length;
                    (1 === testInLines || 1 === testInColumns || 1 === testInBlocks) && (value = candidate);
                }), value && (that.addValue(value, cell.line, cell.column), count++);
            }
        }), count;
    }, Sudoku.prototype.next = function() {
        return this.isFinished() || this.findLonelyCandidate() || this.findHiddenSingle() || this.markStuck(), 
        this;
    }, Sudoku.prototype.resolve = function() {
        for (;!this.isFinished() && !this.isStuck(); ) this.next();
        return this;
    }, window.Sudoku = Sudoku;
}(window), function($, Sudoku) {
    "use strict";
    $.fn.sudoku = function(method, value) {
        return this.each(function() {
            var $this = $(this), sudoku = $this.data("sudoku");
            if (!sudoku) {
                $this.data("sudoku", sudoku = new Sudoku($this.data("grid")));
                var $cell = $(document.createElement("div")).addClass("cell"), $candidate = $(document.createElement("div")).addClass("candidate"), $input = $(document.createElement("input")).addClass("value").attr("type", "text");
                sudoku.each(function(position) {
                    for (var value = sudoku.getValue(position.line, position.column), candidates = sudoku.getCandidates(position.line, position.column), classList = [ "line-" + position.line, "column-" + position.column, "block-" + position.block ], $currentCell = $cell.clone().addClass(classList.join(" ")).data(position).appendTo($this), index = 1; 9 >= index; index++) $candidate.clone().addClass("candidate-" + index).text(-1 != candidates.indexOf(index) ? index : null).appendTo($currentCell);
                    $input.clone().data(position).val(value).appendTo($currentCell).on("change", function(event) {
                        var $this = $(this);
                        sudoku.addValue($this.val(), $this.data("line"), $this.data("column"));
                    });
                }).on("finded", function(value, position) {
                    $this.trigger("value:finded", $.extend({}, {
                        value: value
                    }, position));
                }).on("candidates", function(value, position) {
                    $this.trigger("candidates:change", $.extend({}, {
                        candidates: value
                    }, position));
                }).on("finished", function() {
                    $this.trigger("finished");
                }).on("stucked", function() {
                    $this.trigger("stucked");
                });
            }
            method && method in sudoku && sudoku[method](value);
        });
    };
}(window.jQuery, window.Sudoku);