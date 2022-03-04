import { gql } from "@apollo/client"

const mutationCreateProduct = gql`
    mutation CreateProduct($data: ProductInput!) {
        product {
            create(product: $data) {
                upc
            }
        }
    }

`

export default mutationCreateProduct
