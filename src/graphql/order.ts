import { graphql } from '@/lib/gql';

const schema = {
  Query: {},
  Mutation: {
    createOrder: graphql(`
      mutation CreateOrder($data: OrderInput!) {
        createOrder(data: $data) {
          cart_items {
            id
            title
            quantity
            price
          }
          shipping {
            delivery_option {
              id
              price
              title
              eta
              notes
            }
            delivery_address
            shipping_details {
              id
              company_name
              address {
                id
                street
                suburb
                state_territory
                postcode
                country
              }
            }
          }
        }
      }
    `),
  },
};

export default schema;
