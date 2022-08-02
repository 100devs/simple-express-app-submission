const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function initialize(passport, getUserByEmail, getUserByID) {
  const authenticateUser = async (email, password, done) => {
    // const user = await getUserByEmail(email);
    const user = getUserByEmail(email);
    // console.log("user data:", user);
    if (user == null) {
      return done(null, false, { message: "No user with that email" });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "password incorrect" });
      }
    } catch (err) {
      return done(err);
    }
  };
  passport.use(new localStrategy({ usernameField: "email" }, authenticateUser));

  passport.serializeUser((user, done) => {
    // console.log("serialize user");
    // console.log(user);
    return done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    return done(null, getUserByID(id));
  });
}

module.exports = initialize;
