// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayFx')
export class PlayFx extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    @property(cc.Node)
    fx: cc.Node = null;

    Play() {
        if (this.fx == null) return;
        //workaround when cc.ParticleSystem3D still a null type
        //instantiate
        let node = cc.instantiate(this.fx);

        //set position
        node.parent = this.fx.parent;
        node.setPosition(this.fx.position);

        //this.play(this.fx);
    }

/*    play(node) {

        if (node == null) return;

        let p = node.getComponent(cc.ParticleSystem3D);
        if (p) p.play();

        if (node.children.length == 0) return;

        let childs = node.children;

        for (p of childs) {
            this.play(p);
        }
    }*/
}
