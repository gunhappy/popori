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
        return true;
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