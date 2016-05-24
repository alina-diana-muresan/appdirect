define(["require", "exports"], function (require, exports) {
    'use strict';
    var Config;
    (function (Config) {
        Config.USER_LIST = ['AppDirect', 'LaughingSquid', 'TechCrunch'];
        Config.TWEET_COUNT = '30';
    })(Config || (Config = {}));
    return Config;
});
