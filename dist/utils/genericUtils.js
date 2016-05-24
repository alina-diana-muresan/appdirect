define(["require", "exports"], function (require, exports) {
    'use strict';
    class GenericUtils {
        static parseDate(initialDate) {
            let dateObject = new Date(Date.parse(initialDate.replace(/( \+)/, ' UTC$1')));
            let exp = new RegExp('\/', 'g');
            return dateObject.toLocaleDateString('en-GB').replace(exp, '-') +
                ' ' + dateObject.toLocaleTimeString('en-GB');
        }
    }
    return GenericUtils;
});
