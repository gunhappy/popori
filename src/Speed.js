var Speed = Item.extend({
    
    ctor: function(){
        this._super();
        this.initWithFile( res.Speed_pic );
    },
    
    effect: function(player){
        player.speedUP();
    }
});