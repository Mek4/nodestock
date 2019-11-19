// Stock Market Poerfolio App By Chad Hughes

const express = require('express');
const app = express();
const  exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

//use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));

// API KEY pk_ef734777e722443b8c2c885246bf95cd
//Create call API function
function call_api(finishedAPI, ticker) {
  request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_ef734777e722443b8c2c885246bf95cd', { json: true }, (err, res, body) => {
  if (err) {return console.log(err);}
  if (res.statusCode ==200){
    //console.log(body);
    finishedAPI(body);
      };
  });
};

//Set handlebars Middlewear
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "hello there, this is other stuff!";

// Set handlebars index GET route
app.get('/', function (req, res) {
  call_api(function(doneAPI) {
          res.render('home', {
          stock: doneAPI
        });
    },"fb");
});


// Set handlebars index POST route
app.post('/', function (req, res) {
  call_api(function(doneAPI) {
        //posted_stuff = req.body.stock_ticker;
          res.render('home', {
          stock: doneAPI,
          });
    }, req.body.stock_ticker);
});
// Create about page routes
app.get('/about.html', function (req, res) {
    res.render('about');
});
// Seperate static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Server listening on port' +  PORT));
