
(function() {
  var Lifegame, lifegame;
  Lifegame = function() {
    var self;
    self = this;
    this.width = 20;
    this.height = 20;
    this.field = ko.observableArray();
    this.playing = ko.observable(0);
    this.initialize = function() {
      var row, x, y, _i, _j, _ref, _ref1, _results;
      _results = [];
      for (x = _i = 0, _ref = this.width - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; x = 0 <= _ref ? ++_i : --_i) {
        row = ko.observableArray();
        for (y = _j = 0, _ref1 = this.height - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; y = 0 <= _ref1 ? ++_j : --_j) {
          row.push({
            status: ko.observable("dead"),
            x: x,
            y: y
          });
        }
        _results.push(this.field.push(row));
      }
      return _results;
    };
    this.reverseCell = function(x, y) {
      var status;
      status = self.field()[x]()[y].status();
      if (status === "dead") {
        return self.field()[x]()[y].status("alive");
      } else {
        return self.field()[x]()[y].status("dead");
      }
    };
    this.next = function() {
      var aliveCells, grid, reverseCells, status, x, y, _i, _j, _k, _l, _len, _len1, _ref, _ref1, _ref2, _results;
      reverseCells = [];
      for (x = _i = 0, _ref = this.width - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; x = 0 <= _ref ? ++_i : --_i) {
        for (y = _j = 0, _ref1 = this.height - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; y = 0 <= _ref1 ? ++_j : --_j) {
          aliveCells = 0;
          status = self.field()[x]()[y].status();
          _ref2 = self.adjoinArray(x, y);
          for (_k = 0, _len = _ref2.length; _k < _len; _k++) {
            grid = _ref2[_k];
            if (self.field()[grid.x]()[grid.y].status() === "alive") {
              aliveCells += 1;
            }
          }
          if (status === "dead" && aliveCells === 3) {
            reverseCells.push({
              x: x,
              y: y
            });
          } else if (status === "alive" && aliveCells <= 1) {
            reverseCells.push({
              x: x,
              y: y
            });
          } else if (status === "alive" && aliveCells >= 4) {
            reverseCells.push({
              x: x,
              y: y
            });
          }
        }
      }
      _results = [];
      for (_l = 0, _len1 = reverseCells.length; _l < _len1; _l++) {
        grid = reverseCells[_l];
        _results.push(self.reverseCell(grid.x, grid.y));
      }
      return _results;
    };
    this.adjoinArray = function(x, y) {
      var grid, res, _i, _len;
      res = [
        {
          x: x - 1,
          y: y - 1
        }, {
          x: x,
          y: y - 1
        }, {
          x: x + 1,
          y: y - 1
        }, {
          x: x - 1,
          y: y
        }, {
          x: x + 1,
          y: y
        }, {
          x: x - 1,
          y: y + 1
        }, {
          x: x,
          y: y + 1
        }, {
          x: x + 1,
          y: y + 1
        }
      ];
      for (_i = 0, _len = res.length; _i < _len; _i++) {
        grid = res[_i];
        if (grid.x < 0) {
          grid.x += self.width;
        } else if (grid.x >= self.width) {
          grid.x -= self.width;
        }
        if (grid.y < 0) {
          grid.y += self.height;
        } else if (grid.y >= self.height) {
          grid.y -= self.height;
        }
      }
      return res;
    };
    this.play = function() {
      var arg;
      arg = arguments;
      self.next();
      self.playing(1);
      return self.timerId = setTimeout(arg.callee, 300);
    };
    this.stop = function() {
      self.playing(0);
      return clearTimeout(self.timerId);
    };
    this.timerId = 0;
    return this;
  };
  lifegame = new Lifegame();
  lifegame.initialize();
  return ko.applyBindings(lifegame);
})();
