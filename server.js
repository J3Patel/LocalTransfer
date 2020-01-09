var http = require('http'),
    url = require('url'),
    fs = require('fs');
 const testFolder = 'data/';
filelist = [];
fs.readdirSync(testFolder).forEach(file => {
  console.log(file);
  filelist.push(file);
})
 
//create the http server listening on port 3333
http.createServer(function (req, res) {
var query = url.parse(req.url, true).query
console.log("got request")
filelist = [];
fs.readdirSync(testFolder).forEach(file => {
  console.log(file);
  filelist.push(file);
})
if (typeof query.file === 'undefined') {
fs.readFile(__dirname + '/public/index.html', function(err, data) { //read file index.html in public folder
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
      return res.end("404 Not Found");
    } 
    res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
    res.write(data); //write data from index.html
    filelist.forEach(file=>{
        res.write('<button id='+file+' onclick="buttonAction(this)">'+file+'</button><br>');
        // res.write('<a href="download.php?file=' + file + '" download">'+file+'</a><br>');
        console.log();
    })

    return res.end();
  });
} else {
    var file = testFolder + query.file;
   fs.readFile(file, function (err, content) {
    
            if (err) {
                res.writeHead(400, {'Content-type':'text/html'})
                console.log(err);
                res.end("No such file");    
            } else {
                console.log('success');
                //specify Content will be an attachment
                res.setHeader('Content-disposition', 'attachment; filename='+query.file);
                res.end(content);
            }
        });
}
    // var query = url.parse(req.url, true).query;
    //  res.writeHead(200, {'Content-Type': 'text/plain'});




    // if (typeof query.file === 'undefined') {
    //     //specify Content will be an attachment
    //     res.setHeader('Content-disposition', 'attachment; filename=theDocument.txt');
    //     res.setHeader('Content-type', 'text/plain');
        // filelist.forEach(file=>{
        //     res.write('<button>'+file+'</button>');
        // })
        // res.end();
    //     res.end("Hello, here is a file for you!");
    // } else {
    //     //read the image using fs and send the image content back in the response
    //     fs.readFile('/path/to/a/file/directory/' + query.file, function (err, content) {
    //         if (err) {
    //             res.writeHead(400, {'Content-type':'text/html'})
    //             console.log(err);
    //             res.end("No such file");    
    //         } else {
    //             //specify Content will be an attachment
    //             res.setHeader('Content-disposition', 'attachment; filename='+query.file);
    //             res.end(content);
    //         }
    //     });
    // }

 
}).listen(3333);


console.log("Server running at http://localhost:3333/");