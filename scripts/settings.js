console.log('settings.js loaded')

var canvasWidth = 800;
var canvasHeight = 640;
var characterCanvasWidth = canvasWidth;
var characterCanvasHeight = canvasHeight;

var left = 37;
var up = 38;
var right = 39;
var down = 40;
var dig = 68; // this is the 'd' key
var h = 72; // 'h' key
var c = 67; // 'c' key

var treasureAmount = 10;

/*
	====================================
		DO NOT EDIT BELOW THIS LINE
	====================================
*/
var playerLeft = new Image();
playerLeft.src = "Graphics/Characters/Player/dwarfLeft.png"

var playerRight = new Image();
playerRight.src = "Graphics/Characters/Player/dwarfRight.png"

var lazor = new Image();
lazor.src = "Graphics/epic/lazor.png"

var sand = new Image();
sand.src = "Graphics/Tilesets/sand.png";

var grass = new Image();
grass.src = "Graphics/Tilesets/grass.png";

var stone = new Image();
stone.src = "Graphics/Tilesets/stone.png";

var canvas = document.getElementById('mainArea');
var characterCanvas = document.getElementById('characterLayer');
var context = canvas.getContext('2d');
var characterContext = characterCanvas.getContext('2d');
canvas.width = canvasWidth;
canvas.height = canvasWidth;
canvas.style.width =( window.innerWidth -30 - 60) + 'px';
canvas.style.height = (window.innerHeight -30) + 'px';
characterCanvas.width = characterCanvasWidth;
characterCanvas.height = characterCanvasHeight;
characterCanvas.style.width = (window.innerHeight - 30 - 60) + 'px';
characterCanvas.style.height = (window.innerHeight - 30) + 'px';
var mapWidth = canvas.width;
var mapHeight = canvas.height;
var mapArray = [];

var widthSquares = mapWidth / 32;
var heightSquares = mapHeight / 32;