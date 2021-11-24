// disabling cuz Function as type is banned, don't use it please
/* eslint-disable @typescript-eslint/ban-types */
/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

// will get function names tuple from interface
export type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];

// will get object type with only function properties
export type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;

// will get non-function names tuple from interface
export type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];

// will get object type without function properties
export type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;
