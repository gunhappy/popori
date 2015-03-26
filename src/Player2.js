var Player2 = cc.Sprite.extend({
    
    ctor: function(){
        this._super();
        this.initWithFile( 'res/images/player2.png' );
        this.moving = 0;
        
        this.vy = 0;
        this.jump == false;
    },   
    
    update: function( dt ) {
        this.updateMovement();
        this.updateJump();
    },
    
    updateMovement: function(){
        var pos = this.getPosition();
        
        if( Player2.MOVE_DIR[ cc.KEY.a ] && pos.x > 0 ) {
            pos.x -= 10;
        }
        
        if( Player2.MOVE_DIR[ cc.KEY.d ] && pos.x < screenWidth ) {
            pos.x += 10;
        }
        
        this.setPosition( cc.p ( pos.x, pos.y ) );
    },
        
    updateJump: function(){
        var pos = this.getPosition();
        
        if( pos.y == 80 ){
            this.vy = 0;
            this.jump = false;
        }
        
        if( Player2.MOVE_DIR[ cc.KEY.w ] ) {
            if( pos.y < 250 && this.jump == false ){
                this.vy = 12;
                this.jump = true;
            }
        }
        
        if( pos.y > 250 ){
            this.vy -= 12;
        }
        
        this.setPosition( cc.p( pos.x, pos.y +this.vy) );
    }
});

Player2.MOVE_DIR = [];