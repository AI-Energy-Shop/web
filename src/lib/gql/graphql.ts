/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: { input: any; output: any };
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any };
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any };
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  Long: { input: any; output: any };
  PageSectionsDynamicZoneInput: { input: any; output: any };
};

export type AccountCreditFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<AccountCreditFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  creditLimit?: InputMaybe<FloatFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<AccountCreditFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<AccountCreditFiltersInput>>>;
  paymentTerms?: InputMaybe<DateTimeFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  totalOverdue?: InputMaybe<FloatFilterInput>;
  totalReceivable?: InputMaybe<FloatFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  user?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type AccountCreditInput = {
  creditLimit?: InputMaybe<Scalars['Float']['input']>;
  paymentTerms?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  totalOverdue?: InputMaybe<Scalars['Float']['input']>;
  totalReceivable?: InputMaybe<Scalars['Float']['input']>;
  user?: InputMaybe<Scalars['ID']['input']>;
};

export type AccountDetailFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<AccountDetailFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  level?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<ComponentElementsNameFiltersInput>;
  not?: InputMaybe<AccountDetailFiltersInput>;
  odoo_user_id?: InputMaybe<StringFilterInput>;
  or?: InputMaybe<Array<InputMaybe<AccountDetailFiltersInput>>>;
  payment_options?: InputMaybe<ComponentElementsPaymentOptionFiltersInput>;
  phone?: InputMaybe<StringFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  shipping_addresses?: InputMaybe<AddressFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  warehouse_location?: InputMaybe<ComponentElementsWarehouseLocationFiltersInput>;
};

export type AccountDetailInput = {
  level?: InputMaybe<Enum_Accountdetail_Level>;
  name?: InputMaybe<ComponentElementsNameInput>;
  odoo_user_id?: InputMaybe<Scalars['String']['input']>;
  payment_options?: InputMaybe<
    Array<InputMaybe<ComponentElementsPaymentOptionInput>>
  >;
  phone?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  shipping_addresses?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  warehouse_location?: InputMaybe<ComponentElementsWarehouseLocationInput>;
};

export type AddressFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<AddressFiltersInput>>>;
  city?: InputMaybe<StringFilterInput>;
  country?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  isActive?: InputMaybe<BooleanFilterInput>;
  mobile?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<ComponentElementsNameFiltersInput>;
  not?: InputMaybe<AddressFiltersInput>;
  odoo_address_id?: InputMaybe<StringFilterInput>;
  or?: InputMaybe<Array<InputMaybe<AddressFiltersInput>>>;
  phone?: InputMaybe<StringFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  state?: InputMaybe<StringFilterInput>;
  street1?: InputMaybe<StringFilterInput>;
  street2?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  users?: InputMaybe<UsersPermissionsUserFiltersInput>;
  zip_code?: InputMaybe<StringFilterInput>;
};

export type AddressInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  mobile?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<ComponentElementsNameInput>;
  odoo_address_id?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  street1?: InputMaybe<Scalars['String']['input']>;
  street2?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  zip_code?: InputMaybe<Scalars['String']['input']>;
};

export type ApprovedUserInput = {
  accountStatus: Scalars['String']['input'];
  businessType: Scalars['String']['input'];
  odooUserId: Scalars['String']['input'];
  userLevel: Scalars['String']['input'];
};

export type BooleanFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  contains?: InputMaybe<Scalars['Boolean']['input']>;
  containsi?: InputMaybe<Scalars['Boolean']['input']>;
  endsWith?: InputMaybe<Scalars['Boolean']['input']>;
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  eqi?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['Boolean']['input']>;
  gte?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  lt?: InputMaybe<Scalars['Boolean']['input']>;
  lte?: InputMaybe<Scalars['Boolean']['input']>;
  ne?: InputMaybe<Scalars['Boolean']['input']>;
  nei?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<BooleanFilterInput>;
  notContains?: InputMaybe<Scalars['Boolean']['input']>;
  notContainsi?: InputMaybe<Scalars['Boolean']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  startsWith?: InputMaybe<Scalars['Boolean']['input']>;
};

export type BrandFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<BrandFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<BrandFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<BrandFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  url?: InputMaybe<StringFilterInput>;
};

export type BrandInput = {
  image?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type CartFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CartFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<CartFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CartFiltersInput>>>;
  product?: InputMaybe<ProductFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  quantity?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  user?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type CartInput = {
  product?: InputMaybe<Scalars['ID']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  user?: InputMaybe<Scalars['ID']['input']>;
};

export type CategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CategoryFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<CategoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CategoryFiltersInput>>>;
  products?: InputMaybe<ProductFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CategoryInput = {
  image?: InputMaybe<Scalars['ID']['input']>;
  products?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CollectionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CollectionFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  handle?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<CollectionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CollectionFiltersInput>>>;
  productCount?: InputMaybe<LongFilterInput>;
  productFilters?: InputMaybe<ComponentElementsFilterRuleFiltersInput>;
  products?: InputMaybe<ProductFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  sortOrder?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CollectionInput = {
  handle?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['ID']['input']>;
  productCount?: InputMaybe<Scalars['Long']['input']>;
  productFilters?: InputMaybe<
    Array<InputMaybe<ComponentElementsFilterRuleInput>>
  >;
  products?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  sortOrder?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentElementsAddressFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentElementsAddressFiltersInput>>>;
  city?: InputMaybe<StringFilterInput>;
  country?: InputMaybe<StringFilterInput>;
  isActive?: InputMaybe<BooleanFilterInput>;
  not?: InputMaybe<ComponentElementsAddressFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentElementsAddressFiltersInput>>>;
  phone?: InputMaybe<StringFilterInput>;
  postcode?: InputMaybe<StringFilterInput>;
  state_territory?: InputMaybe<StringFilterInput>;
  street?: InputMaybe<StringFilterInput>;
  suburb?: InputMaybe<StringFilterInput>;
};

export type ComponentElementsAddressInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  postcode?: InputMaybe<Scalars['String']['input']>;
  state_territory?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  suburb?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentElementsCartItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentElementsCartItemFiltersInput>>>;
  image?: InputMaybe<StringFilterInput>;
  model?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentElementsCartItemFiltersInput>;
  odoo_product_id?: InputMaybe<StringFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentElementsCartItemFiltersInput>>>;
  price?: InputMaybe<FloatFilterInput>;
  productID?: InputMaybe<StringFilterInput>;
  quantity?: InputMaybe<IntFilterInput>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentElementsCartItemInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  odoo_product_id?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  productID?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentElementsDeliveryOptionFiltersInput = {
  and?: InputMaybe<
    Array<InputMaybe<ComponentElementsDeliveryOptionFiltersInput>>
  >;
  eta?: InputMaybe<DateFilterInput>;
  not?: InputMaybe<ComponentElementsDeliveryOptionFiltersInput>;
  or?: InputMaybe<
    Array<InputMaybe<ComponentElementsDeliveryOptionFiltersInput>>
  >;
  requestedDeliveryDate?: InputMaybe<DateFilterInput>;
  shipping?: InputMaybe<ComponentElementsDeliveryOptionShippingFiltersInput>;
  type?: InputMaybe<StringFilterInput>;
};

export type ComponentElementsDeliveryOptionInput = {
  eta?: InputMaybe<Scalars['Date']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  requestedDeliveryDate?: InputMaybe<Scalars['Date']['input']>;
  shipping?: InputMaybe<ComponentElementsDeliveryOptionShippingInput>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentElementsDeliveryOptionShippingDisplayFiltersInput = {
  and?: InputMaybe<
    Array<
      InputMaybe<ComponentElementsDeliveryOptionShippingDisplayFiltersInput>
    >
  >;
  carrierDisplayName?: InputMaybe<StringFilterInput>;
  carrierServiceDisplayName?: InputMaybe<StringFilterInput>;
  eta?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentElementsDeliveryOptionShippingDisplayFiltersInput>;
  or?: InputMaybe<
    Array<
      InputMaybe<ComponentElementsDeliveryOptionShippingDisplayFiltersInput>
    >
  >;
  totalSellBeforeTax?: InputMaybe<StringFilterInput>;
  totalSellPrice?: InputMaybe<StringFilterInput>;
  totalWeight?: InputMaybe<LongFilterInput>;
};

export type ComponentElementsDeliveryOptionShippingDisplayInput = {
  carrierDisplayName?: InputMaybe<Scalars['String']['input']>;
  carrierServiceDisplayName?: InputMaybe<Scalars['String']['input']>;
  eta?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  totalSellBeforeTax?: InputMaybe<Scalars['String']['input']>;
  totalSellPrice?: InputMaybe<Scalars['String']['input']>;
  totalWeight?: InputMaybe<Scalars['Long']['input']>;
};

export type ComponentElementsDeliveryOptionShippingFiltersInput = {
  and?: InputMaybe<
    Array<InputMaybe<ComponentElementsDeliveryOptionShippingFiltersInput>>
  >;
  carrierAccountId?: InputMaybe<LongFilterInput>;
  carrierId?: InputMaybe<LongFilterInput>;
  carrierServiceId?: InputMaybe<LongFilterInput>;
  companyCarrierAccountId?: InputMaybe<LongFilterInput>;
  companyId?: InputMaybe<LongFilterInput>;
  dgsDeclaration?: InputMaybe<BooleanFilterInput>;
  display?: InputMaybe<ComponentElementsDeliveryOptionShippingDisplayFiltersInput>;
  not?: InputMaybe<ComponentElementsDeliveryOptionShippingFiltersInput>;
  or?: InputMaybe<
    Array<InputMaybe<ComponentElementsDeliveryOptionShippingFiltersInput>>
  >;
};

export type ComponentElementsDeliveryOptionShippingInput = {
  carrierAccountId?: InputMaybe<Scalars['Long']['input']>;
  carrierId?: InputMaybe<Scalars['Long']['input']>;
  carrierServiceId?: InputMaybe<Scalars['Long']['input']>;
  companyCarrierAccountId?: InputMaybe<Scalars['Long']['input']>;
  companyId?: InputMaybe<Scalars['Long']['input']>;
  dgsDeclaration?: InputMaybe<Scalars['Boolean']['input']>;
  display?: InputMaybe<ComponentElementsDeliveryOptionShippingDisplayInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ComponentElementsFilterRuleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentElementsFilterRuleFiltersInput>>>;
  handle?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentElementsFilterRuleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentElementsFilterRuleFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentElementsFilterRuleInput = {
  handle?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentElementsInputFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentElementsInputFiltersInput>>>;
  label?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentElementsInputFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentElementsInputFiltersInput>>>;
  placeholder?: InputMaybe<StringFilterInput>;
  required?: InputMaybe<BooleanFilterInput>;
  type?: InputMaybe<StringFilterInput>;
};

export type ComponentElementsLineItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentElementsLineItemFiltersInput>>>;
  line?: InputMaybe<ComponentElementsCartItemFiltersInput>;
  location?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentElementsLineItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentElementsLineItemFiltersInput>>>;
};

export type ComponentElementsLineItemInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  line?: InputMaybe<ComponentElementsCartItemInput>;
  location?: InputMaybe<Enum_Componentelementslineitem_Location>;
};

export type ComponentElementsNameFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentElementsNameFiltersInput>>>;
  first_name?: InputMaybe<StringFilterInput>;
  last_name?: InputMaybe<StringFilterInput>;
  middle_name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentElementsNameFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentElementsNameFiltersInput>>>;
};

export type ComponentElementsNameInput = {
  first_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  middle_name?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentElementsPaymentOptionFiltersInput = {
  and?: InputMaybe<
    Array<InputMaybe<ComponentElementsPaymentOptionFiltersInput>>
  >;
  billing_zip?: InputMaybe<StringFilterInput>;
  card_holder_name?: InputMaybe<StringFilterInput>;
  card_number?: InputMaybe<StringFilterInput>;
  cvv?: InputMaybe<StringFilterInput>;
  expiration_date?: InputMaybe<DateFilterInput>;
  not?: InputMaybe<ComponentElementsPaymentOptionFiltersInput>;
  or?: InputMaybe<
    Array<InputMaybe<ComponentElementsPaymentOptionFiltersInput>>
  >;
};

export type ComponentElementsPaymentOptionInput = {
  billing_zip?: InputMaybe<Scalars['String']['input']>;
  card_holder_name?: InputMaybe<Scalars['String']['input']>;
  card_number?: InputMaybe<Scalars['String']['input']>;
  cvv?: InputMaybe<Scalars['String']['input']>;
  expiration_date?: InputMaybe<Scalars['Date']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ComponentElementsPickupOptionFiltersInput = {
  and?: InputMaybe<
    Array<InputMaybe<ComponentElementsPickupOptionFiltersInput>>
  >;
  date?: InputMaybe<DateTimeFilterInput>;
  estimatedArraivalTime?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentElementsPickupOptionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentElementsPickupOptionFiltersInput>>>;
};

export type ComponentElementsPickupOptionInput = {
  date?: InputMaybe<Scalars['DateTime']['input']>;
  estimatedArraivalTime?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ComponentElementsShippingAddressFiltersInput = {
  and?: InputMaybe<
    Array<InputMaybe<ComponentElementsShippingAddressFiltersInput>>
  >;
  city?: InputMaybe<StringFilterInput>;
  country?: InputMaybe<StringFilterInput>;
  isActive?: InputMaybe<BooleanFilterInput>;
  name?: InputMaybe<ComponentElementsNameFiltersInput>;
  not?: InputMaybe<ComponentElementsShippingAddressFiltersInput>;
  odoo_address_id?: InputMaybe<StringFilterInput>;
  or?: InputMaybe<
    Array<InputMaybe<ComponentElementsShippingAddressFiltersInput>>
  >;
  phone?: InputMaybe<StringFilterInput>;
  postcode?: InputMaybe<StringFilterInput>;
  state_territory?: InputMaybe<StringFilterInput>;
  street?: InputMaybe<StringFilterInput>;
  suburb?: InputMaybe<StringFilterInput>;
};

export type ComponentElementsShippingAddressInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<ComponentElementsNameInput>;
  odoo_address_id?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  postcode?: InputMaybe<Scalars['String']['input']>;
  state_territory?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  suburb?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentElementsTotalFiltersInput = {
  amount?: InputMaybe<FloatFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentElementsTotalFiltersInput>>>;
  currency?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentElementsTotalFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentElementsTotalFiltersInput>>>;
};

export type ComponentElementsTotalInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ComponentElementsWarehouseLocationFiltersInput = {
  address?: InputMaybe<ComponentElementsAddressFiltersInput>;
  and?: InputMaybe<
    Array<InputMaybe<ComponentElementsWarehouseLocationFiltersInput>>
  >;
  not?: InputMaybe<ComponentElementsWarehouseLocationFiltersInput>;
  odoo_warehouse_id?: InputMaybe<StringFilterInput>;
  or?: InputMaybe<
    Array<InputMaybe<ComponentElementsWarehouseLocationFiltersInput>>
  >;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentElementsWarehouseLocationInput = {
  address?: InputMaybe<ComponentElementsAddressInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  odoo_warehouse_id?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentLayoutSlideFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentLayoutSlideFiltersInput>>>;
  description?: InputMaybe<StringFilterInput>;
  link?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentLayoutSlideFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentLayoutSlideFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
  type?: InputMaybe<StringFilterInput>;
};

export type ComponentLayoutWarehouseLocationFiltersInput = {
  address?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<
    Array<InputMaybe<ComponentLayoutWarehouseLocationFiltersInput>>
  >;
  google_maps_link?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentLayoutWarehouseLocationFiltersInput>;
  office_time?: InputMaybe<StringFilterInput>;
  or?: InputMaybe<
    Array<InputMaybe<ComponentLayoutWarehouseLocationFiltersInput>>
  >;
  warehouse_time?: InputMaybe<StringFilterInput>;
};

export type CreditCardFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CreditCardFiltersInput>>>;
  brand?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  expMonth?: InputMaybe<StringFilterInput>;
  expYear?: InputMaybe<StringFilterInput>;
  isDefault?: InputMaybe<BooleanFilterInput>;
  last4Char?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<CreditCardFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CreditCardFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  stripePaymentMethodID?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  user?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type CreditCardInput = {
  brand?: InputMaybe<Scalars['String']['input']>;
  expMonth?: InputMaybe<Scalars['String']['input']>;
  expYear?: InputMaybe<Scalars['String']['input']>;
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  last4Char?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  stripePaymentMethodID?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['ID']['input']>;
};

export type DateFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  contains?: InputMaybe<Scalars['Date']['input']>;
  containsi?: InputMaybe<Scalars['Date']['input']>;
  endsWith?: InputMaybe<Scalars['Date']['input']>;
  eq?: InputMaybe<Scalars['Date']['input']>;
  eqi?: InputMaybe<Scalars['Date']['input']>;
  gt?: InputMaybe<Scalars['Date']['input']>;
  gte?: InputMaybe<Scalars['Date']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  lt?: InputMaybe<Scalars['Date']['input']>;
  lte?: InputMaybe<Scalars['Date']['input']>;
  ne?: InputMaybe<Scalars['Date']['input']>;
  nei?: InputMaybe<Scalars['Date']['input']>;
  not?: InputMaybe<DateFilterInput>;
  notContains?: InputMaybe<Scalars['Date']['input']>;
  notContainsi?: InputMaybe<Scalars['Date']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  startsWith?: InputMaybe<Scalars['Date']['input']>;
};

export type DateTimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  contains?: InputMaybe<Scalars['DateTime']['input']>;
  containsi?: InputMaybe<Scalars['DateTime']['input']>;
  endsWith?: InputMaybe<Scalars['DateTime']['input']>;
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  eqi?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  ne?: InputMaybe<Scalars['DateTime']['input']>;
  nei?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<DateTimeFilterInput>;
  notContains?: InputMaybe<Scalars['DateTime']['input']>;
  notContainsi?: InputMaybe<Scalars['DateTime']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  startsWith?: InputMaybe<Scalars['DateTime']['input']>;
};

export enum Enum_Accountdetail_Level {
  MidSized = 'MID_SIZED',
  Small = 'SMALL',
  Vip = 'VIP',
  WholeSeller = 'WHOLE_SELLER',
}

export enum Enum_Componentelementsinput_Type {
  Number = 'NUMBER',
  Text = 'TEXT',
  Textarea = 'TEXTAREA',
}

export enum Enum_Componentelementslineitem_Location {
  Bne = 'BNE',
  Mel = 'MEL',
  Syd = 'SYD',
}

export enum Enum_Componentelementsprice_User_Level {
  MidSized = 'MID_SIZED',
  Small = 'SMALL',
  Vip = 'VIP',
  Wholesale = 'WHOLESALE',
}

export enum Enum_Componentlayoutslide_Type {
  Desktop = 'DESKTOP',
  Mobile = 'MOBILE',
  Tablet = 'TABLET',
}

export enum Enum_Order_Deliverystatus {
  Shipped = 'shipped',
  TrackingAdded = 'tracking_added',
}

export enum Enum_Order_Fulfillmentstatus {
  Fulfilled = 'fulfilled',
  Unfulfilled = 'unfulfilled',
}

export enum Enum_Order_Paymentmethod {
  AccountCredit = 'account_credit',
  BankTransfer = 'bank_transfer',
  CreditCard = 'credit_card',
}

export enum Enum_Order_Paymentstatus {
  Failed = 'failed',
  Paid = 'paid',
  Pending = 'pending',
  Refunded = 'refunded',
}

export enum Enum_Order_Shippingtype {
  Delivery = 'delivery',
  Pickup = 'pickup',
}

export enum Enum_Userspermissionsuser_Account_Status {
  Approved = 'APPROVED',
  Denied = 'DENIED',
  Pending = 'PENDING',
  Reviewing = 'REVIEWING',
}

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars['String']['input']>;
  caption?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type FloatFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  contains?: InputMaybe<Scalars['Float']['input']>;
  containsi?: InputMaybe<Scalars['Float']['input']>;
  endsWith?: InputMaybe<Scalars['Float']['input']>;
  eq?: InputMaybe<Scalars['Float']['input']>;
  eqi?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
  nei?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<FloatFilterInput>;
  notContains?: InputMaybe<Scalars['Float']['input']>;
  notContainsi?: InputMaybe<Scalars['Float']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  startsWith?: InputMaybe<Scalars['Float']['input']>;
};

export type I18NLocaleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  code?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<I18NLocaleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type IdFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  contains?: InputMaybe<Scalars['ID']['input']>;
  containsi?: InputMaybe<Scalars['ID']['input']>;
  endsWith?: InputMaybe<Scalars['ID']['input']>;
  eq?: InputMaybe<Scalars['ID']['input']>;
  eqi?: InputMaybe<Scalars['ID']['input']>;
  gt?: InputMaybe<Scalars['ID']['input']>;
  gte?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  lt?: InputMaybe<Scalars['ID']['input']>;
  lte?: InputMaybe<Scalars['ID']['input']>;
  ne?: InputMaybe<Scalars['ID']['input']>;
  nei?: InputMaybe<Scalars['ID']['input']>;
  not?: InputMaybe<IdFilterInput>;
  notContains?: InputMaybe<Scalars['ID']['input']>;
  notContainsi?: InputMaybe<Scalars['ID']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  startsWith?: InputMaybe<Scalars['ID']['input']>;
};

export type IntFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  contains?: InputMaybe<Scalars['Int']['input']>;
  containsi?: InputMaybe<Scalars['Int']['input']>;
  endsWith?: InputMaybe<Scalars['Int']['input']>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  eqi?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  nei?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<IntFilterInput>;
  notContains?: InputMaybe<Scalars['Int']['input']>;
  notContainsi?: InputMaybe<Scalars['Int']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  startsWith?: InputMaybe<Scalars['Int']['input']>;
};

export type InventoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<InventoryFiltersInput>>>;
  brisbane?: InputMaybe<IntFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  melbourne?: InputMaybe<IntFilterInput>;
  not?: InputMaybe<InventoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<InventoryFiltersInput>>>;
  product?: InputMaybe<ProductFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  sydney?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  variants?: InputMaybe<VariantFiltersInput>;
};

export type InventoryInput = {
  brisbane?: InputMaybe<Scalars['Int']['input']>;
  melbourne?: InputMaybe<Scalars['Int']['input']>;
  product?: InputMaybe<Scalars['ID']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  sydney?: InputMaybe<Scalars['Int']['input']>;
  variants?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type JsonFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  contains?: InputMaybe<Scalars['JSON']['input']>;
  containsi?: InputMaybe<Scalars['JSON']['input']>;
  endsWith?: InputMaybe<Scalars['JSON']['input']>;
  eq?: InputMaybe<Scalars['JSON']['input']>;
  eqi?: InputMaybe<Scalars['JSON']['input']>;
  gt?: InputMaybe<Scalars['JSON']['input']>;
  gte?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  lt?: InputMaybe<Scalars['JSON']['input']>;
  lte?: InputMaybe<Scalars['JSON']['input']>;
  ne?: InputMaybe<Scalars['JSON']['input']>;
  nei?: InputMaybe<Scalars['JSON']['input']>;
  not?: InputMaybe<JsonFilterInput>;
  notContains?: InputMaybe<Scalars['JSON']['input']>;
  notContainsi?: InputMaybe<Scalars['JSON']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  startsWith?: InputMaybe<Scalars['JSON']['input']>;
};

export type KeyFeatureFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<KeyFeatureFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  feature?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<KeyFeatureFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<KeyFeatureFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type KeyFeatureInput = {
  feature?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type LongFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>;
  contains?: InputMaybe<Scalars['Long']['input']>;
  containsi?: InputMaybe<Scalars['Long']['input']>;
  endsWith?: InputMaybe<Scalars['Long']['input']>;
  eq?: InputMaybe<Scalars['Long']['input']>;
  eqi?: InputMaybe<Scalars['Long']['input']>;
  gt?: InputMaybe<Scalars['Long']['input']>;
  gte?: InputMaybe<Scalars['Long']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>;
  lt?: InputMaybe<Scalars['Long']['input']>;
  lte?: InputMaybe<Scalars['Long']['input']>;
  ne?: InputMaybe<Scalars['Long']['input']>;
  nei?: InputMaybe<Scalars['Long']['input']>;
  not?: InputMaybe<LongFilterInput>;
  notContains?: InputMaybe<Scalars['Long']['input']>;
  notContainsi?: InputMaybe<Scalars['Long']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>;
  startsWith?: InputMaybe<Scalars['Long']['input']>;
};

export type OrderFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<OrderFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  deliveryNotes?: InputMaybe<StringFilterInput>;
  deliveryOption?: InputMaybe<ComponentElementsDeliveryOptionFiltersInput>;
  deliveryStatus?: InputMaybe<StringFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  fulfillmentStatus?: InputMaybe<StringFilterInput>;
  lineItems?: InputMaybe<ComponentElementsLineItemFiltersInput>;
  not?: InputMaybe<OrderFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<OrderFiltersInput>>>;
  orderNotes?: InputMaybe<StringFilterInput>;
  orderNumber?: InputMaybe<StringFilterInput>;
  paymentMethod?: InputMaybe<StringFilterInput>;
  paymentStatus?: InputMaybe<StringFilterInput>;
  pickupNotes?: InputMaybe<StringFilterInput>;
  pickupOption?: InputMaybe<ComponentElementsPickupOptionFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  shippingAddress?: InputMaybe<ComponentElementsShippingAddressFiltersInput>;
  shippingType?: InputMaybe<StringFilterInput>;
  stripeCheckoutSession?: InputMaybe<StringFilterInput>;
  total?: InputMaybe<ComponentElementsTotalFiltersInput>;
  trackingNumber?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  user?: InputMaybe<UsersPermissionsUserFiltersInput>;
  voucherCode?: InputMaybe<StringFilterInput>;
  warehouseLocation?: InputMaybe<ComponentElementsWarehouseLocationFiltersInput>;
};

export type OrderInput = {
  deliveryNotes?: InputMaybe<Scalars['String']['input']>;
  deliveryOption?: InputMaybe<ComponentElementsDeliveryOptionInput>;
  deliveryStatus?: InputMaybe<Enum_Order_Deliverystatus>;
  fulfillmentStatus?: InputMaybe<Enum_Order_Fulfillmentstatus>;
  lineItems?: InputMaybe<Array<InputMaybe<ComponentElementsLineItemInput>>>;
  orderNotes?: InputMaybe<Scalars['String']['input']>;
  orderNumber?: InputMaybe<Scalars['String']['input']>;
  paymentMethod?: InputMaybe<Enum_Order_Paymentmethod>;
  paymentStatus?: InputMaybe<Enum_Order_Paymentstatus>;
  pickupNotes?: InputMaybe<Scalars['String']['input']>;
  pickupOption?: InputMaybe<ComponentElementsPickupOptionInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  shippingAddress?: InputMaybe<ComponentElementsShippingAddressInput>;
  shippingType?: InputMaybe<Enum_Order_Shippingtype>;
  stripeCheckoutSession?: InputMaybe<Scalars['String']['input']>;
  total?: InputMaybe<ComponentElementsTotalInput>;
  trackingNumber?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['ID']['input']>;
  voucherCode?: InputMaybe<Scalars['String']['input']>;
  warehouseLocation?: InputMaybe<ComponentElementsWarehouseLocationInput>;
};

export type PageFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PageFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<PageFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PageFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type PageInput = {
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  sections?: InputMaybe<
    Array<Scalars['PageSectionsDynamicZoneInput']['input']>
  >;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type PaginationArg = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
};

export type PriceFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PriceFiltersInput>>>;
  comparePrice?: InputMaybe<FloatFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  max_quantity?: InputMaybe<IntFilterInput>;
  min_quantity?: InputMaybe<IntFilterInput>;
  not?: InputMaybe<PriceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PriceFiltersInput>>>;
  price?: InputMaybe<FloatFilterInput>;
  products?: InputMaybe<ProductFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  user_level?: InputMaybe<StringFilterInput>;
  variants?: InputMaybe<VariantFiltersInput>;
};

export type PriceInput = {
  comparePrice?: InputMaybe<Scalars['Float']['input']>;
  max_quantity?: InputMaybe<Scalars['Int']['input']>;
  min_quantity?: InputMaybe<Scalars['Int']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  products?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user_level?: InputMaybe<Scalars['String']['input']>;
  variants?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type ProductFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ProductFiltersInput>>>;
  brand?: InputMaybe<BrandFiltersInput>;
  categories?: InputMaybe<CategoryFiltersInput>;
  collections?: InputMaybe<CollectionFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  handle?: InputMaybe<StringFilterInput>;
  improvedBy?: InputMaybe<UsersPermissionsUserFiltersInput>;
  inventory?: InputMaybe<InventoryFiltersInput>;
  key_features?: InputMaybe<KeyFeatureFiltersInput>;
  madeBy?: InputMaybe<UsersPermissionsUserFiltersInput>;
  maxQuantity?: InputMaybe<IntFilterInput>;
  model?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ProductFiltersInput>;
  odoo_product_id?: InputMaybe<StringFilterInput>;
  odoo_product_name?: InputMaybe<StringFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ProductFiltersInput>>>;
  price_lists?: InputMaybe<PriceFiltersInput>;
  product_type?: InputMaybe<StringFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  releasedAt?: InputMaybe<DateTimeFilterInput>;
  removedBy?: InputMaybe<UsersPermissionsUserFiltersInput>;
  shipping?: InputMaybe<ShippingFiltersInput>;
  specifications?: InputMaybe<SpecificationFiltersInput>;
  tags?: InputMaybe<TagFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  variants?: InputMaybe<VariantFiltersInput>;
  vendor?: InputMaybe<StringFilterInput>;
};

export type ProductInput = {
  brand?: InputMaybe<Scalars['ID']['input']>;
  categories?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  collections?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  files?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  handle?: InputMaybe<Scalars['String']['input']>;
  images?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  improvedBy?: InputMaybe<Scalars['ID']['input']>;
  inventory?: InputMaybe<Scalars['ID']['input']>;
  key_features?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  madeBy?: InputMaybe<Scalars['ID']['input']>;
  maxQuantity?: InputMaybe<Scalars['Int']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  odoo_product_id?: InputMaybe<Scalars['String']['input']>;
  odoo_product_name?: InputMaybe<Scalars['String']['input']>;
  price_lists?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  product_type?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  releasedAt?: InputMaybe<Scalars['DateTime']['input']>;
  removedBy?: InputMaybe<Scalars['ID']['input']>;
  shipping?: InputMaybe<Scalars['ID']['input']>;
  specifications?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  variants?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  vendor?: InputMaybe<Scalars['String']['input']>;
};

export enum PublicationStatus {
  Draft = 'DRAFT',
  Published = 'PUBLISHED',
}

export type RegisterUserInput = {
  businessName: Scalars['String']['input'];
  businessNumber: Scalars['String']['input'];
  businessType: Scalars['String']['input'];
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  state: Scalars['String']['input'];
  street1: Scalars['String']['input'];
  street2: Scalars['String']['input'];
  username: Scalars['String']['input'];
  zipCode: Scalars['String']['input'];
};

export type ReviewWorkflowsWorkflowFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ReviewWorkflowsWorkflowFiltersInput>>>;
  contentTypes?: InputMaybe<JsonFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ReviewWorkflowsWorkflowFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ReviewWorkflowsWorkflowFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  stageRequiredToPublish?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  stages?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ReviewWorkflowsWorkflowInput = {
  contentTypes?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  stageRequiredToPublish?: InputMaybe<Scalars['ID']['input']>;
  stages?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type ReviewWorkflowsWorkflowStageFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>>>;
  color?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  workflow?: InputMaybe<ReviewWorkflowsWorkflowFiltersInput>;
};

export type ReviewWorkflowsWorkflowStageInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  workflow?: InputMaybe<Scalars['ID']['input']>;
};

export type ShippingFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ShippingFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  height?: InputMaybe<FloatFilterInput>;
  length?: InputMaybe<FloatFilterInput>;
  not?: InputMaybe<ShippingFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ShippingFiltersInput>>>;
  product?: InputMaybe<ProductFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  weight?: InputMaybe<FloatFilterInput>;
  width?: InputMaybe<FloatFilterInput>;
};

export type ShippingInput = {
  height?: InputMaybe<Scalars['Float']['input']>;
  length?: InputMaybe<Scalars['Float']['input']>;
  product?: InputMaybe<Scalars['ID']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  weight?: InputMaybe<Scalars['Float']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
};

export type SpecificationFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<SpecificationFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  key?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<SpecificationFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<SpecificationFiltersInput>>>;
  products?: InputMaybe<ProductFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  value?: InputMaybe<StringFilterInput>;
};

export type SpecificationInput = {
  key?: InputMaybe<Scalars['String']['input']>;
  products?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type StringFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  containsi?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  eqi?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  nei?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<StringFilterInput>;
  notContains?: InputMaybe<Scalars['String']['input']>;
  notContainsi?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type TagFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<TagFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<TagFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<TagFiltersInput>>>;
  product?: InputMaybe<ProductFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  tag?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type TagInput = {
  product?: InputMaybe<Scalars['ID']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  tag?: InputMaybe<Scalars['String']['input']>;
};

export type UploadFileFiltersInput = {
  alternativeText?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  caption?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  ext?: InputMaybe<StringFilterInput>;
  formats?: InputMaybe<JsonFilterInput>;
  hash?: InputMaybe<StringFilterInput>;
  height?: InputMaybe<IntFilterInput>;
  mime?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFileFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  previewUrl?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  provider_metadata?: InputMaybe<JsonFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  size?: InputMaybe<FloatFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  url?: InputMaybe<StringFilterInput>;
  width?: InputMaybe<IntFilterInput>;
};

export type UserApprovalRequestFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UserApprovalRequestFiltersInput>>>;
  approved?: InputMaybe<BooleanFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UserApprovalRequestFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UserApprovalRequestFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  request_link?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UserApprovalRequestInput = {
  approved?: InputMaybe<Scalars['Boolean']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  request_link?: InputMaybe<Scalars['String']['input']>;
};

export type UserFiltersInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UserNotificationFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UserNotificationFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UserNotificationFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UserNotificationFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  read?: InputMaybe<DateTimeFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  user?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type UserNotificationInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  read?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['ID']['input']>;
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String']['input'];
  password: Scalars['String']['input'];
  provider?: Scalars['String']['input'];
};

export type UsersPermissionsPermissionFiltersInput = {
  action?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UsersPermissionsRegisterInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UsersPermissionsRoleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  users?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsRoleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type UsersPermissionsUserFiltersInput = {
  accountCredit?: InputMaybe<AccountCreditFiltersInput>;
  account_detail?: InputMaybe<AccountDetailFiltersInput>;
  account_status?: InputMaybe<StringFilterInput>;
  addresses?: InputMaybe<AddressFiltersInput>;
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  blocked?: InputMaybe<BooleanFilterInput>;
  business_name?: InputMaybe<StringFilterInput>;
  business_number?: InputMaybe<StringFilterInput>;
  business_type?: InputMaybe<StringFilterInput>;
  carts?: InputMaybe<CartFiltersInput>;
  createAccountRequest?: InputMaybe<DateTimeFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  creditCards?: InputMaybe<CreditCardFiltersInput>;
  documentId?: InputMaybe<IdFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsUserFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  phone?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  stripeCustomerID?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  user_notifications?: InputMaybe<UserNotificationFiltersInput>;
  username?: InputMaybe<StringFilterInput>;
};

export type UsersPermissionsUserInput = {
  accountCredit?: InputMaybe<Scalars['ID']['input']>;
  account_detail?: InputMaybe<Scalars['ID']['input']>;
  account_status?: InputMaybe<Enum_Userspermissionsuser_Account_Status>;
  addresses?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  blocked?: InputMaybe<Scalars['Boolean']['input']>;
  business_name?: InputMaybe<Scalars['String']['input']>;
  business_number?: InputMaybe<Scalars['String']['input']>;
  business_type?: InputMaybe<Scalars['String']['input']>;
  carts?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  createAccountRequest?: InputMaybe<Scalars['DateTime']['input']>;
  creditCards?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  email?: InputMaybe<Scalars['String']['input']>;
  image_logo?: InputMaybe<Scalars['ID']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  role?: InputMaybe<Scalars['ID']['input']>;
  stripeCustomerID?: InputMaybe<Scalars['String']['input']>;
  user_notifications?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type VariantFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<VariantFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  inventories?: InputMaybe<InventoryFiltersInput>;
  not?: InputMaybe<VariantFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<VariantFiltersInput>>>;
  prices_list?: InputMaybe<PriceFiltersInput>;
  products?: InputMaybe<ProductFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  variantOption?: InputMaybe<StringFilterInput>;
};

export type VariantInput = {
  inventories?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  prices_list?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  products?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  variantImage?: InputMaybe<Scalars['ID']['input']>;
  variantOption?: InputMaybe<Scalars['String']['input']>;
};

export type AddressQueryVariables = Exact<{
  documentId: Scalars['ID']['input'];
}>;

export type AddressQuery = {
  __typename?: 'Query';
  usersPermissionsUser?: {
    __typename?: 'UsersPermissionsUser';
    addresses: Array<{
      __typename?: 'Address';
      city?: string | null;
      country?: string | null;
      documentId: string;
      isActive?: boolean | null;
      mobile?: string | null;
      odoo_address_id?: string | null;
      phone?: string | null;
      createdAt?: any | null;
      state?: string | null;
      street1?: string | null;
      street2?: string | null;
      title?: string | null;
      zip_code?: string | null;
    } | null>;
  } | null;
};

export type CreateAddressMutationVariables = Exact<{
  data: AddressInput;
}>;

export type CreateAddressMutation = {
  __typename?: 'Mutation';
  createAddress?: { __typename?: 'Address'; documentId: string } | null;
};

export type DeleteAddressMutationVariables = Exact<{
  documentId: Scalars['ID']['input'];
}>;

export type DeleteAddressMutation = {
  __typename?: 'Mutation';
  deleteAddress?: {
    __typename?: 'DeleteMutationResponse';
    documentId: string;
  } | null;
};

export type UpdateAddressMutationVariables = Exact<{
  data: AddressInput;
  documentId: Scalars['ID']['input'];
}>;

export type UpdateAddressMutation = {
  __typename?: 'Mutation';
  updateAddress?: { __typename?: 'Address'; documentId: string } | null;
};

export type UpdateAddressIsActiveMutationVariables = Exact<{
  documentId: Scalars['ID']['input'];
  data: AddressInput;
}>;

export type UpdateAddressIsActiveMutation = {
  __typename?: 'Mutation';
  updateAddress?: { __typename?: 'Address'; documentId: string } | null;
};

export type CartsQueryVariables = Exact<{
  filters?: InputMaybe<CartFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
}>;

export type CartsQuery = {
  __typename?: 'Query';
  carts: Array<{
    __typename?: 'Cart';
    documentId: string;
    quantity: number;
    createdAt?: any | null;
    updatedAt?: any | null;
    product?: {
      __typename?: 'Product';
      documentId: string;
      name: string;
      model: string;
      odoo_product_id: string;
      odoo_product_name?: string | null;
      price_lists: Array<{
        __typename?: 'Price';
        price?: number | null;
        comparePrice?: number | null;
        min_quantity?: number | null;
        max_quantity?: number | null;
        user_level?: string | null;
      } | null>;
      inventory?: {
        __typename?: 'Inventory';
        documentId: string;
        melbourne: number;
        sydney: number;
        brisbane: number;
        createdAt?: any | null;
        updatedAt?: any | null;
      } | null;
      images: Array<{
        __typename?: 'UploadFile';
        url: string;
        alternativeText?: string | null;
        width?: number | null;
        height?: number | null;
      } | null>;
      shipping?: {
        __typename?: 'Shipping';
        weight?: number | null;
        height?: number | null;
        width?: number | null;
        length?: number | null;
        documentId: string;
      } | null;
    } | null;
    user?: {
      __typename?: 'UsersPermissionsUser';
      documentId: string;
      username: string;
    } | null;
  } | null>;
};

export type GetCheckoutUserDataQueryVariables = Exact<{
  documentId: Scalars['ID']['input'];
}>;

export type GetCheckoutUserDataQuery = {
  __typename?: 'Query';
  usersPermissionsUser?: {
    __typename?: 'UsersPermissionsUser';
    carts: Array<{
      __typename?: 'Cart';
      documentId: string;
      quantity: number;
      product?: {
        __typename?: 'Product';
        documentId: string;
        inventory?: {
          __typename?: 'Inventory';
          documentId: string;
          melbourne: number;
          sydney: number;
          brisbane: number;
          createdAt?: any | null;
          updatedAt?: any | null;
        } | null;
        shipping?: {
          __typename?: 'Shipping';
          height?: number | null;
          length?: number | null;
          weight?: number | null;
          width?: number | null;
        } | null;
      } | null;
    } | null>;
    addresses: Array<{
      __typename?: 'Address';
      documentId: string;
      street1?: string | null;
      street2?: string | null;
      state?: string | null;
      city?: string | null;
      zip_code?: string | null;
      country?: string | null;
      phone?: string | null;
      isActive?: boolean | null;
      title?: string | null;
      odoo_address_id?: string | null;
      mobile?: string | null;
      createdAt?: any | null;
      updatedAt?: any | null;
    } | null>;
    creditCards: Array<{
      __typename?: 'CreditCard';
      brand?: string | null;
      documentId: string;
      expMonth?: string | null;
      expYear?: string | null;
      isDefault?: boolean | null;
      last4Char?: string | null;
      publishedAt?: any | null;
      stripePaymentMethodID?: string | null;
    } | null>;
  } | null;
};

export type CreateCartMutationVariables = Exact<{
  data: CartInput;
}>;

export type CreateCartMutation = {
  __typename?: 'Mutation';
  createCart?: {
    __typename?: 'Cart';
    documentId: string;
    quantity: number;
    createdAt?: any | null;
    updatedAt?: any | null;
    product?: {
      __typename?: 'Product';
      documentId: string;
      odoo_product_id: string;
      odoo_product_name?: string | null;
      name: string;
      model: string;
      price_lists: Array<{
        __typename?: 'Price';
        price?: number | null;
        comparePrice?: number | null;
        min_quantity?: number | null;
        max_quantity?: number | null;
        user_level?: string | null;
      } | null>;
      inventory?: {
        __typename?: 'Inventory';
        documentId: string;
        melbourne: number;
        sydney: number;
        brisbane: number;
        createdAt?: any | null;
        updatedAt?: any | null;
      } | null;
      images: Array<{
        __typename?: 'UploadFile';
        url: string;
        alternativeText?: string | null;
        width?: number | null;
        height?: number | null;
      } | null>;
    } | null;
    user?: {
      __typename?: 'UsersPermissionsUser';
      documentId: string;
      username: string;
    } | null;
  } | null;
};

export type UpdateCartMutationVariables = Exact<{
  documentId: Scalars['ID']['input'];
  data: CartInput;
}>;

export type UpdateCartMutation = {
  __typename?: 'Mutation';
  updateCart?: {
    __typename?: 'Cart';
    documentId: string;
    quantity: number;
    createdAt?: any | null;
    updatedAt?: any | null;
    product?: {
      __typename?: 'Product';
      documentId: string;
      name: string;
      model: string;
      odoo_product_id: string;
      odoo_product_name?: string | null;
      price_lists: Array<{
        __typename?: 'Price';
        price?: number | null;
        comparePrice?: number | null;
        min_quantity?: number | null;
        max_quantity?: number | null;
        user_level?: string | null;
      } | null>;
      inventory?: {
        __typename?: 'Inventory';
        documentId: string;
        melbourne: number;
        sydney: number;
        brisbane: number;
        createdAt?: any | null;
        updatedAt?: any | null;
      } | null;
      images: Array<{
        __typename?: 'UploadFile';
        url: string;
        alternativeText?: string | null;
        width?: number | null;
        height?: number | null;
      } | null>;
    } | null;
    user?: {
      __typename?: 'UsersPermissionsUser';
      documentId: string;
      username: string;
    } | null;
  } | null;
};

export type DeleteCartMutationVariables = Exact<{
  documentId: Scalars['ID']['input'];
}>;

export type DeleteCartMutation = {
  __typename?: 'Mutation';
  deleteCart?: {
    __typename?: 'DeleteMutationResponse';
    documentId: string;
  } | null;
};

export type UpdateQuantityMutationVariables = Exact<{
  documentId: Scalars['ID']['input'];
  data: CartInput;
}>;

export type UpdateQuantityMutation = {
  __typename?: 'Mutation';
  updateCart?: { __typename?: 'Cart'; documentId: string } | null;
};

export type CollectionsQueryVariables = Exact<{
  filters?: InputMaybe<CollectionFiltersInput>;
}>;

export type CollectionsQuery = {
  __typename?: 'Query';
  collections: Array<{
    __typename?: 'Collection';
    documentId: string;
    title?: string | null;
    handle: string;
    sortOrder?: string | null;
    productCount?: any | null;
    image?: {
      __typename?: 'UploadFile';
      name: string;
      alternativeText?: string | null;
      url: string;
    } | null;
  } | null>;
};

export type CollectionsWithProductsQueryVariables = Exact<{
  collectionsFilters?: InputMaybe<CollectionFiltersInput>;
  productsFilters?: InputMaybe<ProductFiltersInput>;
  productsPagination?: InputMaybe<PaginationArg>;
}>;

export type CollectionsWithProductsQuery = {
  __typename?: 'Query';
  collections: Array<{
    __typename?: 'Collection';
    documentId: string;
    handle: string;
    sortOrder?: string | null;
    productCount?: any | null;
    image?: {
      __typename?: 'UploadFile';
      name: string;
      alternativeText?: string | null;
      url: string;
    } | null;
    productFilters?: Array<{
      __typename?: 'ComponentElementsFilterRule';
      id: string;
      title?: string | null;
      handle?: string | null;
    } | null> | null;
    products: Array<{
      __typename?: 'Product';
      documentId: string;
      name: string;
      description?: string | null;
      handle: string;
      product_type?: string | null;
      model: string;
      odoo_product_id: string;
      odoo_product_name?: string | null;
      maxQuantity?: number | null;
      createdAt?: any | null;
      updatedAt?: any | null;
      releasedAt?: any | null;
      categories: Array<{
        __typename?: 'Category';
        title: string;
        slug: string;
        image: {
          __typename?: 'UploadFile';
          documentId: string;
          name: string;
          alternativeText?: string | null;
          width?: number | null;
          height?: number | null;
          mime: string;
          url: string;
        };
      } | null>;
      brand?: {
        __typename?: 'Brand';
        documentId: string;
        name: string;
        url: string;
        image: {
          __typename?: 'UploadFile';
          documentId: string;
          name: string;
          alternativeText?: string | null;
          width?: number | null;
          height?: number | null;
          mime: string;
          url: string;
        };
      } | null;
      collections: Array<{
        __typename?: 'Collection';
        documentId: string;
        title?: string | null;
      } | null>;
      price_lists: Array<{
        __typename?: 'Price';
        documentId: string;
        price?: number | null;
        comparePrice?: number | null;
        min_quantity?: number | null;
        max_quantity?: number | null;
        user_level?: string | null;
      } | null>;
      files: Array<{
        __typename?: 'UploadFile';
        documentId: string;
        name: string;
        alternativeText?: string | null;
        width?: number | null;
        height?: number | null;
        mime: string;
        url: string;
      } | null>;
      images: Array<{
        __typename?: 'UploadFile';
        documentId: string;
        name: string;
        alternativeText?: string | null;
        width?: number | null;
        height?: number | null;
        mime: string;
        url: string;
      } | null>;
      specifications: Array<{
        __typename?: 'Specification';
        documentId: string;
        key: string;
        value: string;
      } | null>;
      key_features: Array<{
        __typename?: 'KeyFeature';
        documentId: string;
        feature?: string | null;
      } | null>;
      inventory?: {
        __typename?: 'Inventory';
        documentId: string;
        melbourne: number;
        sydney: number;
        brisbane: number;
      } | null;
      shipping?: {
        __typename?: 'Shipping';
        documentId: string;
        height?: number | null;
        width?: number | null;
        length?: number | null;
        weight?: number | null;
      } | null;
      madeBy?: { __typename?: 'UsersPermissionsUser'; email: string } | null;
      improvedBy?: {
        __typename?: 'UsersPermissionsUser';
        email: string;
      } | null;
    } | null>;
  } | null>;
};

export type CreateCreditCardMutationVariables = Exact<{
  data: CreditCardInput;
}>;

export type CreateCreditCardMutation = {
  __typename?: 'Mutation';
  createCreditCard?: { __typename?: 'CreditCard'; documentId: string } | null;
};

export type UpdateCreditCardMutationVariables = Exact<{
  data: CreditCardInput;
  documentId: Scalars['ID']['input'];
}>;

export type UpdateCreditCardMutation = {
  __typename?: 'Mutation';
  updateCreditCard?: { __typename?: 'CreditCard'; documentId: string } | null;
};

export type DeleteCreditCardMutationVariables = Exact<{
  documentId: Scalars['ID']['input'];
}>;

export type DeleteCreditCardMutation = {
  __typename?: 'Mutation';
  deleteCreditCard?: {
    __typename?: 'DeleteMutationResponse';
    documentId: string;
  } | null;
};

export type UploadFileQueryVariables = Exact<{
  documentId: Scalars['ID']['input'];
}>;

export type UploadFileQuery = {
  __typename?: 'Query';
  uploadFile?: {
    __typename?: 'UploadFile';
    documentId: string;
    name: string;
    alternativeText?: string | null;
    caption?: string | null;
    width?: number | null;
    height?: number | null;
    formats?: any | null;
    hash: string;
    ext?: string | null;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string | null;
    provider: string;
    provider_metadata?: any | null;
    createdAt?: any | null;
    updatedAt?: any | null;
    publishedAt?: any | null;
  } | null;
};

export type FilesQueryVariables = Exact<{
  filters?: InputMaybe<UploadFileFiltersInput>;
  sort?: InputMaybe<
    | Array<InputMaybe<Scalars['String']['input']>>
    | InputMaybe<Scalars['String']['input']>
  >;
}>;

export type FilesQuery = {
  __typename?: 'Query';
  files: Array<{
    __typename?: 'UploadFile';
    documentId: string;
    name: string;
    alternativeText?: string | null;
    caption?: string | null;
    width?: number | null;
    height?: number | null;
    formats?: any | null;
    hash: string;
    ext?: string | null;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string | null;
    provider: string;
    createdAt?: any | null;
    updatedAt?: any | null;
    publishedAt?: any | null;
  } | null>;
};

export type UploadFilesQueryVariables = Exact<{
  filters?: InputMaybe<UploadFileFiltersInput>;
}>;

export type UploadFilesQuery = {
  __typename?: 'Query';
  uploadFiles: Array<{
    __typename?: 'UploadFile';
    documentId: string;
    name: string;
    alternativeText?: string | null;
    caption?: string | null;
    width?: number | null;
    height?: number | null;
    formats?: any | null;
    hash: string;
    ext?: string | null;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string | null;
    provider: string;
    provider_metadata?: any | null;
  } | null>;
};

export type OrdersQueryVariables = Exact<{
  filters?: InputMaybe<OrderFiltersInput>;
}>;

export type OrdersQuery = {
  __typename?: 'Query';
  orders: Array<{
    __typename?: 'Order';
    documentId: string;
    orderNumber?: string | null;
    paymentStatus?: Enum_Order_Paymentstatus | null;
    fulfillmentStatus?: Enum_Order_Fulfillmentstatus | null;
    paymentMethod?: Enum_Order_Paymentmethod | null;
    shippingType?: Enum_Order_Shippingtype | null;
    deliveryStatus?: Enum_Order_Deliverystatus | null;
    createdAt?: any | null;
    updatedAt?: any | null;
    user?: {
      __typename?: 'UsersPermissionsUser';
      documentId: string;
      business_name?: string | null;
    } | null;
    total?: {
      __typename?: 'ComponentElementsTotal';
      amount?: number | null;
      currency?: string | null;
    } | null;
  } | null>;
};

export type CreateOrderMutationVariables = Exact<{
  data: OrderInput;
}>;

export type CreateOrderMutation = {
  __typename?: 'Mutation';
  createOrder?: { __typename?: 'Order'; documentId: string } | null;
};

export type PagesQueryVariables = Exact<{ [key: string]: never }>;

export type PagesQuery = {
  __typename?: 'Query';
  pages: Array<{
    __typename?: 'Page';
    documentId: string;
    title?: string | null;
    slug?: string | null;
  } | null>;
};

export type GetPageQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;

export type GetPageQuery = {
  __typename?: 'Query';
  getPage?: {
    __typename?: 'Page';
    documentId: string;
    title?: string | null;
    slug?: string | null;
    createdAt?: any | null;
    updatedAt?: any | null;
    publishedAt?: any | null;
    sections?: Array<
      | {
          __typename?: 'ComponentFormInquiry';
          id: string;
          heading?: string | null;
          button_title?: string | null;
          inputs?: Array<{
            __typename?: 'ComponentElementsInput';
            id: string;
            label?: string | null;
            type?: Enum_Componentelementsinput_Type | null;
            placeholder?: string | null;
            required?: boolean | null;
          } | null> | null;
        }
      | {
          __typename?: 'ComponentFormNewsletter';
          id: string;
          heading?: string | null;
          sub_heading?: string | null;
          sub_text?: string | null;
          button_title?: string | null;
          inputs?: Array<{
            __typename?: 'ComponentElementsInput';
            id: string;
            label?: string | null;
            type?: Enum_Componentelementsinput_Type | null;
            placeholder?: string | null;
            required?: boolean | null;
          } | null> | null;
          image?: {
            __typename?: 'UploadFile';
            name: string;
            alternativeText?: string | null;
            url: string;
          } | null;
        }
      | {
          __typename?: 'ComponentSectionsAbout';
          id: string;
          heading?: string | null;
          sub_heading?: string | null;
          description?: string | null;
          button_title?: string | null;
          background_image?: {
            __typename?: 'UploadFile';
            name: string;
            alternativeText?: string | null;
            url: string;
          } | null;
        }
      | {
          __typename?: 'ComponentSectionsContactDetails';
          id: string;
          left_heading?: string | null;
          left_sub_heading?: string | null;
          right_heading?: string | null;
          right_sub_heading?: string | null;
        }
      | {
          __typename?: 'ComponentSectionsContactUs';
          id: string;
          heading?: string | null;
          description?: string | null;
          button_title?: string | null;
          background_image?: {
            __typename?: 'UploadFile';
            name: string;
            alternativeText?: string | null;
            url: string;
          } | null;
        }
      | {
          __typename?: 'ComponentSectionsImageSlider';
          id: string;
          animation_duration?: number | null;
          display_button?: boolean | null;
          slides?: Array<{
            __typename?: 'ComponentLayoutSlide';
            id: string;
            title?: string | null;
            description?: string | null;
            link?: string | null;
            type?: Enum_Componentlayoutslide_Type | null;
            image?: {
              __typename?: 'UploadFile';
              name: string;
              alternativeText?: string | null;
              url: string;
            } | null;
          } | null> | null;
        }
      | {
          __typename?: 'ComponentSectionsWarehouseLocations';
          id: string;
          heading?: string | null;
          sub_heading?: string | null;
          locations?: Array<{
            __typename?: 'ComponentLayoutWarehouseLocation';
            id: string;
            address?: string | null;
            warehouse_time?: string | null;
            office_time?: string | null;
            google_maps_link?: string | null;
            name?: string | null;
          } | null> | null;
        }
      | { __typename?: 'Error'; code: string; message?: string | null }
      | null
    > | null;
  } | null;
};

export type GetStoreProductQueryVariables = Exact<{
  handle: Scalars['String']['input'];
}>;

export type GetStoreProductQuery = {
  __typename?: 'Query';
  getStoreProduct?: {
    __typename?: 'Product';
    documentId: string;
    name: string;
    model: string;
    description?: string | null;
    handle: string;
    odoo_product_id: string;
    odoo_product_name?: string | null;
    maxQuantity?: number | null;
    createdAt?: any | null;
    updatedAt?: any | null;
    releasedAt?: any | null;
    brand?: {
      __typename?: 'Brand';
      name: string;
      url: string;
      image: {
        __typename?: 'UploadFile';
        documentId: string;
        name: string;
        alternativeText?: string | null;
        width?: number | null;
        height?: number | null;
        mime: string;
        url: string;
      };
    } | null;
    inventory?: {
      __typename?: 'Inventory';
      documentId: string;
      melbourne: number;
      sydney: number;
      brisbane: number;
    } | null;
    shipping?: {
      __typename?: 'Shipping';
      documentId: string;
      width?: number | null;
      height?: number | null;
      weight?: number | null;
      length?: number | null;
    } | null;
    tags: Array<{
      __typename?: 'Tag';
      documentId: string;
      tag?: string | null;
    } | null>;
    collections: Array<{
      __typename?: 'Collection';
      documentId: string;
      title?: string | null;
    } | null>;
    price_lists: Array<{
      __typename?: 'Price';
      documentId: string;
      price?: number | null;
      comparePrice?: number | null;
      min_quantity?: number | null;
      max_quantity?: number | null;
      user_level?: string | null;
    } | null>;
    files: Array<{
      __typename?: 'UploadFile';
      documentId: string;
      mime: string;
      name: string;
      url: string;
      alternativeText?: string | null;
    } | null>;
    images: Array<{
      __typename?: 'UploadFile';
      documentId: string;
      mime: string;
      name: string;
      url: string;
      alternativeText?: string | null;
    } | null>;
    specifications: Array<{
      __typename?: 'Specification';
      documentId: string;
      key: string;
      value: string;
    } | null>;
    key_features: Array<{
      __typename?: 'KeyFeature';
      documentId: string;
      feature?: string | null;
    } | null>;
  } | null;
};

export type ProductsQueryVariables = Exact<{
  filters?: InputMaybe<ProductFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<
    | Array<InputMaybe<Scalars['String']['input']>>
    | InputMaybe<Scalars['String']['input']>
  >;
}>;

export type ProductsQuery = {
  __typename?: 'Query';
  products: Array<{
    __typename?: 'Product';
    documentId: string;
    name: string;
    description?: string | null;
    handle: string;
    product_type?: string | null;
    model: string;
    odoo_product_id: string;
    odoo_product_name?: string | null;
    maxQuantity?: number | null;
    createdAt?: any | null;
    updatedAt?: any | null;
    releasedAt?: any | null;
    categories: Array<{
      __typename?: 'Category';
      title: string;
      slug: string;
      image: {
        __typename?: 'UploadFile';
        documentId: string;
        name: string;
        alternativeText?: string | null;
        width?: number | null;
        height?: number | null;
        mime: string;
        url: string;
      };
    } | null>;
    brand?: {
      __typename?: 'Brand';
      documentId: string;
      name: string;
      url: string;
      image: {
        __typename?: 'UploadFile';
        documentId: string;
        name: string;
        alternativeText?: string | null;
        width?: number | null;
        height?: number | null;
        mime: string;
        url: string;
      };
    } | null;
    collections: Array<{
      __typename?: 'Collection';
      documentId: string;
      title?: string | null;
    } | null>;
    price_lists: Array<{
      __typename?: 'Price';
      documentId: string;
      price?: number | null;
      comparePrice?: number | null;
      min_quantity?: number | null;
      max_quantity?: number | null;
      user_level?: string | null;
    } | null>;
    files: Array<{
      __typename?: 'UploadFile';
      documentId: string;
      name: string;
      alternativeText?: string | null;
      width?: number | null;
      height?: number | null;
      mime: string;
      url: string;
    } | null>;
    images: Array<{
      __typename?: 'UploadFile';
      documentId: string;
      name: string;
      alternativeText?: string | null;
      width?: number | null;
      height?: number | null;
      mime: string;
      url: string;
    } | null>;
    specifications: Array<{
      __typename?: 'Specification';
      documentId: string;
      key: string;
      value: string;
    } | null>;
    key_features: Array<{
      __typename?: 'KeyFeature';
      documentId: string;
      feature?: string | null;
    } | null>;
    inventory?: {
      __typename?: 'Inventory';
      documentId: string;
      melbourne: number;
      sydney: number;
      brisbane: number;
    } | null;
    shipping?: {
      __typename?: 'Shipping';
      documentId: string;
      height?: number | null;
      width?: number | null;
      length?: number | null;
      weight?: number | null;
    } | null;
    madeBy?: { __typename?: 'UsersPermissionsUser'; email: string } | null;
    improvedBy?: { __typename?: 'UsersPermissionsUser'; email: string } | null;
  } | null>;
};

export type ProductQueryVariables = Exact<{
  documentId: Scalars['ID']['input'];
}>;

export type ProductQuery = {
  __typename?: 'Query';
  product?: {
    __typename?: 'Product';
    documentId: string;
    name: string;
    description?: string | null;
    handle: string;
    product_type?: string | null;
    model: string;
    odoo_product_id: string;
    odoo_product_name?: string | null;
    maxQuantity?: number | null;
    createdAt?: any | null;
    updatedAt?: any | null;
    releasedAt?: any | null;
    categories: Array<{
      __typename?: 'Category';
      title: string;
      slug: string;
      image: {
        __typename?: 'UploadFile';
        documentId: string;
        name: string;
        alternativeText?: string | null;
        width?: number | null;
        height?: number | null;
        mime: string;
        url: string;
      };
    } | null>;
    brand?: {
      __typename?: 'Brand';
      documentId: string;
      name: string;
      url: string;
      image: {
        __typename?: 'UploadFile';
        documentId: string;
        name: string;
        alternativeText?: string | null;
        width?: number | null;
        height?: number | null;
        mime: string;
        url: string;
      };
    } | null;
    collections: Array<{
      __typename?: 'Collection';
      documentId: string;
      title?: string | null;
    } | null>;
    price_lists: Array<{
      __typename?: 'Price';
      documentId: string;
      price?: number | null;
      comparePrice?: number | null;
      min_quantity?: number | null;
      max_quantity?: number | null;
      user_level?: string | null;
    } | null>;
    files: Array<{
      __typename?: 'UploadFile';
      documentId: string;
      name: string;
      alternativeText?: string | null;
      width?: number | null;
      height?: number | null;
      mime: string;
      url: string;
    } | null>;
    images: Array<{
      __typename?: 'UploadFile';
      documentId: string;
      name: string;
      alternativeText?: string | null;
      width?: number | null;
      height?: number | null;
      mime: string;
      url: string;
    } | null>;
    specifications: Array<{
      __typename?: 'Specification';
      documentId: string;
      key: string;
      value: string;
    } | null>;
    key_features: Array<{
      __typename?: 'KeyFeature';
      documentId: string;
      feature?: string | null;
    } | null>;
    inventory?: {
      __typename?: 'Inventory';
      documentId: string;
      melbourne: number;
      sydney: number;
      brisbane: number;
    } | null;
    shipping?: {
      __typename?: 'Shipping';
      documentId: string;
      height?: number | null;
      width?: number | null;
      length?: number | null;
      weight?: number | null;
    } | null;
  } | null;
};

export type BrandsQueryVariables = Exact<{
  filters?: InputMaybe<BrandFiltersInput>;
}>;

export type BrandsQuery = {
  __typename?: 'Query';
  brands: Array<{
    __typename?: 'Brand';
    documentId: string;
    name: string;
    url: string;
    image: {
      __typename?: 'UploadFile';
      name: string;
      alternativeText?: string | null;
      mime: string;
      url: string;
      width?: number | null;
      height?: number | null;
    };
  } | null>;
};

export type CategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type CategoriesQuery = {
  __typename?: 'Query';
  categories: Array<{
    __typename?: 'Category';
    documentId: string;
    title: string;
    slug: string;
    image: {
      __typename?: 'UploadFile';
      name: string;
      alternativeText?: string | null;
      mime: string;
      url: string;
      width?: number | null;
      height?: number | null;
    };
  } | null>;
};

export type SpecificationsQueryVariables = Exact<{ [key: string]: never }>;

export type SpecificationsQuery = {
  __typename?: 'Query';
  specifications: Array<{
    __typename?: 'Specification';
    documentId: string;
    key: string;
    value: string;
  } | null>;
};

export type CustomProductCreateMutationVariables = Exact<{
  data: ProductInput;
}>;

export type CustomProductCreateMutation = {
  __typename?: 'Mutation';
  customProductCreate?: {
    __typename?: 'Product';
    documentId: string;
    name: string;
    model: string;
    description?: string | null;
    handle: string;
    odoo_product_id: string;
    odoo_product_name?: string | null;
    maxQuantity?: number | null;
    createdAt?: any | null;
    updatedAt?: any | null;
    releasedAt?: any | null;
    brand?: {
      __typename?: 'Brand';
      name: string;
      url: string;
      image: {
        __typename?: 'UploadFile';
        documentId: string;
        name: string;
        alternativeText?: string | null;
        width?: number | null;
        height?: number | null;
        mime: string;
        url: string;
      };
    } | null;
    collections: Array<{
      __typename?: 'Collection';
      documentId: string;
      title?: string | null;
    } | null>;
    inventory?: {
      __typename?: 'Inventory';
      documentId: string;
      melbourne: number;
      sydney: number;
      brisbane: number;
    } | null;
    price_lists: Array<{
      __typename?: 'Price';
      documentId: string;
      price?: number | null;
      comparePrice?: number | null;
      min_quantity?: number | null;
      max_quantity?: number | null;
      user_level?: string | null;
    } | null>;
    files: Array<{
      __typename?: 'UploadFile';
      documentId: string;
      mime: string;
      name: string;
      url: string;
      alternativeText?: string | null;
    } | null>;
    images: Array<{
      __typename?: 'UploadFile';
      documentId: string;
      mime: string;
      name: string;
      url: string;
      alternativeText?: string | null;
    } | null>;
    specifications: Array<{
      __typename?: 'Specification';
      documentId: string;
      key: string;
      value: string;
    } | null>;
    key_features: Array<{
      __typename?: 'KeyFeature';
      documentId: string;
      feature?: string | null;
    } | null>;
    shipping?: {
      __typename?: 'Shipping';
      documentId: string;
      width?: number | null;
      height?: number | null;
      weight?: number | null;
      length?: number | null;
    } | null;
  } | null;
};

export type CustomProductUpdateMutationVariables = Exact<{
  documentId: Scalars['ID']['input'];
  data: ProductInput;
}>;

export type CustomProductUpdateMutation = {
  __typename?: 'Mutation';
  customProductUpdate?: {
    __typename?: 'Product';
    documentId: string;
    name: string;
    model: string;
    description?: string | null;
    handle: string;
    odoo_product_id: string;
    odoo_product_name?: string | null;
    maxQuantity?: number | null;
    createdAt?: any | null;
    updatedAt?: any | null;
    releasedAt?: any | null;
    brand?: {
      __typename?: 'Brand';
      name: string;
      url: string;
      image: {
        __typename?: 'UploadFile';
        documentId: string;
        name: string;
        alternativeText?: string | null;
        width?: number | null;
        height?: number | null;
        mime: string;
        url: string;
      };
    } | null;
    collections: Array<{
      __typename?: 'Collection';
      documentId: string;
      title?: string | null;
    } | null>;
    inventory?: {
      __typename?: 'Inventory';
      documentId: string;
      melbourne: number;
      sydney: number;
      brisbane: number;
    } | null;
    price_lists: Array<{
      __typename?: 'Price';
      documentId: string;
      price?: number | null;
      comparePrice?: number | null;
      min_quantity?: number | null;
      max_quantity?: number | null;
      user_level?: string | null;
    } | null>;
    files: Array<{
      __typename?: 'UploadFile';
      documentId: string;
      mime: string;
      name: string;
      url: string;
      alternativeText?: string | null;
    } | null>;
    images: Array<{
      __typename?: 'UploadFile';
      documentId: string;
      mime: string;
      name: string;
      url: string;
      alternativeText?: string | null;
    } | null>;
    specifications: Array<{
      __typename?: 'Specification';
      documentId: string;
      key: string;
      value: string;
    } | null>;
    key_features: Array<{
      __typename?: 'KeyFeature';
      documentId: string;
      feature?: string | null;
    } | null>;
    shipping?: {
      __typename?: 'Shipping';
      documentId: string;
      width?: number | null;
      height?: number | null;
      weight?: number | null;
      length?: number | null;
    } | null;
    improvedBy?: { __typename?: 'UsersPermissionsUser'; email: string } | null;
    madeBy?: { __typename?: 'UsersPermissionsUser'; email: string } | null;
  } | null;
};

export type DeleteProductMutationVariables = Exact<{
  documentId: Scalars['ID']['input'];
}>;

export type DeleteProductMutation = {
  __typename?: 'Mutation';
  deleteProduct?: {
    __typename?: 'DeleteMutationResponse';
    documentId: string;
  } | null;
};

export type CreatePriceMutationVariables = Exact<{
  data: PriceInput;
}>;

export type CreatePriceMutation = {
  __typename?: 'Mutation';
  createPrice?: {
    __typename?: 'Price';
    documentId: string;
    comparePrice?: number | null;
    price?: number | null;
    min_quantity?: number | null;
    max_quantity?: number | null;
    user_level?: string | null;
    createdAt?: any | null;
    updatedAt?: any | null;
  } | null;
};

export type UpdatePriceMutationVariables = Exact<{
  documentId: Scalars['ID']['input'];
  data: PriceInput;
}>;

export type UpdatePriceMutation = {
  __typename?: 'Mutation';
  updatePrice?: {
    __typename?: 'Price';
    documentId: string;
    comparePrice?: number | null;
    price?: number | null;
    min_quantity?: number | null;
    max_quantity?: number | null;
    user_level?: string | null;
    createdAt?: any | null;
    updatedAt?: any | null;
  } | null;
};

export type DeletePriceMutationVariables = Exact<{
  documentId: Scalars['ID']['input'];
}>;

export type DeletePriceMutation = {
  __typename?: 'Mutation';
  deletePrice?: {
    __typename?: 'DeleteMutationResponse';
    documentId: string;
  } | null;
};

export type CreateInventoryMutationVariables = Exact<{
  data: InventoryInput;
}>;

export type CreateInventoryMutation = {
  __typename?: 'Mutation';
  createInventory?: {
    __typename?: 'Inventory';
    documentId: string;
    melbourne: number;
    sydney: number;
    brisbane: number;
    createdAt?: any | null;
    updatedAt?: any | null;
  } | null;
};

export type UpdateInventoryMutationVariables = Exact<{
  documentId: Scalars['ID']['input'];
  data: InventoryInput;
}>;

export type UpdateInventoryMutation = {
  __typename?: 'Mutation';
  updateInventory?: {
    __typename?: 'Inventory';
    documentId: string;
    melbourne: number;
    sydney: number;
    brisbane: number;
    createdAt?: any | null;
    updatedAt?: any | null;
  } | null;
};

export type DeleteInventoryMutationVariables = Exact<{
  documentId: Scalars['ID']['input'];
}>;

export type DeleteInventoryMutation = {
  __typename?: 'Mutation';
  deleteInventory?: {
    __typename?: 'DeleteMutationResponse';
    documentId: string;
  } | null;
};

export type CreateSpecificationMutationVariables = Exact<{
  data: SpecificationInput;
}>;

export type CreateSpecificationMutation = {
  __typename?: 'Mutation';
  createSpecification?: {
    __typename?: 'Specification';
    documentId: string;
    key: string;
    value: string;
    createdAt?: any | null;
    updatedAt?: any | null;
  } | null;
};

export type UpdateSpecificationMutationVariables = Exact<{
  documentId: Scalars['ID']['input'];
  data: SpecificationInput;
}>;

export type UpdateSpecificationMutation = {
  __typename?: 'Mutation';
  updateSpecification?: {
    __typename?: 'Specification';
    documentId: string;
    key: string;
    value: string;
    createdAt?: any | null;
    updatedAt?: any | null;
  } | null;
};

export type DeleteSpecificationMutationVariables = Exact<{
  documentId: Scalars['ID']['input'];
}>;

export type DeleteSpecificationMutation = {
  __typename?: 'Mutation';
  deleteSpecification?: {
    __typename?: 'DeleteMutationResponse';
    documentId: string;
  } | null;
};

export type CreateKeyFeatureMutationVariables = Exact<{
  data: KeyFeatureInput;
}>;

export type CreateKeyFeatureMutation = {
  __typename?: 'Mutation';
  createKeyFeature?: {
    __typename?: 'KeyFeature';
    documentId: string;
    feature?: string | null;
    createdAt?: any | null;
    updatedAt?: any | null;
  } | null;
};

export type UpdateKeyFeatureMutationVariables = Exact<{
  documentId: Scalars['ID']['input'];
  data: KeyFeatureInput;
}>;

export type UpdateKeyFeatureMutation = {
  __typename?: 'Mutation';
  updateKeyFeature?: {
    __typename?: 'KeyFeature';
    documentId: string;
    feature?: string | null;
    createdAt?: any | null;
    updatedAt?: any | null;
  } | null;
};

export type DeleteKeyFeatureMutationVariables = Exact<{
  documentId: Scalars['ID']['input'];
}>;

export type DeleteKeyFeatureMutation = {
  __typename?: 'Mutation';
  deleteKeyFeature?: {
    __typename?: 'DeleteMutationResponse';
    documentId: string;
  } | null;
};

export type CreateShippingMutationVariables = Exact<{
  data: ShippingInput;
}>;

export type CreateShippingMutation = {
  __typename?: 'Mutation';
  createShipping?: {
    __typename?: 'Shipping';
    documentId: string;
    width?: number | null;
    height?: number | null;
    weight?: number | null;
    length?: number | null;
    createdAt?: any | null;
    updatedAt?: any | null;
  } | null;
};

export type UpdateShippingMutationVariables = Exact<{
  documentId: Scalars['ID']['input'];
  data: ShippingInput;
}>;

export type UpdateShippingMutation = {
  __typename?: 'Mutation';
  updateShipping?: {
    __typename?: 'Shipping';
    documentId: string;
    width?: number | null;
    height?: number | null;
    weight?: number | null;
    length?: number | null;
    createdAt?: any | null;
    updatedAt?: any | null;
  } | null;
};

export type DeleteShippingMutationVariables = Exact<{
  documentId: Scalars['ID']['input'];
}>;

export type DeleteShippingMutation = {
  __typename?: 'Mutation';
  deleteShipping?: {
    __typename?: 'DeleteMutationResponse';
    documentId: string;
  } | null;
};

export type UsersPermissionsUserQueryVariables = Exact<{
  documentId: Scalars['ID']['input'];
}>;

export type UsersPermissionsUserQuery = {
  __typename?: 'Query';
  usersPermissionsUser?: {
    __typename?: 'UsersPermissionsUser';
    documentId: string;
    email: string;
    account_status?: Enum_Userspermissionsuser_Account_Status | null;
    blocked?: boolean | null;
    username: string;
    business_name?: string | null;
    business_number?: string | null;
    business_type?: string | null;
    phone?: string | null;
    role?: { __typename?: 'UsersPermissionsRole'; name: string } | null;
    carts: Array<{
      __typename?: 'Cart';
      documentId: string;
      quantity: number;
      createdAt?: any | null;
      updatedAt?: any | null;
      product?: {
        __typename?: 'Product';
        documentId: string;
        name: string;
        model: string;
        odoo_product_id: string;
        odoo_product_name?: string | null;
        price_lists: Array<{
          __typename?: 'Price';
          price?: number | null;
          comparePrice?: number | null;
          min_quantity?: number | null;
          max_quantity?: number | null;
          user_level?: string | null;
        } | null>;
        inventory?: {
          __typename?: 'Inventory';
          documentId: string;
          melbourne: number;
          sydney: number;
          brisbane: number;
          createdAt?: any | null;
          updatedAt?: any | null;
        } | null;
        shipping?: {
          __typename?: 'Shipping';
          height?: number | null;
          length?: number | null;
          weight?: number | null;
          width?: number | null;
        } | null;
        images: Array<{
          __typename?: 'UploadFile';
          url: string;
          alternativeText?: string | null;
          width?: number | null;
          height?: number | null;
        } | null>;
      } | null;
    } | null>;
    addresses: Array<{
      __typename?: 'Address';
      documentId: string;
      street1?: string | null;
      street2?: string | null;
      state?: string | null;
      city?: string | null;
      zip_code?: string | null;
      country?: string | null;
      phone?: string | null;
      isActive?: boolean | null;
      createdAt?: any | null;
      updatedAt?: any | null;
      name?: {
        __typename?: 'ComponentElementsName';
        first_name?: string | null;
        middle_name?: string | null;
        last_name?: string | null;
      } | null;
    } | null>;
    account_detail?: {
      __typename?: 'AccountDetail';
      phone?: string | null;
      level?: Enum_Accountdetail_Level | null;
      odoo_user_id?: string | null;
      name?: {
        __typename?: 'ComponentElementsName';
        first_name?: string | null;
        middle_name?: string | null;
        last_name?: string | null;
      } | null;
      shipping_addresses: Array<{
        __typename?: 'Address';
        documentId: string;
        phone?: string | null;
        street1?: string | null;
        street2?: string | null;
        city?: string | null;
        state?: string | null;
        zip_code?: string | null;
        country?: string | null;
        isActive?: boolean | null;
        name?: {
          __typename?: 'ComponentElementsName';
          first_name?: string | null;
          middle_name?: string | null;
          last_name?: string | null;
        } | null;
      } | null>;
      warehouse_location?: {
        __typename?: 'ComponentElementsWarehouseLocation';
        title?: string | null;
        address?: {
          __typename?: 'ComponentElementsAddress';
          city?: string | null;
          street?: string | null;
          suburb?: string | null;
          state_territory?: string | null;
          postcode?: string | null;
          country?: string | null;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type UsersPermissionsUsersQueryVariables = Exact<{
  [key: string]: never;
}>;

export type UsersPermissionsUsersQuery = {
  __typename?: 'Query';
  usersPermissionsUsers: Array<{
    __typename?: 'UsersPermissionsUser';
    documentId: string;
    username: string;
    email: string;
    provider?: string | null;
    blocked?: boolean | null;
    account_status?: Enum_Userspermissionsuser_Account_Status | null;
    business_name?: string | null;
    business_number?: string | null;
    business_type?: string | null;
    phone?: string | null;
    addresses: Array<{
      __typename?: 'Address';
      documentId: string;
      street1?: string | null;
      street2?: string | null;
      city?: string | null;
      state?: string | null;
      zip_code?: string | null;
      country?: string | null;
      isActive?: boolean | null;
      phone?: string | null;
    } | null>;
    account_detail?: {
      __typename?: 'AccountDetail';
      documentId: string;
      level?: Enum_Accountdetail_Level | null;
      phone?: string | null;
      name?: {
        __typename?: 'ComponentElementsName';
        first_name?: string | null;
        middle_name?: string | null;
        last_name?: string | null;
      } | null;
    } | null;
    role?: { __typename?: 'UsersPermissionsRole'; name: string } | null;
  } | null>;
};

export type LoginMutationVariables = Exact<{
  input: UsersPermissionsLoginInput;
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'UsersPermissionsLoginPayload';
    jwt?: string | null;
    user: {
      __typename?: 'UsersPermissionsMe';
      documentId: string;
      email?: string | null;
      confirmed?: boolean | null;
      blocked?: boolean | null;
      username: string;
    };
  };
};

export type RegisterUserMutationVariables = Exact<{
  data: RegisterUserInput;
}>;

export type RegisterUserMutation = {
  __typename?: 'Mutation';
  registerUser?: {
    __typename?: 'UsersPermissionsUser';
    documentId: string;
  } | null;
};

export type ApprovedUserMutationVariables = Exact<{
  data: ApprovedUserInput;
  documentId: Scalars['ID']['input'];
}>;

export type ApprovedUserMutation = {
  __typename?: 'Mutation';
  approvedUser?: {
    __typename?: 'UsersPermissionsUser';
    documentId: string;
    email: string;
  } | null;
};

export type UpdateUserMutationVariables = Exact<{
  documentId: Scalars['ID']['input'];
  data: UsersPermissionsUserInput;
}>;

export type UpdateUserMutation = {
  __typename?: 'Mutation';
  updateUser?: {
    __typename?: 'UsersPermissionsUser';
    account_status?: Enum_Userspermissionsuser_Account_Status | null;
  } | null;
};

export const AddressDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Address' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'documentId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'usersPermissionsUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'documentId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'documentId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'addresses' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'country' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'isActive' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'mobile' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'odoo_address_id' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdAt' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'street1' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'street2' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'zip_code' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AddressQuery, AddressQueryVariables>;
export const CreateAddressDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateAddress' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'AddressInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createAddress' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateAddressMutation,
  CreateAddressMutationVariables
>;
export const DeleteAddressDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteAddress' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'documentId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteAddress' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'documentId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'documentId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteAddressMutation,
  DeleteAddressMutationVariables
>;
export const UpdateAddressDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateAddress' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'AddressInput' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'documentId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateAddress' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'documentId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'documentId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateAddressMutation,
  UpdateAddressMutationVariables
>;
export const UpdateAddressIsActiveDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateAddressIsActive' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'documentId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'AddressInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateAddress' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'documentId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'documentId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateAddressIsActiveMutation,
  UpdateAddressIsActiveMutationVariables
>;
export const CartsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Carts' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'filters' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'CartFiltersInput' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'pagination' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'PaginationArg' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'carts' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filters' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'filters' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pagination' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'pagination' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'product' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'model' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'odoo_product_id' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'odoo_product_name' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'price_lists' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'price' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'comparePrice' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'min_quantity' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'max_quantity' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'user_level' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'inventory' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'documentId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'melbourne' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'sydney' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'brisbane' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'createdAt' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'updatedAt' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'images' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'url' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'alternativeText' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'width' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'height' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'shipping' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'weight' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'height' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'width' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'length' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'documentId' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'username' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CartsQuery, CartsQueryVariables>;
export const GetCheckoutUserDataDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCheckoutUserData' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'documentId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'usersPermissionsUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'documentId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'documentId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'carts' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'quantity' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'product' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'documentId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'inventory' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'documentId' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'melbourne' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'sydney' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'brisbane' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'createdAt' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'updatedAt' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'shipping' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'height' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'length' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'weight' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'width' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'addresses' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'street1' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'street2' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'zip_code' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'country' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'isActive' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'odoo_address_id' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'mobile' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'updatedAt' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'creditCards' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'brand' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'expMonth' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'expYear' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'isDefault' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'last4Char' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'publishedAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'stripePaymentMethodID' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetCheckoutUserDataQuery,
  GetCheckoutUserDataQueryVariables
>;
export const CreateCartDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateCart' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CartInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createCart' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'product' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'odoo_product_id' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'odoo_product_name' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'model' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'price_lists' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'price' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'comparePrice' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'min_quantity' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'max_quantity' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'user_level' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'inventory' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'documentId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'melbourne' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'sydney' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'brisbane' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'createdAt' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'updatedAt' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'images' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'url' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'alternativeText' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'width' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'height' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'username' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateCartMutation, CreateCartMutationVariables>;
export const UpdateCartDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateCart' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'documentId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CartInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateCart' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'documentId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'documentId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'product' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'model' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'odoo_product_id' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'odoo_product_name' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'price_lists' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'price' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'comparePrice' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'min_quantity' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'max_quantity' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'user_level' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'inventory' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'documentId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'melbourne' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'sydney' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'brisbane' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'createdAt' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'updatedAt' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'images' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'url' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'alternativeText' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'width' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'height' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'username' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateCartMutation, UpdateCartMutationVariables>;
export const DeleteCartDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteCart' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'documentId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteCart' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'documentId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'documentId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteCartMutation, DeleteCartMutationVariables>;
export const UpdateQuantityDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateQuantity' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'documentId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CartInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateCart' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'documentId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'documentId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateQuantityMutation,
  UpdateQuantityMutationVariables
>;
export const CollectionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Collections' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'filters' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'CollectionFiltersInput' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'collections' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filters' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'filters' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'handle' } },
                { kind: 'Field', name: { kind: 'Name', value: 'sortOrder' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'productCount' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'image' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'alternativeText' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CollectionsQuery, CollectionsQueryVariables>;
export const CollectionsWithProductsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'CollectionsWithProducts' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'collectionsFilters' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'CollectionFiltersInput' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'productsFilters' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'ProductFiltersInput' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'productsPagination' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'PaginationArg' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'collections' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filters' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'collectionsFilters' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'handle' } },
                { kind: 'Field', name: { kind: 'Name', value: 'sortOrder' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'productCount' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'image' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'alternativeText' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'productFilters' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'handle' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'products' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'filters' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'productsFilters' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'pagination' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'productsPagination' },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'description' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'handle' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'product_type' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'model' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'odoo_product_id' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'odoo_product_name' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'categories' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'title' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'slug' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'image' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'documentId' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'alternativeText',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'width' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'height' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'mime' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'url' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'brand' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'documentId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'url' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'image' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'documentId' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'alternativeText',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'width' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'height' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'mime' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'url' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'collections' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'documentId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'title' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'price_lists' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'documentId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'price' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'comparePrice' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'min_quantity' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'max_quantity' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'user_level' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'files' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'documentId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'alternativeText' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'width' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'height' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'mime' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'url' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'images' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'documentId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'alternativeText' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'width' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'height' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'mime' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'url' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'specifications' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'documentId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'key' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'value' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'key_features' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'documentId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'feature' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'inventory' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'documentId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'melbourne' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'sydney' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'brisbane' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'shipping' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'documentId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'height' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'width' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'length' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'weight' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'maxQuantity' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'madeBy' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'email' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'improvedBy' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'email' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'updatedAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'releasedAt' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CollectionsWithProductsQuery,
  CollectionsWithProductsQueryVariables
>;
export const CreateCreditCardDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateCreditCard' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreditCardInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createCreditCard' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateCreditCardMutation,
  CreateCreditCardMutationVariables
>;
export const UpdateCreditCardDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateCreditCard' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreditCardInput' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'documentId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateCreditCard' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'documentId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'documentId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateCreditCardMutation,
  UpdateCreditCardMutationVariables
>;
export const DeleteCreditCardDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteCreditCard' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'documentId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteCreditCard' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'documentId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'documentId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteCreditCardMutation,
  DeleteCreditCardMutationVariables
>;
export const UploadFileDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'UploadFile' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'documentId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'uploadFile' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'documentId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'documentId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'alternativeText' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'caption' } },
                { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                { kind: 'Field', name: { kind: 'Name', value: 'height' } },
                { kind: 'Field', name: { kind: 'Name', value: 'formats' } },
                { kind: 'Field', name: { kind: 'Name', value: 'hash' } },
                { kind: 'Field', name: { kind: 'Name', value: 'ext' } },
                { kind: 'Field', name: { kind: 'Name', value: 'mime' } },
                { kind: 'Field', name: { kind: 'Name', value: 'size' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                { kind: 'Field', name: { kind: 'Name', value: 'previewUrl' } },
                { kind: 'Field', name: { kind: 'Name', value: 'provider' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'provider_metadata' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'publishedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UploadFileQuery, UploadFileQueryVariables>;
export const FilesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Files' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'filters' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'UploadFileFiltersInput' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sort' } },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'files' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filters' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'filters' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sort' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'sort' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'alternativeText' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'caption' } },
                { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                { kind: 'Field', name: { kind: 'Name', value: 'height' } },
                { kind: 'Field', name: { kind: 'Name', value: 'formats' } },
                { kind: 'Field', name: { kind: 'Name', value: 'hash' } },
                { kind: 'Field', name: { kind: 'Name', value: 'ext' } },
                { kind: 'Field', name: { kind: 'Name', value: 'mime' } },
                { kind: 'Field', name: { kind: 'Name', value: 'size' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                { kind: 'Field', name: { kind: 'Name', value: 'previewUrl' } },
                { kind: 'Field', name: { kind: 'Name', value: 'provider' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'publishedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FilesQuery, FilesQueryVariables>;
export const UploadFilesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'UploadFiles' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'filters' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'UploadFileFiltersInput' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'uploadFiles' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filters' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'filters' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'alternativeText' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'caption' } },
                { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                { kind: 'Field', name: { kind: 'Name', value: 'height' } },
                { kind: 'Field', name: { kind: 'Name', value: 'formats' } },
                { kind: 'Field', name: { kind: 'Name', value: 'hash' } },
                { kind: 'Field', name: { kind: 'Name', value: 'ext' } },
                { kind: 'Field', name: { kind: 'Name', value: 'mime' } },
                { kind: 'Field', name: { kind: 'Name', value: 'size' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                { kind: 'Field', name: { kind: 'Name', value: 'previewUrl' } },
                { kind: 'Field', name: { kind: 'Name', value: 'provider' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'provider_metadata' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UploadFilesQuery, UploadFilesQueryVariables>;
export const OrdersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Orders' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'filters' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'OrderFiltersInput' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'orders' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filters' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'filters' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'orderNumber' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'business_name' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'total' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'amount' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'currency' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'paymentStatus' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'fulfillmentStatus' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'paymentMethod' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'shippingType' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'deliveryStatus' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<OrdersQuery, OrdersQueryVariables>;
export const CreateOrderDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateOrder' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'OrderInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createOrder' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateOrderMutation, CreateOrderMutationVariables>;
export const PagesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Pages' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'pages' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PagesQuery, PagesQueryVariables>;
export const GetPageDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPage' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getPage' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'slug' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'slug' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'sections' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'InlineFragment',
                        typeCondition: {
                          kind: 'NamedType',
                          name: {
                            kind: 'Name',
                            value: 'ComponentSectionsWarehouseLocations',
                          },
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'heading' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'sub_heading' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'locations' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'address' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'warehouse_time',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'office_time',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'google_maps_link',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'InlineFragment',
                        typeCondition: {
                          kind: 'NamedType',
                          name: {
                            kind: 'Name',
                            value: 'ComponentSectionsContactUs',
                          },
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'heading' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'description' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'button_title' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'background_image' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'alternativeText',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'url' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'InlineFragment',
                        typeCondition: {
                          kind: 'NamedType',
                          name: {
                            kind: 'Name',
                            value: 'ComponentSectionsContactDetails',
                          },
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'left_heading' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'left_sub_heading' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'right_heading' },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'right_sub_heading',
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'InlineFragment',
                        typeCondition: {
                          kind: 'NamedType',
                          name: {
                            kind: 'Name',
                            value: 'ComponentSectionsAbout',
                          },
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'heading' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'sub_heading' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'description' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'button_title' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'background_image' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'alternativeText',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'url' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'InlineFragment',
                        typeCondition: {
                          kind: 'NamedType',
                          name: {
                            kind: 'Name',
                            value: 'ComponentSectionsImageSlider',
                          },
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'animation_duration',
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'display_button' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'slides' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'title' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'description',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'link' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'image' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'name' },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'alternativeText',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'url' },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'type' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'InlineFragment',
                        typeCondition: {
                          kind: 'NamedType',
                          name: {
                            kind: 'Name',
                            value: 'ComponentFormNewsletter',
                          },
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'heading' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'sub_heading' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'inputs' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'label' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'type' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'placeholder',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'required' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'sub_text' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'button_title' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'image' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'alternativeText',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'url' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'InlineFragment',
                        typeCondition: {
                          kind: 'NamedType',
                          name: { kind: 'Name', value: 'ComponentFormInquiry' },
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'heading' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'button_title' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'inputs' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'label' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'type' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'placeholder',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'required' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'InlineFragment',
                        typeCondition: {
                          kind: 'NamedType',
                          name: { kind: 'Name', value: 'Error' },
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'code' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'message' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'publishedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetPageQuery, GetPageQueryVariables>;
export const GetStoreProductDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetStoreProduct' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'handle' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getStoreProduct' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'handle' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'handle' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'model' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'handle' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'odoo_product_id' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'odoo_product_name' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'brand' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'image' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'documentId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'alternativeText' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'width' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'height' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'mime' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'url' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'inventory' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'melbourne' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sydney' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'brisbane' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'shipping' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'height' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'weight' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'length' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'tags' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'tag' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'collections' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'price_lists' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'comparePrice' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'min_quantity' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'max_quantity' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'user_level' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'files' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'mime' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'alternativeText' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'images' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'mime' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'alternativeText' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'specifications' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'key_features' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'feature' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'maxQuantity' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'releasedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetStoreProductQuery,
  GetStoreProductQueryVariables
>;
export const ProductsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Products' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'filters' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'ProductFiltersInput' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'pagination' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'PaginationArg' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sort' } },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'products' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filters' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'filters' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pagination' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'pagination' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sort' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'sort' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'handle' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'product_type' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'model' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'odoo_product_id' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'odoo_product_name' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'categories' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'image' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'documentId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'alternativeText' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'width' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'height' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'mime' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'url' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'brand' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'image' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'documentId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'alternativeText' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'width' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'height' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'mime' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'url' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'collections' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'price_lists' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'comparePrice' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'min_quantity' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'max_quantity' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'user_level' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'files' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'alternativeText' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'height' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'mime' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'images' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'alternativeText' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'height' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'mime' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'specifications' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'key_features' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'feature' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'inventory' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'melbourne' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sydney' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'brisbane' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'shipping' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'height' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'length' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'weight' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'maxQuantity' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'madeBy' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'improvedBy' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'releasedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProductsQuery, ProductsQueryVariables>;
export const ProductDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Product' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'documentId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'product' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'documentId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'documentId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'handle' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'product_type' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'model' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'odoo_product_id' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'odoo_product_name' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'categories' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'image' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'documentId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'alternativeText' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'width' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'height' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'mime' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'url' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'brand' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'image' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'documentId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'alternativeText' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'width' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'height' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'mime' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'url' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'collections' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'price_lists' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'comparePrice' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'min_quantity' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'max_quantity' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'user_level' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'files' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'alternativeText' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'height' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'mime' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'images' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'alternativeText' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'height' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'mime' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'specifications' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'key_features' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'feature' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'inventory' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'melbourne' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sydney' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'brisbane' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'shipping' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'height' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'length' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'weight' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'maxQuantity' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'releasedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProductQuery, ProductQueryVariables>;
export const BrandsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Brands' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'filters' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'BrandFiltersInput' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'brands' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filters' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'filters' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'image' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'alternativeText' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'mime' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'height' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<BrandsQuery, BrandsQueryVariables>;
export const CategoriesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Categories' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'categories' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'image' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'alternativeText' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'mime' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'height' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CategoriesQuery, CategoriesQueryVariables>;
export const SpecificationsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Specifications' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'specifications' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SpecificationsQuery, SpecificationsQueryVariables>;
export const CustomProductCreateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CustomProductCreate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ProductInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'customProductCreate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'model' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'handle' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'odoo_product_id' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'odoo_product_name' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'brand' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'image' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'documentId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'alternativeText' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'width' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'height' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'mime' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'url' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'collections' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'inventory' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'melbourne' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sydney' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'brisbane' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'price_lists' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'comparePrice' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'min_quantity' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'max_quantity' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'user_level' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'files' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'mime' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'alternativeText' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'images' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'mime' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'alternativeText' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'specifications' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'key_features' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'feature' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'shipping' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'height' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'weight' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'length' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'maxQuantity' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'releasedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CustomProductCreateMutation,
  CustomProductCreateMutationVariables
>;
export const CustomProductUpdateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'customProductUpdate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'documentId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ProductInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'customProductUpdate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'documentId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'documentId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'model' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'handle' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'odoo_product_id' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'odoo_product_name' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'brand' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'image' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'documentId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'alternativeText' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'width' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'height' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'mime' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'url' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'collections' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'inventory' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'melbourne' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sydney' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'brisbane' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'price_lists' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'comparePrice' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'min_quantity' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'max_quantity' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'user_level' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'files' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'mime' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'alternativeText' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'images' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'mime' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'alternativeText' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'specifications' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'key_features' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'feature' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'shipping' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'height' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'weight' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'length' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'maxQuantity' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'improvedBy' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'madeBy' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'releasedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CustomProductUpdateMutation,
  CustomProductUpdateMutationVariables
>;
export const DeleteProductDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteProduct' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'documentId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteProduct' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'documentId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'documentId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteProductMutation,
  DeleteProductMutationVariables
>;
export const CreatePriceDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreatePrice' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'PriceInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createPrice' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'comparePrice' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'min_quantity' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'max_quantity' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'user_level' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreatePriceMutation, CreatePriceMutationVariables>;
export const UpdatePriceDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdatePrice' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'documentId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'PriceInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updatePrice' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'documentId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'documentId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'comparePrice' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'min_quantity' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'max_quantity' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'user_level' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdatePriceMutation, UpdatePriceMutationVariables>;
export const DeletePriceDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeletePrice' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'documentId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deletePrice' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'documentId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'documentId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeletePriceMutation, DeletePriceMutationVariables>;
export const CreateInventoryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateInventory' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'InventoryInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createInventory' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'melbourne' } },
                { kind: 'Field', name: { kind: 'Name', value: 'sydney' } },
                { kind: 'Field', name: { kind: 'Name', value: 'brisbane' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateInventoryMutation,
  CreateInventoryMutationVariables
>;
export const UpdateInventoryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateInventory' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'documentId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'InventoryInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateInventory' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'documentId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'documentId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'melbourne' } },
                { kind: 'Field', name: { kind: 'Name', value: 'sydney' } },
                { kind: 'Field', name: { kind: 'Name', value: 'brisbane' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateInventoryMutation,
  UpdateInventoryMutationVariables
>;
export const DeleteInventoryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteInventory' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'documentId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteInventory' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'documentId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'documentId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteInventoryMutation,
  DeleteInventoryMutationVariables
>;
export const CreateSpecificationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateSpecification' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'SpecificationInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createSpecification' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateSpecificationMutation,
  CreateSpecificationMutationVariables
>;
export const UpdateSpecificationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateSpecification' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'documentId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'SpecificationInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateSpecification' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'documentId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'documentId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateSpecificationMutation,
  UpdateSpecificationMutationVariables
>;
export const DeleteSpecificationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteSpecification' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'documentId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteSpecification' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'documentId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'documentId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteSpecificationMutation,
  DeleteSpecificationMutationVariables
>;
export const CreateKeyFeatureDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateKeyFeature' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'KeyFeatureInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createKeyFeature' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'feature' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateKeyFeatureMutation,
  CreateKeyFeatureMutationVariables
>;
export const UpdateKeyFeatureDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateKeyFeature' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'documentId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'KeyFeatureInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateKeyFeature' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'documentId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'documentId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'feature' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateKeyFeatureMutation,
  UpdateKeyFeatureMutationVariables
>;
export const DeleteKeyFeatureDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteKeyFeature' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'documentId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteKeyFeature' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'documentId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'documentId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteKeyFeatureMutation,
  DeleteKeyFeatureMutationVariables
>;
export const CreateShippingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateShipping' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ShippingInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createShipping' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                { kind: 'Field', name: { kind: 'Name', value: 'height' } },
                { kind: 'Field', name: { kind: 'Name', value: 'weight' } },
                { kind: 'Field', name: { kind: 'Name', value: 'length' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateShippingMutation,
  CreateShippingMutationVariables
>;
export const UpdateShippingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateShipping' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'documentId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ShippingInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateShipping' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'documentId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'documentId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                { kind: 'Field', name: { kind: 'Name', value: 'height' } },
                { kind: 'Field', name: { kind: 'Name', value: 'weight' } },
                { kind: 'Field', name: { kind: 'Name', value: 'length' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateShippingMutation,
  UpdateShippingMutationVariables
>;
export const DeleteShippingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteShipping' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'documentId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteShipping' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'documentId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'documentId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteShippingMutation,
  DeleteShippingMutationVariables
>;
export const UsersPermissionsUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'UsersPermissionsUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'documentId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'usersPermissionsUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'documentId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'documentId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'account_status' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'blocked' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'business_name' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'business_number' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'business_type' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'role' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'carts' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'quantity' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'product' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'documentId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'model' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'odoo_product_id' },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'odoo_product_name',
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'price_lists' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'price' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'comparePrice',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'min_quantity',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'max_quantity',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'user_level' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'inventory' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'documentId' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'melbourne' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'sydney' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'brisbane' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'createdAt' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'updatedAt' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'shipping' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'height' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'length' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'weight' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'width' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'images' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'url' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'alternativeText',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'width' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'height' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'updatedAt' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'addresses' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'street1' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'street2' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'zip_code' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'country' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'isActive' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'name' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'first_name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'middle_name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'last_name' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'updatedAt' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'account_detail' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'level' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'odoo_user_id' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'name' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'first_name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'middle_name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'last_name' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'shipping_addresses' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'documentId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'phone' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'street1' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'street2' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'city' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'state' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'zip_code' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'country' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'isActive' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'first_name' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'middle_name',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'last_name' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'warehouse_location' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'title' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'address' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'city' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'street' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'suburb' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'state_territory',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'postcode' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'country' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UsersPermissionsUserQuery,
  UsersPermissionsUserQueryVariables
>;
export const UsersPermissionsUsersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'UsersPermissionsUsers' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'usersPermissionsUsers' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'provider' } },
                { kind: 'Field', name: { kind: 'Name', value: 'blocked' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'account_status' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'business_name' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'business_number' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'business_type' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'addresses' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'street1' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'street2' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'zip_code' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'country' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'isActive' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'account_detail' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'level' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'name' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'first_name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'middle_name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'last_name' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'role' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UsersPermissionsUsersQuery,
  UsersPermissionsUsersQueryVariables
>;
export const LoginDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Login' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UsersPermissionsLoginInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'login' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'jwt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'confirmed' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'blocked' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'username' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RegisterUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RegisterUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'RegisterUserInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'registerUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RegisterUserMutation,
  RegisterUserMutationVariables
>;
export const ApprovedUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ApprovedUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ApprovedUserInput' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'documentId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'approvedUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'documentId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'documentId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ApprovedUserMutation,
  ApprovedUserMutationVariables
>;
export const UpdateUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'documentId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UsersPermissionsUserInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'documentId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'documentId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'account_status' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
