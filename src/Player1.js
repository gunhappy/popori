var Player1 = cc.Sprite.extend({
    ctor: function(){
        this._super();
        this.initWithFile('res/images/player1.png');
        this.moving = 0;
    },
    update: function( dt ) {
        var pos = this.getPosition();
        if( Player1.MOVE_DIR[ cc.KEY.left ]&&pos.x>0) {
            pos.x -= 10;
        }
        if( Player1.MOVE_DIR[ cc.KEY.right ]&&pos.x<screenWidth) {
            pos.x += 10;
        }
        this.setPosition( cc.p( pos.x, pos.y ) );
    }
});

Player1.MOVE_DIR = [];