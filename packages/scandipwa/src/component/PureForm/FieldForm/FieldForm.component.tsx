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

import { Field, FieldExternalProps } from 'Component/PureForm/Field';
import { FieldGroup } from 'Component/PureForm/FieldGroup';
import { Form, FormExternalProps } from 'Component/PureForm/Form';
import { SimpleComponent } from 'Util/SimpleComponent';

import './FieldForm.style';

export interface FieldSection extends FieldExternalProps {
    fields?: FieldSection[]
}

/** @namespace Component/PureForm/FieldForm/Component */
export class FieldFormComponent<P> extends SimpleComponent<P & FormExternalProps> {
    get fieldMap(): FieldSection[] {
        return [
            // // Field
            // {
            //     attr: {
            //         name: __('Email'),
            //         ...
            //     },
            //     events: {
            //         onChange: handleInput,
            //         ...
            //     },
            //     validateOn: [ 'onChange', ... ],
            //     validationRules: {
            //         isRequired: true,
            //         ...
            //     },
            //     ...
            // },
            // // FieldGroup
            // {
            //     attr: { ... }
            //     events: { ... }
            //     fields: [
            //         // Can contain both fields or field groups
            //     ],
            //     ...
            // }
        ];
    }

    renderSection = (section: FieldSection): JSX.Element => {
        const { fields } = section;

        // If contains attr fields then outputs data as fields
        if (Array.isArray(fields)) {
            return (
                <FieldGroup { ...section }>
                    { fields.map(this.renderSection) }
                </FieldGroup>
            );
        }

        return <Field { ...section } />;
    };

    renderActions(): JSX.Element | null {
        return null;
    }

    renderFormBody(): JSX.Element {
        return (
            <div block="FieldForm" elem="Body">
                <div block="FieldForm" elem="Fields">
                    { this.fieldMap.map(this.renderSection) }
                </div>
                { this.renderActions() }
            </div>
        );
    }

    getFormProps(): FormExternalProps {
        return { ...this.props };
    }

    render(): JSX.Element | null {
        return (
            // eslint-disable-next-line react/jsx-tag-spacing
            <Form { ...this.getFormProps() } /* block="FieldForm" */>
                { this.renderFormBody() }
            </Form>
        );
    }
}
