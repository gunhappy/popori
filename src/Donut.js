var Donut = Food.extend({
   
    ctor: function(){
        this._super();
        this.initWithFile( res.Donut_pic );
    },
    
    getScore: function(){
        return 6;
    }
});