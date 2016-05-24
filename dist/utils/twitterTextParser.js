define(["require", "exports", '../components/constants'], function (require, exports, Constants) {
    'use strict';
    class TwitterTextParser {
        static replaceBetween(str, startIdx, endIdx, replacement) {
            return str.substring(0, startIdx) + replacement + str.substring(endIdx);
        }
        static getReplacementList(entities) {
            let list = [];
            if (entities.urls && entities.urls.length) {
                entities.urls.forEach((entityUrl) => {
                    list.push({
                        startIdx: entityUrl.indices[0],
                        endIdx: entityUrl.indices[1],
                        replacementText: '<a href="' + entityUrl.url + '" target="_blank">' + entityUrl.url + '</a>'
                    });
                });
            }
            if (entities.user_mentions && entities.user_mentions.length) {
                entities.user_mentions.forEach((entityUser) => {
                    list.push({
                        startIdx: entityUser.indices[0],
                        endIdx: entityUser.indices[1],
                        replacementText: '<a href="' + Constants.TWITTER_BASE_URL +
                            entityUser.screen_name + '" target="_blank">@' + entityUser.screen_name + '</a>'
                    });
                });
            }
            if (entities.media && entities.media.length) {
                entities.media.forEach((entityMedia) => {
                    list.push({
                        startIdx: entityMedia.indices[0],
                        endIdx: entityMedia.indices[1],
                        replacementText: '<a href="' + entityMedia.url + '" target="_blank">' + entityMedia.url + '</a>'
                    });
                });
            }
            if (entities.hashtags && entities.hashtags.length) {
                entities.hashtags.forEach((entityHashtag) => {
                    list.push({
                        startIdx: entityHashtag.indices[0],
                        endIdx: entityHashtag.indices[1],
                        replacementText: '<a href="' + Constants.TWITTER_HASHTAG_BASE_URL +
                            entityHashtag.text + '" target="_blank">#' + entityHashtag.text + '</a>'
                    });
                });
            }
            return list.sort((a, b) => {
                return (a.startIdx > b.startIdx) ? 1 : ((a.startIdx < b.startIdx) ? -1 : 0);
            });
        }
        static parseTweerText(text, entities) {
            let replacements = this.getReplacementList(entities);
            let offset = 0;
            replacements.forEach((replacement) => {
                text = this.replaceBetween(text, (replacement.startIdx + offset), (replacement.endIdx + offset), replacement.replacementText);
                offset += replacement.replacementText.length - (replacement.endIdx - replacement.startIdx);
            });
            return text;
        }
    }
    return TwitterTextParser;
});
