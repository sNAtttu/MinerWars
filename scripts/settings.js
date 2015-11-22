console.log('settings.js loaded')

var canvasWidth = 800;
var canvasHeight = 800;
var characterCanvasWidth = canvasWidth;
var characterCanvasHeight = canvasHeight;
var tileSetPath = "Graphics/Tilesets/";

var left = 37;
var up = 38;
var right = 39;
var down = 40;
var dig = 68; // this is the 'd' key
var h = 72; // 'h' key
var c = 67; // 'c' key
var g = 71;

var treasureAmount = 10;

/*
	====================================
		DO NOT EDIT BELOW THIS LINE
	====================================
*/
var playerLeft = new Image();
playerLeft.src = "Graphics/Characters/Player/dwarfLeft.png";

var playerRight = new Image();
playerRight.src = "Graphics/Characters/Player/dwarfRight.png";

var lazor = new Image();
lazor.src = "Graphics/epic/lazor.png";

var chicken = new Image();
chicken.src = "Graphics/Characters/Chicken/chicken.png";

var hole = new Image();
hole.src = tileSetPath + "hole.png";

var sand = new Image();
sand.src = tileSetPath + "sand.png";

var grass = new Image();
grass.src = tileSetPath + "grass.png";

var stone = new Image();
stone.src = tileSetPath + "stone.png";

var canvas = document.getElementById('mainArea');
var characterCanvas = document.getElementById('characterLayer');
var context = canvas.getContext('2d');
var characterContext = characterCanvas.getContext('2d');
canvas.width = canvasWidth;
canvas.height = canvasWidth;
//canvas.style.width =( window.innerWidth -30 - 60) + 'px';
//canvas.style.height = (window.innerHeight -30) + 'px';
characterCanvas.width = characterCanvasWidth;
characterCanvas.height = characterCanvasHeight;
//characterCanvas.style.width = canvas.style.width;
//characterCanvas.style.height = canvas.style.height;
var mapWidth = canvas.width;
var mapHeight = canvas.height;
var mapArray = [];

var widthSquares = mapWidth / 32;
var heightSquares = mapHeight / 32;