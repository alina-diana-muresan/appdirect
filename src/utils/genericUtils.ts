/// <reference path="../references.d.ts" />

'use strict';

class GenericUtils {
    public static parseDate(initialDate: string): string {
        let dateObject: Date = new Date(Date.parse(initialDate.replace(/( \+)/, ' UTC$1')));
        let exp: RegExp = new RegExp('\/', 'g');
        return dateObject.toLocaleDateString('en-GB').replace(exp, '-') +
            ' ' + dateObject.toLocaleTimeString('en-GB');
    }
}

export = GenericUtils;
