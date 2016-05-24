define(["require", "exports", 'backbone', '../components/constants', '../utils/storageUtils'], function (require, exports, Backbone, Constants, StorageUtils) {
    'use strict';
    class StreamModel extends Backbone.Model {
        constructor(attrs, opts) {
            super(attrs, opts);
            this.setUrl(attrs);
        }
        setUrl(name) {
            let appConfig = StorageUtils.getInstance().getConfigData();
            let params = [];
            params.push("screen_name=" + encodeURIComponent(name));
            params.push('count=' + appConfig.postCount);
            params.push("include_rts=true");
            this.url = Constants.STREAM_URL + "?" + params.join("&");
        }
        items() {
            return _.map(this.attributes, (item) => {
                return item;
            });
        }
    }
    return StreamModel;
});
