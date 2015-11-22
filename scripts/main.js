﻿requirejs(["settings"], function(util) {

    console.log("map init started");

    var gameData = {
        'treaseureLocations': [],
        'stoneLocations': [],
        'stoneAmount': 8,
        'playerPosition': {},
        'treasureAmount': treasureAmount,
        'lazors': { 'maxLazors': 20, 'lazors': 10 },
        'playerData':{'name':'Santoro', 'direction':'left'}
    };    

    InitMapArray(mapArray, widthSquares, heightSquares);
    DrawLand(mapArray, context);
    DrawTerrain(mapArray, context, gameData.stoneAmount);
    DrawTreasures(mapArray, context, gameData.treasureAmount);
    $('#lazorStatus').text(gameData.lazors.lazors + ' / ' + gameData.lazors.maxLazors + ' LAZORS');

    playerLeft.onload = function () {
        var midPoint = Math.floor(mapArray.length / 2);
        setPlayerPosition(midPoint, midPoint);
    };
    
    function renderingLoop() {

        QueueNewFrame();
    }

    function setPlayerPosition(posX, posY) {
        gameData.playerPosition.posX = posX;
        gameData.playerPosition.posY = posY;
        clearCharacterCanvas();
        var a = gameData.playerData.direction === 'right' ? playerRight : playerLeft;
        characterContext.drawImage(a, posX * 32, posY * 32, 32, 32);
        
    }

    function DrawLand(map,context) {
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

    function DrawTerrain(map, context, stones) {

        var posX = 0;
        var posY = 0;
        for (var i = 0; i < stones; i++) {
            var stonePosX = Math.floor((Math.random() * map.length));
            var stonePosY = Math.floor((Math.random() * map[0].length));
            map[stonePosX][stonePosY] = 2;
            gameData.stoneLocations.push({ 'posX': stonePosX, 'posY': stonePosY });
        }
        stone.onload = function () {

            for (var i = 0; i < map.length; i++) {
                for (var j = 0; j < map[i].length; j++) {
                    if (map[i][j] == 2) {
                        context.drawImage(stone, posX, posY, 32, 32);
                    }
                    posX += 32;
                }
                posX = 0;
                posY += 32;
            }
        }     
    }

    function DrawTreasures(map, context, amount) {
        var posX = 0;
        var posY = 0;
        
        for (var i = 0; i < amount; i++) {
            var treasurePosX = Math.floor((Math.random() * map.length));
            var treasurePosY = Math.floor((Math.random() * map[0].length));
            map[treasurePosX][treasurePosY] = 1;
            gameData.treaseureLocations.push({'posX': treasurePosX, 'posY': treasurePosY});

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
        for (var i = 0; i < ySquares; i++) {
            mapArray[i] = [];
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
                        context.drawImage(playerLeft, posX, posY, 32, 32);
                    }
                    posX += 32;
                }
                posX = 0;
                posY += 32;
            }
    }

    function treasureFound() {
        console.log('treasure has been found!')
    }

    function digTreasure() {
        var playerPosX = gameData.playerPosition.posX;
        var playerPosY = gameData.playerPosition.posY;
        var arrLength = gameData.treaseureLocations.length;

        for (var i = 0; i < arrLength; i++) {
            if (playerPosX === gameData.treaseureLocations[i].posX &&
                playerPosY === gameData.treaseureLocations[i].posY) {
                treasureFound();
            }
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

    function clearCharacterCanvas() {
        characterContext.clearRect(0, 0, characterCanvasWidth, characterCanvasHeight); //clear the canvas
    }

    function shootLazor() {
        if (gameData.lazors.lazors === 0) return false;
        gameData.lazors.lazors = parseInt(gameData.lazors.lazors) - 1;
        console.log(gameData.lazors.lazors)
        var r1, r2, a = 0, b = 0;
        r1 = Math.floor(Math.random() * 3) - 1;
        r2 = Math.floor(Math.random() * 3) - 1;
        for (var i = 0; i < 8; i++) {
            r1 < 0 ? a = -i : a = +i;
            r2 < 0 ? b = -i : b = +i;
            characterContext.drawImage(lazor, (gameData.playerPosition.posX + (r1 + a)) * 32, (gameData.playerPosition.posY + (r2 + b)) * 32, 32, 32);    
            window.setTimeout(function() {
                clearCharacterCanvas();
            }, 200);

        }
        window.setTimeout(function() {
            setPlayerPosition(gameData.playerPosition.posX, gameData.playerPosition.posY);
        }, 200);
        
        $('#lazorStatus').text(gameData.lazors.lazors + ' / ' + gameData.lazors.maxLazors + ' LAZORS');
        
    }
    function CheckObstacle(posX,posY) {
        
        for (var i = 0; i < gameData.stoneLocations.length; i++) {
            if (posX === gameData.stoneLocations[i].posX && posY === gameData.stoneLocations[i].posY) {
                return true;
            }
        }
        return false;
    }
    $(document).on('keydown', function(e) {
        var currentPosition = gameData.playerPosition;
        switch (e.which) {
            case left:
                var isHit = CheckObstacle(currentPosition.posX - 1, currentPosition.posY);
                gameData.playerData.direction = 'left';
                setPlayerPosition(currentPosition.posX - 1, currentPosition.posY);
                //isHit ? console.log("Stone!") : setPlayerPosition(currentPosition.posX - 1, currentPosition.posY);
                break;
            case right:
                var isHit = CheckObstacle(currentPosition.posX - 1, currentPosition.posY);
                gameData.playerData.direction = 'right';
                setPlayerPosition(currentPosition.posX + 1, currentPosition.posY);
                break;
            case down:
                setPlayerPosition(currentPosition.posX, currentPosition.posY + 1);
                break;
            case up:
                setPlayerPosition(currentPosition.posX, currentPosition.posY - 1);
                break;
            case dig:
                digTreasure();
                break;
            case h:
                $('#helpMenu').toggleClass('open');
                break;
            case c:
                shootLazor();
                break;

        }   
    });

});

$('#helpMenuHandle').on('click',  function(e) {
    $('#helpMenu').toggleClass('open');
});
