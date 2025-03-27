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
  products?: InputMaybe<ProductFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  url?: InputMaybe<StringFilterInput>;
};

export type BrandInput = {
  image?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  products?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type CartFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CartFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  item?: InputMaybe<ComponentElementsCartItemFiltersInput>;
  not?: InputMaybe<CartFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CartFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  user?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type CartInput = {
  item?: InputMaybe<ComponentElementsCartItemInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
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

export type ComponentElementsCreditFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentElementsCreditFiltersInput>>>;
  limit?: InputMaybe<FloatFilterInput>;
  not?: InputMaybe<ComponentElementsCreditFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentElementsCreditFiltersInput>>>;
  paymentTerms?: InputMaybe<DateTimeFilterInput>;
  totalOverdue?: InputMaybe<FloatFilterInput>;
  totalReceivable?: InputMaybe<FloatFilterInput>;
};

export type ComponentElementsCreditInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  paymentTerms?: InputMaybe<Scalars['DateTime']['input']>;
  totalOverdue?: InputMaybe<Scalars['Float']['input']>;
  totalReceivable?: InputMaybe<Scalars['Float']['input']>;
};

export type ComponentElementsDeliveryOptionFiltersInput = {
  and?: InputMaybe<
    Array<InputMaybe<ComponentElementsDeliveryOptionFiltersInput>>
  >;
  eta?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentElementsDeliveryOptionFiltersInput>;
  notes?: InputMaybe<StringFilterInput>;
  or?: InputMaybe<
    Array<InputMaybe<ComponentElementsDeliveryOptionFiltersInput>>
  >;
  price?: InputMaybe<FloatFilterInput>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentElementsDeliveryOptionInput = {
  eta?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
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

export type ComponentElementsKeyFeaturesFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentElementsKeyFeaturesFiltersInput>>>;
  feature?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentElementsKeyFeaturesFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentElementsKeyFeaturesFiltersInput>>>;
};

export type ComponentElementsKeyFeaturesInput = {
  feature?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
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

export type ComponentElementsShippingFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentElementsShippingFiltersInput>>>;
  delivery_option?: InputMaybe<ComponentElementsDeliveryOptionFiltersInput>;
  not?: InputMaybe<ComponentElementsShippingFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentElementsShippingFiltersInput>>>;
  shipping_details?: InputMaybe<ComponentElementsAddressFiltersInput>;
  warehouse_location?: InputMaybe<IntFilterInput>;
};

export type ComponentElementsShippingInput = {
  delivery_option?: InputMaybe<ComponentElementsDeliveryOptionInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  shipping_details?: InputMaybe<ComponentElementsAddressInput>;
  warehouse_location?: InputMaybe<Scalars['Int']['input']>;
};

export type ComponentElementsSpecificationFiltersInput = {
  and?: InputMaybe<
    Array<InputMaybe<ComponentElementsSpecificationFiltersInput>>
  >;
  key?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentElementsSpecificationFiltersInput>;
  or?: InputMaybe<
    Array<InputMaybe<ComponentElementsSpecificationFiltersInput>>
  >;
  value?: InputMaybe<StringFilterInput>;
};

export type ComponentElementsSpecificationInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentElementsWarehouseLocationFiltersInput = {
  address?: InputMaybe<ComponentElementsAddressFiltersInput>;
  and?: InputMaybe<
    Array<InputMaybe<ComponentElementsWarehouseLocationFiltersInput>>
  >;
  not?: InputMaybe<ComponentElementsWarehouseLocationFiltersInput>;
  or?: InputMaybe<
    Array<InputMaybe<ComponentElementsWarehouseLocationFiltersInput>>
  >;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentElementsWarehouseLocationInput = {
  address?: InputMaybe<ComponentElementsAddressInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
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
}

export enum Enum_Componentelementsinput_Type {
  Number = 'NUMBER',
  Text = 'TEXT',
  Textarea = 'TEXTAREA',
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

export type FilesFiltersArgs = {
  mimeTypes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
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
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  location_code?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<InventoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<InventoryFiltersInput>>>;
  products?: InputMaybe<ProductFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  quantity?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type InventoryInput = {
  location_code?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  products?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
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

export type OrderFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<OrderFiltersInput>>>;
  cart_items?: InputMaybe<ComponentElementsCartItemFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<OrderFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<OrderFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  shipping?: InputMaybe<ComponentElementsShippingFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  user?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type OrderInput = {
  cart_items?: InputMaybe<Array<InputMaybe<ComponentElementsCartItemInput>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  shipping?: InputMaybe<ComponentElementsShippingInput>;
  user?: InputMaybe<Scalars['ID']['input']>;
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
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  max_quantity?: InputMaybe<IntFilterInput>;
  min_quantity?: InputMaybe<IntFilterInput>;
  not?: InputMaybe<PriceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PriceFiltersInput>>>;
  price?: InputMaybe<FloatFilterInput>;
  products?: InputMaybe<ProductFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  sale_price?: InputMaybe<FloatFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  user_level?: InputMaybe<StringFilterInput>;
};

export type PriceInput = {
  max_quantity?: InputMaybe<Scalars['Int']['input']>;
  min_quantity?: InputMaybe<Scalars['Int']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  products?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  sale_price?: InputMaybe<Scalars['Float']['input']>;
  user_level?: InputMaybe<Scalars['String']['input']>;
};

export type ProductFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ProductFiltersInput>>>;
  brand?: InputMaybe<BrandFiltersInput>;
  category?: InputMaybe<CategoryFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  inventories?: InputMaybe<InventoryFiltersInput>;
  key_features?: InputMaybe<ComponentElementsKeyFeaturesFiltersInput>;
  model?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ProductFiltersInput>;
  odoo_product_id?: InputMaybe<StringFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ProductFiltersInput>>>;
  price_lists?: InputMaybe<PriceFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  specification?: InputMaybe<ComponentElementsSpecificationFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  vendor?: InputMaybe<StringFilterInput>;
};

export type ProductInput = {
  brand?: InputMaybe<Scalars['ID']['input']>;
  category?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  files?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  images?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  inventories?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  key_features?: InputMaybe<
    Array<InputMaybe<ComponentElementsKeyFeaturesInput>>
  >;
  model?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  odoo_product_id?: InputMaybe<Scalars['String']['input']>;
  price_lists?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  specification?: InputMaybe<
    Array<InputMaybe<ComponentElementsSpecificationInput>>
  >;
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
  credit?: InputMaybe<ComponentElementsCreditFiltersInput>;
  documentId?: InputMaybe<IdFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsUserFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  orders?: InputMaybe<OrderFiltersInput>;
  phone?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  user_notifications?: InputMaybe<UserNotificationFiltersInput>;
  username?: InputMaybe<StringFilterInput>;
};

export type UsersPermissionsUserInput = {
  account_detail?: InputMaybe<Scalars['ID']['input']>;
  account_status?: InputMaybe<Enum_Userspermissionsuser_Account_Status>;
  addresses?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  blocked?: InputMaybe<Scalars['Boolean']['input']>;
  business_name?: InputMaybe<Scalars['String']['input']>;
  business_number?: InputMaybe<Scalars['String']['input']>;
  business_type?: InputMaybe<Scalars['String']['input']>;
  carts?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  createAccountRequest?: InputMaybe<Scalars['DateTime']['input']>;
  credit?: InputMaybe<ComponentElementsCreditInput>;
  email?: InputMaybe<Scalars['String']['input']>;
  image_logo?: InputMaybe<Scalars['ID']['input']>;
  orders?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  role?: InputMaybe<Scalars['ID']['input']>;
  user_notifications?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  username?: InputMaybe<Scalars['String']['input']>;
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
    createdAt?: any | null;
    updatedAt?: any | null;
    item: {
      __typename?: 'ComponentElementsCartItem';
      id: string;
      title: string;
      quantity: number;
      price: number;
      odoo_product_id: string;
      model: string;
      image: string;
    };
  } | null>;
};

export type CreateCartMutationVariables = Exact<{
  data: CartInput;
}>;

export type CreateCartMutation = {
  __typename?: 'Mutation';
  createCart?: {
    __typename?: 'Cart';
    documentId: string;
    createdAt?: any | null;
    updatedAt?: any | null;
    item: {
      __typename?: 'ComponentElementsCartItem';
      productID: string;
      title: string;
      quantity: number;
      price: number;
      odoo_product_id: string;
      model: string;
      image: string;
    };
    user?: { __typename?: 'UsersPermissionsUser'; username: string } | null;
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
    createdAt?: any | null;
    updatedAt?: any | null;
    item: {
      __typename?: 'ComponentElementsCartItem';
      productID: string;
      title: string;
      quantity: number;
      price: number;
      odoo_product_id: string;
      model: string;
      image: string;
    };
    user?: { __typename?: 'UsersPermissionsUser'; username: string } | null;
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

export type FilesQueryVariables = Exact<{
  filters?: InputMaybe<FilesFiltersArgs>;
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
    provider_metadata?: any | null;
  } | null>;
};

export type CreateOrderMutationVariables = Exact<{
  data: OrderInput;
}>;

export type CreateOrderMutation = {
  __typename?: 'Mutation';
  createOrder?: {
    __typename?: 'Order';
    documentId: string;
    createdAt?: any | null;
    updatedAt?: any | null;
  } | null;
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

export type ProductsQueryVariables = Exact<{
  filters?: InputMaybe<ProductFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
}>;

export type ProductsQuery = {
  __typename?: 'Query';
  products: Array<{
    __typename?: 'Product';
    documentId: string;
    name: string;
    description: string;
    vendor?: string | null;
    model: string;
    odoo_product_id?: string | null;
    createdAt?: any | null;
    updatedAt?: any | null;
    publishedAt?: any | null;
    category?: {
      __typename?: 'Category';
      title?: string | null;
      slug?: string | null;
      image?: {
        __typename?: 'UploadFile';
        documentId: string;
        name: string;
        alternativeText?: string | null;
        width?: number | null;
        height?: number | null;
        mime: string;
        url: string;
      } | null;
    } | null;
    brand?: {
      __typename?: 'Brand';
      name?: string | null;
      url?: string | null;
      image?: {
        __typename?: 'UploadFile';
        documentId: string;
        name: string;
        alternativeText?: string | null;
        width?: number | null;
        height?: number | null;
        mime: string;
        url: string;
      } | null;
    } | null;
    price_lists: Array<{
      __typename?: 'Price';
      documentId: string;
      price?: number | null;
      sale_price?: number | null;
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
    specification?: Array<{
      __typename?: 'ComponentElementsSpecification';
      id: string;
      key: string;
      value: string;
    } | null> | null;
    key_features?: Array<{
      __typename?: 'ComponentElementsKeyFeatures';
      id: string;
      feature?: string | null;
    } | null> | null;
    inventories: Array<{
      __typename?: 'Inventory';
      documentId: string;
      name?: string | null;
      location_code?: string | null;
      quantity?: number | null;
      createdAt?: any | null;
      updatedAt?: any | null;
      publishedAt?: any | null;
    } | null>;
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
    description: string;
    vendor?: string | null;
    model: string;
    odoo_product_id?: string | null;
    createdAt?: any | null;
    updatedAt?: any | null;
    publishedAt?: any | null;
    category?: {
      __typename?: 'Category';
      title?: string | null;
      slug?: string | null;
      image?: {
        __typename?: 'UploadFile';
        documentId: string;
        name: string;
        alternativeText?: string | null;
        width?: number | null;
        height?: number | null;
        mime: string;
        url: string;
      } | null;
    } | null;
    brand?: {
      __typename?: 'Brand';
      name?: string | null;
      url?: string | null;
      image?: {
        __typename?: 'UploadFile';
        documentId: string;
        name: string;
        alternativeText?: string | null;
        width?: number | null;
        height?: number | null;
        mime: string;
        url: string;
      } | null;
    } | null;
    price_lists: Array<{
      __typename?: 'Price';
      documentId: string;
      price?: number | null;
      sale_price?: number | null;
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
    specification?: Array<{
      __typename?: 'ComponentElementsSpecification';
      id: string;
      key: string;
      value: string;
    } | null> | null;
    key_features?: Array<{
      __typename?: 'ComponentElementsKeyFeatures';
      id: string;
      feature?: string | null;
    } | null> | null;
    inventories: Array<{
      __typename?: 'Inventory';
      documentId: string;
      name?: string | null;
      location_code?: string | null;
      quantity?: number | null;
      createdAt?: any | null;
      updatedAt?: any | null;
      publishedAt?: any | null;
    } | null>;
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
    name?: string | null;
    url?: string | null;
    image?: {
      __typename?: 'UploadFile';
      name: string;
      alternativeText?: string | null;
      mime: string;
      url: string;
      width?: number | null;
      height?: number | null;
    } | null;
  } | null>;
};

export type CategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type CategoriesQuery = {
  __typename?: 'Query';
  categories: Array<{
    __typename?: 'Category';
    documentId: string;
    title?: string | null;
    slug?: string | null;
    image?: {
      __typename?: 'UploadFile';
      name: string;
      alternativeText?: string | null;
      mime: string;
      url: string;
      width?: number | null;
      height?: number | null;
    } | null;
  } | null>;
};

export type CreateProductMutationVariables = Exact<{
  data: ProductInput;
}>;

export type CreateProductMutation = {
  __typename?: 'Mutation';
  createProduct?: {
    __typename?: 'Product';
    documentId: string;
    name: string;
    model: string;
    description: string;
    vendor?: string | null;
    odoo_product_id?: string | null;
    createdAt?: any | null;
    updatedAt?: any | null;
    publishedAt?: any | null;
    brand?: {
      __typename?: 'Brand';
      name?: string | null;
      url?: string | null;
      image?: {
        __typename?: 'UploadFile';
        documentId: string;
        name: string;
        alternativeText?: string | null;
        width?: number | null;
        height?: number | null;
        mime: string;
        url: string;
      } | null;
    } | null;
    inventories: Array<{
      __typename?: 'Inventory';
      location_code?: string | null;
      quantity?: number | null;
    } | null>;
    price_lists: Array<{
      __typename?: 'Price';
      documentId: string;
      price?: number | null;
      sale_price?: number | null;
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
    specification?: Array<{
      __typename?: 'ComponentElementsSpecification';
      id: string;
      key: string;
      value: string;
    } | null> | null;
    key_features?: Array<{
      __typename?: 'ComponentElementsKeyFeatures';
      id: string;
      feature?: string | null;
    } | null> | null;
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
    description: string;
    vendor?: string | null;
    odoo_product_id?: string | null;
    createdAt?: any | null;
    updatedAt?: any | null;
    publishedAt?: any | null;
    category?: {
      __typename?: 'Category';
      title?: string | null;
      slug?: string | null;
      image?: {
        __typename?: 'UploadFile';
        name: string;
        alternativeText?: string | null;
        mime: string;
        url: string;
        width?: number | null;
        height?: number | null;
      } | null;
    } | null;
    brand?: {
      __typename?: 'Brand';
      name?: string | null;
      url?: string | null;
      image?: {
        __typename?: 'UploadFile';
        documentId: string;
        name: string;
        alternativeText?: string | null;
        width?: number | null;
        height?: number | null;
      } | null;
    } | null;
    price_lists: Array<{
      __typename?: 'Price';
      documentId: string;
      price?: number | null;
      sale_price?: number | null;
      min_quantity?: number | null;
      max_quantity?: number | null;
      user_level?: string | null;
    } | null>;
    inventories: Array<{
      __typename?: 'Inventory';
      documentId: string;
      location_code?: string | null;
      quantity?: number | null;
    } | null>;
    specification?: Array<{
      __typename?: 'ComponentElementsSpecification';
      id: string;
      key: string;
      value: string;
    } | null> | null;
    files: Array<{
      __typename?: 'UploadFile';
      documentId: string;
      name: string;
      url: string;
      mime: string;
      ext?: string | null;
    } | null>;
    images: Array<{
      __typename?: 'UploadFile';
      documentId: string;
      name: string;
      url: string;
      mime: string;
      ext?: string | null;
    } | null>;
    key_features?: Array<{
      __typename?: 'ComponentElementsKeyFeatures';
      id: string;
      feature?: string | null;
    } | null> | null;
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
      item: {
        __typename?: 'ComponentElementsCartItem';
        productID: string;
        title: string;
        quantity: number;
        price: number;
        odoo_product_id: string;
        model: string;
        image: string;
      };
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
                  name: { kind: 'Name', value: 'item' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'quantity' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'odoo_product_id' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'model' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                    ],
                  },
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
} as unknown as DocumentNode<CartsQuery, CartsQueryVariables>;
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
                  name: { kind: 'Name', value: 'item' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'productID' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'quantity' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'odoo_product_id' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'model' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'image' } },
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
                        name: { kind: 'Name', value: 'username' },
                      },
                    ],
                  },
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
                  name: { kind: 'Name', value: 'item' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'productID' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'quantity' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'odoo_product_id' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'model' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'image' } },
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
                        name: { kind: 'Name', value: 'username' },
                      },
                    ],
                  },
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
            name: { kind: 'Name', value: 'FilesFiltersArgs' },
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
} as unknown as DocumentNode<FilesQuery, FilesQueryVariables>;
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
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
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
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'vendor' } },
                { kind: 'Field', name: { kind: 'Name', value: 'model' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'odoo_product_id' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'category' },
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
                        name: { kind: 'Name', value: 'sale_price' },
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
                  name: { kind: 'Name', value: 'specification' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
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
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'feature' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'inventories' },
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
                        name: { kind: 'Name', value: 'location_code' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'quantity' },
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
                        name: { kind: 'Name', value: 'publishedAt' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'vendor' } },
                { kind: 'Field', name: { kind: 'Name', value: 'model' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'odoo_product_id' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'category' },
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
                        name: { kind: 'Name', value: 'sale_price' },
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
                  name: { kind: 'Name', value: 'specification' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
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
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'feature' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'inventories' },
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
                        name: { kind: 'Name', value: 'location_code' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'quantity' },
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
                        name: { kind: 'Name', value: 'publishedAt' },
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
export const CreateProductDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateProduct' },
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
            name: { kind: 'Name', value: 'createProduct' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'vendor' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'odoo_product_id' },
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
                  name: { kind: 'Name', value: 'inventories' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'location_code' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'quantity' },
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
                        name: { kind: 'Name', value: 'sale_price' },
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
                  name: { kind: 'Name', value: 'specification' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
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
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'feature' },
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
} as unknown as DocumentNode<
  CreateProductMutation,
  CreateProductMutationVariables
>;
export const CustomProductUpdateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CustomProductUpdate' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'vendor' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'odoo_product_id' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'category' },
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
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'alternativeText' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'mime' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'url' },
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
                          ],
                        },
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
                        name: { kind: 'Name', value: 'sale_price' },
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
                  name: { kind: 'Name', value: 'inventories' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'location_code' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'quantity' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'specification' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
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
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'mime' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'ext' } },
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
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'mime' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'ext' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'key_features' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'feature' },
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
} as unknown as DocumentNode<
  CustomProductUpdateMutation,
  CustomProductUpdateMutationVariables
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
                        name: { kind: 'Name', value: 'item' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'productID' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'title' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'quantity' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'price' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'odoo_product_id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'model' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'image' },
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
