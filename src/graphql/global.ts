import { gql } from "@apollo/client";

const schema = {
  Queries: {
    navBar: gql(`
     	query {
            global {
                data {
                    attributes {
                        title
                        description
                        topnav {
                            link {
                                id
                                text
                                href
                                external
                            }
                            logolink {
                                id
                                text
                                href
                                image {
                                    data {
                                        attributes {
                                            url
                                        }
                                    }
                                }
                            }
                            cta {
                                id
                                text
                                href
                                external
                            }
                        }
                    }
                }
            }
        }
    `),
  },
};

export default schema;
