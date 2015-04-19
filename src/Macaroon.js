var Macaroon = Food.extend({
   
    ctor: function(){
        this._super();
        this.initWithFile( res.Macaroon_pic );
    },
    
    getScore: function(){
        return 10;
    }
});