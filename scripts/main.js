requirejs(["settings"], function(util) {

    console.log("map init started");

    var gameData = {
        'treaseureLocations': [],
        'stoneLocations': [],
        'stoneAmount': 8,
        'playerPosition': {},
        'treasureAmount': treasureAmount,
        'lazors': { 'maxLazors': 20, 'lazors': 10 },
        'chicken': {'present': false},
        'playerData': {
            'name': 'Santoro',
            'direction': 'left',
            'coins':10,
            'dead': false
        },
        'HCMode': false
    };    

    InitMapArray(mapArray, widthSquares, heightSquares);
    DrawLand(mapArray, context);
    DrawTreasures(mapArray, context, gameData.treasureAmount);
    DrawTerrain(mapArray, context, gameData.stoneAmount);
    updateHud();
    console.log(gameData.treaseureLocations);
    playerLeft.onload = function () {
        var midPoint = Math.floor(mapArray.length / 2);
        setPlayerPosition(midPoint, midPoint);
    };
    
    function updateHud() {
        $('#playerName').text("Name: " + gameData.playerData.name);
        $('#playerCoins').text("Coins: " + gameData.playerData.coins);
        $('#lazorStatus').text(gameData.lazors.lazors + ' / ' + gameData.lazors.maxLazors + ' LAZORS');
    }

    function isPlayerOutOfBounds(posX, posY) {
        return (posY < 0 || mapArray.length === posY || posX < 0 || mapArray.length === posX);
    }

    function setPlayerPosition(posX, posY) {
        if (gameData.HCMode || localStorage.getItem('banned') === 'true') {
            killPlayer();
            setPermaDeath();
        }

        if (gameData.playerData.dead) {
            displayDeathScreen();
            return false;
        }
        if (isPlayerOutOfBounds(posX, posY)) return false;
        if (CheckObstacle(posX, posY)) return false;
        gameData.playerPosition.posX = posX;
        gameData.playerPosition.posY = posY;
        clearCharacterCanvas();
        var a = gameData.playerData.direction === 'right' ? playerRight : playerLeft;
        characterContext.drawImage(a, posX * 32, posY * 32, 32, 32); 

        spawnChicken();

        if (posX === gameData.chicken.posX && gameData.chicken.posY) {
            gameData.lazors.lazors = gameData.lazors.maxLazors;
            gameData.chicken.present = false;
            updateHud();
        } else {
            repaintChicken();    
        }
        
    }

    function DrawLand(map,context) {
        var posX = 0;
        var posY = 0;

        grass.onload = function () {
            for (var i = 0; i < map.length; i++) {
                for (var j = 0; j < map[i].length; j++) {
                    if (map[i][j] == 0  || map[i][j] == 2) {
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

        for (var i = 0; i < stones; i++) {
            var stonePosX = Math.floor((Math.random() * map.length));
            var stonePosY = Math.floor((Math.random() * map[0].length));
            map[stonePosX][stonePosY] = 2;
            gameData.stoneLocations.push({ 'posX': stonePosX, 'posY': stonePosY });
        }
        stone.onload = function () {
            for (var i = 0; i < gameData.stoneLocations.length; i++) {
                context.drawImage(stone, gameData.stoneLocations[i].posX * 32, gameData.stoneLocations[i].posY * 32, 32, 32);
            }
        }     
    }

    function DrawTreasures(map, context, amount) {
        for (var i = 0; i < amount; i++) {
            var treasurePosX = Math.floor((Math.random() * map.length));
            var treasurePosY = Math.floor((Math.random() * map[0].length));
            gameData.treaseureLocations.push({'posX': treasurePosX, 'posY': treasurePosY});
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
                    else if (map[i][j] == 1) {
                        context.drawImage(sand, posX, posY, 32, 32);
                    }
                    else if (map[i][j] == 2) {
                        context.drawImage(playerLeft, posX, posY, 32, 32);
                    }
                    else {
                        context.drawImage(grass, posX, posY, 32, 32);
                    }
                    posX += 32;
                }
                posX = 0;
                posY += 32;
            }
    }

    function setPermaDeath() {
        localStorage.setItem("banned", true);
    }

    function treasureFound() {
        console.log('treasure has been found!')
        gameData.playerData.coins += 10;
    }

    function digTreasure() {
        var playerPosX = gameData.playerPosition.posX;
        var playerPosY = gameData.playerPosition.posY;
        var arrLength = gameData.treaseureLocations.length;

        for (var i = 0; i < arrLength; i++) {
            if (playerPosX === gameData.treaseureLocations[i].posX &&
                playerPosY === gameData.treaseureLocations[i].posY) {
                treasureFound();
                characterContext.drawImage(coin, playerPosX * 32, playerPosY * 32, 32, 32);
            }
        }
        console.log(playerPosX, playerPosY);
        context.drawImage(hole, playerPosX*32, playerPosY*32, 32, 32);
    }

    function clearCharacterCanvas() {
        characterContext.clearRect(0, 0, characterCanvasWidth, characterCanvasHeight); //clear the canvas
    }

    function shootLazor() {
        if (gameData.lazors.lazors === 0) return false;
        gameData.lazors.lazors = parseInt(gameData.lazors.lazors) - 1;
        var r1, r2, a = 0, b = 0;
        r1 = Math.floor(Math.random() * 3) - 1;
        r2 = Math.floor(Math.random() * 3) - 1;
        for (var i = 0; i < 8; i++) {
            r1 < 0 ? a = -i : a = +i;
            r2 < 0 ? b = -i : b = +i;
            characterContext.drawImage(lazor, (gameData.playerPosition.posX + (r1 + a)) * 32, (gameData.playerPosition.posY + (r2 + b)) * 32, 32, 32);    

            if (gameData.playerPosition.posX + (r1 + a) === gameData.chicken.posX &&
                    gameData.playerPosition.posY + (r2 + b) === gameData.chicken.posY) {
                    killPlayer();   
                }

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

    function spawnChicken() {
        if (!gameData.chicken.present && Math.floor((Math.random() * 10)) === 5) {
            var posX = Math.floor((Math.random() * mapArray.length));
            var posY = Math.floor((Math.random() * mapArray.length));
            gameData.chicken = {'posX': posX, 'posY': posY, 'present': true};
            characterContext.drawImage(chicken, posX * 32, posY * 32, 32, 32);   
        }
    }

    function repaintChicken() {
        if (gameData.chicken.present) {
            characterContext.drawImage(chicken, gameData.chicken.posX * 32, gameData.chicken.posY * 32, 32, 32);          
            var r1, r2, a = 0, b = 0;
            r1 = Math.floor(Math.random() * 3) - 1;
            r2 = Math.floor(Math.random() * 3) - 1;
            for (var i = 0; i < 8; i++) {
                r1 < 0 ? a = -i : a = +i;
                r2 < 0 ? b = -i : b = +i;
                characterContext.drawImage(lazor, (gameData.chicken.posX + (r1 + a)) * 32, (gameData.chicken.posY + (r2 + b)) * 32, 32, 32);    
                if (gameData.chicken.posX + (r1 + a) === gameData.playerPosition.posX &&
                    gameData.chicken.posY + (r2 + b) === gameData.playerPosition.posY) {
                    killPlayer();   
                }
            }
        }   
    }

    function killPlayer() {
        console.log('killing the player')
        gameData.playerData.dead = true;
        characterContext.drawImage(playerDead, gameData.playerPosition.posX * 32, gameData.playerPosition.posY * 32, 32, 32);          
        displayDeathScreen();
    }

    function displayDeathScreen() {
        $('#notifications').text('YOU IS DEAD').addClass('open');

    }

    $(document).on('keydown', function(e) {
        var currentPosition = gameData.playerPosition;
        switch (e.which) {
            case left:
                gameData.playerData.direction = 'left';
                setPlayerPosition(currentPosition.posX - 1, currentPosition.posY);
                break;
            case right:
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
            case k:
                killPlayer();
                break;
        }   
    });

    $('#ultraHC').on('click', function(e) {
        $('#ultraHC').toggleClass('active');
        if ($('#ultraHC').hasClass('active')) {
            gameData.HCMode = true;
            killPlayer();
            setPermaDeath();
        }
    });
});

$('#helpMenuHandle').on('click',  function(e) {
    $('#helpMenu').toggleClass('open');
});

