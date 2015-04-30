var ArrowLeft = Arrow.extend({
    
    ctor: function(){
        this._super();
        this.initWithFile( res.ArrowLeft_pic );
    },

    update: function(dt){
        var pos = this.getPosition();
        this.vx = -10;
        this.setPosition( pos.x + this.vx, pos.y );
    }                       
});