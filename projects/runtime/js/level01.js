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
                { type: 'sawblade', x: 600, y: 200 }, //floor//
                { type: 'sawblade', x: 1000, y: 200 }, //middle//
                { type: 'portalCube', x: 500, y: groundY },
                { type: 'portalCube', x: 1000, y: groundY },
                { type: 'portalCube', x: 1500, y: groundY },
                { type: 'portalCube', x: 2000, y: groundY },
                { type: 'wheatley', x: 600, y: 250},
                { type: 'wheatley', x: 1000, y: 250},
                { type: 'wheatley', x: 666, y: 250}, //demon//
                { type: 'turret', x: 2500, y: 250 },
                { type: 'turret', x: 2000, y: 250 },
                { type: 'turret', x: 1000, y: 250},
                { type: 'turret', x: 1500, y: 250},
                { type: 'turret', x: 3000, y: 250},
                { type: 'turret', x: 3500, y: 250},
                
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
            else if (type === 'wheatley'){
                createWheatley(x, y);
            } 
            else if (type === 'turret') {
                createTurret(x, y); 
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
            
            var portalCube = game.createGameItem('reward', hitZoneSize);
            portalCube.x = x;
            portalCube.y = y;
            game.addGameItem(portalCube);
            portalCube.velocityX = -1;
            
            var obstacleImage = draw.bitmap('img/PortalCube.png');
            portalCube.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
            
            portalCube.onPlayerCollision = function() {
                console.log('Halle has picked up portal cube');
                game.changeIntegrity(10);
                portalCube.fadeOut();
            };

        } //awknowledge me// Nein, dummkopf
        function createWheatley(x,y) {
            var hitZoneSize = 50;
            var damageFromObstacle = 10;
            
            var wheatley = game.createGameItem('wheatley',25);
            wheatley.x = x;
            wheatley.y = y;
            game.addGameItem(wheatley);
            wheatley.velocityX = -1;
            
            var wheatleyImage = draw.bitmap('img/Wheatley.png');
            wheatleyImage.x = -25;
            wheatleyImage.y = -25;
            wheatley.addChild(wheatleyImage);
            
            wheatley.onPlayerCollision = function() {
                console.log('Wheatley is a traitor');
                game.changeIntegrity(-10);
            };
              
            wheatley.onProjectileCollision = function() {
                game.increaseScore(100);
                wheatley.fadeOut();
            };
            
            
          } 
            function createTurret(x, y) {
                var hitZoneSize = 50;
                var damageFromObstacle = 10;
                
                var turret = game.createObstacle(hitZoneSize, damageFromObstacle);
                turret.x = x;
                turret.y = y;
                game.addGameItem(turret);
                
                var obstacleImage = draw.bitmap('img/turret.png');
                turret.addChild(obstacleImage);
                obstacleImage.x = -75;
                obstacleImage.y = -75;
                
                turret.onPlayerCollision = function() {
                    console.log('The turret has hit Halle');
                    game.changeIntegrity(-10);
                    
                };
                
                turret.onProjectileCollision = function() {
                    game.increaseScore(100);
                    turret.fadeOut();
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