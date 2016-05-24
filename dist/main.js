'use strict';
require.config({
    "baseUrl": ".",
    "paths": {
        "react": "lib/react/react-with-addons",
        "react-dom": "lib/react/react-dom",
        "backbone": "lib/backbone/backbone",
        "jquery": "lib/jquery/dist/jquery",
        "underscore": "lib/underscore/underscore"
    }
});
require(['dist/app'], (App) => {
    App.run();
});
