import { VNode } from '../interfaces';

export function toVNode(node: Node): VNode {
  if (node.nodeType === 1 || node.nodeType === 3) {
    const vnode: VNode = {};
    vnode.elm = node;

    if (node.nodeType === 1) {
      // element node
      vnode.vtag = node.nodeName.toLowerCase();

      const childNodes = node.childNodes;
      let childVnode: VNode;

      childNodes.forEach(childNode => {
        childVnode = toVNode(childNode);
        if (childVnode) {
          (vnode.vchildren = vnode.vchildren || []).push(childVnode);
        }
      });

    } else {
      // text node
      vnode.vtext = node.textContent;
    }

    return vnode;
  }

  return null;
}