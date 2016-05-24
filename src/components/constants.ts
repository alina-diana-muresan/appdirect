'use strict';

/**
 * module holding the constants for the application
 */
module Constants {
    let baseUrl: string = 'http://localhost:7890/1.1/';

    export const TWITTER_BASE_URL: string = 'https://twitter.com/';
    export const TWITTER_HASHTAG_BASE_URL: string = TWITTER_BASE_URL + 'hashtag/';

    export const STREAM_URL: string = baseUrl + 'statuses/user_timeline.json';
    export const USERS_LOOKUP_URL: string = baseUrl + 'users/lookup.json';
}

export = Constants;
