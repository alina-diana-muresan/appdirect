/// <reference path="../references.d.ts" />

'use strict';

import Backbone = require('backbone');
import Constants = require('../components/constants');

class UserDataModel extends Backbone.Model {
    public constructor(attrs?: any, opts?: any) {
        super(attrs, opts);
        this.url = Constants.USERS_LOOKUP_URL + "?screen_name=" + attrs.join(",");
    }

    public users(): TwitterUser[] {
        return _.map(this.attributes, (user: any): TwitterUser => {
            return user as TwitterUser;
        });
    }
}

export = UserDataModel;
