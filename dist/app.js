define(["require", "exports", 'react', "react-dom", './utils/storageUtils', './components/generic/wrapper'], function (require, exports, React, ReactDOM, StorageUtils, Wrapper) {
    'use strict';
    class App {
        static run() {
            StorageUtils.init();
            ReactDOM.render(React.createElement(Wrapper, null), document.getElementById('app'));
        }
    }
    return App;
});
