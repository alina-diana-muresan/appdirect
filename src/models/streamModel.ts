/// <reference path="../references.d.ts" />

'use strict';

import Backbone = require('backbone');
import Constants = require('../components/constants');
import StorageUtils = require('../utils/storageUtils');

class StreamModel extends Backbone.Model {
    public constructor(attrs?: any, opts?: any) {
        super(attrs, opts);
        this.setUrl(attrs);
    }

    private setUrl(name: string): void {
        let appConfig: AppConfig = StorageUtils.getInstance().getConfigData();
        let params: string[] = [];
        params.push("screen_name=" + encodeURIComponent(name));
        params.push('count=' + appConfig.postCount);
        params.push("include_rts=true");

        this.url = Constants.STREAM_URL + "?" + params.join("&");
    }

    public items(): TwitterItem[] {
        return _.map(this.attributes, (item: any): TwitterItem => {
            return <TwitterItem>item;
        });
    }
}

export = StreamModel;
