define(["require", "exports", 'react'], function (require, exports, React) {
    'use strict';
    var InputElement;
    (function (InputElement) {
        ;
        ;
        class InputElementComponent extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    value: this.props.value
                };
            }
            onChange(e) {
                let newValue = this.getValue();
                if (this.props.onChange) {
                    newValue = this.props.onChange(newValue);
                }
                this.setState({
                    value: newValue
                });
            }
            getInputField() {
                return React.createElement("input", {className: "Input-Field", type: "text", ref: "InputElement", value: this.state.value, placeholder: this.props.placeholder || "", onChange: this.onChange.bind(this)});
            }
            getValue() {
                return this.refs.InputElement.value;
            }
            render() {
                let labelText;
                if (this.props.labelText) {
                    labelText = React.createElement("label", {className: "Input-Label"}, this.props.labelText);
                }
                return (React.createElement("div", {className: "Input-Wrapper"}, 
                    labelText, 
                    React.createElement("div", {className: "Input-Field-Wrapper"}, this.getInputField())));
            }
        }
        InputElement.InputElementComponent = InputElementComponent;
    })(InputElement || (InputElement = {}));
    return InputElement.InputElementComponent;
});
