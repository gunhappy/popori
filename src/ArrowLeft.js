var ArrowLeft = cc.Sprite.extend({
    
    ctor: function(){
        this._super();
        this.initWithFile( res.ArrowLeft_pic );
    },

    update: function(dt){
        var pos = this.getPosition();
        this.vx = -5;
        this.setPosition( pos.x + this.vx, pos.y );
    }                       
});