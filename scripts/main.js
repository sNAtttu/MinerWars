requirejs(["settings"], function(util) {

    console.log("map init started");

    var gameData = {
        'treaseureLocations': [],
        'playerPosition': {},
        'treasureAmount': treasureAmount
    };    

    InitMapArray(mapArray, widthSquares, heightSquares);
    DrawLand(mapArray, context);
    DrawTreasures(mapArray, context, gameData.treasureAmount);

    player.onload = function () {
        var midPoint = Math.floor(mapArray.length / 2);
        setPlayerPosition(midPoint, midPoint);
    };
    

    function renderingLoop() {

        QueueNewFrame();
    }

    function setPlayerPosition(posX, posY) {
        gameData.playerPosition.posX = posX;
        gameData.playerPosition.posY = posY;
        characterContext.clearRect(0, 0, characterCanvasWidth, characterCanvasHeight); //clear the canvas
        characterContext.drawImage(player, posX * 32, posY * 32, 32, 32);
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

    function shootLazor() {
        var r1, r2, a = 0;
        r1 = Math.floor(Math.random() * 3) - 1;
        r2 = Math.floor(Math.random() * 3) - 1;
        for (var i = 0; i < 8; i++) {
            r1 < 0 ? a = -i : a = +i;
            characterContext.drawImage(lazor, (gameData.playerPosition.posX + (r1 + a)) * 32, (gameData.playerPosition.posY + (r2 + a)) * 32, 32, 32);    
            window.setTimeout(function() {
                characterContext.clearRect(0, 0, characterCanvasWidth, characterCanvasHeight); //clear the canvas
            }, 200);

        }
        window.setTimeout(function() {
            setPlayerPosition(gameData.playerPosition.posX, gameData.playerPosition.posY);
        }, 200);
        
        
    }

    $(document).on('keydown', function(e) {
        var currentPosition = gameData.playerPosition;
        switch (e.which) {
            case left:
                setPlayerPosition(currentPosition.posX - 1, currentPosition.posY);
                break;
            case right:
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