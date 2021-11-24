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

import { FIELD_TYPE } from 'Component/PureForm/Field/Field.config';
import { FieldSection } from 'Component/PureForm/FieldForm/FieldForm.component';
import { VALIDATION_INPUT_TYPE } from 'Util/Validator/Config';

import { MyAccountAddressFormProps } from './MyAccountAddressForm.component';

/**
 * Returns fields for street
 * @namespace Component/MyAccountAddressForm/Form/getStreetFields
 */
export const getStreetFields = (props: MyAccountAddressFormProps): FieldSection[] => {
    const {
        addressLinesQty = 1,
        address: { street = [] }
    } = props;
    const streets: FieldSection[] = [];

    if (addressLinesQty === 1) {
        streets.push({
            type: FIELD_TYPE.text,
            label: __('Street address'),
            attr: {
                name: 'street',
                defaultValue: street[0] || '',
                placeholder: __('Your street address')
            },
            addRequiredTag: true,
            validateOn: ['onChange'],
            validationRule: {
                isRequired: true
            }
        });
    } else {
        for (let i = 0; i < addressLinesQty; i++) {
            streets.push({
                type: FIELD_TYPE.text,
                label: __('Street address line %s', i + 1),
                attr: {
                    name: `street_${i}`,
                    defaultValue: street[i] || '',
                    placeholder: __('Your street address line %s', i + 1)
                },
                addRequiredTag: i === 0,
                validateOn: i === 0 ? ['onChange'] : [],
                validationRule: {
                    isRequired: i === 0
                }
            });
        }
    }

    return streets;
};

/**
 * Returns region fields
 * @namespace Component/MyAccountAddressForm/Form/getRegionFields
 */
export const getRegionFields = (props: MyAccountAddressFormProps): FieldSection[] => {
    const {
        address: {
            region: { region } = {},
            region_id: regionId = 1
        },
        regionDisplayAll,
        availableRegions,
        isStateRequired
    } = props;

    if (!regionDisplayAll && !isStateRequired) {
        return [];
    }

    if (!availableRegions || !availableRegions.length) {
        return [
            {
                type: FIELD_TYPE.text,
                label: __('State / Province'),
                attr: {
                    id: 'address-region-id',
                    name: 'region_string',
                    defaultValue: region || '',
                    placeholder: __('Your state / province')
                },
                validateOn: isStateRequired ? ['onChange'] : [],
                validationRule: {
                    isRequired: isStateRequired
                }
            }
        ];
    }

    return [
        {
            type: FIELD_TYPE.select,
            label: __('State / Province'),
            attr: {
                name: 'region_id',
                defaultValue: regionId,
                selectPlaceholder: __('Select region...')
            },
            options: availableRegions.map(({ id, name }) => ({ id: `${id}`, label: name, value: `${id}` })),
            addRequiredTag: true,
            validateOn: isStateRequired ? ['onChange'] : [],
            validationRule: {
                isRequired: isStateRequired
            }
        }
    ];
};

/**
 * Returns VAT fields
 * @namespace Component/MyAccountAddressForm/Form/getVatFields
 */
export const getVatFields = (props: MyAccountAddressFormProps): FieldSection[] => {
    const { showVatNumber, address: { vat_id: vatID } } = props;

    if (!showVatNumber) {
        return [];
    }

    return [
        {
            type: FIELD_TYPE.text,
            label: __('VAT Number'),
            attr: {
                name: 'vat_number',
                defaultValue: vatID || ''
            }
        }
    ];
};

/**
 * Returns address form fields
 * @namespace Component/MyAccountAddressForm/Form/myAccountAddressForm
 */
export const myAccountAddressForm = (props: MyAccountAddressFormProps): FieldSection[] => {
    const {
        address: {
            default_billing: defaultBilling,
            default_shipping: defaultShipping,
            firstname = '',
            lastname = '',
            city = '',
            postcode = '',
            telephone = ''
        },
        countryId,
        countries = [],
        // addressLinesQty = 1,
        onCountryChange,
        onZipcodeBlur
    } = props;

    return [
        {
            type: FIELD_TYPE.checkbox,
            label: __('This is default Billing Address'),
            attr: {
                name: 'default_billing',
                defaultChecked: defaultBilling
            }
        },
        {
            type: FIELD_TYPE.checkbox,
            label: __('This is default Shipping Address'),
            attr: {
                name: 'default_shipping',
                defaultChecked: defaultShipping
            }
        },
        {
            type: FIELD_TYPE.text,
            label: __('First name'),
            attr: {
                name: 'firstname',
                defaultValue: firstname,
                placeholder: __('Your first name')
            },
            addRequiredTag: true,
            validateOn: ['onChange'],
            validationRule: {
                isRequired: true
            }
        },
        {
            type: FIELD_TYPE.text,
            label: __('Last name'),
            attr: {
                name: 'lastname',
                defaultValue: lastname,
                placeholder: __('Your last name')
            },
            addRequiredTag: true,
            validateOn: ['onChange'],
            validationRule: {
                isRequired: true
            }
        },
        {
            attr: {
                name: 'streetGroup'
            },
            // TODO do something about missing mods props
            // mods: {
            //     street: true,
            //     multipleFields: addressLinesQty > 0,
            //     oddAddresses: addressLinesQty % 2 === 1
            // },
            fields: getStreetFields(props)
        },
        {
            attr: {
                name: 'addressGroup'
            },
            // TODO do something about missing mods props
            // mods: { address: true },
            fields: [
                {
                    type: FIELD_TYPE.text,
                    label: __('City'),
                    attr: {
                        name: 'city',
                        defaultValue: city,
                        placeholder: __('Your city')
                    },
                    addRequiredTag: true,
                    validateOn: ['onChange'],
                    validationRule: {
                        isRequired: true
                    }
                },
                {
                    type: FIELD_TYPE.select,
                    label: __('Country'),
                    attr: {
                        id: 'address-country-id',
                        name: 'country_id',
                        defaultValue: countryId,
                        selectPlaceholder: __('Select country...')
                    },
                    events: {
                        onChange: onCountryChange
                    },
                    options: countries,
                    addRequiredTag: true,
                    validateOn: ['onChange'],
                    validationRule: {
                        isRequired: true
                    }
                },
                ...getRegionFields(props),
                {
                    type: FIELD_TYPE.text,
                    label: __('Zip / Postal code'),
                    attr: {
                        name: 'postcode',
                        defaultValue: postcode,
                        placeholder: __('Your zip / postal code')
                    },
                    events: {
                        onBlur: onZipcodeBlur
                    },
                    addRequiredTag: true,
                    validateOn: ['onChange', 'onBlur'],
                    validationRule: {
                        isRequired: true
                    }
                }
            ]
        },
        ...getVatFields(props),
        {
            type: FIELD_TYPE.text,
            label: __('Phone number'),
            attr: {
                name: 'telephone',
                defaultValue: telephone,
                placeholder: __('Your phone number')
            },
            addRequiredTag: true,
            validateOn: ['onChange'],
            validationRule: {
                inputType: VALIDATION_INPUT_TYPE.phone,
                isRequired: true
            }
        }
    ];
};
