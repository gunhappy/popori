var GameLayer = cc.LayerColor.extend({
    
    init: function() {
        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.initBackground();
        this.initPlayer();
        this.addKeyboardHandlers();
        this.initLabel();
        this.scheduleUpdate();
        this.start = false;
        return true;
    },
    
    initBackground: function(){
        this.Background = new Background();
        this.Background.setPosition( new cc.Point( screenWidth/2 , screenHeight/2 ) );
        this.addChild( this.Background );
    },
    
    initPlayer: function(){
        this.player1 = new Player( Player.MOVE_DIR.Player1, res.Player1_pic );
        this.player1.setPosition( new cc.Point( 740,80 ) );
        this.addChild( this.player1 );
        
        this.player2 = new Player( Player.MOVE_DIR.Player2, res.Player2_pic );
        this.player2.setPosition( new cc.Point( 50,80 ) );
        this.addChild( this.player2 ) ;
        
        this.player1.scheduleUpdate();
        this.player2.scheduleUpdate();
    },
    
    initLabel: function(){
        this.score1 =0;
        this.score2 =0;
        this.time = 120;
        
        this.scoreLabel1 = cc.LabelTTF.create( '0','Cooper Black',40 );
        this.scoreLabel1.setPosition( new cc.Point( 700,500 ) );
        this.addChild( this.scoreLabel1 );
        this.scoreLabel1.setString( this.score1 );
        this.scoreLabel1.setColor( new cc.Color( 0,0,255 ) );
        
        this.textLabel1 = cc.LabelTTF.create( '0','Cooper Black',30 );
        this.textLabel1.setPosition( new cc.Point( 670,550 ) );
        this.addChild( this.textLabel1 );
        this.textLabel1.setString( "Player 2" );
        this.textLabel1.setColor( new cc.Color( 0,0,255 ) );
        
        this.scoreLabel2 = cc.LabelTTF.create( '0','Cooper Black',40 );
        this.scoreLabel2.setPosition( new cc.Point( 140,500 ) );
        this.addChild( this.scoreLabel2 );
        this.scoreLabel2.setString( this.score2 );
        this.scoreLabel2.setColor( new cc.Color( 255, 192 ,203 ) );
        
        this.textLabel2 = cc.LabelTTF.create( '0','Cooper Black',30 );
        this.textLabel2.setPosition( new cc.Point( 100,550 ) );
        this.addChild( this.textLabel2 );
        this.textLabel2.setString( "Player 1" );
        this.textLabel2.setColor( new cc.Color( 255, 192 ,203 ) );
        
        this.textLabel3 = cc.LabelTTF.create( '0','Cooper Black',30 );
        this.textLabel3.setPosition( new cc.Point( screenWidth/2,550 ) );
        this.addChild( this.textLabel3 );
        this.textLabel3.setString( "Time left" );
        this.textLabel3.setColor( new cc.Color( 178, 0 ,25 ) );
           
        this.timeLabel = cc.LabelTTF.create( '0','Cooper Black',40 );
        this.timeLabel.setPosition( new cc.Point( screenWidth/2 ,500 ) );
        this.addChild( this.timeLabel );
        this.timeLabel.setString( this.time );
        this.timeLabel.setColor( new cc.Color( 178, 0 ,25 ) );
        
        this.startLabel = cc.LabelTTF.create( '0','Cooper Black',40 );
        this.startLabel.setPosition( new cc.Point( screenWidth/2 ,(screenHeight/2)-80 ) );
        this.addChild( this.startLabel );
        this.startLabel.setString( "< PRESS SPACEBAR TO START >" );
        this.startLabel.setColor( new cc.Color( 0, 0 ,0 ) );
        
        this.endLabel = cc.LabelTTF.create( '0','Cooper Black',60 );
        this.endLabel.setPosition( new cc.Point( screenWidth/2 , (screenHeight/2)+140 ) );
        this.endLabel.setString( "T I M E O U T" );
        this.endLabel.setColor( new cc.Color( 255, 0 ,0 ) );
        
        this.player1Win = cc.LabelTTF.create( '0','Cooper Black',60 );
        this.player1Win.setPosition( new cc.Point( screenWidth/2 , (screenHeight/2)+50 ) );
        this.player1Win.setString( "Player 1  Win !!" );
        this.player1Win.setColor( new cc.Color( 255, 192 ,203 ) );
        
        this.player2Win = cc.LabelTTF.create( '0','Cooper Black',60 );
        this.player2Win.setPosition( new cc.Point( screenWidth/2 , (screenHeight/2)+50 ) );
        this.player2Win.setString( "Player 2  Win !!" );
        this.player2Win.setColor( new cc.Color( 0,0,255 ) );
        
        this.draw = cc.LabelTTF.create( '0','Cooper Black',60 );
        this.draw.setPosition( new cc.Point( screenWidth/2 , (screenHeight/2)+50 ) );
        this.draw.setString( "D R A W" );
        this.draw.setColor( new cc.Color( 255,0,255 ) );
        
        this.howToButton =  new cc.MenuItemImage(
            res.HowTo1Text,
            res.HowTo2Text,
            function () {
    			cc.director.runScene( new HowToMultiScene() );
    		}, this);
        this.howToButton = new cc.Menu( this.howToButton );
    	this.addChild( this.howToButton );
        this.howToButton.setPosition( screenWidth/2 , screenHeight-200 );
        
        this.backMenuButton =  new cc.MenuItemImage(
            res.BackToMenu1,
            res.BackToMenu2,
            function () {
    			cc.director.runScene(new MenuScene() );
    		}, this);
        this.backMenuButton = new cc.Menu( this.backMenuButton );
    	this.addChild( this.backMenuButton );
        this.backMenuButton.setPosition( screenWidth/2 , screenHeight/2 );
        
        this.retryButton =  new cc.MenuItemImage(
            res.RetryButton1,
            res.RetryButton2,
            function () {
    			cc.director.runScene(new StartScene() );
    		}, this);
        this.retryButton = new cc.Menu( this.retryButton );
        this.retryButton.setPosition( (screenWidth/2) , (screenHeight/2)-50 );
    },
    
    update: function(dt){
        if( this.start == true ){
            cc.audioEngine.playMusic( res.Game_song, true );
            this.randomSpawnFood();
            this.randomSpawnItem();
            this.addArrow();
            this.getScoreFood();
            this.checkPlayerCollide();
            this.countdown();
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
            this.removeChild( this.backMenuButton );
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
        var randNum = Math.floor( Math.random() * 600 );
        var randPosX = Math.floor( Math.random() * screenWidth );

        if( randNum == 1 ){            
            this.item = new Power();
            this.addChild( this.item );
            this.item.setPosition( new cc.Point( randPosX,screenHeight ) );
            this.item.scheduleUpdate();
        }
        
        else if( randNum == 2){            
            this.item = new Shield();
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
                    if( this.score1 + this.foods[i].getScore() < 0){
                        this.score1 = 0;
                    }
                    else{ this.score1 += this.foods[i].getScore(); }
                    this.scoreLabel1.setString( this.score1 );
                    cc.audioEngine.playEffect( res.Eat_effect );
                    this.removeChild( this.foods[i] );
                }
                
                else if( this.checkCollide( this.player2, this.foods[i], 35 ) ){
                    if( this.score2 + this.foods[i].getScore() < 0){
                        this.score2 = 0;
                    }
                    else{ this.score2 += this.foods[i].getScore(); }
                    this.scoreLabel2.setString( this.score2 );
                    cc.audioEngine.playEffect( res.Eat_effect );
                    this.removeChild( this.foods[i] );
                }
                
                else if( foodPos.y < 70 ){
                    this.removeChild( this.foods[i] );
                }
            }
            
            else if( this.foods[i] instanceof Item ){
                var itemPos = this.foods[i].getPosition();
                
                if( this.checkCollide( this.player1, this.foods[i], 35 ) ){
                    if( this.foods[i] instanceof Power || this.foods[i] instanceof Slow ){
                        this.foods[i].effect( this.player2 );
                    }
                    else { this.foods[i].effect( this.player1 ); }
                    cc.audioEngine.playEffect( res.GetItem_effect );
                    this.removeChild( this.foods[i] );
                }
                
                else if( this.checkCollide( this.player2, this.foods[i], 35 ) ){
                    if( this.foods[i] instanceof Power || this.foods[i] instanceof Slow ){
                        this.foods[i].effect( this.player1 );
                    }
                    else { this.foods[i].effect( this.player2 ); }
                    cc.audioEngine.playEffect( res.GetItem_effect );
                    this.removeChild( this.foods[i] );
                }
                
                else if( itemPos.y < 70 ){
                    this.removeChild( this.foods[i] );
                }
            }
            
            else if( this.foods[i] instanceof Arrow ){
                var arrowPos = this.foods[i].getPosition();
                
                if( this.checkCollide( this.player1, this.foods[i], 35 ) ){
                    if( this.score1 - 10 < 0){
                        this.score1 = 0;
                    }
                    else { this.score1 -= 10; }
                    this.scoreLabel1.setString( this.score1 );
                    cc.audioEngine.playEffect( res.HitArrow_effect );
                    this.removeChild( this.foods[i] );
                }
                
                else if( this.checkCollide( this.player2, this.foods[i], 35 ) ){
                    if( this.score2 - 10 < 0){
                        this.score2 = 0;
                    }
                    else { this.score2 -= 10; }
                    this.scoreLabel2.setString( this.score2 );
                    cc.audioEngine.playEffect( res.HitArrow_effect );
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
    
    checkPlayerCollide: function(){
        if( this.checkCollide( this.player1, this.player2, 55 )){
            cc.audioEngine.playEffect( res.Collide_effect );
            if( this.player1.getPositionX() < this.player2.getPositionX() ){
                this.player1.reboundLeft();
                this.player2.reboundRight();    
            }
            else {
                this.player2.reboundLeft();
                this.player1.reboundRight();
            }
        }
    },
    
    addArrow: function(){
        var randNum = Math.floor( Math.random() * 1000 );
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
        else if( randNum == 3 || randNum == 4 || randNum == 5 || randNum == 6 || randNum == 7 ){
            this.arrow = new ArrowDown();
            this.addChild( this.arrow );
            this.arrow.setPosition( new cc.Point( Math.floor( Math.random() * screenWidth ) , screenHeight ) );
            this.arrow.scheduleUpdate();
        }
    },
    
    countdown: function(){
        if( this.time > 0 ){
            this.schedule( this.counter,1,0 );
        }
        else if( this.time == 0 ){
            this.unscheduleUpdate();
            this.addChild( this.endLabel );
            this.addChild( this.retryButton );
            if( this.score1 > this.score2 ){
                this.addChild( this.player2Win );
            }
            
            else if( this.score2 > this.score1 ){
                this.addChild( this.player1Win );
            }
                
            else{ this.addChild( this.draw ); }
        }
    },
    
    counter: function(dt){
        this.time--;
        this.timeLabel.setString( this.time );
    }
});
 
var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});