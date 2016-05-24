/// <reference path="../../references.d.ts" />

'use strict';

import React = require('react');
import Loader = require('../generic/loader');
import StreamModel = require('../../models/streamModel');
import StreamHeader = require('./streamHeader');
import StreamItem = require('./streamItem');
import Message = require('../generic/message');

/**
 * handles the retrieval of data for each individual stream
 */
module Stream {
    interface Props extends React.Props<StreamComponent> {
        userData: TwitterUser;
    };
    interface State {
        isLoaded: boolean;
    };

    export class StreamComponent extends React.Component<Props, State> {
        private streamModel: StreamModel;

        /**
         * set the initial state of the component
         */
        constructor(props?: Props) {
            super(props);
            this.state = { isLoaded: false };
        }

        /**
         * initialize the model and fetch the data
         */
        public componentDidMount(): void {
            this.streamModel = new StreamModel(this.props.userData.screen_name);
            this.streamModel.on('request', (): void => {
                if (this.state.isLoaded) {
                    this.setState({ isLoaded: false });
                }
            });
            this.streamModel.on('sync', (): void => {
                if (!this.state.isLoaded) {
                    this.setState({ isLoaded: true });
                }
            });
            this.streamModel.fetch();
        }

        /**
         * clean up the event bindings
         */
        public componentWillUnmount(): void {
            this.streamModel.off('request');
            this.streamModel.off('sync');
        }

        /**
         * retrieving the header of the stream box
         */
        private getStreamHeader(): React.ReactElement<React.HTMLAttributes> {
            return (
                <StreamHeader userData={this.props.userData} />
            );
        }

        /**
         * display the loader if needed
         */
        private getLoader(): React.ReactElement<React.HTMLAttributes> {
            if (this.state.isLoaded) {
                return null;
            }

            return (
                <Loader />
            );
        }

        /**
         * build the stream list
         */
        private getStreamContent(): React.ReactElement<React.HTMLAttributes>[] {
            if (!this.state.isLoaded) {
                return null;
            }

            if (!this.streamModel.items().length) {
                let messageItem: MessageItem = {
                    text: 'There are no tweets to display for this user.',
                    isError: false
                };
                return (
                    [<Message messageItem={messageItem} key={0} />]
                );
            }

            return this.streamModel.items().map((item: TwitterItem, idx: number): React.ReactElement<React.HTMLAttributes> => {
                return (
                    <StreamItem itemData={item} key={idx} />
                );
            });
        }

        public render(): React.ReactElement<React.HTMLAttributes> {
            return (
                <div className="Stream">
                    {this.getStreamHeader()}
                    {this.getLoader()}
                    <div className="Stream-Content">
                        {this.getStreamContent()}
                    </div>
                </div>
            );
        }
    }
}

export = Stream.StreamComponent;
