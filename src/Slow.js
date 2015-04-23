var Slow = Item.extend({
    
    ctor: function(){
        this._super();
        this.initWithFile( res.Slow_pic );
    },
    
    effect: function(player){
        player.speedDown();
    }
});