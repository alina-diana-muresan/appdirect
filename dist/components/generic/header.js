define(["require", "exports", 'react', '../../utils/storageUtils', './inputElement', '../../models/userDataModel'], function (require, exports, React, StorageUtils, InputElement, UserDataModel) {
    'use strict';
    var Header;
    (function (Header) {
        ;
        ;
        class HeaderComponent extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    appConfig: StorageUtils.getInstance().getConfigData()
                };
                StorageUtils.getInstance().on('dataReset dataSaved', () => {
                    this.setState({
                        appConfig: StorageUtils.getInstance().getConfigData()
                    });
                });
            }
            componentWillUnmount() {
                StorageUtils.getInstance().off('dataReset dataSaved');
            }
            saveUsers(callback) {
                let userList = this.refs.UserListInput.getValue();
                if (userList !== '' && userList !== this.state.appConfig.userList.join(',')) {
                    let userListArray = userList.split(',');
                    let userDataModel = new UserDataModel(userListArray);
                    userDataModel.fetch({
                        success: (model, response) => {
                            let returnedUserList = [];
                            model.users().forEach((user) => {
                                if (user.screen_name !== undefined) {
                                    returnedUserList.push(user.screen_name);
                                }
                            });
                            let validUserList = userListArray.filter((user) => {
                                return returnedUserList.find((existingUser) => {
                                    return existingUser === user;
                                }) !== undefined;
                            });
                            if (validUserList.length) {
                                StorageUtils.getInstance().saveUserList(validUserList.join(','));
                            }
                            callback();
                        },
                        error: (model, jqxhr) => {
                            callback();
                            throw new Error('Could not query valid user list.');
                        }
                    });
                }
                else {
                    callback();
                }
            }
            saveCount() {
                let tweetCount = this.refs.TweetCountInput.getValue().trim();
                if (tweetCount !== '' && tweetCount !== this.state.appConfig.postCount) {
                    StorageUtils.getInstance().savePostCount(tweetCount);
                }
            }
            saveChanges() {
                this.saveUsers(() => {
                    this.saveCount();
                    StorageUtils.getInstance().announceSavingDone();
                });
            }
            parseUserList(newValue) {
                return StorageUtils.getInstance().normalizeUserList(newValue);
            }
            parsePostCount(newValue) {
                return StorageUtils.getInstance().normalizePostCount(newValue);
            }
            resetConfig() {
                StorageUtils.getInstance().resetConfigData();
                this.props.onEditModeToggle();
            }
            getHeaderText() {
                let postsString = this.state.appConfig.postCount === '1' ? ' post' : ' posts';
                return (React.createElement("div", {className: "Header-Text"}, 'Showing the newest ' + this.state.appConfig.postCount + postsString +
                    ' for: ' + this.state.appConfig.userList.join(', ') + '.'));
            }
            getEditButton() {
                let butonText = this.props.isEditMode ? 'cancel' : 'settings';
                return (React.createElement("div", {className: "Header-Buttons"}, 
                    React.createElement("span", {className: "Header-Button", onClick: this.props.onEditModeToggle.bind(this), tabIndex: "0"}, butonText)
                ));
            }
            getEditForm() {
                if (!this.props.isEditMode) {
                    return null;
                }
                return (React.createElement("div", {className: "Header-Form"}, 
                    React.createElement("div", {className: "Header-Form-Element"}, 
                        React.createElement(InputElement, {value: this.state.appConfig.userList.join(','), ref: 'UserListInput', labelText: 'Screen names of users for whom streams should be created', placeholder: 'user list', onSubmit: this.saveChanges.bind(this), onChange: this.parseUserList.bind(this)})
                    ), 
                    React.createElement("div", {className: "Header-Form-Element"}, 
                        React.createElement(InputElement, {value: this.state.appConfig.postCount, ref: 'TweetCountInput', labelText: 'Number of tweets to show for each stream', placeholder: 'tweet count', onSubmit: this.saveChanges.bind(this), onChange: this.parsePostCount.bind(this)})
                    ), 
                    React.createElement("span", {className: "Header-Form-Button", onClick: this.saveChanges.bind(this), tabIndex: "0"}, "save"), 
                    React.createElement("span", {className: "Header-Form-Button", onClick: this.resetConfig.bind(this), tabIndex: "0"}, "reset to defaults")));
            }
            render() {
                return (React.createElement("div", {className: "Header-Wrapper"}, 
                    React.createElement("div", {className: "Header"}, 
                        this.getHeaderText(), 
                        this.getEditButton()), 
                    this.getEditForm()));
            }
        }
        Header.HeaderComponent = HeaderComponent;
    })(Header || (Header = {}));
    return Header.HeaderComponent;
});
