import { ApolloClient, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      // These are the primary keys in the respective tables.
      Product: {
        keyFields: [ "upc" ]
      },
      Expiry: {
        keyFields: [ "id" ]
      }
    }
  })
})

export default client
