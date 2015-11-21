function initMap() {
    console.log("map init started");
    var canvas = document.getElementById('mainArea');
    var context = canvas.getContext('2d');
    var mapWidth = canvas.width;
    var mapHeight = canvas.height;
    var mapArray = [];

    var widthSquares = mapWidth / 32;
    var heightSquares = mapHeight / 32;

    InitMapArray(mapArray, widthSquares, heightSquares);

    var grass = new Image();
    var sand = new Image();
    grass.src = "Graphics/Tilesets/grass.png";
    sand.src = "Graphics/Tilesets/sand.png";

    grass.onload = drawGrass(context, mapArray, grass);
    sand.onload = drawSand(context, mapArray, sand);

}

function InitMapArray(mapArray, xSquares, ySquares) {
    for (var i = 0; i < xSquares; i++) {
        mapArray[i] = [];
    }
    for (var i = 0; i < ySquares; i++) {
        for (var j = 0; j < xSquares; j++) {
            mapArray[i][j] = 0;
        }
    }
}

function drawSand(context, map, image, posX, posY) {
    var posX = 0;
    var posY = 0;
    for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[i].length; j++) {

            if (map[i][j] == 1) {
                context.drawImage(image, posX, posY, 32, 32);
            }
            posX += 32;
        }
        posX = 0;
        posY += 32;
    }
}

function drawGrass(context, map, image, posX, posY) {
    var posX = 0;
    var posY = 0;
    for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[i].length; j++) {

            if (map[i][j] == 0) {
                context.drawImage(image, posX, posY, 32, 32);
            }
            posX += 32;
        }
        posX = 0;
        posY += 32;
    }
}