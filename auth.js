const passport = require('passport');
const user = require('./models/users');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require("dotenv").config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",

},
    function async(accessToken, refreshToken, profile, cb) {

        const person = findOrCreate(profile)
        cb(null, person);

    }
    , (req, res) => {
        console.log(req);
    }
));



passport.serializeUser((obj, done) => {
    done(null, obj);
})
passport.deserializeUser((obj, done) => {
    done(null, obj);
})


const findOrCreate = async function (profile) {
    console


    const person = await user.findOne({ email: profile.emails[0].value });
    if (person) {
        console.log(profile);
        return person;

    }
    else {

        const newperson = new user({});
        newperson.email = profile.emails[0].value;
        newperson.username = profile.displayName;
        newperson.photo = profile.photos[0].value;
        await newperson.save();
        console.log("new person");
        return newperson;
    }


}