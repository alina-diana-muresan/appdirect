define(["require", "exports", 'backbone', '../components/constants'], function (require, exports, Backbone, Constants) {
    'use strict';
    class UserDataModel extends Backbone.Model {
        constructor(attrs, opts) {
            super(attrs, opts);
            this.url = Constants.USERS_LOOKUP_URL + "?screen_name=" + attrs.join(",");
        }
        users() {
            return _.map(this.attributes, (user) => {
                return user;
            });
        }
    }
    return UserDataModel;
});
