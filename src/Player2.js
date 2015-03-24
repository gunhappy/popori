var Player2 = cc.Sprite.extend({
    ctor: function(){
        this._super();
        this.initWithFile('res/images/player2.png');
        this.moving = 0;
    },   
    update: function( dt ) {
        var pos = this.getPosition();
        if( Player2.MOVE_DIR[ cc.KEY.z ]&&pos.x>0) {
            pos.x -= 10;
        }
        if( Player2.MOVE_DIR[ cc.KEY.x ]&&pos.x<screenWidth) {
            pos.x += 10;
        }
        this.setPosition( cc.p( pos.x, pos.y ) );
    }
});

Player2.MOVE_DIR = [];