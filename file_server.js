var connect = require('connect');
var fs = require("fs");
 
var app = connect();
app.use(connect.bodyParser({uploadDir:__dirname +'/file',keepExtensions:true}));
app.use(connect.logger('dev'));
// respond to all requests
app.use('/post', function(req, res) {
  console.log("file", req.files.userfile.name);
  console.log("req.body.dirname", req.body.dirname);
  var full_path = __dirname +'/file/' + req.body.dirname + "/";
  console.log("full_path", full_path);
  fs.exists(full_path, function(is_exist){
    if(is_exist){
       fs.renameSync(req.files.userfile.path, full_path + req.files.userfile.name);
     } else {
      fs.mkdir(full_path, function(err) {
        if(!err)
          fs.renameSync(req.files.userfile.path, full_path + req.files.userfile.name);
      });
     }

  });
 
  //console.log("body", req.body);
   // don't forget to delete all req.files when done
});

app.use('/version', function(req, res) {
  res.writeHead(200);
  fs.createReadStream('version').pipe(res);
  //console.log("body", req.body);
   // don't forget to delete all req.files when done
});

//app.use(connect.static(__dirname + '/paks'));
app.use('/paks', function(req, res) {
  res.writeHead(200);
  console.log("path="+req.url);
  fs.createReadStream('paks/' +req.url).pipe(res);
  //console.log("body", req.body);
   // don't forget to delete all req.files when done
});
app.listen(3000)
