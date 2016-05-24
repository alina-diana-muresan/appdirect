/// <reference path="../typings/tsd.d.ts" />

interface AppConfig {
    userList: string[];
    postCount: string;
}

interface StorageItem {
    key: string;
    value: string;
}

interface MessageItem {
    text: string;
    isError: boolean;
}

interface TwitterItem {
    created_at: string;
    text: string;
    entities: TwitterEntityData;
    retweeted_status?: TwitterItem;
    user: TwitterUser;
}

interface TwitterUser {
    name: string;
    screen_name: string;
    profile_image_url_https: string;
}

interface TwitterEntityData {
    hashtags: TwitterEntityHashtag[];
    urls: TwitterEntityUrl[];
    user_mentions: TwitterEntityUser[];
    media?: TwitterEntityMedia[];
}

interface TwitterEntityHashtag {
    text: string;
    indices: number[];
}

interface TwitterEntityUrl {
    url: string;
    indices: number[];
}

interface TwitterEntityUser {
    name: string;
    screen_name: string;
    indices: number[];
}

interface TwitterEntityMedia extends TwitterEntityUrl {
    media_url_https: string;
}
