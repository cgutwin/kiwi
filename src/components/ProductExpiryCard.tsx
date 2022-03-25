import React from "react"
import styled from "styled-components"
import { useParams } from "react-router-dom"
import { gql, useQuery } from "@apollo/client"
import { format, formatISO, parseISO, startOfToday } from "date-fns"
import ExpiryListEntry from "./ExpiryListEntry"
import LoadingPlaceholder from "@kiwi/ui/LoadingPlaceholder"
import { UL } from "@kiwi/ui/List"

interface ExpiryQueryResult {
  id: number,
  date: Date
}

export interface ExpiryQueryData {
  expiryByUPC: ExpiryQueryResult[]
}

enum ExpiringQualifierEnum {
  ON = "ON",
  BEFORE = "BEFORE",
  AFTER = "AFTER"
}

interface ExpiryQueryVars {
  upc: string,
  filter: {
    date: string,
    inclusive?: boolean
    qualifier?: ExpiringQualifierEnum
  }[]
}

const QueryProductExpiring = gql`
    query QueryProductExpiring($upc: UPC!, $filter: [ExpiryFilter!]) {
        expiryByUPC(upc: $upc, filter: $filter) {
            id
            date
        }
    }
`

function ProductExpiryCard() {
  const { upc } = useParams<{ upc: string }>()
  const { data, loading, error } = useQuery<ExpiryQueryData, ExpiryQueryVars>(QueryProductExpiring, {
    variables: {
      // upc will always exist as we're never navigating to a url without a :upc param.
      upc: upc!,
      filter: [
        {
          date: formatISO(startOfToday(), { representation: "date" }),
          qualifier: ExpiringQualifierEnum.AFTER,
          inclusive: false
        }
      ]
    }
  })

  if (error) return (<div>error</div>)
  if (loading) return <LoadingPlaceholder />

  return (
    <Card>
      <Header>
        <h2 className="t-h-reduced-size-2 t-no-margin">Expiring</h2>
        <p data-t-unfocused="">Upcoming 3 expiring</p>
      </Header>
      <UL>
        {data && data.expiryByUPC.length > 0 ? data.expiryByUPC.map((expiry, i) => i < 3 && (
          <ExpiryListEntry key={expiry.id}
                           expiryId={expiry.id}>{format(parseISO(expiry.date.toString()), "EEEE MMM do")}</ExpiryListEntry>
        )) : <p>No upcoming expiring products.</p>}
      </UL>
    </Card>
  )

}

const Card = styled.section`
  border: 1px solid ${({ theme }) => theme.colours.text.fade};
  border-radius: 1rem;
  margin: 1rem;
  padding: 1rem 0 1rem 1rem;
`

const Header = styled.header`
  margin-bottom: 1rem;
`

export default ProductExpiryCard
