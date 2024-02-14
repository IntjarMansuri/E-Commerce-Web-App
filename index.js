require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const MongoStore = require("connect-mongo");
const User = require("./models/user");
const PORT = process.env.PORT || 5000;

mongoose
  .connect("mongodb://127.0.0.1:27017/eshop")
  .then(() => {
    console.log("DB Connected!!!");
  })
  .catch((e) => console.log(e));

app.engine("ejs", ejsMate);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const secret = process.env.SECRET;

app.use(
  session({
    store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/eshop" }),
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  app.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.reject = req.flash("reject");
  next();
});

// Routes
const productRoutes = require("./routes/product");
const reviewRoutes = require("./routes/reviews");
const authRoutes = require("./routes/auth");
const wishlistRoutes = require("./routes/wishlist");
const cartRoutes = require("./routes/cart");

// APIs
const productAPI = require("./routes/api/productapi");
const paymentAPI = require("./routes/api/paymentapi");

app.use(productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);
app.use(productAPI);
app.use(wishlistRoutes);
app.use(cartRoutes);
app.use(paymentAPI);

app.get("/", (req, res) => {
  res.render("home", { title: "Eshop - Your One-Stop Shop" });
});

app.listen(PORT, () => {
  console.log("Server is running on PORT", PORT);
});
