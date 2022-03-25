import styled, { keyframes } from "styled-components"

const LoadingPlaceholderAnimation = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0.3;
  }
`

const LoadingPlaceholder = styled.div`
  &:not(:last-of-type) {
    margin-bottom: 0.5rem;
  }

  animation: 750ms linear alternate infinite ${LoadingPlaceholderAnimation};
  background: ${({ theme }) => theme.colours.text.fade};
  //border: 1px solid ${({ theme }) => theme.colours.text.fade};
  border-radius: 0.25rem;
  height: 20vh;
  margin: 1rem;
`

export default LoadingPlaceholder
