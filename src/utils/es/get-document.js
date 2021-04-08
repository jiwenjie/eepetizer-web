var getDocument = function getDocument(el) {
  return el && el.ownerDocument || (typeof window !== 'undefined' ? document : null);
};

export default getDocument;