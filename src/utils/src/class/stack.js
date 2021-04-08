const Stack = (() => {
  const items = new WeakMap();
  class Stack {
    constructor() {
      items.set(this, []);
    }
    promise(promise) {
      const q = items.get(this);
      q.push(promise);
      return new Promise((resolve, reject) => {
        promise
          .then(res => {
            const lastPromise = q[q.length - 1];
            if (promise === lastPromise) {
              resolve(promise);
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
  return Stack;
})();

export default Stack;
