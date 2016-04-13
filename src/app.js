/*Grupo #5
*Hernán Cortés, 1056025; Ney Casilla, 1057512 ;Haydée Mayers, 1057100; Miguel Oviedo, 1053442
*/
var Space = new cp.Space();
Space.gravity =cp.v(0,-100);
//Space.iterations = 30;
Space.sleepTimeThreshold = 0.5;
Space.colisionSlop = 0.5;
//var updateStepValue = 60;

var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    redBird:null,
    BirdNode:null,
    cajas: [],
    cerdos:[],
    bottomWall:null,
    upperWall:null,
    rightWall:null,
    leftWall:null,
    crash: function(){
        var bird = this.BirdNode.getBoundingBox();
        for(var node of this.cajas){
            var b = node.getBoundingBox();
            if(cc.rectIntersectsRect(bird,b)){
                this.BirdNode.stopAllActions();
            }
        }
    },
    crash2: function(){
    var bird = this.BirdNode.getBoundingBox();
      for(var pgnode of this.cerdos){
            var b = pgnode.getBoundingBox();
            if(cc.rectIntersectsRect(bird,b)){
                this.BirdNode.stopAllActions();
            }
        }  
    },
    move: function(location,event){
        var game  = event.getCurrentTarget();
        var loc = location.getLocation();
        //cc.log(loc.x+"pos en x");
        var fly = cc.JumpTo.create(3,cc.p(700,300),300,1);
        game.BirdNode.runAction(fly);
        var bird = game.BirdNode.getBoundingBox();
//        game.removeChild(game.BirdNode,true);
//
//        
//        game.BirdNode = cc.PhysicsSprite.create(res.red);
//        var BirdBody = null;
//        var BirdShape = null;
//        var scaleX = 0.03;
//        var scaleY = 0.03;
//        nBird.width *= scaleX;
//        nBird.height *= scaleY;
//        
//        BirdBody = Space.addBody(new cp.Body(mass, cp.momentForBox(mass, nBird.width, nBird.height)));
//        BirdBody.setPos(cc.p(lastpos.x,lastpos.y));
//
//        BirdShape = Space.addShape(new cp.CircleShape(BirdBody, nBird.width * 0.5, cc.p(0, 0)));
//        BirdShape.setFriction(0.5);
//        BirdShape.setElasticity(1);
//        BirdShape.setCollisionType(2);
//
//        //#5
//        game.BirdNode.setBody(BirdBody);
//        game.BirdNode.setRotation(0);
//        game.BirdNode.setScale(0.03);
//
//        game.addChild(game.BirdNode);
        
        
    },
    pig : function(x,y){
        for(var i=0;i<2;i++){
            var pig = new cc.Sprite(res.pig);
            var pigz = pig.getContentSize(),
            pgnode = cc.PhysicsSprite.create(res.pig),
            pgbody = null,
            pgShape = null,
            pgscaleX =0.05,
            pgscaleY =0.05;
            pigz.width *= pgscaleX;
            pigz.height *=pgscaleY;

            pgbody = Space.addBody(new cp.Body(2, cp.momentForBox(2, pigz.width, pigz.height)));
            pgbody.setPos(cc.p(x,y));

            pgShape = Space.addShape(new cp.CircleShape(pgbody,pigz.width *0.5,cc.p(0,0)));
            pgShape.setFriction(0.5);
            pgShape.setElasticity(1);
            pgShape.setCollisionType(2);

            pgnode.setBody(pgbody);
            pgnode.setRotation(0);
            pgnode.setScale(0.05);
            this.cerdos.push(pgnode);
            
            this.addChild(pgnode);
        }
    },
    boxes: function(x,y){
        mass = 1;
       for (var i = 0;i<4;i++){
            var box = new cc.Sprite(res.box);
            var bg = box.getContentSize(),
                node = cc.PhysicsSprite.create(res.box),
                bodys = null,
                Shape = null,
                scaleX =1,
                scaleY =1;
            bg.width *= scaleX;
            bg.height *=scaleY;
           factor = 1.5;
            bodys = new cp.Body(mass, cp.momentForBox(mass, bg.width, bg.height));
           if(i>0){
               y=y*factor;
           }
            bodys.setPos(cc.p(x,y));
            Space.addBody(bodys);

            Shape = Space.addShape(new cp.BoxShape(bodys,bg.width,bg.height));
            Shape.setFriction(0.5);
            Shape.setElasticity(0);
                Shape.setCollisionType(2);

            node.setBody(bodys);
            node.setRotation(0);
            node.setScale(1);
           this.cajas.push(node);
            
            this.addChild(node);
                
        }  
    },
    ctor:function () {
        //Este es el proyecto final, aqui tendrán que hacer todo desde cero
        this._super();
        var size = cc.winSize;
        
        this.mouse = cp.v(0,0);
        var helloLabel = new cc.LabelTTF("Angry INTEC", "Arial", 38);
        helloLabel.setPosition(size.width / 2, size.height / 2 + 200);
        this.addChild(helloLabel, 5);

        this.sprite = new cc.Sprite(res.background);
        this.sprite.setPosition(size.width, size.height);
        this.addChild(this.sprite, 0);
        var mass = 5;
        
        this.boxes(500,200);
        this.boxes(800,200);
        this.boxes(900,200);
        
        this.redBird=new cc.Sprite(res.red);
        
        this.pig(500,400);
        this.pig(800,400);
        this.pig(900,400);
        this.pig(700,600);
        this.pig(800,600);
        this.pig(900,600);
        //#2
        var BirdSize = this.redBird.getContentSize();
        this.BirdNode = cc.PhysicsSprite.create(res.red);
        var BirdBody = null;
        var BirdShape = null;
        var scaleX = 0.03;
        var scaleY = 0.03;
        BirdSize.width *= scaleX;
        BirdSize.height *= scaleY;

        //#3
        
        //cp.momentforBox(mass,100,100);
        
        BirdBody = Space.addBody(new cp.Body(mass, cp.momentForBox(mass, BirdSize.width, BirdSize.height)));
        BirdBody.setPos(cc.p(150,200));

        //#4
        BirdShape = Space.addShape(new cp.CircleShape(BirdBody, BirdSize.width * 0.5, cc.p(0, 0)));
        BirdShape.setFriction(0.5);
        BirdShape.setElasticity(1);
        BirdShape.setCollisionType(2);

        //#5
        this.BirdNode.setBody(BirdBody);
        this.BirdNode.setRotation(100);
        this.BirdNode.setScale(0.03);

        this.addChild(this.BirdNode);
        
        var update = function(){
            Space.step(1/60);
        }
        
        //var WALLS_WIDTH = 5;
        //var WALLS_ELASTICITY = 0.5;
        //var WALLS_FRICTION = 1;
        
        this.leftWall = new cp.SegmentShape(Space.staticBody, new cp.v(0, 0), new cp.v(0, cc.winSize.height), 5);
        this.leftWall.setElasticity(0.5);
        this.leftWall.setFriction(1);
        Space.addStaticShape(this.leftWall);

        this.rightWall = new cp.SegmentShape(Space.staticBody, new cp.v(cc.winSize.width, cc.winSize.height), new cp.v(cc.winSize.width, 0), 5);
        this.rightWall.setElasticity(0.5);
        this.rightWall.setFriction(1);
        Space.addStaticShape(this.rightWall);
        

        this.bottomWall = new cp.SegmentShape(Space.staticBody, new cp.v(0, 100), new cp.v(cc.winSize.width, 100), 5);
        this.bottomWall.setElasticity(0.5);
        this.bottomWall.setFriction(1);
        Space.addStaticShape(this.bottomWall);
        
        this.upperWall = new cp.SegmentShape(Space.staticBody, new cp.v(0, cc.winSize.height), new cp.v(0, cc.winSize.height), 5);
        this.upperWall.setElasticity(0.5);
        this.upperWall.setFriction(1);
        Space.addStaticShape(this.upperWall);
        
//        
//        var body, staticBody = Space.staticBody;
//        var shape;
//        var radius = 15;
//        
//        body = Space.addBody(new cp.Body(10, cp.momentForCircle(10, 0, radius, cp.v(0,0))));
//        body.setPos(cp.v(320, radius+5));
//
//        shape = Space.addShape(new cp.CircleShape(body, radius, cp.v(0,0)));
//        shape.setElasticity(0);
//        shape.setFriction(0.9);
        Space.addCollisionHandler(1,2,null,null,null,null);
        
         this.schedule(update);
        
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: this.move
        },this);
//        this.schedule(this.crash,0);
//        this.schedule(this.crash2,0);
        
        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

