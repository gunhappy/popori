var Unji = Food.extend({
   
    ctor: function(){
        this._super();
        this.initWithFile( res.Unji_pic );
    },
    
    getScore: function(){
        return -5;
    }
});