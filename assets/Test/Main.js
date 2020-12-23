const Bullet = require('Bullet');
//const math = require('cocos/core/math/utils.ts');


cc.Class({
    extends: cc.Component,

    properties: {
        bullet: {
            default: null,   
            type: Bullet,
        },
        target: {
            default: null,
            type: cc.Component,
        },
        returnToPool: cc.Float,
        positionRandomLow: cc.Vec3,
        positionRandomHigh: cc.Vec3,
    },

    bulletPool: cc.NodePool,
    //hitPool: cc.NodePool,

    start() {
/*        let count = 20;
        //init bullet pool
        
        let prefab = this.bullet.node;
        this.bulletPool= new cc.NodePool();

        for (let i = 0; i < count; i++) {
            let _bullet = cc.instantiate(prefab);
            //cc.log("instantiated new bullet " + i);
            this.bulletPool.put(_bullet);
        }*/
/*        //---------------------------------
        //init hit pool
        prefab = this.hit.node;
        this.hitPool = new cc.NodePool();

        for (let i = 0; i < count; i++) {
            let _hit = cc.instantiate(prefab);
            //cc.log("instantiated new bullet " + i);
            this.hitPool.put(_hit);
        }*/
    },



    Fire() {

        let _bullet = cc.instantiate(this.bullet.node).getComponent(Bullet);

/*        //use bullet pool to fire new bullet
        let _bullet = null;
        //check pool has = use , else create
        if (this.bulletPool.size() > 0) {
            _bullet = this.bulletPool.get().getComponent(Bullet);
            //cc.log("get bullet from pool " + _bullet.name);
        } else {
            _bullet = cc.instantiate(this.bullet.node).getComponent(Bullet);
            //cc.log("instantiate new bullet " + _bullet.name);
        }*/
        //cc.log("target pos is " + _bullet.targetPos);

        //set pos to bullet, and parent
        let node = _bullet.node;
        node.parent = this.bullet.node.parent;

        let randomPos = new cc.Vec3(cc.math.randomRange(this.positionRandomLow.x, this.positionRandomHigh.x),
            cc.math.randomRange(this.positionRandomLow.y, this.positionRandomHigh.y),
            cc.math.randomRange(this.positionRandomLow.x, this.positionRandomHigh.z));


        node.setPosition(this.bullet.node.position.add(randomPos));

        //set off the bullet
        //cc.log("fire bullet " + _bullet.name);
        _bullet.fight();

        //return to pool after 2 sec
/*        cc.tween(this.node)
            .delay(this.returnToPool)
            .call(() => {
                this.bulletPool.put(node);
                //cc.log("return bullet to pool, current obj count is " + this.bulletPool.size());
            })
            .start();*/
        //cc.log("used bullet pool, current pool count is " + this.bulletPool.size());


/*        //instatiate hit after duration
        cc.tween(this.node)
            .delay(this.bullet.duration)
            .call(() => {
                //-----------------------------------------------------------
                //create hitfx after duration
                let _hit = null;
                //check pool has = use , else create
                if (this.hitPool.size() > 0) {
                    _hit = this.hitPool.get();
                    //cc.log("get hit from pool " + _hit.name);
                } else {
                    _hit = cc.instantiate(this.hit.node);
                    //cc.log("instantiate new hit " + _hit.name);
                }
                //cc.log("hitfx is " + _hit.name);

                //set pos to bullet, and parent
                _hit.parent = this.bullet.node.parent;
                //set to current position of _bullet
                _hit.setPosition(_bullet.node.position);

                //return to pool after 2 sec
                cc.tween(this.node)
                    .delay(this.returnToPool)
                    .call(() => {
                        this.hitPool.put(_hit);
                        //cc.log("return bullet to pool, current obj count is " + this.bulletPool.size());
                    })
                    .start();

            })
            .start();*/

        //cc.log("used bullet pool, current pool count is " + this.bulletPool.size());
    },
});
