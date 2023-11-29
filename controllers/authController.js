const passport = require("passport");
const User = require("../models/user");

module.exports.login = async (req, res) => {
    res.render('auth/login');
};

module.exports.signup = async (req, res) => {
    res.render('auth/signup');
};

module.exports.signupUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const user = new User ({ username, email, role });
        await User.register(user, password);

        req.flash('success', 'Signup Successfully');
        res.redirect('/products');
    } catch (e) {
        req.flash('reject', e.message);
        res.redirect('/signup');
    }
};

module.exports.loginUser = (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        if (err) {
            req.flash('reject', 'An error occurred while logging in.');
            return next(err);
        }

        if (!user) {
            req.flash('reject', 'Invalid username or password.');
            return res.redirect('/login');
        }

        // User is successfully authenticated
        req.logIn(user, (err) => {
            if (err) {
                req.flash('reject', 'An error occurred while logging in.');
                return next(err);
            }

            req.flash('success', `Welcome ${user.username}`);
            res.redirect('/products');
        });
    })(req, res, next);
};

module.exports.logoutUser = async (req, res, next) => {
    req.logout(function(err) {
        if(err) { return next(err); }

        req.flash('success', 'You have been logged out');
        res.redirect('/products');
    })
};