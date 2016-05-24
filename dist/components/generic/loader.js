define(["require", "exports", 'react'], function (require, exports, React) {
    'use strict';
    var Loader;
    (function (Loader) {
        class LoaderComponent extends React.Component {
            render() {
                return (React.createElement("div", {className: "Loader"}));
            }
        }
        Loader.LoaderComponent = LoaderComponent;
    })(Loader || (Loader = {}));
    return Loader.LoaderComponent;
});
