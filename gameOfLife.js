'use strict';
var lifeBoard = (function() {
  var publicAPI;
  var xsize = 20;
  var ysize = 20;
  var Board = [];
  var dead = 0;
  var alive = 1;

  function _neighbors(Board, x, y) {
    var n = 0;
    for (var dx = -1; dx <= 1; dx += 1) {
      for (var dy = -1; dy <= 1; dy += 1) {
        if ((dx === 0) &&  (dy === 0)) {
          continue;
        }
        var ax = x + dx;
        var ay = y + dy;
        if ((ax < 0 || ay < 0) || (ax > (xsize)) || (ay > (ysize))) {
          continue;
        } else if (Board[ax][ay] === alive) {
          n += 1;
        } 
      }
    }
    return n;
  }

  function _kill(newBoard, x,y) {
    if (newBoard[x][y] === alive) {
      newBoard[x][y] = dead;
    }    
  }

  function _makeLive(newBoard, x,y) {
    if (newBoard[x][y] === dead) {
      newBoard[x][y] = alive;
    }
  }

  function _nextStep(newBoard) {
    var cell, n;
    for (var x = 0; x <= xsize; x += 1) {
      for (var y = 0; y <= ysize; y += 1) {
        cell = Board[x][y];
        n = _neighbors(Board, x,y);
        if ( n === 3) {
          _makeLive(newBoard, x,y);
        } else if ((cell === alive) && (n === 2)) {
          _makeLive(newBoard, x,y);
        } else {
          _kill(newBoard, x, y); 
        }
      }
    }
  }

  function _drawBoard(newBoard) {
    var Text = "";
    for (var y = 0; y <= ysize; y += 1) {
      for (var x = 0; x <= xsize; x += 1) {
        Text += newBoard[x][y] === alive ? "o":"_";
      }
      Text += "<br/>";
    }
    document.getElementById("board").innerHTML = Text;
    Board = newBoard.slice(0);
  }

  function main() {
    // *** Change this variable to choose a different board setup from below
    //var url = window.location.pathname;
    //var filename = url.substring(url.lastIndexOf('/')+1);
    //filename = filename.substring(0, filename.indexOf('.'));  
    var BoardSetup = "flower";
    Board[xsize] = 0;
    for (var x = 0; x <= xsize; x += 1) {

      Board[x] = [0];
      for (var y = 0; y <= ysize; y += 1) {
        Board[x][y] = 0;
      }
    }

    if (BoardSetup === "blinker") {
      Board[1][0] = 1;
      Board[1][1] = 1;
      Board[1][2] = 1;
    } else if (BoardSetup === "glider") {
      Board[2][0] = 1;
      Board[2][1] = 1;
      Board[2][2] = 1;
      Board[1][2] = 1;
      Board[0][1] = 1;
    } else if (BoardSetup === "flower") {
      Board[4][6] = 1;
      Board[5][6] = 1;
      Board[6][6] = 1;
      Board[7][6] = 1;
      Board[8][6] = 1;
      Board[9][6] = 1;
      Board[10][6] = 1;
      Board[4][7] = 1;
      Board[6][7] = 1;
      Board[8][7] = 1;
      Board[10][7] = 1;
      Board[4][8] = 1;
      Board[5][8] = 1;
      Board[6][8] = 1;
      Board[7][8] = 1;
      Board[8][8] = 1;
      Board[9][8] = 1;
      Board[10][8] = 1;
    }

    _drawBoard(Board);
    document.getElementById("nextButton").addEventListener("click", lifeBoard.nextHandler);
  }

  function nextHandler() {
    var newBoard = [];
    for (var x = 0; x <= xsize; x += 1) {

      newBoard[x] = [];
      for (var y = 0; y <= ysize; y += 1) {
        newBoard[x][y] = Board[x][y];
      }
    }
    _nextStep(newBoard); 
    _drawBoard(newBoard);
  }

  publicAPI = {
    main: main,
    nextHandler: nextHandler
  };
  return publicAPI;
})();

window.onload = lifeBoard.main;

