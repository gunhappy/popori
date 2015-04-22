var score1 =0;
var score2 =0;
var time = 120;

var GameLayer = cc.LayerColor.extend({
    
    init: function() {
        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.initBackground();
        this.initPlayer();
        this.addKeyboardHandlers();
        this.initLabel();
        this.scheduleUpdate();
        
        return true;
    },
    
    initBackground: function(){
        this.Background = new Background();
        this.Background.setPosition( new cc.Point( screenWidth/2 , screenHeight/2 ) );
        this.addChild( this.Background );
    },
    
    initPlayer: function(){
        this.player1 = new Player( Player.MOVE_DIR.Player1, res.Player1_pic );
        this.player1.setPosition( new cc.Point( 100,80 ) );
        this.addChild( this.player1 );
        
        this.player2 = new Player( Player.MOVE_DIR.Player2, res.Player2_pic );
        this.player2.setPosition( new cc.Point( 400,80 ) );
        this.addChild( this.player2 ) ;
        
        this.player1.scheduleUpdate();
        this.player2.scheduleUpdate();
    },
    
    initLabel: function(){
        this.scoreLabel1 = cc.LabelTTF.create( '0','Arial',40 );
        this.scoreLabel1.setPosition( new cc.Point( 50,550 ) );
        this.addChild( this.scoreLabel1 );
        this.scoreLabel1.setString( score1 );
        this.scoreLabel1.setColor( new cc.Color( 255, 192 ,203 ) );
        
        this.scoreLabel2 = cc.LabelTTF.create( '0','Arial',40 );
        this.scoreLabel2.setPosition( new cc.Point( 50,500 ) );
        this.addChild( this.scoreLabel2 );
        this.scoreLabel2.setString( score2 );
        this.scoreLabel2.setColor( new cc.Color( 0,0,255 ) );
           
        this.timeLable = cc.LabelTTF.create( '0','Arial',40 );
        this.timeLable.setPosition( new cc.Point( screenWidth/2 ,550 ) );
        this.addChild( this.timeLable );
        this.timeLable.setString( time );
        this.timeLable.setColor( new cc.Color( 178, 0 ,25 ) );
    },
    
    update: function(dt){
        this.randomSpawnFood();
        this.randomSpawnItem();
        this.getScoreFood();
        this.checkPlayerCollide();
        this.countdown();
    },
    
    addKeyboardHandlers: function(){
        var self = this;
        
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function( keyCode, event ){
                Player.MOVE_DIR[ keyCode ] = true;
                Player.MOVE_DIR[ keyCode ] = true;
            },
            onKeyReleased: function( keyCode, event ){
                Player.MOVE_DIR[ keyCode ] = false;
                Player.MOVE_DIR[ keyCode ] = false;
            }
        }, this);
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
    
    randFoodType: function(){
        var randNum = Math.floor( Math.random() * 32 );
        if( randNum == 1|| randNum == 2|| randNum == 3|| randNum == 4|| randNum == 5){
            this.food = new Croissant(); }
        else if( randNum == 6|| randNum == 7|| randNum == 8|| randNum == 9 ){
            this.food = new Cream();
        }
        else if( randNum == 10|| randNum == 11|| randNum == 12|| randNum == 13 ){
            this.food = new Sandwich();
        }
        else if( randNum == 14|| randNum == 15|| randNum == 16 ){
            this.food = new Pizza();
        }
        else if( randNum == 17|| randNum == 18|| randNum == 19 ){
            this.food = new Donut();
        }
        else if( randNum == 20 ){
            this.food = new Hamburger();
        }
        else if( randNum == 22 ){
            this.food = new Macaroon();
        }
        else if( randNum == 24|| randNum == 25|| randNum == 26 ){
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
                    if( score1 + this.foods[i].getScore() < 0){
                        score1 = 0;
                    }
                    else{ score1 += this.foods[i].getScore(); }
                    this.scoreLabel1.setString( score1 );
                    this.removeChild( this.foods[i] );
                }
                
                else if( this.checkCollide( this.player2, this.foods[i], 35 ) ){
                    if( score2 + this.foods[i].getScore() < 0){
                        score2 = 0;
                    }
                    else{ score2 += this.foods[i].getScore(); }
                    this.scoreLabel2.setString( score2 );
                    this.removeChild( this.foods[i] );
                }
                
                else if( foodPos.y < 0 ){
                    this.removeChild( this.foods[i] );
                }
            }
            
            else if( this.foods[i] instanceof Item ){
                var itemPos = this.foods[i].getPosition();
                
                if( this.checkCollide( this.player1, this.foods[i], 35 ) ){
                    if( this.foods[i] instanceof Power ){
                        this.foods[i].effect( this.player2 );
                    }
                    else { this.foods[i].effect( this.player1 ); }
                    this.removeChild( this.foods[i] );
                }
                
                else if( this.checkCollide( this.player2, this.foods[i], 35 ) ){4
                    if( this.foods[i] instanceof Power ){
                        this.foods[i].effect( this.player1 );
                    }
                    else { this.foods[i].effect( this.player2 ); }
                    this.removeChild( this.foods[i] );
                }
                
                else if( itemPos.y < 0 ){
                    this.removeChild( this.foods[i] );
                }
            }
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
        
        else if( randNum == 2 ){            
            this.item = new Shield();
            this.addChild( this.item );
            this.item.setPosition( new cc.Point( randPosX,screenHeight ) );
            this.item.scheduleUpdate();
        }
    },
    
    checkCollide: function( object1 ,object2, scope ){
        var Object1Pos = object1.getPosition();
        var Object2Pos = object2.getPosition();
        return ( Math.abs( Object1Pos.x - Object2Pos.x ) <= scope ) && ( Math.abs( Object1Pos.y - Object2Pos.y ) <= scope );
    },
    
    checkPlayerCollide: function(){
        if( this.checkCollide( this.player1, this.player2, 55 )){
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
    
    countdown: function(){
        if( time > 0 ){
            this.schedule( this.counter,1,0 );
        }
        
        else if( time == 0 ){
            this.unscheduleUpdate();
        }
    },
    
    counter: function(dt){
        time--;
        this.timeLable.setString( time );
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