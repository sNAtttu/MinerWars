﻿function initMap() {
    console.log("map init started");
    var canvas = document.getElementById('mainArea');
    var characterCanvas = document.getElementById('characterLayer');
    var context = canvas.getContext('2d');
    var characterContext = characterCanvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 640;
    canvas.style.width =( window.innerWidth -30) + 'px';
    canvas.style.height = (window.innerHeight -30) + 'px';
    characterCanvas.width = 800;
    characterCanvas.height = 640;
    characterCanvas.style.width = (window.innerHeight - 30) + 'px';
    characterCanvas.style.height = (window.innerHeight - 30) + 'px';
    var mapWidth = canvas.width;
    var mapHeight = canvas.height;
    var mapArray = [];

    var widthSquares = mapWidth / 32;
    var heightSquares = mapHeight / 32;
    var treasureAmount = 10;

    InitMapArray(mapArray, widthSquares, heightSquares);
    DrawLand(mapArray, context);
    DrawTreasures(mapArray, context, treasureAmount);
    SpawnPlayer(mapArray, characterContext, 0, 0)
}

function renderingLoop() {

    QueueNewFrame();
}

function SpawnPlayer(map, context, posX, posY) {
    var player = new Image();
    player.src = "Graphics/Characters/chara.png"
    player.onload = function () {
        for (var i = 0; i < map.length; i++) {
            for (var j = 0; j < map[i].length; j++) {
                if (i == posX) {
                    context.drawImage(player, posX, posY, 32, 32);
                }
                posX += 32;
            }
            posX = 0;
            posY += 32;
        }
    }
}

function DrawLand(map,context) {
    var grass = new Image();
    grass.src = "Graphics/Tilesets/grass.png";
    var posX = 0;
    var posY = 0;
    grass.onload = function () {
        for (var i = 0; i < map.length; i++) {
            for (var j = 0; j < map[i].length; j++) {
                if (map[i][j] == 0 ) {
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
        var treasurePosX = Math.floor((Math.random() * map.length));
        var treasurePosY = Math.floor((Math.random() * map[0].length));
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

function DrawMap(context, map) {

        for (var i = 0; i < map.length; i++) {
            for (var j = 0; j < map[i].length; j++) {

                if (map[i][j] == 0) {
                    context.drawImage(grass, posX, posY, 32, 32);
                }
                if (map[i][j] == 1) {
                    context.drawImage(sand, posX, posY, 32, 32);
                }
                if (map[i][j] == 2) {
                    context.drawImage(player, posX, posY, 32, 32);
                }
                posX += 32;
            }
            posX = 0;
            posY += 32;
        }
}

function QueueNewFrame() {
    if (window.requestAnimationFrame)
        window.requestAnimationFrame(renderingLoop);
    else if (window.msRequestAnimationFrame)
        window.msRequestAnimationFrame(renderingLoop);
    else if (window.webkitRequestAnimationFrame)
        window.webkitRequestAnimationFrame(renderingLoop);
    else if (window.mozRequestAnimationFrame)
        window.mozRequestAnimationFrame(renderingLoop);
    else if (window.oRequestAnimationFrame)
        window.oRequestAnimationFrame(renderingLoop);
    else {
        QueueNewFrame = function () {
        };
        intervalID = window.setInterval(renderingLoop, 16.7);
    }
};