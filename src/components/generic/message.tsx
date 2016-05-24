/// <reference path="../../references.d.ts" />

'use strict';

import React = require('react');

/**
 * generic message element
 */
module Message {
    interface Props extends React.Props<MessageComponent> {
        messageItem: MessageItem
    };

    export class MessageComponent extends React.Component<Props, {}> {
        public render(): React.ReactElement<React.HTMLAttributes> {
            let className: string = 'Message ' +
                (this.props.messageItem.isError ? 'Message-Error' : 'Message-Item');

            return (
                <div className={className}>
                    {this.props.messageItem.text}
                </div>
            );
        }
    }
}

export = Message.MessageComponent;
