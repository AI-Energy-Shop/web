export type LinkItem = {
  url: string;
  title: string;
};

export type AccordionData = {
  id: number;
  title: string;
  content: string[];
};

type ImageAttributes = {
  url: string;
  name: string;
  alternativeText: string;
};

export type AboutSection = {
  heading: string;
  sub_heading: string;
  description: string;
  button_title: string;
  background_image: {
    data?: {
      attributes: ImageAttributes;
    };
  };
};

export type ContactusSection = {
  heading: string;
  description: string;
  button_title: string;
  image: {
    data: {
      attributes: ImageAttributes;
    };
  };
};

export type BannerImages = {
  id: string;
  link: string;
  image_type: string;
  image: {
    data: {
      attributes: ImageAttributes;
    };
  };
};

export type WarehouseLocation = {
  heading: string;
  sub_heading: string;
  locations: Locations[];
};

export type Locations = {
  id: string;
  name: string;
  address: string;
  warehouse_time: string;
  office_time: string;
  link: string;
};

export type ContactDetails = {
  id: string;
  left_subheading: string;
  left_description: string;
  right_subheading: string;
  right_description: string;
};

// HOME PAGE
export type HomePageRes = {
  homePage: {
    data: {
      attributes: {
        page_title: string;
        banner_images: BannerImages[];
        about_section: AboutSection;
        contactus_section: ContactusSection;
      };
    };
  };
};

export type ContactPageRes = {
  contactPage: {
    data: {
      attributes: {
        contact_details_section: ContactDetails;
        warehouse_location: WarehouseLocation;
      };
    };
  };
};
