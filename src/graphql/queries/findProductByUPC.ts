import { gql } from "@apollo/client"

const findProductByUPC = gql`
    query FindProductByUPC($upc: UPC!, $expiring: Boolean! = false) {
        product(upc: $upc) {
            name
            expiry @include(if: $expiring) {
                id
                date
            }
            price
            upc
            id
        }
    }

`

export default findProductByUPC
