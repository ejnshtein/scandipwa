/* eslint-disable */
import { Element, match, Middleware, DECLARATION, serialize } from 'stylis';

import { isRtl } from './CSS';

const cssLogicalPropsRe = /([a-z]+)-(block|inline)(?:-(start|end))?\:([^;]+)/i;

const replacer = (_: string, prop: string, type: string, dir: string, val: string) => {
    if (dir) {
        const propName = [];

        if (prop !== 'inset') {
            propName.push(prop);
        }

        if (type === 'block') {
            if (dir === 'start') {
                propName.push('top');
            } else {
                propName.push('bottom');
            }
        } else {
            const ltr = !isRtl();

            if (dir === 'start') {
                propName.push(ltr ? 'left' : 'right');
            } else {
                propName.push(ltr ? 'right' : 'left');
            }
        }

        return `${propName.join('-')}:${val}`;
    } else {
        const propList = [];
        const prefix = prop === 'inset' ? '' : `${prop}-`;
        if (type === 'block') {
            propList.push(
                `${prefix}top:${val}`,
                `${prefix}bottom:${val}`
            );
        } else {
            propList.push(
                `${prefix}left:${val}`,
                `${prefix}right:${val}`
            );
        }

        return propList.join(';');
    }
}

export const RTLPlugin = (element: Element): string | void => {
    if (!element.return && element.type === DECLARATION) {
        element.return = element.value.replace(cssLogicalPropsRe, replacer);
    }
}
