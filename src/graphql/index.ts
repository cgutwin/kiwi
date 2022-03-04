import { ApolloClient, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache({
    typePolicies: {
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
