/// <reference path="../../references.d.ts" />

'use strict';

import React = require('react');
import StorageUtils = require('../../utils/storageUtils');
import InputElement = require('./inputElement');
import UserDataModel = require('../../models/userDataModel');

/**
 * application header component
 */
module Header {
    interface Props extends React.Props<HeaderComponent> {
        isEditMode: boolean;
        onEditModeToggle: () => void;
    };
    interface State {
        appConfig: AppConfig;
    };

    export class HeaderComponent extends React.Component<Props, State> {
        /**
         * set the initial state of the component
         */
        constructor(props?: Props) {
            super(props);
            this.state = {
                appConfig: StorageUtils.getInstance().getConfigData()
            };
            StorageUtils.getInstance().on('dataReset dataSaved', (): void => {
                this.setState({
                    appConfig: StorageUtils.getInstance().getConfigData()
                });
            });
        }

        /**
         * clean up the event binding
         */
        public componentWillUnmount(): void {
            StorageUtils.getInstance().off('dataReset dataSaved');
        }

        /**
         * in order to have a valid list of users, we must query the user data
         * and only retain the valid users
         */
        private saveUsers(callback: () => void) {
            let userList: string = (this.refs as any).UserListInput.getValue();
            if (userList !== '' && userList !== this.state.appConfig.userList.join(',')) {
                /**
                 * if we need to save the users, we need to make a call to the users API
                 * to obtain the list of correct users
                 */
                let userListArray: string[] = userList.split(',');
                let userDataModel: UserDataModel = new UserDataModel(userListArray);
                userDataModel.fetch({
                    success: (model?: any, response?: any): void => {
                        /**
                         * given that the API does not necessarily return the
                         * user list in the order we had started with,
                         * we must maintain the order the user had provided
                         */
                        let returnedUserList: string[] = [];
                        model.users().forEach((user: TwitterUser): void => {
                            if (user.screen_name !== undefined) {
                                returnedUserList.push(user.screen_name);
                            }
                        });

                        let validUserList: string[] = userListArray.filter((user: string): boolean => {
                            return returnedUserList.find((existingUser: string): boolean => {
                                return existingUser === user;
                            }) !== undefined;
                        });

                        // only save the new list to local storage if there is any valid user in the list
                        if (validUserList.length) {
                            StorageUtils.getInstance().saveUserList(validUserList.join(','));
                        }

                        // continue saving the rest of the data
                        callback();
                    },
                    error: (model?: any, jqxhr?: JQueryXHR): void => {
                        // continue saving the rest of the data
                        callback();

                        throw new Error('Could not query valid user list.');
                    }
                });
            } else {
                // even if the user list was not changed, continue saving the rest of the data
                callback();
            }
        }

        /**
         * save number of tweets to retrieve
         */
        private saveCount(): void {
            let tweetCount: string = (this.refs as any).TweetCountInput.getValue().trim();
            if (tweetCount !== '' && tweetCount !== this.state.appConfig.postCount) {
                StorageUtils.getInstance().savePostCount(tweetCount);
            }
        }

        /**
         * validate and save the changes
         * announce after all saving is done
         */
        private saveChanges(): void {
            this.saveUsers((): void => {
                this.saveCount();
                StorageUtils.getInstance().announceSavingDone();
            })
        }

        /**
         * clean up the user list string
         */
        private parseUserList(newValue: string): string {
            return StorageUtils.getInstance().normalizeUserList(newValue);
        }

        /**
         * normalize the post count
         */
        private parsePostCount(newValue: string): string {
            return StorageUtils.getInstance().normalizePostCount(newValue);
        }

        /**
         * clear local storage and rely on the default configuration
         */
        private resetConfig(): void {
            StorageUtils.getInstance().resetConfigData();

            this.props.onEditModeToggle();
        }

        private getHeaderText(): React.ReactElement<React.HTMLAttributes> {
            let postsString: string = this.state.appConfig.postCount === '1' ? ' post' : ' posts';
            return (
                <div className="Header-Text">
                    {'Showing the newest ' + this.state.appConfig.postCount + postsString +
                        ' for: ' + this.state.appConfig.userList.join(', ') + '.'}
                </div>
            );
        }

        private getEditButton(): React.ReactElement<React.HTMLAttributes> {
            let butonText: string = this.props.isEditMode ? 'cancel' : 'settings';
            return (
                <div className="Header-Buttons">
                    <span className="Header-Button" onClick={this.props.onEditModeToggle.bind(this)} tabIndex="0">{butonText}</span>
                </div>
            );
        }

        private getEditForm(): React.ReactElement<React.HTMLAttributes> {
            if (!this.props.isEditMode) {
                return null;
            }

            return (
                <div className="Header-Form">
                    <div className="Header-Form-Element">
                        <InputElement value={this.state.appConfig.userList.join(',')}
                            ref='UserListInput'
                            labelText='Screen names of users for whom streams should be created'
                            placeholder='user list'
                            onSubmit={this.saveChanges.bind(this)}
                            onChange={this.parseUserList.bind(this)}
                        />
                    </div>
                    <div className="Header-Form-Element">
                        <InputElement value={this.state.appConfig.postCount}
                            ref='TweetCountInput'
                            labelText='Number of tweets to show for each stream'
                            placeholder='tweet count'
                            onSubmit={this.saveChanges.bind(this)}
                            onChange={this.parsePostCount.bind(this)}
                        />
                    </div>
                    <span className="Header-Form-Button" onClick={this.saveChanges.bind(this)} tabIndex="0">save</span>
                    <span className="Header-Form-Button" onClick={this.resetConfig.bind(this)} tabIndex="0">reset to defaults</span>
                </div>
            );
        }

        public render(): React.ReactElement<React.HTMLAttributes> {
            return (
                <div className="Header-Wrapper">
                    <div className="Header">
                        {this.getHeaderText()}
                        {this.getEditButton()}
                    </div>
                    {this.getEditForm()}
                </div>
            );
        }
    }
}

export = Header.HeaderComponent;
