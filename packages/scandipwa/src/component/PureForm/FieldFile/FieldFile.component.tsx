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

import Loader from 'Component/Loader';
import { FIELD_TYPE } from 'Component/PureForm/Field/Field.config';
import UploadIcon from 'Component/UploadIcon';
import { SimpleComponent } from 'Util/SimpleComponent';

import { FormFieldAttribute } from '../Field/Field.component';

export interface FieldFileProps {
    attr: FormFieldAttribute
    events: Record<string, (e: any) => void>
    inputRef: React.RefObject<HTMLInputElement>
    fileName: string
    isLoading: boolean
}

/** @namespace Component/PureForm/FieldFile/Component */
export class FieldFileComponent extends SimpleComponent<FieldFileProps> {
    renderSubLabel(allowedTypes: string): JSX.Element {
        return (
            <div block="FieldFile" elem="AllowedTypes">
                { __('Compatible file extensions to upload:') }
                <strong>{ ` ${allowedTypes}` }</strong>
            </div>
        );
    }

    // TODO: move defaults to container
    renderFileLabel(): JSX.Element {
        const {
            attr: { id = '', multiple = false } = {},
            fileName,
            isLoading
        } = this.props;

        if (isLoading) {
            return <Loader isLoading />;
        }

        if (fileName) {
            return (
                <label htmlFor={ id }>
                    <p>{ fileName }</p>
                </label>
            );
        }

        const dropLabel = multiple ? __('Drop files here or') : __('Drop file here or');
        const selectLabel = multiple ? __('Select files') : __('Select file');

        return (
            <label htmlFor={ id }>
                <UploadIcon />
                <p>{ dropLabel }</p>
                <span>{ selectLabel }</span>
            </label>
        );
    }

    render(): JSX.Element {
        const {
            attr,
            attr: { accept = '' },
            events,
            inputRef
        } = this.props;

        const allowedFieldTypes = accept
            .split(',')
            .map((type = '') => type.split('/').slice(-1)[0])
            .join(', ');

        return (
            <>
                <input
                  ref={ inputRef }
                  type={ FIELD_TYPE.file }
                  { ...attr }
                  { ...events }
                />
                { this.renderFileLabel() }
                { allowedFieldTypes.length && this.renderSubLabel(allowedFieldTypes) }
            </>
        );
    }
}
