var express = require('express');
 var app = express();
var bodyParser = require('body-parser');
var fs=require('fs');
var path=require('path');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

     app.get('/', function(req, res) {
        res.sendFile(__dirname+"\\"+"\index.html");
     });

     app.post("/calculate",function calculate (req, res) {
        //res.render('index.html');  
        var post_data = req.body;
          var value1=parseInt(req.body.num1);
          var value2=parseInt(req.body.num2);
          var op=req.body.op;
          var result=0;
          switch(op){
              case 'add': result=value1+value2;
                              break;
              case 'sub': result=value1-value2;
                              break;
              case 'mul': result=value1*value2;
                              break;
              case 'div': result=value1/value2;
                              break;
          }
          console.log(result);
          res.writeHead(200,{'Content-type':'application/json'});
var myResult={
param1: value1,
param2:value2,
operation:op,
resval:result
};
res.end(JSON.stringify(myResult));

        });

     app.listen(8000, function() {
        console.log("Server is running!");
        console.log(__dirname);
     });