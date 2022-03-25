import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Checkbox from "@kiwi/ui/inputs/Checkbox"
import flexy from "@kiwi/styles/flexMixin"
import useDebounce from "../hooks/useDebounce"
import { gql, useMutation } from "@apollo/client"

interface DeleteExpiryResult {
  deleteById: number
}

export interface DeleteExpiryData {
  expiry: DeleteExpiryResult
}

interface DeleteExpiryVars {
  id: number
}

const DeleteExpiryEntry = gql`
    mutation DeleteExpiry($id: ID!) {
        expiry {
            deleteByID(id: $id)
        }
    }
`

function ExpiryListEntry({ children, expiryId }: { children: React.ReactNode, expiryId: number }) {
  const [ checked, isChecked ] = useState(false)
  const debouncedCheck = useDebounce(checked, 2000)

  const [ deleteExpiry ] = useMutation<null, DeleteExpiryVars>(DeleteExpiryEntry, {
    refetchQueries: [
      "QueryProductExpired",
      "QueryProductExpiring"
    ],
    variables: {
      id: expiryId
    }
  })

  const onCheckedHandler = () => isChecked(prevState => !prevState)

  useEffect(() => {
    if (debouncedCheck) {
      deleteExpiry()
    }
  }, [ debouncedCheck ])

  return (
    <ListItem>
      {children}
      <Checkbox checked={checked} onChange={onCheckedHandler}/>
    </ListItem>
  )
}

const ListItem = styled.li`
  &:first-of-type {
    padding: 0 1rem 0.66rem 0;
  }

  ${flexy({ align: "center", justify: "space-between" })};
  padding: 0.66rem 1rem 0.66rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colours.text.fade};
`

export default ExpiryListEntry
