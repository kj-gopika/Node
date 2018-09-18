const pg        = require('pg');
const express   = require('express');
const app       = express();
var path=require('path');
var x={};
const config = {
    user: 'postgres',
    database: 'postgres',
    password: 'qwerty',
    port: 5432
};

// pool takes the object above -config- as parameter
const pool = new pg.Pool(config);

app.get('/', (req, res, next) => {
   pool.connect(function (err, client, done) {
       if (err) {
           console.log("Can not connect to the DB" + err);
       }
       
       client.query('SELECT * FROM portfolio', function (err, result) {
          // console.log(result.rows);
          console.log(path.join(__dirname,'views'));
           var name=(result.rows[0].name);
           var title=(result.rows[0].title);
           var description=(result.rows[0].description);
           var connect=(result.rows[0].connect.split('  '));
           var social=(result.rows[0].social.split('  '));
           console.log(name);
           console.log(title);
           console.log(description);
           console.log(connect);
           console.log(social); 
            done();
            if (err) { 
                console.log(err);
                res.status(400).send(err);
            }
            //res.status(200).send(x);//result.rows);
            res.render('index',{name_s:name,
                title_s:title,
                description_s:description,
                connect_s:connect,
                social_s:social});
       })
   })
  
});

app.listen(4000, function () {
    console.log('Server is running.. on Port 4000');
    console.log((path.join(__dirname, 'images')));
});



//View Engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname, 'assets')))
app.use( express.static(path.join(__dirname, 'images')));