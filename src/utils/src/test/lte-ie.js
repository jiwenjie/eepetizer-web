import getBrowserInfo from '../function/get-browser-info.js';

const lteIe = v => {
  const info = getBrowserInfo();
  return info.name === 'Internet Explorer' && info.version <= v;
};

export default lteIe;
