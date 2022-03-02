import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import findExpiryByProductUPC from "@kiwi/graphql/queries/findExpiryByProductUPC"
import React from "react"
import { Card } from "pages/ProductDetails/ProductDetails"
import styled from "styled-components"
import { isPast, parseISO } from "date-fns"

function ExpiringData() {
  const { upc } = useParams()
  const { error, data } = useQuery(findExpiryByProductUPC, {
    variables: {
      upc
    }
  })

  if (error) throw error

  return (
    <Card>
      <header>
        <h2 className="t-h-reduced-size-2 t-no-margin">Expiring</h2>
        <p data-t-unfocused="">Expiring within 4 days.</p>
      </header>
      {data && data.product.expiry.length === 0 ? "No items expiring." : null}
      {data && data.product.expiry.map((expiry: any) => {
        const date = parseISO(expiry.date)

        return (
          <ExpiryEntry key={expiry.id}>
            <p>{date.toDateString()}</p>
            <p style={{ color: "#FF413F" }}>{isPast(date) ? "EXPIRED" : ""}</p>
          </ExpiryEntry>
        )
      })}
    </Card>
  )
}

const ExpiryEntry = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`

export default ExpiringData
