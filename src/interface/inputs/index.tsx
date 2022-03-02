import React from "react"

import styled from "styled-components"

const StyledInput = styled.input`
  // When the input has focus, or text in it (with the not placeholder shown selector), raise up the corresponding label
  // text and place it in the border.
  :not(:placeholder-shown), :focus {
    + p {
      color: ${({ theme }) => theme.colours.text.main};
      transform: translateY(-100%);
      margin-left: 0.75rem;
      padding: 0.25rem;
    }
  }

  background: none;
  border: 2px solid gray;
  border-radius: 1rem;
  color: ${({ theme }) => theme.colours.text.main};
  padding: 0.75rem 1rem;
`

const LabelWrapper = styled.label`
  * {
    grid-row: 1;
    grid-column: 1;
  }

  p {
    background: ${({ theme }) => theme.colours.foreground.hex};
    color: gray;
    margin-left: 1rem;
    transition: transform 150ms;
    width: fit-content;
  }

  align-items: center;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  margin-top: 1.25rem;
`

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  label?: string
}

const CustomInput = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { label } = props

    return (
      <React.Fragment>
        <LabelWrapper>
          <StyledInput ref={ref}
                       placeholder=" "
                       {...props}
          />
          {label ? <p>{label}</p> : null}
        </LabelWrapper>
      </React.Fragment>
    )
  })

export default CustomInput
