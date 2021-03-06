export function cssToDom(css: string) {
  const style = document.createElement('style');
  style.textContent = css;
  return style;
}

export function toArray<T>(item: T): T[] {
  return Array.isArray(item) ? item : [item];
}

export function defineName(target: any, name: string) {
  Object.defineProperty(target, 'name', {
    configurable: false,
    writable: false,
    enumerable: false,
    value: name,
  });

  return target;
}

export function getChildNodes(node: Node) {
  const children = [];

  node.childNodes.forEach(child => children.push(child));

  return children;
}

export async function expectError(fn: () => Promise<any>, expected = Error) {
  let error;
  try {
    await fn();
  } catch (e) {
    error = e;
  }

  return expect(error).toEqual(jasmine.any(expected));
}