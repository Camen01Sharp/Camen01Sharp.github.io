var level01 = function(window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1,
            speed: -3,
            gameItems: [
                { type: 'sawblade', x: 400, y: 200 }, //top//
                { type: 'sawblade', x: 600, y: 300 }, //floor//
                { type: 'sawblade', x: 1000, y: 235 }, //middle//
                { type: 'portalCube', x: 500, y: groundY },
                { type: 'enemy', x: 450, y: groundY },
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // BEGIN EDITING YOUR CODE HERE
        for (var i = 0; i < levelData.gameItems.length; i++) {
            var x = levelData.gameItems[i].x;
            var y = levelData.gameItems[i].y;
            var type = levelData.gameItems[i].type;
            if (type === 'sawblade') {
                createSawBlade(x, y);
            }
            else if (type === 'enemy'){
                createEnemy(x, y);
            }
            
            else {
                createPortalCube(x, y);
            }

        }

        function createSawBlade(x, y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var myObstacle = game.createObstacle(hitZoneSize, damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle);
            var obstacleImage = draw.bitmap('img/sawblade.png');
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;

        }

        function createPortalCube(x, y) {
            var hitZoneSize = 25;
            var healingFromObstacle = -10;
            var myObstacle = game.createObstacle(hitZoneSize, healingFromObstacle);
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle);
            var obstacleImage = draw.bitmap('img/PortalCube.png');
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;

        }
        function createEnemy(x,y) {
            var enemy =  game.createGameItem('enemy',25);
            var redSquare = draw.rect(50,50,'red');
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = 400;
            enemy.y = groundY-50;
            game.addGameItem(enemy);
            enemy.velocityX = -1;
            enemy.onPlayerCollision = function() {
                console.log('The enemy has hit Halle');
                //make enemy damage
            };
        } 
        
        // DO NOT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if ((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}