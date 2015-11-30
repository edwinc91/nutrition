var express         = require('express'),
    PORT            = process.env.PORT || 3001,
    server          = express(),
    MONGOURI        = process.env.MONGOLAB_URI || "mongodb://localhost:27017",
    dbname          = "nutrition",
    mongoose        = require('mongoose'),
    Schema          = mongoose.Schema,
    ejs             = require('ejs'),
    expressLayouts  = require('express-ejs-layouts'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    session         = require('express-session');

var nutritionSchema = new Schema({
  author: { type: String, required: true },
  food1: { type: String, required: true },
  nutrition1: { type: Number, required: true },
  food2: { type: String },
  nutrition2: { type: Number },
  food3: { type: String },
  nutrition3: { type: Number },
  food4: { type: String },
  nutrition4: { type: Number },
  food5: { type: String },
  nutrition5: { type: Number },
  time: { type: Date, default: Date.now },
  caloriesAlloted: { type: Number },
  caloriesConsumed: { type: Number },
  totalCalories: 0
}, {collection: 'nutrition_list', strict: true});

var Nutrition = mongoose.model(null, nutritionSchema);

var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true},
  email: { type: String, required: true, unique: true }
}, {strict: true});

var User = mongoose.model("User", userSchema);

server.get('/secret-test', function (req, res) {
  res.write("this is working");
  res.end();
});

mongoose.connect(MONGOURI + "/" + dbname);
server.listen(PORT, function () {
  console.log("Server is running on PORT: ", PORT);
});

server.set('views', './views');
server.set('view engine', 'ejs');

server.use(session({
  secret: "hi",
  resave: true,
  saveUninitialized: false
}));

server.use(express.static('./public'));
server.use(expressLayouts);
server.use(methodOverride('_method'));

server.use(bodyParser.urlencoded({ extended: true }));

// server.use(function (req, res, next) {
//   console.log("REQ DOT BODY", req.body);
//   console.log("REQ DOT SESSION", req.session);
//
//   next();
// });

server.get('/dailychart', function (req, res) {
  Nutrition.find({author: req.session.user.username}, function (err, allNutritions) {
    res.render('homepage', {
      nutritions: allNutritions,
    });
  })
});

server.get('/day/new', function (req, res) {
  if (req.session.user == undefined) {
    res.render('login');
  } else {
    res.render('newday', { author: req.session.user.username });
  }
});

server.get('/day/:id/edit', function (req, res) {
  Nutrition.findById(req.params.id, function (err, aSpecificNutrition) {
    if (err) {
      console.log(err)
    } else {
      res.render('edit', {
        nutrition: aSpecificNutrition,
        currentUser: req.session.user
      });
    }
  });
});

server.patch('/day/:id/edit', function (req, res) {
  var nutritionEdit = req.body.nutrition;
  console.log(req)

  Nutrition.findByIdAndUpdate(req.params.id, nutritionEdit, function (err, updatedNutrition) {
    if (err) {
      console.log(err);
    } else {
      res.redirect(302, "/day/" + updatedNutrition._id);
    }
  });
});

server.delete('/day/:id', function (req, res) {
  Nutrition.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      console.log(err);
    } else {
      if (req.session.user) {
        res.redirect(302, '/dailychart');
      } else {
        res.redirect(302, '/');
      };
    }
  });
});

server.get('/day/:id', function (req, res) {
  Nutrition.findById(req.params.id, function (err, aSpecificNutrition) {
    if (err) {
      console.log(err)
    } else {
      res.render('showday', {
        nutrition: aSpecificNutrition,
        currentUser: req.session.user
        // author: aSpecificThread.author
      });
    }
  });
});

server.get('/login', function (req, res) {
  res.render('login');
})

server.post('/login', function (req, res) {
  var attempt = req.body.user;
  // console.log("_________________________");
  // console.log(attempt);
  // console.log("_________________________");
  User.findOne({ username: attempt.name }, function (err, user) {
    if (err) {
      console.log(err);
    } else if (user && user.password === attempt.password) {
      req.session.user = user;
      res.redirect(302, "/dailychart");
      console.log(req.session);
    } else {
      res.redirect(302, '/login');
    };
  });
});

server.post('/', function (req, res, next) {
  req.session.user = req.body.user
//   if (req.session.user == undefined) {
//     res.redirect(302, "/login");
//   } else {
//     next();
//   }
// console.log(req.session)
res.redirect(302, '/dailychart')
});

server.get('/register', function (req, res) {
  res.render('register');
});

server.post('/register', function (req, res) {
  var newUser = User(req.body.user);
  newUser.save(function (err, userRandom) {
    // console.log("!!!!!!!!!");
    // console.log(newUser);
    // console.log("!!!!!!!!!");
    if (err) {
      console.log(err);
    } else {
    res.redirect(302, "/login");
    }
  });
});

server.get('/', function (req, res) {
  console.log(req.session);
  Nutrition.find({}, function (err, allNutritions) {
    if (err) {
      console.log(err)
    } else {
      req.session.destroy();
      res.render('login');
    }
  });
});

server.post('/dailychart', function (req, res) {
  // if (req.body.thread == undefined) {
  //   console.log("what is going on" + req.session, req.body);
  //   res.redirect(302, "/");
  // } else {
  var newNutrition = new Nutrition({
    // req.body.thread
    author: req.session.user.username,
    food1: req.body.nutrition.food1,
    nutrition1: req.body.nutrition.nutrition1,
    food2: req.body.nutrition.food2,
    nutrition2: req.body.nutrition.nutrition2,
    food3: req.body.nutrition.food3,
    nutrition3: req.body.nutrition.nutrition3,
    food4: req.body.nutrition.food4,
    nutrition4: req.body.nutrition.nutrition4,
    food5: req.body.nutrition.food5,
    nutrition5: req.body.nutrition.nutrition5,
    date: req.body.nutrition.date
  });
  newNutrition.save(function (err, newNutritionSaved) {
    if (err) {
      console.log(err);
    } else {
      console.log(newNutritionSaved);
      res.redirect(302, "/dailychart");
    }
  });
});
