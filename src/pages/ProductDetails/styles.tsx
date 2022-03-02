import styled from "styled-components"

export const PageWrapper = styled.div`
  background: ${({ theme }) => theme.colours.background.hex};
  color: ${({ theme }) => theme.colours.text.main};

  /* Assign a header space in the layout, then fill the remaining space down. */
  align-items: stretch;
  display: grid;
  grid-template-rows: min-content 1fr;
  height: 100vh;
`
//todo: extract and rename as this will be shared.

// https://api.flutter.dev/flutter/material/AppBar-class.html
export const VerticalAppBar = styled.header`
  > h1, h2, h3, h4, h5, h6, [data-child] {
    grid-area: title;
  }

  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colours.text.fade};
  display: grid;
  grid-gap: 1rem 1rem;
  grid-template-areas: "leading actions"
                       "title title";
  grid-template-columns: 4rem 1fr;
  grid-template-rows: min-content 1fr;
  padding: 1rem 1rem 1.5rem;
`

// https://api.flutter.dev/flutter/widgets/NavigationToolbar-class.html
export const Actions = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 1rem;
  grid-area: actions;
  justify-content: end;
`

export const Leading = styled.div`
  grid-area: leading;
`
