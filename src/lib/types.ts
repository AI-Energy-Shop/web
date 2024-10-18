// Common Types
export type ImageAttributes = {
  url: string;
  name: string;
  alternativeText: string; // Shortened alternative text
};

export type LinkItem = {
  url: string;
  title: string;
};

// Inquiry Form Types
export type InquiryInput = {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
};

export type InquiryForm = {
  heading: string;
  button_title: string;
  inputs: InquiryInput[];
};

// Section Types
export type AboutSection = {
  heading: string;
  sub_heading: string;
  description: string;
  button_title: string;
  backgroundImage: ImageAttributes;
};

export type ContactUsSection = {
  heading: string;
  description: string;
  button_title: string;
  background_image: ImageAttributes;
};

export type Location = {
  id: string;
  name: string;
  address: string;
  warehouse_time: string;
  officeTime: string;
  googleMapsLink: string;
};

export type WarehouseLocation = {
  heading: string;
  sub_heading: string;
  locations: Location[];
};

export type ContactDetails = {
  id: string;
  left_heading: string;
  left_sub_heading: string;
  right_heading: string;
  right_sub_heading: string;
};

// Response Types
export type HomePageResponse = {
  homePage: {
    data: {
      attributes: {
        pageTitle: string;
        bannerImages: ImageAttributes[];
        aboutSection: AboutSection;
        contactUsSection: ContactUsSection;
      };
    };
  };
};

export type ContactPageResponse = {
  contactPage: {
    data: {
      attributes: {
        contactDetails: ContactDetails;
        warehouseLocation: WarehouseLocation;
      };
    };
  };
};
