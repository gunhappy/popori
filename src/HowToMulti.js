var HowToMulti = cc.LayerColor.extend({
    
    init: function() {
        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.initBackground();
        this.initButton();
        return true; 
    },
    
    initBackground: function(){
        this.Background = new HowToMultiground();
        this.Background.setPosition( new cc.Point( screenWidth/2 , screenHeight/2 ) );
        this.addChild( this.Background );
    },
    
    initButton: function(){
        this.backButton =  new cc.MenuItemImage(
            res.BackButton1,
            res.BackButton1,
            function () {
    			cc.director.runScene(new StartScene() );
    		}, this);
        this.backButton = new cc.Menu(this.backButton);
    	this.addChild(this.backButton);
        this.backButton.setPosition( 120 , 45 );
    },
    
});
    


var HowToMultiScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new HowToMulti();
        layer.init();
        this.addChild( layer );
    }
});