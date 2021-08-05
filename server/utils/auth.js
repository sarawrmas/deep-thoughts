const jwt = require("jsonwebtoken");
// optional secret enables the server to verify whether it recognizes the token
const secret = "I'll never tell!";
// optional expiration date
const expiration = "2h";

module.exports = {
  // signToken() expects user object and adds specs to token
  signToken: function({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },

  // create middleware to perform logic on headers
  // avoids having to add logic to every resolver
  authMiddleware: function({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // separate "Bearer" from "<tokenvalue>"
    if (req.headers.authorization) {
      token = token
        .split(' ')
        .pop()
        .trim();
    }

    // if no token, return request object as is
    if (!token) {
      return req;
    }

    // wrap verify() method in a try...catch statement to mute error
    // so user can still request and view all thoughts
    try {
      // decode and attach user data to request object
      const { data } = jwt.verify(token, secret, {maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token')
    }

    // return updated request object
    return req;
  }
};