var Hamburger = Food.extend({
   
    ctor: function(){
        this._super();
        this.initWithFile( res.Hamburger_pic );
    },
    
    getScore: function(){
        return 10;
    }
});