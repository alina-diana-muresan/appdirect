define(["require", "exports", 'backbone', '../config'], function (require, exports, Backbone, Config) {
    'use strict';
    class StorageUtils extends Backbone.Model {
        constructor(...args) {
            super(...args);
            this.hasLocalStorage = localStorage !== undefined && localStorage !== null;
        }
        static getInstance() {
            if (StorageUtils.instance === null) {
                throw new Error('Use StorageUtils.init() before using this utility class.');
            }
            return StorageUtils.instance;
        }
        static init() {
            StorageUtils.instance = new StorageUtils();
        }
        resetConfigData() {
            localStorage.removeItem('userList');
            localStorage.removeItem('postCount');
            this.trigger('dataReset');
        }
        getConfigData() {
            let userList;
            let postCount;
            if (this.hasLocalStorage && localStorage.getItem('userList')) {
                userList = localStorage.getItem('userList').split(',');
            }
            else {
                userList = Config.USER_LIST;
            }
            if (this.hasLocalStorage && localStorage.getItem('postCount')) {
                postCount = localStorage.getItem('postCount');
            }
            else {
                postCount = Config.TWEET_COUNT;
            }
            return {
                userList: userList,
                postCount: postCount
            };
        }
        normalizeUserList(userList) {
            let exp = new RegExp('[^0-9a-zA-Z_,]', 'g');
            return userList.replace(exp, '');
        }
        normalizePostCount(postCount) {
            let numberPostCount = parseInt(postCount, 10);
            if (numberPostCount === NaN) {
                return Config.TWEET_COUNT;
            }
            else if (numberPostCount <= 0) {
                return '1';
            }
            else if (numberPostCount > 200) {
                return '200';
            }
            return postCount;
        }
        saveUserList(newUserList) {
            if (!this.hasLocalStorage) {
                return;
            }
            try {
                localStorage.setItem('userList', newUserList);
            }
            catch (e) {
                throw new Error('Could not save user list to local storage.');
            }
        }
        savePostCount(newPostCount) {
            if (!this.hasLocalStorage) {
                return;
            }
            try {
                localStorage.setItem('postCount', newPostCount);
            }
            catch (e) {
                throw new Error('Could not save post count to local storage.');
            }
        }
        announceSavingDone() {
            this.trigger('dataSaved');
        }
        saveConfigData(newConfigValues) {
            try {
                newConfigValues.forEach((item) => {
                    localStorage.setItem(item.key, item.value);
                });
            }
            catch (e) {
                throw new Error('Could not save data to local storage.');
            }
        }
    }
    return StorageUtils;
});
