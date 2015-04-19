var Hotdog = Food.extend({
   
    ctor: function(){
        this._super();
        this.initWithFile( res.Hotdog_pic );
    },
    
    getScore: function(){
        return 1;
    }
});