import { gql } from "@apollo/client"

const findExpiryByProductUPC = gql`
    query FindExpiryByProductUPC($upc: UPC!, $first: Int) {
        product(upc: $upc) {
            expiry(first: $first) {
                id
                date
            }
        }
    }

`

export default findExpiryByProductUPC
