// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
const Projectile = require('Projectile');

class fxSequence{
    key = 0;
    playNodes = {
        fx: cc.Node,
        delay: Number,
    }[1];
    }

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        particles: {
            default: [],
            type: [cc.Node],
        },
        animator: cc.Animation,
        keyMap: {
            default: null,
            type: Map,
            visible: false,
        },
        animMap: {
            default: null,
            type: Map,
            visible: false,
        },
        testSequence:false,
        sequenceKey: {
            default: 1,
            type: cc.Integer,
        },
        sequenceAnim: "Attack",
        sequence: {
            default: [],
            type: [cc.Vec2],
        },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },
    

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    statics: {
        particleSystemCount: cc.Integer,
        AddParticleSystem(value) {
            particleSystemCount += value;
            return particleSystemCount;
        }
    },

    //play single
    playParticle: function (id = 0) {

        //instantiate particle to use
       // let par = this.particles[id];
        let par = cc.instantiate(this.particles[id]);
        par.parent = this.particles[id].parent;
        par.setPosition(this.particles[id].position);

        //if it contain projectile -> fire it
        let proj = par.getComponent(Projectile);
        if (proj)proj.Fire();

/*        //debug particle system count and when destroy it --
        try {
            AddParticleSystem(1);
        } catch (err) {
            Log(err.message);
        }
        this.playAllChild(par);
        //AddParticleCount(1);
        Log("asas " + AddParticleSystem(1));*/

        //Log("instantiate new particle system, count=" + particleSystemCount);

        // myParticle.play();
    },

    playAllChild: function (node) {
        if (node == null) return;
        let p = node.getComponent(cc.ParticleSystem3D);
        if (p) p.play();

        //if (particle.node == null) return;
        if (node.childrenCount == 0) return;

        let childs = node.children;

        for (p of childs) {
            this.playAllChild(p);
        }
    },

    onKeyUp(event) {
        //Log("pressed " + event.keyCode);
        if (this.testSequence) {
            //sequence
            if (event.keyCode == this.sequenceKey) {
                var animState = this.animator.play(this.sequenceAnim);
                animState.wrapMode = cc.WrapMode.Normal;

                for (seq of this.sequence) {
                    //Log(seq.toString() + " x=" + seq.x + " y=" + seq.y);
                    let _seq = seq;
                    cc.tween(this.node)
                        .delay(_seq.y)
                        .call(() => {
                            //play fx by id
                            this.playParticle(_seq.x);
                            //Log("play particle " + _seq.x + " " + this.particles[_seq.x].name + " after " + _seq.y);
                        })
                        .start();
                }
            }

        } else {
            let arg = keyMap.get(event.keyCode);
            if (arg >= 0) {
                //Log("play fx " + arg);
                this.playParticle(arg);
            }

            let animarg = animMap.get(event.keyCode);
            if (animarg) {
                //Log("play anim " + animarg);
                var animState = this.animator.play(animarg);
                if (animarg != "Idle") {
                    animState.wrapMode = cc.WrapMode.Normal;
                }
            }
        }


        
        //cc.log(event.keyCode);
/*        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.playParticle(0);
                //cc.log("A");
                break;
            case cc.macro.KEY.s:
                this.playParticle(1);
                //cc.log("A");
                break;
            case cc.macro.KEY.d:
                this.playParticle(2);
                //cc.log("A");
                break;
            case cc.macro.KEY.f:
                this.playParticle(3);
                //cc.log("A");
                break;
        }*/
    },


    start() {
        //setup key map to use : keycode to number -> get out particles ID
        //a s d f g q w e r t
        keyMap = new Map([[65, 0], [83, 1], [68, 2], [70, 3], [71, 4],
            [81, 5], [87, 6], [69, 7], [82, 8], [84, 9]]);
        //z x c v b
        animMap = new Map([[90,"Idle"], [88, "Hit"], [67,"Death"], [86,"Walk"], [66,"Attack"]]);
    },

    // update (dt) {},
});
