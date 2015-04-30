var ArrowDown = Arrow.extend({
    
    ctor: function(){
        this._super();
        this.initWithFile( res.ArrowDown_pic );
    },

    update: function(dt){
        var pos = this.getPosition();
        this.vy = -10;
        this.setPosition( pos.x , pos.y + this.vy );
    }                       
});