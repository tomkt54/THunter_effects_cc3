// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Projectile')
export class Projectile extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    @property
    duration = 0.7;

    @property(cc.Node)
    hitFx: cc.Node = null;

    @property
    arch = true;

    lastPos = new cc.Vec3();
    targetPos = new cc.Vec3();

    flying = false;

    Fire () {
        //cc.log('target is '+this.targetPos);
        // Your initialization goes here.
        this.lastPos = this.node.position;

        this.node['vx'] = this.node.position.x;
        this.node['vy'] = this.node.position.y;
        this.node['vz'] = this.node.position.z;

        //up 
        //let up = cc.math.randomRange(10, 20);
        //cc.tween(this.node).to(durhalf, { vy: up }, { easing: 'sineOut' }).start();
        //down
        //cc.tween(this.node).delay(durhalf).to(durhalf, { vy: this.targetPos.y }, { easing: 'sineIn' }).start();
        if(this.arch)cc.tween(this.node).to(this.duration, { vy: this.targetPos.y }, { easing: 'sineIn' }).start();
        else cc.tween(this.node).to(this.duration, { vy: this.targetPos.y }).start();

        //forward
        cc.tween(this.node).to(this.duration, { vz: this.targetPos.z }).start();
        cc.tween(this.node).to(this.duration, { vx: this.targetPos.x }).start();

        //at target
        cc.tween(this.node)
            .delay(this.duration)
            .call(() => {
                //-----------------------------------------------------------
                //create hitfx after duration
                let hitFx = cc.instantiate(this.hitFx);

                //set pos to bullet, and parent
                hitFx.parent = this.node.parent;
                //set to current position of _bullet
                hitFx.setPosition(this.node.position);

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
                //if (this.hideObj) this.hideObj.active = false;

            })
            .start();

        //look at target
        this.node.lookAt(this.targetPos);

        this.flying = true;
    }

    update(deltaTime: number) {
        if (!this.flying) return;

        this.node.position = new cc.Vec3(this.node['vx'], this.node['vy'], this.node['vz']);
        if (this.lastPos) {
            //get dir = curPos - lastPos >> dir x-1 >> lookDir = curPos + dir >> node lookAt using lookDir
            //let v = cc.Vec3.subtract(new cc.Vec3(), this.node.position, this.lastPos);
            //v.multiply(new cc.Vec3(-1, -1, -1));
            //let p = cc.Vec3.add(new cc.Vec3(), this.node.position, v);
            //this.node.lookAt(p);

            //get dir = curPos - lastPos >> x-1 >> new quat from view up using dir >> set rotation.
            let curPos = this.node.position.clone();
            let dir = curPos.subtract(this.lastPos).normalize();
            let quat = new cc.Quat();
            cc.Quat.fromViewUp(quat,dir, new cc.Vec3(-1, 0, 0));
            this.node.setRotation(quat);

        }
        this.lastPos = this.node.position.clone();
    }
}
