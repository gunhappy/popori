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
        return true;
    },
    
    addKeyboardHandlers: function(){
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function( keyCode, event){
                self.onKeyDown( keyCode, event);
            },
            onKeyReleased: function( keyCode, event){
                self.onKeyUp( keyCode, event);
            }
        }, this);
    },
    
    onKeyDown: function( keyCode, event){
        //player1
        if(keyCode == 39){
            this.player1.moving = Player1.MOVING.RIGHT;
            this.player1.move();
        }//moveRight
        if(keyCode == 37){
            this.player1.moving = Player1.MOVING.LEFT;
            this.player1.move();
        }//moveLeft
        //player2
        if(keyCode == 88){
            this.player2.moving = Player2.MOVING.RIGHT;
            this.player2.move();
        }//moveRight
        if(keyCode == 90){
            this.player2.moving = Player2.MOVING.LEFT;
            this.player2.move();
        }//moveLeft
    },
    
    onKeyUp: function( keyCode, event){
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