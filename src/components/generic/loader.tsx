/// <reference path="../../references.d.ts" />

'use strict';

import React = require('react');

/**
 * generic loader component
 */
module Loader {
    export class LoaderComponent extends React.Component<{}, {}> {
        public render(): React.ReactElement<React.HTMLAttributes> {
            return (
                <div className="Loader"></div>
            );
        }
    }
}

export = Loader.LoaderComponent;
