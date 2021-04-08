const getBrowserPrefix = () => {
  const doc = document.body || document.documentElement;
  const style = doc.style;
  const prefix = ['webkit', 'moz', 'ms', 'o', 'khtml'];
  for (const item of prefix) {
    if (`${item}TransitionProperty` in style) {
      return `-${item}-`;
    }
  }
  return '';
};

export default getBrowserPrefix;
