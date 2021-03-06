var express = require('express')
  , passport = require('passport')
  , util = require('util')
  , SteamStrategy = require('passport-steam').Strategy;
var mongoose = require('mongoose');
var config = require('./config');

mongoose.connect(config.MONGO_URI);

mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new SteamStrategy({
//    returnURL: 'http://localhost:3000/auth/steam/return',
//    realm: 'http://localhost:3000',
    returnURL: 'http://elefgee.heroku.com/auth/steam/return',
    realm: 'http://elefgee.heroku.com/',
    apiKey: '41AB27857C781D410407E14B482DB2ED'
  },
  function(identifier, profile, done) {
    process.nextTick(function () {
      profile.identifier = identifier;
      return done(null, profile);
    });
  }
));

var app = express.createServer();
var io = require('socket.io')(app);

// express config
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.static('app'));
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'oboyitslit' }));
  app.use(passport.initialize());
  app.use('/public', express.static(__dirname + '/public'));
  app.use('/bower_components',  express.static(__dirname + '/bower_components'));
  app.use(passport.session());
  app.use(app.router);
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  console.log('listening on *: ' + this.address().port);
});

var routes = require('./routes')(app, passport);

io.on('connection', function (socket){
  console.log('a user has connected');

  socket.on('add-post', function(data){
    io.emit('add-post', data);
  })

  socket.on('delete-post', function(){
    io.emit('delete-post', app.posts);
  })

  socket.on('disconnect', function() {
    console.log('a user has disconnected');
  });
});

// http.listen(port, function(){
  // console.log('listening on *: ' + port);
  // console.log(process.env.PORT);
// })
