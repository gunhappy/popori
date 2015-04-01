var Star = cc.Sprite.extend({
    
    ctor: function(){
        
        this._super();
        this.initWithFile( 'res/images/star.png' );
    },

    update: function(dt){
        
        var pos = this.getPosition();
        this.vy = -5;
        this.setPosition( pos.x, pos.y + this.vy );
    }                       
});