var Player = cc.Sprite.extend({
    
    ctor: function( MOVE_DIR , picture ){
        this._super();
        this.initWithFile( picture );
        this.moving = 0;
        this.keyboard = MOVE_DIR;
        this.vy = 0;
        this.otherPower = 50;
        this.shield = 0;
        this.speed = 0;
        this.jump == false;
    },
    
    update: function( dt ) {
        this.updateMovement();
        this.updateJump();
    },
    
    updateMovement: function(){
        var pos = this.getPosition();
        
        if( Player.MOVE_DIR[ this.keyboard[0] ] && pos.x > 0 ) {
            pos.x -= (10+this.speed);
        }
        
        if( Player.MOVE_DIR[  this.keyboard[1] ] && pos.x < screenWidth ) {
            pos.x += (10+this.speed);
        }
        
        this.setPosition( cc.p ( pos.x, pos.y ) );
    },
    
    updateJump: function(){
        var pos = this.getPosition();
        
        if( pos.y == 80 ){
            this.vy = 0;
            this.jump = false;
        }
        
        if( Player.MOVE_DIR [ this.keyboard[2] ] ) {
            if( pos.y < 250 && this.jump == false ){
                this.vy = 12;
                this.jump = true;
            }
        }
        
        if( pos.y > 250 ){
            this.vy -= 12;
        }
        
        this.setPosition( cc.p( pos.x, pos.y + this.vy ) );
    },
    
    reboundLeft: function(){
        var pos = this.getPosition();
        var rebound = this.otherPower - this.shield;
        this.setPosition( cc.p( pos.x - rebound , pos.y ) );
    },
    
    reboundRight: function(){
        var pos = this.getPosition();
        var rebound = this.otherPower - this.shield;
        this.setPosition( cc.p( pos.x + rebound , pos.y ) );
    },
    
    addPower: function(){
        this.otherPower += 10;
    },
    
    addShield: function(){
        if( this.otherPower - this.shield >0 ){ 
            this.shield += 10;
        }
    },
    
    speedUP: function(){
        if( this.speed < 6 ){
            this.speed += 1;
        }
    },
    
    speedDown: function(){
        if( this.speed > -4 ){
            this.speed -= 1;
        }
    }
});

Player.MOVE_DIR = {
    Player1: [cc.KEY.left,cc.KEY.right,cc.KEY.up,cc.KEY.space],
    Player2: [cc.KEY.a,cc.KEY.d,cc.KEY.w,cc.KEY.up,cc.KEY.space] 
};