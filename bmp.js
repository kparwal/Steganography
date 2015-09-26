function binaryToWords(str) {
  if(str.match(/[10]{8}/g)){
    var wordFromBinary = str.match(/([10]{8}|\s+)/g).map(function(fromBinary){
      return String.fromCharCode(parseInt(fromBinary, 2) );
    }).join('');
    return console.log(wordFromBinary);
  }
}

function toBin(str){
  var i,j,d;
  var arr = [];
  var len = str.length;
  for (i = 1; i<=len; i++){
    //reverse so its like a stack
    d = str.charCodeAt(len-i);
    for (j = 0; j < 8; j++) {
      arr.push(d%2);
      d = Math.floor(d/2);
    }
  }
  //reverse all bits again.
  return arr.reverse().join("");
}

function bmp_decode(data) {
  return getBMP(data);
}

function bmp_pack_message(raw, message) {

  var pixel, a, r, g, b;
  var encoded_message = toBin(message);
  //while (encoded_message.length > 0) {
  //
  //}

  for (var i = 0; i < raw.pixels.length; i++) {
    pixel = raw.pixels[i];
    a = (pixel & 0xf000) >>> 12;
    r = (pixel & 0x0f00) >>> 8;
    g = (pixel & 0x00f0) >>> 4;
    b = (pixel & 0x000f) >>> 0;

  }
}


function bmp_encode() {

}

function handleFiles(e) {
  var file = e.target.files[0];
  var reader = new FileReader();
  reader.addEventListener("load", processimage, false);
  reader.readAsArrayBuffer(file);
}

function processimage(e) {
  var buffer = e.target.result;
  var bitmap = getBMP(buffer);
}

function toArrayBuffer(buffer) {
  var ab = new ArrayBuffer(buffer.length);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buffer.length; ++i) {
    view[i] = buffer[i];
  }
  return ab;
}

function getBMP(buffer) {
  var datav = new DataView(toArrayBuffer(buffer));
  var bitmap = {};

  bitmap.fileheader = {};
  bitmap.fileheader.bfType = datav.getUint16(0, true);
  bitmap.fileheader.bfSize = datav.getUint32(2, true);
  bitmap.fileheader.bfReserved1 = datav.getUint16(6, true);
  bitmap.fileheader.bfReserved2 = datav.getUint16(8, true);
  bitmap.fileheader.bfOffBits = datav.getUint32(10, true);

  bitmap.infoheader = {};
  bitmap.infoheader.biSize = datav.getUint32(14, true);
  bitmap.infoheader.biWidth = datav.getUint32(18, true);
  bitmap.infoheader.biHeight = datav.getUint32(22, true);
  bitmap.infoheader.biPlanes = datav.getUint16(26, true);
  bitmap.infoheader.biBitCount = datav.getUint16(28, true);
  bitmap.infoheader.biCompression = datav.getUint32(30, true);
  bitmap.infoheader.biSizeImage = datav.getUint32(34, true);
  bitmap.infoheader.biXPelsPerMeter = datav.getUint32(38, true);
  bitmap.infoheader.biYPelsPerMeter = datav.getUint32(42, true);
  bitmap.infoheader.biClrUsed = datav.getUint32(46, true);
  bitmap.infoheader.biClrImportant = datav.getUint32(50, true);

  var start = bitmap.fileheader.bfOffBits;
  bitmap.stride = Math.floor((bitmap.infoheader.biBitCount * bitmap.infoheader.biWidth + 31) / 32) * 4;
  bitmap.pixels = new Uint8Array(buffer);
  bitmap.pixels = bitmap.pixels.slice(start);

  return bitmap;
}