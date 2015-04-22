var Power = Item.extend({
    
    ctor: function(){
        this._super();
        this.initWithFile( res.Power_pic );
    },
    
    effect: function(player){
        player.addPower();   
    }
});