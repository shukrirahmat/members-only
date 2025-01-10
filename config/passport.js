const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../db/queries");
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const rows = await db.findUserWithUsername(username);
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Username does not exist" });
      }

      const pwmatch = await bcrypt.compare(password, user.password);

      if (!pwmatch) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const rows = await db.findUserWithID(id);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});
