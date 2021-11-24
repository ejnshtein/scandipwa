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

import { renderHOC } from 'Util/RenderHOC';

import { FieldFormComponent } from './FieldForm.component';

/** @namespace Component/PureForm/FieldForm/Container/fieldFormLogic */
export const fieldFormLogic = <T>(p: any): T => p;

export const FieldForm = renderHOC(FieldFormComponent, fieldFormLogic, 'FieldFormContainer');
