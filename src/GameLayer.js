var score1 =0;
var score2 =0;
var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        
        this.Background = new Background();
        this.Background.setPosition( new cc.Point(screenWidth/2,screenHeight/2));
        this.addChild(this.Background);
        
        this.player1 = new Player1();
        this.player1.setPosition(new cc.Point(100,80));
        this.addChild(this.player1);
        this.player2 = new Player2();
        this.player2.setPosition(new cc.Point(400,80));
        this.addChild(this.player2);
        this.addKeyboardHandlers();
        this.player1.scheduleUpdate();
        this.player2.scheduleUpdate();
        
        this.scoreLabel1 = cc.LabelTTF.create('0','Arial',40);
        this.scoreLabel1.setPosition(new cc.Point(50,550));
        this.addChild(this.scoreLabel1);
        this.scoreLabel1.setString(score1);
        
        this.scoreLabel2 = cc.LabelTTF.create('0','Arial',40);
        this.scoreLabel2.setPosition(new cc.Point(50,500));
        this.addChild(this.scoreLabel2);
        this.scoreLabel2.setString(score2);
        
        this.scheduleUpdate();
        
        /*
        if(cc.sys.capabilities.hasOwnProperty('mouse') ) {
            cc.eventManager.addListener({
                    event: cc.EventListener.MOUSE,
                    onMouseDown: function(event){
                        if(event.getButton() == cc.EventMouse.BUTTON_LEFT){
                            cc.log(event.getLocationX()+","+event.getLocationY());
                        }
                    }
            },this);
        }*/
        return true;
    },
    
    update: function(dt){
        this.randomStar();
    },
    
    addKeyboardHandlers: function(){
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function( keyCode, event){
                Player1.MOVE_DIR[ keyCode ] = true;
                Player2.MOVE_DIR[ keyCode ] = true;
            },
            onKeyReleased: function( keyCode, event){
                Player1.MOVE_DIR[ keyCode ] = false;
                Player2.MOVE_DIR[ keyCode ] = false;
            }
        }, this);
    },
    
    randomStar: function(){
        var randNum = Math.floor(Math.random()*100);
        if(randNum==1){
            var randX = Math.floor(Math.random()*screenWidth);
            this.star = new Star();
            this.addChild(this.star);
            this.star.setPosition(new cc.Point(randX,screenHeight));
            this.star.scheduleUpdate();
        }
        
    },
});
 
var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});