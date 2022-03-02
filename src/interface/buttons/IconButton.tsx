import styled from "styled-components"

export const ButtonReset = styled.button`
  background: transparent;
  border: none;
  color: inherit;
  font: inherit;
  line-height: normal;
  margin: 0;
  overflow: visible;
  padding: 0;
  width: auto;

  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  -webkit-appearance: none;

  ::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
`

const IconButton = styled(ButtonReset)`
  height: min-content;
  max-height: 1.75rem;
  max-width: 1.75rem;
`

export default IconButton
