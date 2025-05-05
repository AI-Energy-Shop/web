import { graphql } from '@/lib/gql';

const schema = {
  Query: {
    orders: graphql(`
      query Orders($filters: OrderFiltersInput) {
        orders(filters: $filters) {
          documentId
          orderNumber
          user {
            documentId
            business_name
          }
          total {
            amount
            currency
          }
          paymentStatus
          fulfillmentStatus
          lineItems {
            quantity
            product {
              name
            }
          }
          paymentMethod
          shippingType
          deliveryStatus
          createdAt
          updatedAt
        }
      }
    `),
  },
  Mutation: {},
};

export default schema;
