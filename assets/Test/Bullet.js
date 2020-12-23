
cc.Class({
    extends: cc.Component,

    properties: {
        duration: {
            default: 1,
            type: cc.Float,
        },
        hitfx: {
            default: null,
            type: cc.Node,
        },
        moveV3: cc.Vec3,
        hideObj: {
            default: null,
            type: cc.Node,
        },
    },

    onLoad()
    {
        this.lastPos = this.node.position;
    },

    fight() {
        //cc.log("this bullet just fired!");
        //try {
            //let targetpos = this.node.position.add(this.moveV3);
/*        } catch (err) {
            Log(err.message);
        }*/

        //Log("pos: " + this.node.position.toString());
        //Log("target pos " + this.node.position.add(this.moveV3).toString());

        //try {
            //this.node.position = new cc.Vec3(0, 5, 55);
            
            // cc.tween(this.node)
            //     .to(this.duration, { position:targetpos })
            //     //test instantiate hit fx prefab after a delay
            //     .start();
            
           
/*        } catch (err) {
            Log(err.message);
        }*/

        // for curve moving ------------------------

        this.node['vx'] = this.node.position.x;
        this.node['vy'] = this.node.position.y;
        this.node['vz'] = this.node.position.z;
        let dur = 0.8;
        let durhalf = dur/2;
        cc.tween(this.node).to(dur, {vy:0}).start();
        //cc.tween(this.node).to(dur, {vx:50}, {easing: 'sineOutIn'}).start();

        //random target pos
        let horizon = cc.math.randomRange(-30, 30);
        let far = cc.math.randomRange(-30, -20);

        //up 
        let up = cc.math.randomRange(10, 20);
        cc.tween(this.node).to(durhalf, { vy: up }, { easing: 'sineOut' }).start();
        //down
        cc.tween(this.node).delay(durhalf).to(durhalf, { vy: 0 }, { easing: 'sineIn' }).start();
        //forward
        cc.tween(this.node).to(dur, { vz: far }).start();
        cc.tween(this.node).to(dur, { vx: horizon }).start();


        // -------------------------------------------

        if (this.hideObj) this.hideObj.active = true;
        //at target
        //spawn hitfx
        cc.tween(this.node)
            .delay(dur)
            .call(() => {
                //-----------------------------------------------------------
                //create hitfx after duration
                let _hitfx = cc.instantiate(this.hitfx);

                //set pos to bullet, and parent
                _hitfx.parent = this.node.parent;
                //set to current position of _bullet
                _hitfx.setPosition(this.node.position);

                //destroy after 0.5 sec after hit target
                cc.tween(this.node)
                    .delay(0.5)
                    .call(() => {
                        this.node.destroy();
                        //particleSystemCount--;
                        //Log("destroy particle system, count=" + particleSystemCount);
                    })
                    .start();

                //hide obj if there is
                if (this.hideObj) this.hideObj.active = false;

            })
            .start();
    },

    update(dt)
    {
        if (this.node['vx'] === undefined) return;

        this.node.position = new cc.Vec3(this.node['vx'], this.node['vy'], this.node['vz']);
        if (this.lastPos)
        {
            //get dir = curPos - lastPos >> dir x-1 >> lookDir = curPos + dir >> node lookAt using lookDir
            let v = cc.Vec3.subtract(new cc.Vec3(), this.node.position, this.lastPos);
            v.scale(new cc.Vec3(-1, -1, -1));
            let p = cc.Vec3.add(new cc.Vec3(), this.node.position, v);
            this.node.lookAt(p);

/*            //get dir = curPos - lastPos >> x-1 >> new quat from view up using dir >> set rotation.
            let curPos = this.node.position;
            let dir = curPos.subtract(this.lastPos).normalize();
            dir= dir.scale(new cc.Vec3(-1, -1, -1));
            let quat = new cc.Quat();
            cc.Quat.fromViewUp(quat, dir, new cc.Vec3(0, 1, 0));
            this.node.setRotation(quat);*/

        }
        this.lastPos = this.node.position.clone();
    }

});