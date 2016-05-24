/// <reference path="../../references.d.ts" />

'use strict';

import React = require('react');
import Constants = require('../constants');
import GenericUtils = require('../../utils/genericUtils');
import TwitterTextParser = require('../../utils/twitterTextParser');

/**
 * builds an individual stream tweet
 */
module StreamItem {
    interface Props extends React.Props<StreamItemComponent> {
        itemData: TwitterItem
    };

    export class StreamItemComponent extends React.Component<Props, {}> {
        /**
         * provide the retweet info, if applicable
         */
        private getRetweetInfo(): React.ReactElement<React.HTMLAttributes> {
            if (!this.props.itemData.retweeted_status) {
                return null;
            }

            return (
                <div className="Stream-Item-Header">
                    {this.props.itemData.user.name + ' Retweeted'}
                </div>
            );
        }

        /**
         * build the tweet body
         *
         * since we are parsing the text ourselves, and the text comes from Twitter,
         * we are considering it safe from XSS attacks, therefore we are adding it
         * with the dangerouslySetInnerHTML method
         */
        private getTweet(): React.ReactElement<React.HTMLAttributes> {
            let item: TwitterItem = this.props.itemData.retweeted_status || this.props.itemData;
            let userUrl: string = Constants.TWITTER_BASE_URL + item.user.screen_name;

            return (
                <div className="Stream-Item-Body">
                    <a className="Stream-Item-Avatar" href={userUrl} target="_blank">
                        <img src={item.user.profile_image_url_https} alt={item.user.name} />
                    </a>
                    <div className="Stream-Item-User">
                        <div className="Stream-Item-UserData">
                            <a className="Stream-Item-Name"
                                href={userUrl} target="_blank" title={item.user.name}
                            >{item.user.name}</a>
                            <a className="Stream-Item-ScreenName"
                                href={userUrl} target="_blank"
                            >@{item.user.screen_name}</a>
                        </div>
                        <span className="Stream-Item-Date">{GenericUtils.parseDate(item.created_at)}</span>
                        <div className="Stream-Item-Text" dangerouslySetInnerHTML={{
                            __html: TwitterTextParser.parseTweerText(item.text, item.entities)
                        }}></div>
                    </div>
                </div>
            );
        }

        public render(): React.ReactElement<React.HTMLAttributes> {
            return (
                <div className="Stream-Item">
                    {this.getRetweetInfo()}
                    {this.getTweet()}
                </div>
            );
        }
    }
}

export = StreamItem.StreamItemComponent;
