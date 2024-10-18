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

interface Location {
  id: string;
  address: string;
  office_time: string;
  warehouse_time: string;
  google_maps_link: string;
  name: string;
}

interface SliderSlide {
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
  heading: string;
  sub_heading: string;
  locations: Location[];
}

interface ComponentSectionsImageSlider extends BaseSection {
  __typename: 'ComponentSectionsImageSlider';
  animation_duration: number;
  display_button: boolean;
  slides: SliderSlide[];
}

export interface ComponentSectionsContactUs extends BaseSection {
  __typename: 'ComponentSectionsContactUs';
  heading: string;
  description: string;
  button_title: string;
  background_image: Image;
}

export interface ComponentSectionsContactDetails extends BaseSection {
  __typename: 'ComponentSectionsContactDetails';
  left_heading: string;
  left_sub_heading: string;
  right_heading: string;
  right_sub_heading: string;
}

export interface ComponentSectionsAbout extends BaseSection {
  __typename: 'ComponentSectionsAbout';
  heading: string;
  sub_heading: string;
  description: string;
  button_title: string;
  background_image: Image;
}

interface ComponentFormNewsletter extends BaseSection {
  __typename: 'ComponentFormNewsletter';
  heading: string;
  sub_heading: string;
  inputs: Input[];
  sub_text: string;
  button_title: string;
  image: Image;
}

export interface ComponentFormInquiry extends BaseSection {
  __typename: 'ComponentFormInquiry';
  heading: string;
  button_title: string;
  inputs: Input[];
}

interface ErrorResponse {
  code: string;
  message: string;
}

type Section =
  | ComponentSectionsWarehouseLocations
  | ComponentSectionsImageSlider
  | ComponentSectionsContactUs
  | ComponentSectionsContactDetails
  | ComponentSectionsAbout
  | ComponentFormNewsletter
  | ComponentFormInquiry
  | ErrorResponse;

interface GetPageResponse {
  title: string;
  slug: string;
  sections: Section[];
}

interface GetPageQuery {
  getPage: GetPageResponse;
}
