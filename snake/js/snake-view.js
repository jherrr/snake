var Board = require("./main.js");

var View = function() {
  this.board = new Board();
  $("snake").on("keydown", function(e) {
    e.handleKeyEvent(e);
    // debugger
  });
};

module.exports = View;
