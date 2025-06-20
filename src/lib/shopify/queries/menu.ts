// all the queries for the shopify menu

// GraphQL Query
export const getMenuQuery = `
query getMenu($handle: String!) {
 menu(handle: $handle) {
  items {
   title
   url
  }
 }
}
`;
