/* eslint-disable react/jsx-no-bind */
/* eslint-disable max-len */

/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

 import PropTypes from 'prop-types';
 import {
     cloneElement,
     PureComponent
 } from 'react';
 import { Router as ReactRouter } from 'react-router';
 import Loader from 'Component/Loader';
 import Meta from 'Component/Meta';
 import SomethingWentWrong from 'Route/SomethingWentWrong';
 import history from 'Util/History';

 
 /** @namespace Component/Router/Component/withStoreRegex */
 export const withStoreRegex = (path) => window.storeRegexText.concat(path);
 
 /** @namespace Component/Router/Component */
 export class Router extends PureComponent {
     static propTypes = {
         isBigOffline: PropTypes.bool
     };
 
     static defaultProps = {
         isBigOffline: false
     };
 
     state = {
         hasError: false,
         errorDetails: {}
     };
 
     componentDidCatch(err, info) {
         this.setState({
             hasError: true,
             errorDetails: { err, info }
         });
     }
 
     getSortedItems(type) {
         return this[type].sort(
             (a, b) => a.position - b.position
         ).filter(
             (entry) => {
                 if (!entry.component) {
                     // eslint-disable-next-line no-console
                     console.warn('There is an item without a component property declared in main router.');
                     return false;
                 }
 
                 return true;
             }
         );
     }
 
     handleErrorReset = () => {
         this.setState({ hasError: false });
     };
 
     renderItemsOfType(type) {
         return this.getSortedItems(type)
             .map(({ position, component }) => cloneElement(component, { key: position }));
     }
 
     renderErrorRouterContent() {
         const { errorDetails } = this.state;
 
         return (
             <SomethingWentWrong
               onClick={ this.handleErrorReset }
               errorDetails={ errorDetails }
             />
         );
     }
 
     renderFallbackPage() {
         return (
             <main style={ { height: '100vh' } }>
                 <Loader isLoading />
             </main>
         );
     }
 
     renderDefaultRouterContent() {
         return (
             this.props.children
         );
     }
 
     renderRouterContent() {
         const { hasError } = this.state;
 
         if (hasError) {
             return this.renderErrorRouterContent();
         }
 
         return this.renderDefaultRouterContent();
     }
 
     render() {
         return (
             <>
                 <Meta />
                 <ReactRouter history={ history }>
                     { this.renderRouterContent() }
                 </ReactRouter>
             </>
         );
     }
 }
 