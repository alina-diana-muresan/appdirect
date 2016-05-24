/// <reference path="../../references.d.ts" />

'use strict';

import React = require('react');
import StorageUtils = require('../../utils/storageUtils');
import Header = require('./header');
import StreamGroup = require('../streams/streamGroup');

/**
 * main application wrapper
 */
module Wrapper {
    interface State {
        isEditMode: boolean;
    };

    export class WrapperComponent extends React.Component<{}, State> {
        /**
         * set the initial state of the component
         */
        constructor() {
            super();
            this.state = {
                isEditMode: false
            };
            StorageUtils.getInstance().on('dataSaved', (): void => {
                this.setState({
                    isEditMode: false
                });
            });
        }

        private onEditModeToggle(): void {
            this.setState(_.extend({}, this.state, {
                isEditMode: !this.state.isEditMode
            }));
        }

        /**
         * clean up the event binding
         */
        public componentWillUnmount(): void {
            StorageUtils.getInstance().off('dataSaved');
        }

        public render(): React.ReactElement<React.HTMLAttributes> {
            let appConfig: AppConfig = StorageUtils.getInstance().getConfigData();
            let streamGroup: React.ReactElement<React.HTMLAttributes>;
            if (!this.state.isEditMode) {
                streamGroup = <StreamGroup userList={appConfig.userList} />;
            }
            return (
                <div className="App">
                    <Header isEditMode={this.state.isEditMode}
                        onEditModeToggle={this.onEditModeToggle.bind(this)}
                    />
                    {streamGroup}
                </div>
            );
        }
    }
}

export = Wrapper.WrapperComponent;
