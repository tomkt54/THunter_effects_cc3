// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { _decorator, Component, Node, log, Vec2, Vec3 } from 'cc';
import { Projectile } from './Projectile';
const { ccclass, property } = _decorator;

@ccclass('TestFire')
export class TestFire extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    @property(cc.Node)
    projectile: cc.Node = null;

    @property(cc.Node)
    firePoint: cc.Node = null;

    @property(cc.Node)
    targetPoint: cc.Node = null;

    @property(Vec2)
    randomFirePointH = new Vec2(0,0);


    @property
    delay = 0;

    //fire from fire point + random horizontal, to target point
    Fire() {
        if(this.delay>0){
            cc.tween(this.node)
            .delay(this.delay)
            .call(()=>{
                log('fire delay '+this.delay);
                this.fire();
            })
            .start();
        }else{
            log('fire');
            this.fire();
        }
    }

    fire(){
        //log('fire from '+this.firePoint.position + ' to '+this.targetPoint.position);
        //instantiate
        let node = cc.instantiate(this.projectile);

        //set position
        node.parent = this.projectile.parent;

        let randomPos = new cc.Vec3(this.firePoint.position.x+ cc.math.randomRange(this.randomFirePointH.x, this.randomFirePointH.y),
            this.firePoint.position.y,
            this.firePoint.position.z);


        node.setPosition(randomPos);

        //tween to target
        let proj = node.getComponent(Projectile);
        proj.targetPos =this.targetPoint.position;
        proj.Fire();    
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
