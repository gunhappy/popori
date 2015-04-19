var Cream = Food.extend({
   
    ctor: function(){
        this._super();
        this.initWithFile( res.Cream_pic );
    },
    
    getScore: function(){
        return 2;
    }
});