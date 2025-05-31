type ENUM_ACCOUNTDETAIL_LEVEL =
  | 'default'
  | 'small'
  | 'mid_size'
  | 'vip'
  | 'whole_seller';

export const USER_LEVELS: { name: string; value: ENUM_ACCOUNTDETAIL_LEVEL }[] =
  [
    {
      name: 'DEFAULT',
      value: 'default',
    },
    {
      name: 'SMALL',
      value: 'small',
    },
    {
      name: 'MID-SIZED',
      value: 'mid_size',
    },
    {
      name: 'VIP',
      value: 'vip',
    },
    {
      name: 'WHOLE-SELLER',
      value: 'whole_seller',
    },
  ];

export const LOCATIONS = [
  // Major City Airport Codes
  'SYD', // Sydney (New South Wales)
  'MEL', // Melbourne (Victoria)
  'BNE', // Brisbane (Queensland)
];

export const SORT_OPTIONS = [
  { name: 'Alphabetically, A-Z', value: 'acend' },
  { name: 'Alphabetically, Z-A', value: 'descend' },
  { name: 'Price, low to high', value: 'price-low' },
  { name: 'Price, high to low', value: 'price-high' },
];

export const EXCLUDED_SEARCH_PARAMS = ['page', 'pageSize'];
export const ACCEPTED_MAIN_FILTERS = ['Product Type', 'Brand'];

export const INITIAL_PAGE = 1;
export const INITIAL_PAGE_SIZE = 12;

export const SPECIFICATION_KEYS = [
  'Brand',
  'Product_Model',
  'Wattage',
  'Cell_Technology',
  'Colour',
  'Qty_Per_Pallet',
  'Dimensions_LxWxT',
  'Weight',
  'Performance_Warranty',
  'Product_Warranty',
  'Product_Series',
  'Power_Rating',
  'Inverter_Type',
  'Phase_Support',
  'Plug_Connector_Type',
  'Grid_Support',
  'IP_Rating',
  'Number_Of_MPPTs',
  'Number_Of_Strings',
  'Length',
  'Thickness',
  'Total_Capacity',
  'Battery_Voltage',
  'Battery_Cell_Technology',
  'Number_of_Battery_Cells',
  'Max_System_Paralleled',
  'Dimensions_WxHxD',
];

type OnSelectProductAction = {
  actionId: string;
  actionName: string;
  actionVariant: 'default' | 'secondary' | 'destructive' | 'ghost';
  actionClassName?: string;
  actionDescription: string;
  submitButtonText: string;
  submitButtonVariant: 'default' | 'secondary' | 'destructive' | 'ghost';
};

export const ON_SELECT_PRODUCT_ACTIONS: OnSelectProductAction[] = [
  {
    actionId: 'publish',
    actionName: 'Publish',
    actionVariant: 'ghost',
    actionClassName: '',
    actionDescription: ' ',
    submitButtonText: 'Publish',
    submitButtonVariant: 'secondary',
  },
  {
    actionId: 'draft',
    actionName: 'Draft',
    actionVariant: 'ghost',
    actionClassName: '',
    actionDescription: ' ',
    submitButtonText: 'Draft',
    submitButtonVariant: 'secondary',
  },
  {
    actionId: 'delete',
    actionName: 'Delete',
    actionVariant: 'ghost',
    actionClassName: 'text-red-400',
    actionDescription: 'Are you sure you want to delete ',
    submitButtonText: 'Delete',
    submitButtonVariant: 'destructive',
  },
];
