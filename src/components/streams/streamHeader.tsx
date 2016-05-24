/// <reference path="../../references.d.ts" />

'use strict';

import React = require('react');
import Constants = require('../constants');

/**
 * builds the header of each stream
 */
module StreamHeader {
    interface Props extends React.Props<StreamHeaderComponent> {
        userData: TwitterUser;
    };

    export class StreamHeaderComponent extends React.Component<Props, {}> {
        private getUserName(userUrl: string): React.ReactElement<React.HTMLAttributes> {
            if (!this.props.userData.name) {
                return null;
            }

            return (
                <a className="Stream-User-Name"
                    href={userUrl} target="_blank"
                    title={this.props.userData.name}
                >
                    {this.props.userData.name}
                </a>
            );
        }

        private getScreenName(userUrl: string): React.ReactElement<React.HTMLAttributes> {
            if (!this.props.userData.screen_name) {
                return null;
            }

            return (
                <a className="Stream-User-ScreenName"
                    href={userUrl} target="_blank"
                >@{this.props.userData.screen_name}</a>
            );
        }

        public render(): React.ReactElement<React.HTMLAttributes> {
            let userUrl: string = Constants.TWITTER_BASE_URL + this.props.userData.screen_name;
            return (
                <div className="Stream-Header">
                    <a className="Stream-Avatar" href={userUrl} target="_blank">
                        <img src={this.props.userData.profile_image_url_https} alt={this.props.userData.name} />
                    </a>
                    <div className="Stream-User">
                        {this.getUserName(userUrl)}
                        {this.getScreenName(userUrl)}
                    </div>
                </div>
            );
        }
    }
}

export = StreamHeader.StreamHeaderComponent;
