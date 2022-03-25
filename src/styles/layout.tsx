import styled from "styled-components"

export const PageWrapper = styled.div`
  background: ${({ theme }) => theme.colours.background.hex};
  color: ${({ theme }) => theme.colours.text.main};

  /* Assign a header space in the layout, then fill the remaining space down. */
  align-items: stretch;
  display: grid;
  grid-template-rows: min-content 1fr;
  min-height: 100vh;
`
