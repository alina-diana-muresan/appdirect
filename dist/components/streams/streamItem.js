define(["require", "exports", 'react', '../constants', '../../utils/genericUtils', '../../utils/twitterTextParser'], function (require, exports, React, Constants, GenericUtils, TwitterTextParser) {
    'use strict';
    var StreamItem;
    (function (StreamItem) {
        ;
        class StreamItemComponent extends React.Component {
            getRetweetInfo() {
                if (!this.props.itemData.retweeted_status) {
                    return null;
                }
                return (React.createElement("div", {className: "Stream-Item-Header"}, this.props.itemData.user.name + ' Retweeted'));
            }
            getTweet() {
                let item = this.props.itemData.retweeted_status || this.props.itemData;
                let userUrl = Constants.TWITTER_BASE_URL + item.user.screen_name;
                return (React.createElement("div", {className: "Stream-Item-Body"}, 
                    React.createElement("a", {className: "Stream-Item-Avatar", href: userUrl, target: "_blank"}, 
                        React.createElement("img", {src: item.user.profile_image_url_https, alt: item.user.name})
                    ), 
                    React.createElement("div", {className: "Stream-Item-User"}, 
                        React.createElement("div", {className: "Stream-Item-UserData"}, 
                            React.createElement("a", {className: "Stream-Item-Name", href: userUrl, target: "_blank", title: item.user.name}, item.user.name), 
                            React.createElement("a", {className: "Stream-Item-ScreenName", href: userUrl, target: "_blank"}, 
                                "@", 
                                item.user.screen_name)), 
                        React.createElement("span", {className: "Stream-Item-Date"}, GenericUtils.parseDate(item.created_at)), 
                        React.createElement("div", {className: "Stream-Item-Text", dangerouslySetInnerHTML: {
                            __html: TwitterTextParser.parseTweerText(item.text, item.entities)
                        }}))));
            }
            render() {
                return (React.createElement("div", {className: "Stream-Item"}, 
                    this.getRetweetInfo(), 
                    this.getTweet()));
            }
        }
        StreamItem.StreamItemComponent = StreamItemComponent;
    })(StreamItem || (StreamItem = {}));
    return StreamItem.StreamItemComponent;
});
