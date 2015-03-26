var Player1 = cc.Sprite.extend({
    
    ctor: function(){
        this._super();
        this.initWithFile( 'res/images/player1.png' );
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
        
        if( Player1.MOVE_DIR[ cc.KEY.left ] && pos.x > 0 ) {
            pos.x -= 10;
        }
        
        if( Player1.MOVE_DIR[ cc.KEY.right ] && pos.x < screenWidth ) {
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
        
        if( Player1.MOVE_DIR [ cc.KEY.up ] ) {
            if( pos.y < 250 && this.jump == false ){
                this.vy = 12;
                this.jump = true;
            }
        }
        
        if(pos.y > 250){
            this.vy -= 12;
        }
        
        this.setPosition( cc.p( pos.x, pos.y +this.vy) );
    }
});

Player1.MOVE_DIR = [];