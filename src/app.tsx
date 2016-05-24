/// <reference path="references.d.ts" />

'use strict';

import React = require('react');
import ReactDOM = require("react-dom");
import StorageUtils = require('./utils/storageUtils');
import Wrapper = require('./components/generic/wrapper');

/**
 * Main aplication entry point
 */
class App {
    public static run(): void {
        StorageUtils.init();
        ReactDOM.render(<Wrapper />, document.getElementById('app'));
    }
}

export = App;
