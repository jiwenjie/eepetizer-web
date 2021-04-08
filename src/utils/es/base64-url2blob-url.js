var base64Url2blobUrl = function base64Url2blobUrl(url) {
  var reg = /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)*,(.+)\s*$/i;

  if (reg.test(url)) {
    var arr = url.split(',');
    var type = arr[0].match(/:(.*?);/)[1];
    var bstr = atob(arr[1]);
    var n = bstr.length;
    var u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return URL.createObjectURL(new Blob([u8arr], {
      type: type
    }));
  } else {
    return url;
  }
};

export default base64Url2blobUrl;