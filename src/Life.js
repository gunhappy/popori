var Life = Item.extend({
    
    ctor: function(){
        this._super();
        this.initWithFile( res.Life_pic );
    },
    
    effect: function(player){}
});