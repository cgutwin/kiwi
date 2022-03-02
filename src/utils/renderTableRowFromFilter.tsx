import React from "react"

import styled from "styled-components"

import { CopyInnerText } from "@kiwi/components"

/**
 * Iterate through an object picking entries based on a filter of keys. Takes the filtered entries and renders out
 * a table data row.
 * @param {Object} data - An object of key-values.
 */
function renderTableRowFromFilter<TData extends object>(filter: string[], data: TData): React.ReactNode {
  const TableRows: JSX.Element[] = []

  Object.entries(data)
        .filter(([ key ]) => filter.includes(key))
        .sort()
        .forEach(([ key, value ]: [ string, string ]) => {
          TableRows.push(
            <tr key={`row-${key}`}>
              <th style={{ border: "none", textTransform: "capitalize", fontWeight: 500 }}>{key}</th>
              <TableData>
                <CopyInnerText>{value}</CopyInnerText>
              </TableData>
            </tr>
          )
        })

  return TableRows
}

export const TableData = styled.td`
  border-bottom: 1px solid ${({ theme }) => theme.colours.text.fade};
  padding: 0.75rem 1rem;
  width: 75%;
`

export default renderTableRowFromFilter
