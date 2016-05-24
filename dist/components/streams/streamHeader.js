define(["require", "exports", 'react', '../constants'], function (require, exports, React, Constants) {
    'use strict';
    var StreamHeader;
    (function (StreamHeader) {
        ;
        class StreamHeaderComponent extends React.Component {
            getUserName(userUrl) {
                if (!this.props.userData.name) {
                    return null;
                }
                return (React.createElement("a", {className: "Stream-User-Name", href: userUrl, target: "_blank", title: this.props.userData.name}, this.props.userData.name));
            }
            getScreenName(userUrl) {
                if (!this.props.userData.screen_name) {
                    return null;
                }
                return (React.createElement("a", {className: "Stream-User-ScreenName", href: userUrl, target: "_blank"}, 
                    "@", 
                    this.props.userData.screen_name));
            }
            render() {
                let userUrl = Constants.TWITTER_BASE_URL + this.props.userData.screen_name;
                return (React.createElement("div", {className: "Stream-Header"}, 
                    React.createElement("a", {className: "Stream-Avatar", href: userUrl, target: "_blank"}, 
                        React.createElement("img", {src: this.props.userData.profile_image_url_https, alt: this.props.userData.name})
                    ), 
                    React.createElement("div", {className: "Stream-User"}, 
                        this.getUserName(userUrl), 
                        this.getScreenName(userUrl))));
            }
        }
        StreamHeader.StreamHeaderComponent = StreamHeaderComponent;
    })(StreamHeader || (StreamHeader = {}));
    return StreamHeader.StreamHeaderComponent;
});
