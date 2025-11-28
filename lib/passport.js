require("dotenv").config();
const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const User = require("../models/AuthModel");

const option = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

passport.use(
  new JwtStrategy(option, async (payload, done) => {
    try {
      const user = await User.selectUserById(payload.id);

      if (!user) {
        return done(null, false); // user not found
      }
      return done(null, user.rows[0]);
    } catch (err) {
      return done(err, false);
    }
  })
);

module.exports = passport;
