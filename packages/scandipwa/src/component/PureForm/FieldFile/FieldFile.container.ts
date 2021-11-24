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

import { useRef, useState } from 'react';

import { useFormContext } from 'Store/Form/Form.context';
import { renderHOC } from 'Util/RenderHOC';

import { FIELD_TYPE } from '../Field/Field.config';
import { FieldFileComponent, FieldFileProps } from './FieldFile.component';

export interface FieldFileExternalProps extends Pick<
    FieldFileProps,
    'attr' | 'events' // | 'inputRef'
> {}

/** @namespace Component/PureForm/FieldFile/Container/fieldFileLogic */
export const fieldFileLogic = (props: FieldFileExternalProps): FieldFileProps => {
    const {
        attr,
        attr: {
            name
        },
        events = {}
        // inputRef
    } = props;

    const [isLoading, setIsLoading] = useState(false);
    const [fileName, setFileName] = useState('');
    // const [_value, setValue] = useState<string | ArrayBuffer | null>('');

    const { handleFormChange } = useFormContext();

    const inputRef = useRef<HTMLInputElement>(null);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { onChange: onChangeEvent } = events || {};

        if (inputRef.current) {
            const { files } = inputRef.current;
            setIsLoading(true);

            if (files?.length) {
                const { name: firstFileName } = files[0];
                const reader = new FileReader();
                reader.onload = () => {
                    setFileName(firstFileName);
                    setIsLoading(false);
                    handleFormChange({
                        name,
                        type: FIELD_TYPE.file,
                        value: reader.result
                    });
                    // setValue(reader.result);
                    if (inputRef.current) {
                        (inputRef.current as HTMLInputElement & { fileData: string }).fileData = JSON.stringify({
                            file_data: reader.result,
                            file_name: firstFileName
                        });
                    }

                    if (typeof onChangeEvent === 'function') {
                        onChangeEvent(e);
                    }
                };
                reader.onerror = () => {
                    // TODO: Add showNotification('error', __('Failed to upload file'))
                    setFileName('');
                    setIsLoading(false);
                    // this.setState({ fileName: '', isLoading: false });

                    if (typeof onChangeEvent === 'function') {
                        onChangeEvent(e);
                    }
                };
                reader.readAsDataURL(files[0]);
            }
        }
    };

    return {
        attr,
        events: {
            ...events,
            onChange
        },
        inputRef,
        fileName,
        isLoading
    };
};

export const FieldFile = renderHOC(FieldFileComponent, fieldFileLogic, 'FieldFileContainer');
