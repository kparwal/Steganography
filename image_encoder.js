var fs = require('fs');

fs.open('Untitled.bmp', 'r', function (status, fd) {
  if (status) {
    console.log(status.message);
    return;
  }
  var buffer = new Buffer(100);
  fs.read(fd, buffer, 0, 100, 0, function (err, num) {
    console.log(buffer.toString('utf-8', 45, num));
    debugger;
  });
});