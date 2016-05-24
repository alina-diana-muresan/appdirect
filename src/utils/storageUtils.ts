/// <reference path="../references.d.ts" />

'use strict';

import Backbone = require('backbone');
import Config = require('../config');

class StorageUtils extends Backbone.Model {
    private static instance: StorageUtils;

    private appConfig: AppConfig;
    private hasLocalStorage: boolean = localStorage !== undefined && localStorage !== null;

    public static getInstance(): StorageUtils {
        if (StorageUtils.instance === null) {
            throw new Error('Use StorageUtils.init() before using this utility class.');
        }

        return StorageUtils.instance;
    }

    public static init(): void {
        StorageUtils.instance = new StorageUtils();
    }

    public resetConfigData(): void {
        localStorage.removeItem('userList');
        localStorage.removeItem('postCount');
        this.trigger('dataReset');
    }

    public getConfigData(): AppConfig {
        let userList: string[];
        let postCount: string;
        if (this.hasLocalStorage && localStorage.getItem('userList')) {
            userList = localStorage.getItem('userList').split(',');
        } else {
            userList = Config.USER_LIST;
        }
        if (this.hasLocalStorage && localStorage.getItem('postCount')) {
            postCount = localStorage.getItem('postCount');
        } else {
            postCount = Config.TWEET_COUNT;
        }

        return {
            userList: userList,
            postCount: postCount
        }
    }

    public normalizeUserList(userList: string): string {
        let exp: RegExp = new RegExp('[^0-9a-zA-Z_,]', 'g');
        return userList.replace(exp, '');
    }

    /**
    * normalizing the values of postCount
    */
    public normalizePostCount(postCount: string): string {
        let numberPostCount: number = parseInt(postCount, 10);
        if (numberPostCount === NaN) {
            return Config.TWEET_COUNT;
        } else if (numberPostCount <= 0) {
            return '1';
        } else if (numberPostCount > 200) {
            return '200';
        }
        return postCount;
    }

    public saveUserList(newUserList: string): void {
        if (!this.hasLocalStorage) {
            return;
        }
        try {
            localStorage.setItem('userList', newUserList);
        } catch(e) {
            throw new Error('Could not save user list to local storage.');
        }
    }

    public savePostCount(newPostCount: string): void {
        if (!this.hasLocalStorage) {
            return;
        }
        try {
            localStorage.setItem('postCount', newPostCount);
        } catch(e) {
            throw new Error('Could not save post count to local storage.');
        }
    }

    public announceSavingDone(): void {
        this.trigger('dataSaved');
    }

    public saveConfigData(newConfigValues: StorageItem[]): void {

        try {
            newConfigValues.forEach((item: StorageItem): void => {
                localStorage.setItem(item.key, item.value);
            });

        } catch(e) {
            throw new Error('Could not save data to local storage.');
        }
    }
}

export = StorageUtils;
