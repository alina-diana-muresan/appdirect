/// <reference path="../references.d.ts" />

'use strict';

import Constants = require('../components/constants');

interface StringReplacementData {
    startIdx: number;
    endIdx: number;
    replacementText: string;
}

class TwitterTextParser {
    /**
     * utility method for replacing a piece of the string,
     * given start index, end index and replacement text
     */
    private static replaceBetween(str: string, startIdx: number, endIdx: number, replacement: string): string {
        return str.substring(0, startIdx) + replacement + str.substring(endIdx);
    }

    private static getReplacementList(entities: TwitterEntityData) {
        let list: StringReplacementData[] = [];

        if (entities.urls && entities.urls.length) {
            entities.urls.forEach((entityUrl: TwitterEntityUrl): void => {
                list.push({
                    startIdx: entityUrl.indices[0],
                    endIdx: entityUrl.indices[1],
                    replacementText: '<a href="' + entityUrl.url + '" target="_blank">' + entityUrl.url + '</a>'
                });
            });
        }

        if (entities.user_mentions && entities.user_mentions.length) {
            entities.user_mentions.forEach((entityUser: TwitterEntityUser): void => {
                list.push({
                    startIdx: entityUser.indices[0],
                    endIdx: entityUser.indices[1],
                    replacementText: '<a href="' + Constants.TWITTER_BASE_URL +
                        entityUser.screen_name + '" target="_blank">@' + entityUser.screen_name + '</a>'
                });
            });
        }

        if (entities.media && entities.media.length) {
            entities.media.forEach((entityMedia: TwitterEntityMedia): void => {
                list.push({
                    startIdx: entityMedia.indices[0],
                    endIdx: entityMedia.indices[1],
                    replacementText: '<a href="' + entityMedia.url + '" target="_blank">' + entityMedia.url + '</a>'
                });
            });
        }

        if (entities.hashtags && entities.hashtags.length) {
            entities.hashtags.forEach((entityHashtag: TwitterEntityHashtag): void => {
                list.push({
                    startIdx: entityHashtag.indices[0],
                    endIdx: entityHashtag.indices[1],
                    replacementText: '<a href="' + Constants.TWITTER_HASHTAG_BASE_URL +
                        entityHashtag.text + '" target="_blank">#' + entityHashtag.text + '</a>'
                });
            });
        }

        return list.sort((a: StringReplacementData, b: StringReplacementData): number => {
            return (a.startIdx > b.startIdx) ? 1 : ((a.startIdx < b.startIdx) ? -1 : 0);
        });
    }

    /**
     * parsing tweet text, replacing links where needed
     * note that no escaping is happening, as this is considered a trusted source (Twitter API data)
     */
    public static parseTweerText(text: string, entities: TwitterEntityData): string {
        let replacements: StringReplacementData[] = this.getReplacementList(entities);
        let offset: number = 0;
        replacements.forEach((replacement: StringReplacementData): void => {
            text = this.replaceBetween(text,
                (replacement.startIdx + offset),
                (replacement.endIdx + offset),
                replacement.replacementText
            );
            offset += replacement.replacementText.length - (replacement.endIdx - replacement.startIdx);
        });
        return text;
    }
}

export = TwitterTextParser;
