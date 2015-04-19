var Sandwich = Food.extend({
   
    ctor: function(){
        this._super();
        this.initWithFile( res.Sandwich_pic );
    },
    
    getScore: function(){
        return 3;
    }
});