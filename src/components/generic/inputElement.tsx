/// <reference path="../../references.d.ts" />

'use strict';

import React = require('react');
import Constants = require('../constants');

/**
 * generic input element
 */
module InputElement {
    interface Props extends React.Props<InputElementComponent> {
        value: string;
        onSubmit?: () => void;
        onChange?: (newValue: string) => string;
        labelText?: string;
        placeholder?: string;
    };

    interface State {
        value: string;
    };

    export class InputElementComponent extends React.Component<Props, State> {
        constructor(props?: Props) {
            super(props);
            this.state = {
                value: this.props.value
            };
        }

        /**
         * handle the change event on the input field
         */
        private onChange(e: React.MouseEvent): void {
            let newValue: string = this.getValue();
            if (this.props.onChange) {
                newValue = this.props.onChange(newValue);
            }
            this.setState({
                value: newValue
            });
        }

        private getInputField(): React.ReactElement<React.HTMLAttributes> {
            return <input className="Input-Field"
                type="text"
                ref="InputElement"
                value={this.state.value}
                placeholder={this.props.placeholder || ""}
                onChange={this.onChange.bind(this)}
            />;
        }

        public getValue(): string {
            return (this.refs as any).InputElement.value;
        }

        public render(): React.ReactElement<React.HTMLAttributes> {
            let labelText: React.ReactElement<React.HTMLAttributes>;
            if (this.props.labelText) {
                labelText = <label className="Input-Label">{this.props.labelText}</label>
            }
            return (
                <div className="Input-Wrapper">
                    {labelText}
                    <div className="Input-Field-Wrapper">
                        {this.getInputField()}
                    </div>
                </div>
            );
        }
    }
}

export = InputElement.InputElementComponent;
