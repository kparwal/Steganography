var fs = require('fs');

// fs.writeFile(".\\test.txt", "THIS IS A TEST", function (err) {
//     if (err) {
//       console.log(err)
//     }
//     console.log("Success!")
//   }
// );

// fs.readFile('.\\Untitled.bmp', {encoding: "utf8"}, function(err, data) {
//   if (err) {
//     console.log(err);
//   }
//   console.log(data.toString('hex'));
// });

// var file = require("fs").createReadStream("Untitled.bmp", { encoding: "utf8" });
// file.pipe(process.stdout);

fs.open('Untitled.bmp', 'r', function(status, fd) {
    if (status) {
        console.log(status.message);
        return;
    }
    var buffer = new Buffer(100);
    fs.read(fd, buffer, 0, 100, 0, function(err, num) {
        console.log(buffer.toString('utf-8', 45, num));
    });
});