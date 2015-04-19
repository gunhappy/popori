var Pizza = Food.extend({
   
    ctor: function(){
        this._super();
        this.initWithFile( res.Pizza_pic );
    },
    
    getScore: function(){
        return 5;
    }
});