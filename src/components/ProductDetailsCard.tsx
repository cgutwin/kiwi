import React from "react"
import styled from "styled-components"
import flexy from "@kiwi/styles/flexMixin"
import { Pencil } from "@kiwi/icons"
import { useNavigate, useParams } from "react-router-dom"
import { gql, useQuery } from "@apollo/client"
import renderTableRowFromFilter from "../utils/renderTableRowFromFilter"
import { IconButton } from "@kiwi/ui/buttons"
import LoadingPlaceholder from "@kiwi/ui/LoadingPlaceholder"

interface ProductQueryResult {
  id: number,
  name: string,
  upc: string,
  price: number
}

export interface ProductQueryData {
  product: ProductQueryResult
}

interface ProductQueryVars {
  upc: string
}

const QueryProductData = gql`
    query QueryProductData($upc: UPC!) {
        product(upc: $upc) {
            upc
            name
            price
        }
    }
`

function ProductDetailsCard() {
  const navigate = useNavigate()
  const { upc } = useParams<{ upc: string }>()
  const { data, loading, error } = useQuery<ProductQueryData, ProductQueryVars>(QueryProductData, {
    variables: {
      // upc will always exist as we're never navigating to a url without a :upc param.
      upc: upc!
    }
  })

  const onActionClickHandler = () => navigate("edit", {
    state: {
      product: data?.product
    }
  })

  const TableDataRows = data && renderTableRowFromFilter<typeof data.product>([ "upc", "name", "price" ], data.product)

  if (error) return (<div>error</div>)
  if (loading) return (<LoadingPlaceholder />)

  return (
    <Card>
      <Header>
        <h2 className="t-h-reduced-size-2 t-no-margin">Details</h2>
        {/* Action */}
        <IconButton onClick={onActionClickHandler}><Pencil /></IconButton>
      </Header>
      <table>
        <tbody>
        {TableDataRows}
        </tbody>
      </table>
    </Card>
  )
}

const Card = styled.section`
  border: 1px solid ${({ theme }) => theme.colours.text.fade};
  border-radius: 1rem;
  margin: 1rem;
  padding: 1rem;
`

const Header = styled.header`
  ${flexy({ align: "center", justify: "space-between" })};
  margin-bottom: 1rem;
`

export default ProductDetailsCard
