define(["require", "exports", 'react', '../generic/loader', '../../models/streamModel', './streamHeader', './streamItem', '../generic/message'], function (require, exports, React, Loader, StreamModel, StreamHeader, StreamItem, Message) {
    'use strict';
    var Stream;
    (function (Stream) {
        ;
        ;
        class StreamComponent extends React.Component {
            constructor(props) {
                super(props);
                this.state = { isLoaded: false };
            }
            componentDidMount() {
                this.streamModel = new StreamModel(this.props.userData.screen_name);
                this.streamModel.on('request', () => {
                    if (this.state.isLoaded) {
                        this.setState({ isLoaded: false });
                    }
                });
                this.streamModel.on('sync', () => {
                    if (!this.state.isLoaded) {
                        this.setState({ isLoaded: true });
                    }
                });
                this.streamModel.fetch();
            }
            componentWillUnmount() {
                this.streamModel.off('request');
                this.streamModel.off('sync');
            }
            getStreamHeader() {
                return (React.createElement(StreamHeader, {userData: this.props.userData}));
            }
            getLoader() {
                if (this.state.isLoaded) {
                    return null;
                }
                return (React.createElement(Loader, null));
            }
            getStreamContent() {
                if (!this.state.isLoaded) {
                    return null;
                }
                if (!this.streamModel.items().length) {
                    let messageItem = {
                        text: 'There are no tweets to display for this user.',
                        isError: false
                    };
                    return ([React.createElement(Message, {messageItem: messageItem, key: 0})]);
                }
                return this.streamModel.items().map((item, idx) => {
                    return (React.createElement(StreamItem, {itemData: item, key: idx}));
                });
            }
            render() {
                return (React.createElement("div", {className: "Stream"}, 
                    this.getStreamHeader(), 
                    this.getLoader(), 
                    React.createElement("div", {className: "Stream-Content"}, this.getStreamContent())));
            }
        }
        Stream.StreamComponent = StreamComponent;
    })(Stream || (Stream = {}));
    return Stream.StreamComponent;
});
