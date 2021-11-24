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

import { Field, Mutation } from '@tilework/opus';

import { CustomerType } from 'Type/Account';

/**
 * MyAccount Mutations
 * @namespace Query/MyAccount/Query */
export class MyAccountQuery {
    /**
     * Get ResetPassword mutation
     * @param options A object containing different aspects of query, each item can be omitted
     */
    static getResetPasswordMutation({
        token,
        password,
        password_confirmation
    }: {
        token: string
        password: string
        password_confirmation: string
    }) {
        return new Mutation('s_resetPassword')
            .addArgument('token', 'String!', token)
            .addArgument('password', 'String!', password)
            .addArgument('password_confirmation', 'String!', password_confirmation)
            .addField('status');
    }

    /**
     * Get SignIn mutation
     * @param options A object containing different aspects of query, each item can be omitted
     */
    static getSignInMutation({ email, password }:{ email: string, password: string }) {
        return new Mutation('generateCustomerToken')
            .addArgument('email', 'String!', email)
            .addArgument('password', 'String!', password)
            .addField('token');
    }

    // TODO add options type here
    static getUpdateInformationMutation(options: any) {
        return new Mutation('updateCustomer')
            .addArgument('input', 'CustomerInput!', options)
            .addField(MyAccountQuery._getCustomerField());
    }

    getChangeCustomerPasswordMutation(
        {
            currentPassword,
            newPassword
        }: {
            currentPassword: string,
            newPassword: string
        }
    ) {
        return new Mutation('changeCustomerPassword')
            .addArgument('currentPassword', 'String!', currentPassword)
            .addArgument('newPassword', 'String!', newPassword)
            .addField('id')
            .addField('email');
    }

    // TODO add options type here
    getCreateAddressMutation(options: any) {
        return new Mutation('createCustomerAddress')
            .addArgument('input', 'CustomerAddressInput!', options)
            .addFieldList(MyAccountQuery._getAddressFields());
    }

    getDeleteAddressMutation(id: number) {
        return new Mutation('deleteCustomerAddress')
            .addArgument('id', 'Int!', id);
    }

    // TODO add options type
    getUpdateAddressMutation(id: number, options: any) {
        return new Mutation('updateCustomerAddress')
            .addArgument('id', 'Int!', id)
            .addArgument('input', 'CustomerAddressInput!', options)
            .addFieldList(MyAccountQuery._getAddressFields());
    }

    getCreateAccountMutation({ customer, password }: { customer: CustomerType, password: string }) {
        return new Mutation('createCustomer')
            .addArgument('input', 'CustomerInput!', { ...customer, password })
            .addField(MyAccountQuery._getCustomerField());
    }

    getConfirmAccountMutation({ key, email, password }: { key: string, email: string, password: string }) {
        return new Mutation('confirmCustomerEmail')
            .addArgument('key', 'String!', key)
            .addArgument('email', 'String!', email)
            .addArgument('password', 'String!', password)
            .addFieldList(MyAccountQuery._getConfirmAccountFields());
    }

    static getCustomerQuery() {
        return MyAccountQuery._getCustomerField();
    }

    static _getConfirmAccountFields() {
        return [
            'status',
            'token',
            MyAccountQuery._getCustomerField()
        ] as const;
    }

    static _getCustomerField() {
        return new Field('customer')
            .addFieldList(MyAccountQuery._getCustomerFields());
    }

    static _getCustomerFields() {
        return [
            'created_at',
            'confirmation_required',
            'group_id',
            'prefix',
            'firstname',
            'middlename',
            'lastname',
            'suffix',
            'email',
            'default_billing',
            'default_shipping',
            'dob',
            'taxvat',
            'id',
            'is_subscribed',
            MyAccountQuery._getAddressesField()
        ] as const;
    }

    static _getAddressesField() {
        return new Field('addresses')
            .addFieldList(MyAccountQuery._getAddressFields());
    }

    static _getRegionField() {
        return new Field('region')
            .addFieldList(MyAccountQuery._getRegionFields());
    }

    static _getRegionFields() {
        return [
            'region_code',
            'region',
            'region_id'
        ] as const;
    }

    static _getAddressFields() {
        return [
            'id',
            'customer_id',
            'country_id',
            'street',
            'telephone',
            'postcode',
            'city',
            'firstname',
            'lastname',
            'middlename',
            'prefix',
            'suffix',
            'default_shipping',
            'default_billing',
            'vat_id',
            MyAccountQuery._getRegionField()
        ] as const;
    }

    /**
     * Get ForgotPassword mutation
     */
    static getForgotPasswordMutation({ email }:{ email: string}) {
        return new Mutation('forgotPassword')
            .addArgument('email', 'String!', email)
            .addField('status');
    }
}
