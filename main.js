function initMap() {
    console.log("map init started");
    var canvas = document.getElementById('mainArea');
    var context = canvas.getContext('2d');
    var mapWidth = canvas.width;
    var mapHeight = canvas.height;
    var mapArray = [];

    var widthSquares = mapWidth / 32;
    var heightSquares = mapHeight / 32;
    var treasureAmount = 10;

    InitMapArray(mapArray, widthSquares, heightSquares);
    DrawLand(mapArray, context);
    DrawTreasures(mapArray, context, treasureAmount);
}

function DrawLand(map,context) {
    var grass = new Image();
    grass.src = "Graphics/Tilesets/grass.png";
    var posX = 0;
    var posY = 0;
    grass.onload = function () {
        for (var i = 0; i < map.length; i++) {
            for (var j = 0; j < map[i].length; j++) {

                if (map[i][j] == 0) {
                    context.drawImage(grass, posX, posY, 32, 32);
                }
                posX += 32;

            }
            posX = 0;
            posY += 32;
        }
    }
}

function DrawTreasures(map, context, amount) {
    var sand = new Image();
    sand.src = "Graphics/Tilesets/sand.png";
    var posX = 0;
    var posY = 0;
    
    for (var i = 0; i < amount; i++) {
        var treasurePosX = Math.floor((Math.random() * map[0].length));
        var treasurePosY = Math.floor((Math.random() * map.length));
        map[treasurePosX][treasurePosY] = 1;
    }

    sand.onload = function () {
        for (var i = 0; i < map.length; i++) {
            for (var j = 0; j < map[i].length; j++) {

                if (map[i][j] == 1) {
                    context.drawImage(sand, posX, posY, 32, 32);
                }
                posX += 32;
            }
            posX = 0;
            posY += 32;
        }
    }
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