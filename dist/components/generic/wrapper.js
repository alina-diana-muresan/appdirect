define(["require", "exports", 'react', '../../utils/storageUtils', './header', '../streams/streamGroup'], function (require, exports, React, StorageUtils, Header, StreamGroup) {
    'use strict';
    var Wrapper;
    (function (Wrapper) {
        ;
        class WrapperComponent extends React.Component {
            constructor() {
                super();
                this.state = {
                    isEditMode: false
                };
                StorageUtils.getInstance().on('dataSaved', () => {
                    this.setState({
                        isEditMode: false
                    });
                });
            }
            onEditModeToggle() {
                this.setState(_.extend({}, this.state, {
                    isEditMode: !this.state.isEditMode
                }));
            }
            componentWillUnmount() {
                StorageUtils.getInstance().off('dataSaved');
            }
            render() {
                let appConfig = StorageUtils.getInstance().getConfigData();
                let streamGroup;
                if (!this.state.isEditMode) {
                    streamGroup = React.createElement(StreamGroup, {userList: appConfig.userList});
                }
                return (React.createElement("div", {className: "App"}, 
                    React.createElement(Header, {isEditMode: this.state.isEditMode, onEditModeToggle: this.onEditModeToggle.bind(this)}), 
                    streamGroup));
            }
        }
        Wrapper.WrapperComponent = WrapperComponent;
    })(Wrapper || (Wrapper = {}));
    return Wrapper.WrapperComponent;
});
