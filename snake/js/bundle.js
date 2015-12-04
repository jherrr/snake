/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	
	  console.log("js loading!");
	
	  var Snake = function(direction, segments) {
	    this.direction = direction;
	    this.segments = segments;
	  };
	
	  Snake.prototype.move = function() {
	    this.segments.forEach( function(segment) {
	      segment.plus(this.direction);
	    });
	  };
	
	  Snake.prototype.turn = function(direction) {
	    this.direction = direction;
	  };
	
	  var Coord = function(row, col) {
	    this.row = row;
	    this.col = col;
	  };
	
	  Coord.prototype.plus = function(direction) {
	    switch (direction) {
	      case "N":
	        this.row -= 1;
	        break;
	      case "E":
	        this.col += 1;
	        break;
	      case "S":
	        this.row += 1;
	        break;
	      case "W":
	        this.col -= 1;
	        break;
	    }
	  };
	
	  Coord.prototype.equals = function(coordinate) {
	    if (this.row === coordinate.row) {
	      if (this.col === coordinate.col) {
	        return true;
	      }
	    }
	    return false;
	  };
	
	  Coord.prototype.isOpposite = function (direction, coordinate) {
	          var copy = new Coord(this.row, this.col);
	          copy.plus(direction);
	          return copy.equals(coordinate);
	  };
	
	  var Board = function() {
	    var segments = [];
	    var coordinates = [[0,0],[0,1],[0,2]];
	
	    for(var x = 0; x < coordinates.length; x++) {
	      var row = coordinates[x][0];
	      var col = coordinates[x][1];
	      segments.push(new Coord(row, col));
	    }
	
	    var snake = new Snake("N", segments);
	
	    this.snake = snake;
	    this.apples = [];
	  };
	
	module.exports = Board;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map