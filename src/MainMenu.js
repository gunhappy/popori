var MainMenu = cc.LayerColor.extend({
    
    init: function() {
        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.initBackground();
        this.initButton();
        this.scheduleUpdate();
        cc.audioEngine.playMusic( 'res/songs/menusong.mp3', true );
        return true; 
    },
    
    update: function(){
      
    },
    
    initBackground: function(){
        this.MenuBackground = new MenuBackground();
        this.MenuBackground.setPosition( new cc.Point( screenWidth/2 , screenHeight/2 ) );
        this.addChild( this.MenuBackground );
    },
    
    initButton: function(){
        this.title = cc.Sprite.create( res.TitleText );
        this.title.setPosition( screenWidth/2 , screenHeight-100 );
        this.addChild( this.title );
        
        this.singleButton =  new cc.MenuItemImage(
            res.SingleText1,
            res.SingleText2,
            function () {
                cc.audioEngine.stopMusic();
    			cc.director.runScene(new SingleScene() );
    		}, this);
        this.singleButton = new cc.Menu(this.singleButton);
    	this.addChild(this.singleButton);
        this.singleButton.setPosition( screenWidth/2 , screenHeight-250 );
        
        this.multiButton =  new cc.MenuItemImage(
            res.MultiText1,
            res.MultiText2,
            function () {
    			cc.director.runScene(new StartScene() );
    		}, this);
        this.multiButton = new cc.Menu(this.multiButton);
    	this.addChild(this.multiButton);
        this.multiButton.setPosition( screenWidth/2 , screenHeight-450 );
    },
    
});
    


var MenuScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new MainMenu();
        layer.init();
        this.addChild( layer );
    }
});