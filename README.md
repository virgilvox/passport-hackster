# Passport-Hackster

[Passport](https://github.com/jaredhanson/passport) strategy for authenticating
with [Hackster](http://hackster.io) using the OAuth 2.0 API.

## Install

    $ npm install passport-hackster

## Usage

#### Configure Strategy

The Hackster authentication strategy authenticates users using a Hackster
account and OAuth 2.0 tokens.  The strategy requires a `verify` callback, which
accepts these credentials and calls `done` providing a user, as well as
`options` specifying a client ID, client secret, and callback URL.

    passport.use(new HacksterStrategy({
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL : CALLBACK_URL
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ HacksterId: profile.id }, function (err, user) {
          return done(err, user);
        });
      }
    ));

#### Authenticate Requests

Use `passport.authorize()`, specifying the `'Hackster'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/auth/hackster',
      passport.authorize('hackster'));

    app.get('/auth/hackster/callback',
      passport.authorize('hackster', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });

## Thanks

  - [Jared Hanson](http://github.com/jaredhanson)

## License

[The MIT License](http://opensource.org/licenses/MIT)
