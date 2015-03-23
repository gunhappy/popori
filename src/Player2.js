var Player2 = cc.Sprite.extend({
    ctor: function(){
        this._super();
        this.initWithFile('res/images/player2.png');
        this.moving = 0;
    },
    
    move: function(){
        var pos = this.getPosition();
        if(this.moving == Player2.MOVING.RIGHT){
            this.setPosition( new cc.Point( pos.x + 10, pos.y ) );
        }
        else if(this.moving == Player2.MOVING.LEFT){
            this.setPosition( new cc.Point( pos.x - 10, pos.y ) );
        }
    }
});

Player2.MOVING = {
    RIGHT : 1,
    LEFT : 2
};