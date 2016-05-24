define(["require", "exports"], function (require, exports) {
    'use strict';
    var Constants;
    (function (Constants) {
        let baseUrl = 'http://localhost:7890/1.1/';
        Constants.TWITTER_BASE_URL = 'https://twitter.com/';
        Constants.TWITTER_HASHTAG_BASE_URL = Constants.TWITTER_BASE_URL + 'hashtag/';
        Constants.STREAM_URL = baseUrl + 'statuses/user_timeline.json';
        Constants.USERS_LOOKUP_URL = baseUrl + 'users/lookup.json';
    })(Constants || (Constants = {}));
    return Constants;
});
