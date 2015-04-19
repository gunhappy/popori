var Croissant = Food.extend({
   
    ctor: function(){
        this._super();
        this.initWithFile( res.Croissant_pic );
    },
    
    getScore: function(){
        return 2;
    }
});