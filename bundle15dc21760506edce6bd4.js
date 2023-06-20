/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameBoard.js":
/*!**************************!*\
  !*** ./src/gameBoard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function GameBoard() {
  function generateRandomCoordinate() {
    var randomNumber = Math.floor(Math.random() * 100);
    return randomNumber;
  }
  function generateGameBoard() {
    var board = [];
    for (var i = 0; i < 10; i += 1) {
      for (var j = 0; j < 10; j += 1) {
        board.push({
          coordinate: [i, j],
          isPlaced: false,
          isShot: false,
          ship: undefined
        });
      }
    }
    return board;
  }
  function placeShip(startCoordinate, axis, length, board) {
    if (startCoordinate[0] + length > 10 && axis === 'horizontal' || startCoordinate[1] + length > 10 && axis === 'vertical') {
      return 'out of bounds';
    }
    var ship = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(length);
    var items = board;
    var startCell = items.find(function (item) {
      return JSON.stringify(item.coordinate) === JSON.stringify(startCoordinate);
    });
    if (startCell.isPlaced) {
      return 'ship is here already, cannot place ship';
    }
    var cellsToPlace = [startCell];
    if (axis === 'vertical') {
      var _loop = function _loop(i) {
        var adjacentcell = items.find(function (item) {
          return JSON.stringify(item.coordinate) === JSON.stringify([startCell.coordinate[0], startCell.coordinate[1] + i]);
        });
        if (adjacentcell.isPlaced === true) {
          return {
            v: 'ship is here already, cannot place ship'
          };
        }
        cellsToPlace.push(adjacentcell);
      };
      for (var i = 1; i < length; i += 1) {
        var _ret = _loop(i);
        if (_typeof(_ret) === "object") return _ret.v;
      }
    } else if (axis === 'horizontal') {
      var _loop2 = function _loop2(_i) {
        var adjacentcell = items.find(function (item) {
          return JSON.stringify(item.coordinate) === JSON.stringify([startCell.coordinate[0] + _i, startCell.coordinate[1]]);
        });
        if (adjacentcell.isPlaced === true) {
          return {
            v: 'ship is here already, cannot place ship'
          };
        }
        cellsToPlace.push(adjacentcell);
      };
      for (var _i = 1; _i < length; _i += 1) {
        var _ret2 = _loop2(_i);
        if (_typeof(_ret2) === "object") return _ret2.v;
      }
    }
    cellsToPlace.forEach(function (cell) {
      cell.isPlaced = true;
      cell.ship = ship;
    });
    ship.position = cellsToPlace.map(function (cell) {
      return cell.coordinate;
    });
    return {
      ship: ship,
      cellsToPlace: cellsToPlace
    };
  }
  function placeRandomShips(enemyBoard) {
    var ships = [{
      name: 'Carrier',
      length: 5
    }, {
      name: 'Battleship',
      length: 4
    }, {
      name: 'Destroyer',
      length: 3
    }, {
      name: 'Submarine',
      length: 3
    }, {
      name: 'Frigate',
      length: 2
    }];
    for (var i = 0; i < 5; i++) {
      var shipPlaced = false;
      while (!shipPlaced) {
        var randomCoordinate = enemyBoard[generateRandomCoordinate()].coordinate;
        var randomAxis = generateRandomCoordinate() % 2 === 0 ? 'vertical' : 'horizontal';
        var result = placeShip(randomCoordinate, randomAxis, ships[i].length, enemyBoard);
        if (_typeof(result) === 'object') {
          shipPlaced = true;
        }
      }
    }
  }
  function isAllShipsSunk(board, enemyBoard, playerBoard) {
    var enemyShips = enemyBoard.filter(function (item) {
      return item.ship !== undefined;
    });
    var playerShips = playerBoard.filter(function (item) {
      return item.ship !== undefined;
    });
    if (enemyShips.every(function (ship) {
      return ship.ship.sink === true;
    })) {
      board.currentPlayer = board.player.name;
      return true;
    }
    if (playerShips.every(function (ship) {
      return ship.ship.sink === true;
    })) {
      board.currentPlayer = board.enemy.name;
      return true;
    }
    return false;
  }
  function receiveAttackFromCPU(gameBoard) {
    var playerBoard = gameBoard.player.gameBoard;
    var randomCoordinate = generateRandomCoordinate();
    while (playerBoard[randomCoordinate].isShot === true) {
      randomCoordinate = generateRandomCoordinate();
    }
    if (playerBoard[randomCoordinate].ship !== undefined) {
      playerBoard[randomCoordinate].ship.hit();
      playerBoard[randomCoordinate].isShot = true;
    } else {
      playerBoard[randomCoordinate].isShot = true;
    }
    if (gameBoard.currentPlayer === gameBoard.player.name) {
      gameBoard.currentPlayer = gameBoard.enemy.name;
    } else {
      gameBoard.currentPlayer = gameBoard.player.name;
    }
    return {
      randomSpace: playerBoard[randomCoordinate],
      currentPlayer: gameBoard.currentPlayer
    };
  }
  function receiveAttack(coordinate, enemyboard, gameBoard) {
    if (coordinate[0] < 0 || coordinate[0] > 10 || coordinate[1] < 0 || coordinate[1] > 10) {
      return 'out of bounds';
    }
    var objGameBoard = gameBoard;
    var enemyCell = enemyboard.find(function (item) {
      return JSON.stringify(item.coordinate) === JSON.stringify(coordinate);
    });
    if (enemyCell === undefined || enemyCell.isShot) {
      return {
        coordinate: coordinate,
        currentPlayer: objGameBoard.currentPlayer
      };
    }
    if (enemyCell.ship !== undefined) {
      enemyCell.ship.hit();
      enemyCell.isShot = true;
    } else {
      enemyCell.isShot = true;
    }
    if (gameBoard.currentPlayer === objGameBoard.player.name) {
      objGameBoard.currentPlayer = objGameBoard.enemy.name;
    } else {
      objGameBoard.currentPlayer = objGameBoard.player.name;
    }
    return {
      enemyCell: enemyCell,
      currentPlayer: objGameBoard.currentPlayer
    };
  }
  return {
    generateGameBoard: generateGameBoard,
    placeShip: placeShip,
    placeRandomShips: placeRandomShips,
    receiveAttack: receiveAttack,
    receiveAttackFromCPU: receiveAttackFromCPU,
    isAllShipsSunk: isAllShipsSunk
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameBoard);

/***/ }),

/***/ "./src/getUserInput.js":
/*!*****************************!*\
  !*** ./src/getUserInput.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function getValues() {
  var carrierInput = document.getElementById('carrier-input').value;
  var battleShipInput = document.getElementById('battleship-input').value;
  var destroyerInput = document.getElementById('destroyer-input').value;
  var submarineInput = document.getElementById('submarine-input').value;
  var frigateInput = document.getElementById('frigate-input').value;
  var valuesArray = [carrierInput, battleShipInput, destroyerInput, submarineInput, frigateInput];
  var convertedArray = valuesArray.map(function (str) {
    return str.split(',').map(Number);
  });
  var carrierPosition = document.getElementById('carrier-horizontal').checked ? document.getElementById('carrier-horizontal').value : document.getElementById('carrier-vertical').value;
  var battleShipPosition = document.getElementById('battleship-horizontal').checked ? document.getElementById('battleship-horizontal').value : document.getElementById('battleship-vertical').value;
  var destroyerPosition = document.getElementById('destroyer-horizontal').checked ? document.getElementById('destroyer-horizontal').value : document.getElementById('destroyer-vertical').value;
  var submarinePosition = document.getElementById('submarine-horizontal').checked ? document.getElementById('submarine-horizontal').value : document.getElementById('submarine-vertical').value;
  var frigatePosition = document.getElementById('frigate-horizontal').checked ? document.getElementById('frigate-horizontal').value : document.getElementById('frigate-vertical').value;
  return {
    convertedArray: convertedArray,
    carrierPosition: carrierPosition,
    battleShipPosition: battleShipPosition,
    destroyerPosition: destroyerPosition,
    submarinePosition: submarinePosition,
    frigatePosition: frigatePosition
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getValues);

/***/ }),

/***/ "./src/modalWindow.js":
/*!****************************!*\
  !*** ./src/modalWindow.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var modalWindow = function modalWindow() {
  var modal = document.getElementById('myModal');
  var btn = document.getElementById('myBtn');
  var span = document.getElementsByClassName('close')[0];
  btn.addEventListener('click', function () {
    modal.style.display = 'block';
  });
  span.addEventListener('click', function () {
    modal.style.display = 'none';
  });
  window.addEventListener('click', function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modalWindow);

/***/ }),

/***/ "./src/modifyDOM.js":
/*!**************************!*\
  !*** ./src/modifyDOM.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildGameBoard: () => (/* binding */ buildGameBoard),
/* harmony export */   placeChosenShips: () => (/* binding */ placeChosenShips)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _getUserInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getUserInput */ "./src/getUserInput.js");


var newBoard = new _player__WEBPACK_IMPORTED_MODULE_0__["default"]('Player');
var randomBtn = document.getElementById('random-btn');
var form = document.getElementById('form-ship');
var modal = document.getElementById('myModal');
var createShipsBtn = document.getElementById('myBtn');
var getMainContainer = document.getElementById('main-container');
var getEnemyContainer = document.getElementById('enemy-container');
var resetBtn = document.getElementById('reset-btn');
var submitBtn = document.getElementById('submit-btn');
var winContainer = document.getElementById('win-title');
var getRandomSpace = function getRandomSpace(event) {
  setTimeout(function () {
    if (newBoard.gameBoard.isAllShipsSunk(newBoard, newBoard.enemy.gameBoard, newBoard.player.gameBoard)) {
      winContainer.innerHTML = "".concat(newBoard.currentPlayer, " wins");
    }
  }, 0);
  if (!newBoard.player.gameBoard.some(function (item) {
    return item.ship !== undefined;
  })) {
    return;
  }
  var gameBoard = newBoard;
  var getClickedCell = event.target.dataset.id;
  var str = getClickedCell;
  var arr = str.split(',').map(Number);
  var cellFromDataId = gameBoard.enemy.gameBoard.find(function (item) {
    return JSON.stringify(item.coordinate) === JSON.stringify(arr);
  });
  if (cellFromDataId.isPlaced === true) {
    event.target.style.backgroundColor = 'gray';
    cellFromDataId.ship.hit();
  }
  if (cellFromDataId.isShot === true) {} else if (cellFromDataId.isShot === false && cellFromDataId.isPlaced !== true) {
    event.target.style.backgroundColor = 'red';
    gameBoard.gameBoard.receiveAttack(arr, gameBoard.enemy.gameBoard, gameBoard);
    var coordinate = gameBoard.gameBoard.receiveAttackFromCPU(gameBoard).randomSpace.coordinate;
    var coordinateString = Array.isArray(coordinate) ? coordinate.join(',') : coordinate;
    var element = document.querySelector("[data-id=\"".concat(coordinateString, "\"]"));
    element.style.backgroundColor = 'blue';
  }
};
var placeChosenShips = function placeChosenShips(event) {
  if (event.target !== randomBtn) {
    var getValuesFromInput = (0,_getUserInput__WEBPACK_IMPORTED_MODULE_1__["default"])();
    if (newBoard.gameBoard.placeShip(getValuesFromInput.convertedArray[0], getValuesFromInput.carrierPosition, 5, newBoard.player.gameBoard).ship === undefined || newBoard.gameBoard.placeShip(getValuesFromInput.convertedArray[1], getValuesFromInput.battleShipPosition, 4, newBoard.player.gameBoard).ship === undefined || newBoard.gameBoard.placeShip(getValuesFromInput.convertedArray[2], getValuesFromInput.destroyerPosition, 3, newBoard.player.gameBoard).ship === undefined || newBoard.gameBoard.placeShip(getValuesFromInput.convertedArray[3], getValuesFromInput.submarinePosition, 3, newBoard.player.gameBoard).ship === undefined || newBoard.gameBoard.placeShip(getValuesFromInput.convertedArray[4], getValuesFromInput.frigatePosition, 2, newBoard.player.gameBoard).ship === undefined) {
      alert('Invalid ship placement. Try again.');
      var misPlacedShipsnewBoard = newBoard.player.gameBoard.some(function (item) {
        return item.isPlaced === true;
      });
      if (misPlacedShipsnewBoard) {
        misPlacedShipsnewBoard.forEach(function (ship) {
          ship.isPlaced = false;
          ship.ship = undefined;
        });
      }
      return;
    }
  }
  var items = newBoard.player.gameBoard.filter(function (item) {
    return item.isPlaced === true;
  });
  items.forEach(function (item) {
    var coordString = item.coordinate.join(',');
    var cellElement = document.querySelector("[data-id=\"".concat(coordString, "\"]"));
    if (cellElement) {
      cellElement.style.backgroundColor = 'gray';
    }
  });
};
var buildGameBoard = function buildGameBoard() {
  submitBtn.addEventListener('click', function (event) {
    if (form.checkValidity()) {
      placeChosenShips(event);
      newBoard.gameBoard.placeRandomShips(newBoard.enemy.gameBoard);
      if (newBoard.enemy.gameBoard.some(function (item) {
        return item.ship !== undefined;
      }) || newBoard.player.gameBoard.some(function (item) {
        return item.ship !== undefined;
      })) {
        createShipsBtn.disabled = true;
      }
      event.preventDefault();
      form.reset();
      modal.style.display = 'none';
    }
  });
  randomBtn.addEventListener('click', function (event) {
    if (form.checkValidity()) {
      newBoard.gameBoard.placeRandomShips(newBoard.player.gameBoard);
      newBoard.gameBoard.placeRandomShips(newBoard.enemy.gameBoard);
      placeChosenShips(event);
      if (newBoard.enemy.gameBoard.some(function (item) {
        return item.ship !== undefined;
      }) || newBoard.player.gameBoard.some(function (item) {
        return item.ship !== undefined;
      })) {
        createShipsBtn.disabled = true;
      }
      event.preventDefault();
      form.reset();
      modal.style.display = 'none';
    }
  });
  resetBtn.addEventListener('click', function () {
    newBoard = new _player__WEBPACK_IMPORTED_MODULE_0__["default"]('Player');
    var gridCells = document.getElementsByClassName('grid-item');
    Array.from(gridCells).forEach(function (cell) {
      cell.style.backgroundColor = '#ccc';
    });
    createShipsBtn.disabled = false;
    winContainer.innerHTML = '';
  });
  var playerBoard = newBoard.player.gameBoard;
  getMainContainer.style.gridTemplateRows = "repeat(".concat(playerBoard.length / 10, ", 50px)");
  getMainContainer.style.gridTemplateColumns = "repeat(".concat(playerBoard.length / 10, ", 50px)");
  for (var y = 9; y >= 0; y -= 1) {
    for (var x = 0; x < 10; x += 1) {
      var grids = document.createElement('div');
      grids.setAttribute('class', 'grid-item');
      grids.dataset.id = [playerBoard[y * 10 + x].coordinate[1], playerBoard[y * 10 + x].coordinate[0]];
      getMainContainer.appendChild(grids);
    }
  }
  var enemyBoard = newBoard.enemy.gameBoard;
  getEnemyContainer.style.gridTemplateRows = "repeat(".concat(enemyBoard.length / 10, ", 50px)");
  getEnemyContainer.style.gridTemplateColumns = "repeat(".concat(enemyBoard.length / 10, ", 50px)");
  for (var _y = 9; _y >= 0; _y -= 1) {
    for (var _x = 0; _x < 10; _x += 1) {
      var _grids = document.createElement('div');
      _grids.setAttribute('class', 'grid-item');
      _grids.dataset.id = [enemyBoard[_y * 10 + _x].coordinate[1], enemyBoard[_y * 10 + _x].coordinate[0]];
      _grids.addEventListener('click', function (event) {
        return getRandomSpace(event);
      });
      getEnemyContainer.appendChild(_grids);
    }
  }
};


/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameBoard */ "./src/gameBoard.js");

function Player(playerName) {
  var gameBoard = new _gameBoard__WEBPACK_IMPORTED_MODULE_0__["default"]();
  return {
    player: {
      gameBoard: gameBoard.generateGameBoard(),
      name: playerName
    },
    enemy: {
      gameBoard: gameBoard.generateGameBoard(),
      name: 'CPU'
    },
    gameBoard: gameBoard,
    currentPlayer: playerName
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function Ship(length) {
  return {
    length: length,
    hits: 0,
    sink: false,
    position: undefined,
    hit: function hit() {
      if (this.hits >= length) {
        this.sink = true;
      } else {
        this.hits += 1;
        if (this.hits >= length) {
          this.sink = true;
        }
      }
    },
    isSunk: function isSunk() {
      if (this.hits >= this.length) {
        this.sink = true;
      } else {
        this.sink = false;
      }
    }
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.css":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.css ***!
  \**********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
body {
  font-family: Arial, sans-serif;
  background-color: #f5f5fe;
}

#flex-container {
  display: flex;
  justify-content: center;
  margin-left: 10%;
  margin-top: 3%;
}

#main-container,
#enemy-container {
  display: grid;
  width: 700px;
  height: 700px;
  margin: 2rem auto;
  gap: 2px;
  padding-top: 10px;
}

.grid-item {
  width: 50px;
  height: 50px;
  background-color: #ccc;
  border: 1px solid #888;
}

.grid-item:hover {
  background-color: #ddd;
  cursor: crosshair;
}

#ship-container {
  display: flex;
  justify-content: center;
  border-style: solid;
  height: 100px;
}

.ship {
  display: flex;
}

.modal {
  display: none;
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 22% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.ship-input-flex {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

form#form-ship {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

label {
  margin-bottom: 5px;
}

input[type=text] {
  padding: 5px;
  margin-bottom: 5px;
}

input[type=radio] {
  margin-right: 5px;
}

.btn-container {
  display: flex;
  justify-content: center;
  margin-right: -91px;
}

.btn-container button {
  padding: 10px 20px;
  margin-right: 10px;
  font-size: 16px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-container button:hover {
  background-color: #45a049;
}

#win-title {
  display: flex;
  font-size: 24px;
  font-weight: bold;
  position: fixed;
  right: 45.6%;
}

#main-container {
  background-color: transparent;
}

.title-grid-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.player-title,
.cpu-title {
  margin-right: 170px;
  color: #800080;
  font-size: 18px;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
}

.modal-flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.ship-input-flex {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

input[type=text] {
  padding: 5px;
  margin-bottom: 5px;
  width: 200px;
}

.btn-flex {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

#myBtn,
#reset-btn,
#submit-btn,
#random-btn {
  padding: 10px 20px;
  margin-right: 10px;
  font-size: 16px;
  background-color: #f44336;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 4px;
}

#myBtn:hover,
#reset-btn:hover,
#submit-btn:hover,
#random-btn:hover {
  background-color: #d32f2f;
}

#myBtn {
  background-color: #008cba;
}

#myBtn:hover {
  background-color: #00608f;
}

#reset-btn {
  background-color: #f44336;
}

.modal-content {
  background-color: #fefefe;
  margin: 22% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  animation-name: fade;
  animation-duration: 0.5s;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.ship-input-flex {
  display: flex;
  flex-direction: column;
}

form#form-ship {
  display: flex;
  justify-content: space-around;
}

label {
  margin-bottom: 5px;
}

input[type=text] {
  padding: 5px;
  margin-bottom: 5px;
}

input[type=radio] {
  margin-right: 5px;
}

.btn-flex {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

button#submit-btn,
button#random-btn {
  padding: 10px 20px;
  margin-right: 10px;
  font-size: 16px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button#submit-btn:hover,
button#random-btn:hover {
  background-color: #45a049;
}

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.4);
  animation-name: fade;
  animation-duration: 0.5s;
}

.ship-input-flex {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

input[type=text] {
  padding: 5px;
  margin-bottom: 5px;
  width: 200px;
}

.btn-flex {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

button#submit-btn,
button#random-btn {
  padding: 10px 20px;
  margin-right: 10px;
  font-size: 16px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button#submit-btn:hover,
button#random-btn:hover {
  background-color: #45a049;
}

#flex-container {
  display: flex;
  justify-content: center;
}

#main-container {
  margin-left: auto;
  margin-right: auto;
}`, "",{"version":3,"sources":["webpack://./src/styles/main.css"],"names":[],"mappings":"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","sourcesContent":["* {\r\n  box-sizing: border-box;\r\n  padding: 0;\r\n  margin: 0;\r\n}\r\n\r\n@keyframes fade {\r\n  from {\r\n    opacity: 0;\r\n  }\r\n  to {\r\n    opacity: 1;\r\n  }\r\n}\r\n\r\nbody {\r\n  font-family: Arial, sans-serif;\r\n  background-color: #f5f5fe;\r\n}\r\n\r\n#flex-container {\r\n  display: flex;\r\n  justify-content: center;\r\n  margin-left: 10%;\r\n  margin-top: 3%;\r\n}\r\n\r\n#main-container,\r\n#enemy-container {\r\n  display: grid;\r\n  width: 700px;\r\n  height: 700px;\r\n  margin: 2rem auto;\r\n  gap: 2px;\r\n  padding-top: 10px;\r\n}\r\n\r\n.grid-item {\r\n  width: 50px;\r\n  height: 50px;\r\n  background-color: #ccc;\r\n  border: 1px solid #888;\r\n}\r\n\r\n.grid-item:hover {\r\n  background-color: #ddd;\r\n  cursor: crosshair;\r\n}\r\n\r\n#ship-container {\r\n  display: flex;\r\n  justify-content: center;\r\n  border-style: solid;\r\n  height: 100px;\r\n}\r\n\r\n.ship {\r\n  display: flex;\r\n}\r\n\r\n.modal {\r\n  display: none;\r\n  position: absolute;\r\n  z-index: 1;\r\n  left: 0;\r\n  top: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n  overflow: hidden;\r\n  background-color: rgba(0, 0, 0, 0.4);\r\n}\r\n\r\n.modal-content {\r\n  background-color: #fefefe;\r\n  margin: 22% auto;\r\n  padding: 20px;\r\n  border: 1px solid #888;\r\n  width: 80%;\r\n}\r\n\r\n.close {\r\n  color: #aaa;\r\n  float: right;\r\n  font-size: 28px;\r\n  font-weight: bold;\r\n}\r\n\r\n.close:hover,\r\n.close:focus {\r\n  color: black;\r\n  text-decoration: none;\r\n  cursor: pointer;\r\n}\r\n\r\n.ship-input-flex {\r\n  display: flex;\r\n  flex-direction: column;\r\n  margin-bottom: 10px;\r\n}\r\n\r\nform#form-ship {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  justify-content: space-between;\r\n}\r\n\r\nlabel {\r\n  margin-bottom: 5px;\r\n}\r\n\r\ninput[type='text'] {\r\n  padding: 5px;\r\n  margin-bottom: 5px;\r\n}\r\n\r\ninput[type='radio'] {\r\n  margin-right: 5px;\r\n}\r\n\r\n.btn-container {\r\n  display: flex;\r\n  justify-content: center;\r\n  margin-right: -91px;\r\n}\r\n\r\n.btn-container button {\r\n  padding: 10px 20px;\r\n  margin-right: 10px;\r\n  font-size: 16px;\r\n  background-color: #4caf50;\r\n  color: #fff;\r\n  border: none;\r\n  cursor: pointer;\r\n  transition: background-color 0.3s ease;\r\n}\r\n\r\n.btn-container button:hover {\r\n  background-color: #45a049;\r\n}\r\n\r\n#win-title {\r\n  display: flex;\r\n  font-size: 24px;\r\n  font-weight: bold;\r\n  position: fixed;\r\n  right: 45.6%;\r\n}\r\n\r\n#main-container {\r\n  background-color: transparent;\r\n}\r\n\r\n.title-grid-container {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n}\r\n\r\n.player-title,\r\n.cpu-title {\r\n  margin-right: 170px;\r\n  color: #800080;\r\n  font-size: 18px;\r\n  text-transform: uppercase;\r\n  font-weight: bold;\r\n  letter-spacing: 1px;\r\n}\r\n\r\n.modal-flex {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.ship-input-flex {\r\n  display: flex;\r\n  flex-direction: column;\r\n  margin-bottom: 10px;\r\n}\r\n\r\ninput[type='text'] {\r\n  padding: 5px;\r\n  margin-bottom: 5px;\r\n  width: 200px;\r\n}\r\n\r\n.btn-flex {\r\n  display: flex;\r\n  justify-content: center;\r\n  margin-top: 10px;\r\n}\r\n\r\n#myBtn,\r\n#reset-btn,\r\n#submit-btn,\r\n#random-btn {\r\n  padding: 10px 20px;\r\n  margin-right: 10px;\r\n  font-size: 16px;\r\n  background-color: #f44336;\r\n  color: #fff;\r\n  border: none;\r\n  cursor: pointer;\r\n  transition: background-color 0.3s ease;\r\n  border-radius: 4px;\r\n}\r\n\r\n#myBtn:hover,\r\n#reset-btn:hover,\r\n#submit-btn:hover,\r\n#random-btn:hover {\r\n  background-color: #d32f2f;\r\n}\r\n\r\n#myBtn {\r\n  background-color: #008cba;\r\n}\r\n#myBtn:hover {\r\n  background-color: #00608f;\r\n}\r\n#reset-btn {\r\n  background-color: #f44336;\r\n}\r\n\r\n.modal-content {\r\n  background-color: #fefefe;\r\n  margin: 22% auto;\r\n  padding: 20px;\r\n  border: 1px solid #888;\r\n  width: 80%;\r\n  animation-name: fade;\r\n  animation-duration: 0.5s;\r\n}\r\n\r\n.close {\r\n  color: #aaa;\r\n  float: right;\r\n  font-size: 28px;\r\n  font-weight: bold;\r\n}\r\n\r\n.close:hover,\r\n.close:focus {\r\n  color: black;\r\n  text-decoration: none;\r\n  cursor: pointer;\r\n}\r\n\r\n.ship-input-flex {\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\nform#form-ship {\r\n  display: flex;\r\n  justify-content: space-around;\r\n}\r\n\r\nlabel {\r\n  margin-bottom: 5px;\r\n}\r\n\r\ninput[type='text'] {\r\n  padding: 5px;\r\n  margin-bottom: 5px;\r\n}\r\n\r\ninput[type='radio'] {\r\n  margin-right: 5px;\r\n}\r\n\r\n.btn-flex {\r\n  display: flex;\r\n  justify-content: center;\r\n  margin-top: 10px;\r\n}\r\n\r\nbutton#submit-btn,\r\nbutton#random-btn {\r\n  padding: 10px 20px;\r\n  margin-right: 10px;\r\n  font-size: 16px;\r\n  background-color: #4caf50;\r\n  color: #fff;\r\n  border: none;\r\n  cursor: pointer;\r\n  transition: background-color 0.3s ease;\r\n}\r\n\r\nbutton#submit-btn:hover,\r\nbutton#random-btn:hover {\r\n  background-color: #45a049;\r\n}\r\n\r\n.modal {\r\n  display: none;\r\n  position: fixed;\r\n  z-index: 1;\r\n  left: 0;\r\n  top: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n  overflow: hidden;\r\n  background-color: rgba(0, 0, 0, 0.4);\r\n  animation-name: fade;\r\n  animation-duration: 0.5s;\r\n}\r\n\r\n.ship-input-flex {\r\n  display: flex;\r\n  flex-direction: column;\r\n  margin-bottom: 10px;\r\n}\r\n\r\ninput[type='text'] {\r\n  padding: 5px;\r\n  margin-bottom: 5px;\r\n  width: 200px;\r\n}\r\n\r\n.btn-flex {\r\n  display: flex;\r\n  justify-content: center;\r\n  margin-top: 10px;\r\n}\r\n\r\nbutton#submit-btn,\r\nbutton#random-btn {\r\n  padding: 10px 20px;\r\n  margin-right: 10px;\r\n  font-size: 16px;\r\n  background-color: #4caf50;\r\n  color: #fff;\r\n  border: none;\r\n  cursor: pointer;\r\n  transition: background-color 0.3s ease;\r\n}\r\n\r\nbutton#submit-btn:hover,\r\nbutton#random-btn:hover {\r\n  background-color: #45a049;\r\n}\r\n\r\n#flex-container {\r\n  display: flex;\r\n  justify-content: center;\r\n}\r\n\r\n#main-container {\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles/main.css":
/*!*****************************!*\
  !*** ./src/styles/main.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./main.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_main_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/main.css */ "./src/styles/main.css");
/* harmony import */ var _modalWindow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modalWindow */ "./src/modalWindow.js");
/* harmony import */ var _modifyDOM__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modifyDOM */ "./src/modifyDOM.js");



(0,_modifyDOM__WEBPACK_IMPORTED_MODULE_2__.buildGameBoard)();
(0,_modalWindow__WEBPACK_IMPORTED_MODULE_1__["default"])();
})();

/******/ })()
;
//# sourceMappingURL=bundle15dc21760506edce6bd4.js.map