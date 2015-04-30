var MainMenu = cc.LayerColor.extend({
    
    init: function() {
        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.initBackground();
        
        this.title = cc.Sprite.create( res.TitleText );
        this.title.setPosition( screenWidth/2 , screenHeight-100 );
        this.addChild( this.title );
        
        this.playButton =  new cc.MenuItemImage(
            res.Play1Text,
            res.Play2Text,
            function () {
    			cc.director.runScene(new StartScene() );
    		}, this);
        this.playButton = new cc.Menu(this.playButton);
    	this.addChild(this.playButton);
        this.playButton.setPosition( screenWidth/2 , screenHeight-250 );
        
        this.addKeyboardHandlers();
        return true;
    },
    
    initBackground: function(){
        this.MenuBackground = new MenuBackground();
        this.MenuBackground.setPosition( new cc.Point( screenWidth/2 , screenHeight/2 ) );
        this.addChild( this.MenuBackground );
    },
    
    addKeyboardHandlers: function(){
        var self = this;
        
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function( keyCode, event ){
                self.onkeydown( keyCode );
            },
            onKeyReleased: function( keyCode, event ){}
        }, this);
    },
    
    onkeydown: function( keyCode ){
        if( keyCode == 13 ){
            cc.director.runScene(new StartScene());
        }
    }
});
    


var MenuScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new MainMenu();
        layer.init();
        this.addChild( layer );
    }
});