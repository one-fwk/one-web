import { mockRenderer, RendererService } from '@onex/testing';
import { h } from '../h';
import { VNode } from '../../interfaces';

describe('event listeners', () => {
  let hostElm: any;
  let vnode0: VNode;
  let renderer: RendererService;

  beforeEach(async () => {
    hostElm = document.createElement('div');
    vnode0 = {};
    vnode0.elm = hostElm;
    renderer = await mockRenderer();
  });

  it('attaches click event handler to element', () => {
    const result: UIEvent[] = [];

    function clicked(ev: UIEvent) { result.push(ev); }

    const vnode =
      <div onClick={clicked}>
        <a href="#">Click my parent</a>
      </div>;

    hostElm = renderer.patch(hostElm, vnode0, vnode).elm;
    hostElm.click();

    expect(result.length).toBe(1);
  });

  it('does not attach new listener', () => {
    const result: number[] = [];

    const vnode1 =
      <div onClick={() => result.push(1)}>
        <a href="#">Click my parent</a>
      </div>;

    const vnode2 =
      <div onClick={() => result.push(2)}>
        <a href="#">Click my parent</a>
      </div>;

    hostElm = renderer.patch(hostElm, vnode0, vnode1).elm;
    console.log(hostElm);
    hostElm.click();

    hostElm = renderer.patch(hostElm, vnode1, vnode2).elm;
    console.log(hostElm);
    hostElm.click();

    expect(result[0]).toBe(1);
    expect(result[1]).toBe(2);
  });

  it('detach attached click event handler to element', () => {
    const result: UIEvent[] = [];

    const vnode1 =
      <div onClick={(ev: UIEvent) => result.push(ev)}>
        <a href="#">Click my parent</a>
      </div>;

    hostElm = renderer.patch(hostElm, vnode0, vnode1).elm;
    hostElm.click();
    hostElm.click();

    expect(result.length).toBe(2);

    const vnode2 =
      <div o={}>
        <a href="#">Click my parent</a>
      </div>;

    hostElm = renderer.patch(hostElm, vnode1, vnode2).elm;
    hostElm.click();
    hostElm.click();

    expect(result.length).toBe(2);
  });

  it('shared handlers in parent and child nodes', () => {
    const result: UIEvent[] = [];

    const clicked = (ev: UIEvent) => result.push(ev);

    const vnode1 =
      <div onClick={clicked}>
        <a onClick={clicked} href="#">Click my parent</a>
      </div>;

    hostElm = renderer.patch(hostElm, vnode0, vnode1).elm;
    hostElm.click();

    expect(result.length).toBe(1);
    hostElm.firstChild.click();
    expect(result.length).toBe(3);
  });
});