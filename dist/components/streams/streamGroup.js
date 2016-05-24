define(["require", "exports", 'react', '../generic/loader', './stream', '../../models/userDataModel'], function (require, exports, React, Loader, Stream, UserDataModel) {
    'use strict';
    var StreamGroup;
    (function (StreamGroup) {
        ;
        ;
        class StreamGroupComponent extends React.Component {
            constructor(props) {
                super(props);
                this.state = { isLoaded: false };
            }
            componentDidMount() {
                this.userDataModel = new UserDataModel(this.props.userList);
                this.userDataModel.on('request', () => {
                    if (this.state.isLoaded) {
                        this.setState({ isLoaded: false });
                    }
                });
                this.userDataModel.on('sync', () => {
                    if (!this.state.isLoaded) {
                        this.setState({ isLoaded: true });
                    }
                });
                this.userDataModel.fetch();
            }
            componentWillUnmount() {
                this.userDataModel.off('request');
                this.userDataModel.off('sync');
            }
            getLoader() {
                if (this.state.isLoaded) {
                    return null;
                }
                return (React.createElement(Loader, null));
            }
            getContent() {
                if (!this.state.isLoaded) {
                    return null;
                }
                return this.userDataModel.users().map((user, idx) => {
                    return (React.createElement(Stream, {userData: user, key: idx}));
                });
            }
            render() {
                return (React.createElement("div", {className: "Stream-Group"}, 
                    this.getLoader(), 
                    this.getContent()));
            }
        }
        StreamGroup.StreamGroupComponent = StreamGroupComponent;
    })(StreamGroup || (StreamGroup = {}));
    return StreamGroup.StreamGroupComponent;
});
