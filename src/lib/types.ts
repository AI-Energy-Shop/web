export type LinkItem = {
  url: string;
  title: string;
};

// Types for the GraphQL query response
interface Input {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
}
interface Image {
  alternativeText: string;
  name: string;
  url: string;
}

export interface Location {
  id: string;
  address: string;
  office_time: string;
  warehouse_time: string;
  google_maps_link: string;
  name: string;
}

export interface SliderSlide {
  id: string;
  title: string;
  description: string;
  image: Image;
  type: string;
}

interface BaseSection {
  id: string;
  __typename: string;
}

export interface ComponentSectionsWarehouseLocations extends BaseSection {
  __typename: 'ComponentSectionsWarehouseLocations';
  id: string;
  heading: string;
  sub_heading: string;
  locations: Location[];
}

interface ComponentSectionsImageSlider extends BaseSection {
  __typename: 'ComponentSectionsImageSlider';
  id: string;
  animation_duration: number;
  display_button: boolean;
  slides: SliderSlide[];
}

export interface ComponentSectionsContactUs extends BaseSection {
  __typename: 'ComponentSectionsContactUs';
  id: string;
  heading: string;
  description: string;
  button_title: string;
  background_image: Image;
}

export interface ComponentSectionsContactDetails extends BaseSection {
  __typename: 'ComponentSectionsContactDetails';
  id: string;
  left_heading: string;
  left_sub_heading: string;
  right_heading: string;
  right_sub_heading: string;
}

export interface ComponentSectionsAbout extends BaseSection {
  __typename: 'ComponentSectionsAbout';
  id: string;
  heading: string;
  sub_heading: string;
  description: string;
  button_title: string;
  background_image: Image;
}

interface ComponentFormNewsletter extends BaseSection {
  __typename: 'ComponentFormNewsletter';
  id: string;
  heading: string;
  sub_heading: string;
  inputs: Input[];
  sub_text: string;
  button_title: string;
  image: Image;
}

export interface ComponentFormInquiry extends BaseSection {
  __typename: 'ComponentFormInquiry';
  id: string;
  heading: string;
  button_title: string;
  inputs: Input[];
}

export type Section =
  | ComponentSectionsWarehouseLocations
  | ComponentSectionsImageSlider
  | ComponentSectionsContactUs
  | ComponentSectionsContactDetails
  | ComponentSectionsAbout
  | ComponentFormNewsletter
  | ComponentFormInquiry;

interface GetPageResponse {
  title: string;
  slug: string;
  sections: Section[];
}

export interface GetPageQuery {
  getPage: GetPageResponse;
}

// Account Detail Type
export type AccountDetail = {
  documentId: string;
  level: string;
  business_type: string; // Changed to camelCase for consistency
  odooId: string; // Changed to camelCase for consistency
  first_name: string; // Changed to camelCase for consistency
  middle_name: string; // Changed to camelCase for consistency
  last_name: string; // Changed to camelCase for consistency
  businessName: string; // Changed to camelCase for consistency
  position: string;
  createdAt: string; // Consider using Date type if you parse it later
  updatedAt: string; // Consider using Date type if you parse it later
  publishedAt: string; // Consider using Date type if you parse it later
  locale: string;
};

// User Type
export type UserType = {
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  account_status: string;
  account_details: AccountDetail; // Changed to camelCase for consistency
  createdAt: string; // Consider using Date type if you parse it later
  updatedAt: string; // Consider using Date type if you parse it later
  publishedAt: string; // Consider using Date type if you parse it later
  locale: string;
};

// Response Type
export type UsersPermissionsResponse = {
  usersPermissionsUsers: UserType[];
};

export type CartItemType = {
  id?: string;
  title?: string;
  model?: string;
  quantity?: number;
  price?: number;
  odoo_product_id?: string;
  image?: string;
};
// CART
export type CartType = {
  documentId: string;
  item: CartItemType;
  updatedAt: string;
  createdAt: string;
};

export type ShippingDetailsTypes = {
  companyName?: string;
  shippingAddress?: {
    name: {
      first_name: string;
      middle_name: string;
      last_name: string;
    };
    phone: string;
    street: string;
    suburb: string;
    state_territory: string;
    postcode: string;
    country: string;
  };
  deliveryOptions?: {
    title: string;
    price: number;
    eta: string;
  };
  warehouseLocation?: number;
  paymentOption?: {
    title: string;
    price: number;
  };
};

type UsersPermissionsRole = {
  __typename: 'UsersPermissionsRole';
  name: string;
};

export type Auser = {
  documentId: string;
  email: string;
  confirmed: boolean | null;
  blocked: boolean;
  username: string;
  role: UsersPermissionsRole;
};
