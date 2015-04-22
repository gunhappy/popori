var Shield = Item.extend({
    
    ctor: function(){
        this._super();
        this.initWithFile( res.Shield_pic );
    },
    
    effect: function(player){
        player.addShield();
    }
});