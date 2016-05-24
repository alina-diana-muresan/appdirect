define(["require", "exports", 'react'], function (require, exports, React) {
    'use strict';
    var Message;
    (function (Message) {
        ;
        class MessageComponent extends React.Component {
            render() {
                let className = 'Message ' +
                    (this.props.messageItem.isError ? 'Message-Error' : 'Message-Item');
                return (React.createElement("div", {className: className}, this.props.messageItem.text));
            }
        }
        Message.MessageComponent = MessageComponent;
    })(Message || (Message = {}));
    return Message.MessageComponent;
});
