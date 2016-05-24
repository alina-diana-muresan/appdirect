/// <reference path="../../references.d.ts" />

'use strict';

import React = require('react');
import Loader = require('../generic/loader');
import Stream = require('./stream');
import Constants = require('../../components/constants');
import UserDataModel = require('../../models/userDataModel');

/**
 * displays the group of streams
 * retrieves information on the given users,
 * then builds the array of streams
 */
module StreamGroup {
    interface Props extends React.Props<StreamGroupComponent> {
        userList: string[];
    };
    interface State {
        isLoaded: boolean;
    };

    export class StreamGroupComponent extends React.Component<Props, State> {
        private userDataModel: UserDataModel;

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
            this.userDataModel = new UserDataModel(this.props.userList);
            this.userDataModel.on('request', (): void => {
                if (this.state.isLoaded) {
                    this.setState({ isLoaded: false });
                }
            });
            this.userDataModel.on('sync', (): void => {
                if (!this.state.isLoaded) {
                    this.setState({ isLoaded: true });
                }
            });
            this.userDataModel.fetch();
        }

        /**
         * clean up the event bindings
         */
        public componentWillUnmount(): void {
            this.userDataModel.off('request');
            this.userDataModel.off('sync');
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
         * build the stream list if the model has finished loading
         */
        private getContent(): React.ReactElement<React.HTMLAttributes>[] {
            if (!this.state.isLoaded) {
                return null;
            }

            return this.userDataModel.users().map((user: TwitterUser, idx: number):
                React.ReactElement<React.HTMLAttributes> => {
                    return (
                        <Stream userData={user} key={idx} />
                    );
            });
        }

        public render(): React.ReactElement<React.HTMLAttributes> {
            return (
                <div className="Stream-Group">
                    {this.getLoader()}
                    {this.getContent()}
                </div>
            );
        }
    }
}

export = StreamGroup.StreamGroupComponent;
