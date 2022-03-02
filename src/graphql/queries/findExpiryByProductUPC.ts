import { gql } from "@apollo/client"

const findExpiryByProductUPC = gql`
    query FindExpiryByProductUPC($upc: UPC!) {
        product(upc: $upc) {
            expiry {
                id
                date
            }
        }
    }

`

export default findExpiryByProductUPC
