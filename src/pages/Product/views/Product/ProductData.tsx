import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import findProductByUPC from "@kiwi/graphql/queries/findProductByUPC"
import { renderTableRowFromFilter } from "@kiwi/utils"
import React from "react"
import { Card } from "../../ProductDetails"
import { ReactComponent as Edit } from "@kiwi/icons/pencil.svg"
import { IconButton } from "@kiwi/ui/buttons"
import styled from "styled-components"
import { LoadingCard } from "../../styles"

function ProductData() {
  const { upc } = useParams()
  const { loading, error, data } = useQuery(findProductByUPC, {
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
  if (loading) return <LoadingCard/>

  return (
    <Card style={{
      paddingRight: 0
    }}>
      <header style={{
        paddingRight: "1rem"
      }}>
        <FlexDiv>
          <h2 className="t-h-reduced-size-2 t-no-margin">Details</h2>
          <IconButton onClick={() => null}>
            <Edit/>
          </IconButton>
        </FlexDiv>
      </header>
      <table>
        <tbody>{data && renderTableRowFromFilter(KEYS_TO_RENDER, data.product)}</tbody>
      </table>
    </Card>
  )
}

const FlexDiv = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export default ProductData
