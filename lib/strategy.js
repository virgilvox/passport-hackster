'use strict';
var util = require('util');
var OAuth2Strategy = require('passport-oauth2');

function Strategy(options, verify) {
  options = options || {};
  options.authorizationURL = options.authorizationURL || 'https://www.hackster.io/oauth/authorize';
  options.tokenURL = options.tokenURL || 'https://www.hackster.io/oauth/token';
  options.profileUrl = options.profileUrl || 'https://api.hackster.io/v2/me';
  options.customHeaders = options.customHeaders || {};
  options.grant_type = options.grant_type || 'client_credentials';

  OAuth2Strategy.call(this, options, verify);
  this.name = 'hackster';

  this._oauth2.useAuthorizationHeaderforGET(true);
}


util.inherits(Strategy, OAuth2Strategy);


Strategy.prototype.userProfile = function(accessToken, done) {
  this._oauth2.get(this.profileUrl, accessToken, function (err, body, res) {
    if (err) { return done(err); }

    try {
      var json = JSON.parse(body);

      var profile = { provider: 'Hackster' };
      profile.id = json.id;
      profile.displayName = json.name;
      profile.username = json.user_name;
      profile.email = json.email;
      profile._raw = body;
      profile._json = json;
      done(null, profile);
    } catch(e) {
      done(e);
    }
  });
};

module.exports = Strategy;
