var Board = require("./snake.js");

var View = function() {
  this.board = new Board();
  $l("snake");
};
