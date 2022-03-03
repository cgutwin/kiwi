import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import findExpiryByProductUPC from "@kiwi/graphql/queries/findExpiryByProductUPC"
import React from "react"
import { Card } from "../../ProductDetails"
import { format, isPast, parseISO } from "date-fns"
import styled from "styled-components"
import flexy from "@kiwi/styles/flexMixin"
import { IconButton } from "@kiwi/ui/buttons"
import { ChevronRight } from "@kiwi/icons"
import { LoadingCard } from "../../styles"

function ExpiringData() {
  const { upc } = useParams()
  const { loading, error, data } = useQuery(findExpiryByProductUPC, {
    variables: {
      upc,
      first: 6
    }
  })

  if (error) throw error
  if (loading) return <LoadingCard/>

  return (
    <Card>
      <HorizontalHeader>
        <div>
          <h2 className="t-h-reduced-size-2 t-no-margin">Expiring</h2>
          <p data-t-unfocused="">Expiring within 4 days.</p>
        </div>
        <IconButton style={{ height: "1.5rem" }} onClick={() => null}>
          <ChevronRight/>
        </IconButton>
      </HorizontalHeader>
      {data && data.product.expiry.length === 0 ? "No items expiring." : null}
      {data && data.product.expiry.map((expiry: any) => {
        const date = parseISO(expiry.date)

        return (
          <ExpiryEntry key={expiry.id}>
            <p>{format(date, "EEEE MMM do")}</p>
            <p style={{ color: "#FF413F", fontWeight: 600 }}>{isPast(date) ? "EXPIRED" : ""}</p>
          </ExpiryEntry>
        )
      })}
    </Card>
  )
}

export const HorizontalHeader = styled.header`
  ${flexy({ align: "center", justify: "space-between" })};
`

const ExpiryEntry = styled.div`
  ${flexy({ justify: "space-between" })};
  margin-bottom: 0.5rem;
`

export default ExpiringData
