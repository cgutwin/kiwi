import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import findProductByUPC from "@kiwi/graphql/queries/findProductByUPC"
import { renderTableRowFromFilter } from "@kiwi/utils"
import React from "react"
import { Card } from "../../ProductDetails"

function ProductData() {
  const { upc } = useParams()
  const { error, data } = useQuery(findProductByUPC, {
    variables: {
      upc
    }
  })

  // Which fields from the GraphQL data will be rendered in the table, since things like __typename are not required.
  const KEYS_TO_RENDER = [
    "price",
    "name",
    "upc"
  ]

  if (error) throw error

  return (
    <Card style={{
      paddingRight: 0
    }}>
      <header>
        <h2 className="t-h-reduced-size-2 t-no-margin">Details</h2>
      </header>
      <table>
        <tbody>{data && renderTableRowFromFilter(KEYS_TO_RENDER, data.product)}</tbody>
      </table>
    </Card>
  )
}

export default ProductData
