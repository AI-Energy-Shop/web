export interface Routes {
  requestId: string;
  carrier: Carrier;
  carrierService: CarrierService;
  carrierAccount: CarrierAccount;
  companyCarrierAccountId: number;
  companyId: number;
  consignmentTotal: ConsignmentTotal;
  fromCompanyLocationId: number;
  fromAddress: FromAddress;
  fromLocation: FromLocation;
  fromZone: FromZone;
  toCompanyLocationId: number;
  toAddress: ToAddress;
  toLocation: ToLocation;
  toZone: ToZone;
  despatchOptions: DespatchOption[];
  fuelLevyPercentage: number;
  sellFuelLevyPercentage: number;
  taxPercentage: number;
  electiveSurcharges: ElectiveSurcharge[];
  automaticSurcharges: AutomaticSurcharge[];
  totalWeight: number;
  totalCubic: number;
  totalVolume: number;
  carrierLogoFileName: string;
  priceDisplay: number;
  priceDisplayType: number;
  isHourly: boolean;
}

export interface Carrier {
  id: number;
  name: string;
  abbreviation: string;
  displayName: string;
  customFieldSets: CustomFieldSet[];
}

export interface CustomFieldSet {
  propertyName: string;
  displayName: string;
  isRequired: boolean;
  customFieldType: number;
  value: string;
  defaultValue: string;
  description: string;
  displayToUser: boolean;
  listOfAvailableValues: string;
  entityFieldType: number;
  carrierRefPools: CarrierRefPool[];
  shouldEnforceDefaultValueNull: boolean;
}

export interface CarrierRefPool {
  id: number;
  poolName: string;
}

export interface CarrierService {
  id: number;
  name: string;
  abbreviation: string;
  displayName: string;
}

export interface CarrierAccount {
  id: number;
  name: string;
  accountCode: string;
  carrierId: number;
  carrier: Carrier2;
  isInTestMode: boolean;
  displayName: string;
}

export interface Carrier2 {
  id: number;
  name: string;
  abbreviation: string;
  displayName: string;
}

export interface ConsignmentTotal {
  sellPricesCleared: boolean;
  consignmentCarrierSurchargesCostPrice: number;
  consignmentCarrierSurchargesSellPrice: number;
  consignmentCarrierSurchargesFuelExemptCostPrice: number;
  consignmentCarrierSurchargesFuelExemptSellPrice: number;
  totalConsignmentCarrierSurchargesCostPrice: number;
  totalConsignmentCarrierSurchargesSellPrice: number;
  totalSellPrice: number;
  totalCostPrice: number;
  totalBaseSellPrice: number;
  totalBaseCostPrice: number;
  totalTaxSellPrice: number;
  totalTaxCostPrice: number;
  costFuelLevyPrice: number;
  sellFuelLevyPrice: number;
  consignmentRouteCostPrice: number;
  consignmentRouteSellPrice: number;
  totalCostBeforeTax: number;
  totalSellBeforeTax: number;
}

export interface FromAddress {
  name: string;
  addressLine1: string;
  addressLine2: string;
  location: Location;
  contact: string;
  phone: string;
  email: string;
}

export interface Location {
  id: number;
  postcode: string;
  state: State;
  stateId: number;
  timeZoneId: number;
  timeZone: TimeZone;
  suburb: string;
  searchStr: string;
  countryCode: string;
  description: string;
  descriptionShort: string;
  isFrom: boolean;
  locationAliases: LocationAliase[];
  locationType: number;
  countryId: number;
  country: Country;
  subLocality: string;
}

export interface State {
  code: string;
  name: string;
  id: number;
}

export interface TimeZone {
  id: number;
  name: string;
  jsName: string;
}

export interface LocationAliase {
  id: number;
  location: string;
  locationId: number;
  name: string;
}

export interface Country {
  id: number;
  name: string;
  code2: string;
  code3: string;
  numeric: string;
  currencyCode: string;
  taxPercentage: number;
  displayName: string;
}

export interface FromLocation {
  id: number;
  postcode: string;
  state: State2;
  timeZone: string;
  suburb: string;
  subLocality: string;
  country: Country2;
  description: string;
  locationType: number;
}

export interface State2 {
  code: string;
  name: string;
  id: number;
}

export interface Country2 {
  id: number;
  name: string;
  code2: string;
  code3: string;
  numeric: string;
  currencyCode: string;
  taxPercentage: number;
  displayName: string;
}

export interface FromZone {
  guid: string;
  id: number;
  name: string;
  abbreviation: string;
  carrierId: number;
  displayName: string;
}

export interface ToAddress {
  name: string;
  addressLine1: string;
  addressLine2: string;
  location: Location2;
  contact: string;
  phone: string;
  email: string;
}

export interface Location2 {
  id: number;
  postcode: string;
  state: State3;
  stateId: number;
  timeZoneId: number;
  timeZone: TimeZone2;
  suburb: string;
  searchStr: string;
  countryCode: string;
  description: string;
  descriptionShort: string;
  isFrom: boolean;
  locationAliases: LocationAliase2[];
  locationType: number;
  countryId: number;
  country: Country3;
  subLocality: string;
}

export interface State3 {
  code: string;
  name: string;
  id: number;
}

export interface TimeZone2 {
  id: number;
  name: string;
  jsName: string;
}

export interface LocationAliase2 {
  id: number;
  location: string;
  locationId: number;
  name: string;
}

export interface Country3 {
  id: number;
  name: string;
  code2: string;
  code3: string;
  numeric: string;
  currencyCode: string;
  taxPercentage: number;
  displayName: string;
}

export interface ToLocation {
  id: number;
  postcode: string;
  state: State4;
  timeZone: string;
  suburb: string;
  subLocality: string;
  country: Country4;
  description: string;
  locationType: number;
}

export interface State4 {
  code: string;
  name: string;
  id: number;
}

export interface Country4 {
  id: number;
  name: string;
  code2: string;
  code3: string;
  numeric: string;
  currencyCode: string;
  taxPercentage: number;
  displayName: string;
}

export interface ToZone {
  guid: string;
  id: number;
  name: string;
  abbreviation: string;
  carrierId: number;
  displayName: string;
}

export interface DespatchOption {
  despatchDateLocal: string;
  despatchDateUtc: string;
  etaLocal: string;
  etaUtc: string;
  durationInMinutes: number;
  isTimeWindow: boolean;
  totalDays: number;
  totalHours: number;
  totalBusinessDays: number;
  etaAffectedByPublicHolidays: boolean;
  despatchDateAffectedByPublicHolidays: boolean;
  businessDaysOnly: boolean;
  customEtaString: string;
  carrierAcceptsDespatchTimes: boolean;
}

export interface ElectiveSurcharge {
  costPrice: number;
  sellPrice: number;
  quantity: number;
  name: string;
}

export interface AutomaticSurcharge {
  costPrice: number;
  sellPrice: number;
  quantity: number;
  name: string;
}
