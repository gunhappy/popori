var SingleMode = cc.LayerColor.extend({
    
    init: function() {
        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.initBackground();
        this.initPlayer();
        this.addKeyboardHandlers();
        this.initLabel();
        this.scheduleUpdate();
        this.start = false;
        this.time = 0;
        return true;
    },
    
    initBackground: function(){
        this.Background = new Background();
        this.Background.setPosition( new cc.Point( screenWidth/2 , screenHeight/2 ) );
        this.addChild( this.Background );
    },
    
    initPlayer: function(){
        this.player1 = new Player( Player.MOVE_DIR.Player1, res.Player2_pic );
        this.player1.setPosition( new cc.Point( screenWidth/2 ,80 ) );
        this.addChild( this.player1 );
        
        this.player1.scheduleUpdate();
    },
    
    initLabel: function(){
        this.score = 0;
        this.life = 5;
        
        this.scoreLabel = cc.LabelTTF.create( '0','Cooper Black',40 );
        this.scoreLabel.setPosition( new cc.Point( 140,500 ) );
        this.addChild( this.scoreLabel );
        this.scoreLabel.setString( this.score );
        this.scoreLabel.setColor( new cc.Color( 255, 192 ,203 ) );
        
        this.textLabel = cc.LabelTTF.create( '0','Cooper Black',30 );
        this.textLabel.setPosition( new cc.Point( 100,550 ) );
        this.addChild( this.textLabel );
        this.textLabel.setString( "Score" );
        this.textLabel.setColor( new cc.Color( 255, 192 ,203 ) );
        
        this.startLabel = cc.LabelTTF.create( '0','Cooper Black',40 );
        this.startLabel.setPosition( new cc.Point( screenWidth/2 ,screenHeight/2 ) );
        this.addChild( this.startLabel );
        this.startLabel.setString( "< PRESS SPACEBAR TO START >" );
        this.startLabel.setColor( new cc.Color( 0, 0 ,0 ) );
        
        this.lifetext = cc.LabelTTF.create( '0','Cooper Black',30 );
        this.lifetext.setPosition( new cc.Point( screenWidth/2,550 ) );
        this.addChild( this.lifetext );
        this.lifetext.setString( "Life left" );
        this.lifetext.setColor( new cc.Color( 178, 0 ,25 ) );
        
        this.lifeLabel = cc.LabelTTF.create( '0','Cooper Black',40 );
        this.lifeLabel.setPosition( new cc.Point( screenWidth/2 ,500 ) );
        this.addChild( this.lifeLabel );
        this.lifeLabel.setString( this.life );
        this.lifeLabel.setColor( new cc.Color( 178, 0 ,25 ) );
        
        this.highscoreLabel = cc.LabelTTF.create( '0','Cooper Black',40 );
        this.highscoreLabel.setPosition( new cc.Point( 700,500 ) );
        this.addChild( this.highscoreLabel );
        this.highscoreLabel.setString( highscore );
        this.highscoreLabel.setColor( new cc.Color( 0,0,255 ) );
        
        this.textLabel2 = cc.LabelTTF.create( '0','Cooper Black',30 );
        this.textLabel2.setPosition( new cc.Point( 670,550 ) );
        this.addChild( this.textLabel2 );
        this.textLabel2.setString( "High Score" );
        this.textLabel2.setColor( new cc.Color( 0,0,255 ) );
        
        this.howToButton =  new cc.MenuItemImage(
            res.HowTo1Text,
            res.HowTo2Text,
            function () {
    			cc.director.runScene(new MenuScene() );
    		}, this);
        this.howToButton = new cc.Menu( this.howToButton );
    	this.addChild( this.howToButton );
        this.howToButton.setPosition( screenWidth/2 , screenHeight-200 );
    },
    
    update: function(dt){
        if( this.start == true ){
            this.randomSpawnFood();
            this.randomSpawnItem();
            this.addArrow();
            this.getScoreFood();
            this.updateHighScore();
            this.schedule( this.counter,1,0 );
            this.isDead();
        }
    },
    
    updateHighScore: function(){
        if( this.score >= highscore ){
            highscore = this.score;
            this.highscoreLabel.setString( highscore );
        }
    },
    
    addKeyboardHandlers: function(){
        var self = this;
        
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function( keyCode, event ){
                Player.MOVE_DIR[ keyCode ] = true;
                Player.MOVE_DIR[ keyCode ] = true;
                self.onkeydown( keyCode );
            },
            onKeyReleased: function( keyCode, event ){
                Player.MOVE_DIR[ keyCode ] = false;
                Player.MOVE_DIR[ keyCode ] = false;
            }
        }, this);
    },
    
    onkeydown: function( keyCode ){
        if( keyCode == 32 && this.start == false ){
            this.start = true;
            this.removeChild( this.howToButton );
            this.removeChild( this.startLabel );
        }
        else if( keyCode == 8 ){
            cc.director.runScene(new MenuScene());
        }
    },
    
    randomSpawnFood: function(){
        var randNum = Math.floor( Math.random() * 40 );
        var randPosX = Math.floor( Math.random() * screenWidth );

        if( randNum == 1 ){            
            this.randFoodType();
            this.addChild( this.food );
            this.food.setPosition( new cc.Point( randPosX,screenHeight ) );
            this.food.scheduleUpdate();
        }
    },
    
    randomSpawnItem: function(){
        var randNum = Math.floor( Math.random() * 2000 );
        var randPosX = Math.floor( Math.random() * screenWidth );

        if( randNum == 2 ){            
            this.item = new Life();
            this.addChild( this.item );
            this.item.setPosition( new cc.Point( randPosX,screenHeight ) );
            this.item.scheduleUpdate();
        }
        
        else if( randNum == 3 ){
            this.item = new Speed();
            this.addChild( this.item );
            this.item.setPosition( new cc.Point( randPosX,screenHeight ) );
            this.item.scheduleUpdate();
        }
        
        else if( randNum == 4 ){
            this.item = new Slow();
            this.addChild( this.item );
            this.item.setPosition( new cc.Point( randPosX,screenHeight ) );
            this.item.scheduleUpdate();
        }
        
    },
    
    randFoodType: function(){
        var randNum = Math.floor( Math.random() * 32 );
        if( randNum >= 1 && randNum <= 5){
            this.food = new Croissant(); }
        else if( randNum >= 6 && randNum <= 9 ){
            this.food = new Cream();
        }
        else if( randNum >= 10 && randNum <= 13 ){
            this.food = new Sandwich();
        }
        else if( randNum >= 14 && randNum <= 16 ){
            this.food = new Pizza();
        }
        else if( randNum >= 17 && randNum <= 19 ){
            this.food = new Donut();
        }
        else if( randNum == 20 ){
            this.food = new Hamburger();
        }
        else if( randNum == 22 ){
            this.food = new Macaroon();
        }
        else if( randNum >= 24 && randNum <= 26 ){
            this.food = new Unji();
        }
        else{
            this.food = new Hotdog();
        }
    },
    
    getScoreFood: function(){
        this.foods = [];
        this.foods = this.getChildren();
        
        for( var i=0 ; i < this.foods.length ; i++ ){
            if( this.foods[i] instanceof Food ){
	            var foodPos = this.foods[i].getPosition();
                
                if( this.checkCollide( this.player1, this.foods[i], 35 ) ){
                    if( this.score + this.foods[i].getScore() < 0){
                        this.score = 0;
                    }
                    else{ this.score += this.foods[i].getScore(); }
                    this.scoreLabel.setString( this.score );
                    this.removeChild( this.foods[i] );
                }
                
                else if( foodPos.y < 70 ){
                    this.removeChild( this.foods[i] );
                }
            }
            
            else if( this.foods[i] instanceof Item ){
                var itemPos = this.foods[i].getPosition();
                
                if( this.checkCollide( this.player1, this.foods[i], 35 ) ){
                    if( this.foods[i] instanceof Life ){
                        this.life += 1;
                        this.lifeLabel.setString( this.life );
                    }
                    else { this.foods[i].effect( this.player1 ); }
                    this.removeChild( this.foods[i] );
                }
                
                else if( itemPos.y < 70 ){
                    this.removeChild( this.foods[i] );
                }
            }
            
            else if( this.foods[i] instanceof Arrow ){
                var arrowPos = this.foods[i].getPosition();
                
                if( this.checkCollide( this.player1, this.foods[i], 35 ) ){
                    if( this.life - 1 < 0){
                        this.life = 0;
                    }
                    else { this.life -= 1; }
                    this.lifeLabel.setString( this.life );
                    this.removeChild( this.foods[i] );
                }
                
                else if( arrowPos.x < 0 || arrowPos.x > 800 || arrowPos.y < 0){
                    this.removeChild( this.foods[i] );
                }
            }
        }
    },
    
    checkCollide: function( object1 ,object2, scope ){
        var Object1Pos = object1.getPosition();
        var Object2Pos = object2.getPosition();
        return ( Math.abs( Object1Pos.x - Object2Pos.x ) <= scope ) && ( Math.abs( Object1Pos.y - Object2Pos.y ) <= scope );
    },
    
    addArrow: function(){
        var rateRandom = 1300 - ( this.time*5 ) ;
        
        if( rateRandom < 200 ){
            rateRandom = 200;
        }
        console.log( rateRandom );
        var randNum = Math.floor( Math.random() * rateRandom );
        if( randNum == 1 ){
            this.arrow = new ArrowRight();
            this.addChild( this.arrow );
            this.arrow.setPosition( new cc.Point( 0,80 ) );
            this.arrow.scheduleUpdate();
        }
        else if( randNum == 2 ){
            this.arrow = new ArrowLeft();
            this.addChild( this.arrow );
            this.arrow.setPosition( new cc.Point( 800,80 ) );
            this.arrow.scheduleUpdate();
        }
        else if( randNum == 3 || randNum == 4 || randNum == 5 || randNum == 6 || randNum == 7 || randNum == 8 ){
            this.arrow = new ArrowDown();
            this.addChild( this.arrow );
            this.arrow.setPosition( new cc.Point( Math.floor( Math.random() * screenWidth ) , screenHeight ) );
            this.arrow.scheduleUpdate();
        }
    },
    
    isDead: function(){
        if( this.life == 0 ){
            this.start = false;
            this.unscheduleUpdate();
        }
    },
    
    counter: function(dt){
        this.time++;
    }
    
});
 
var SingleScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new SingleMode();
        layer.init();
        this.addChild( layer );
    }
});