import React from "react"
import { Check } from "@kiwi/icons"
import styled, { css } from "styled-components"

function Checkbox({ checked, styleOverride, ...rest }: CheckboxProps) {
  return (
    <div>
      <label>
        <Input
          aria-label="checkbox"
          checked={checked}
          type="checkbox"
          {...rest}
        />
        <CheckboxStyle checked={checked}>
          <Check
            style={{
              visibility: checked ? "visible" : "hidden",
              ...styleOverride
            }}
          />
        </CheckboxStyle>
      </label>
    </div>
  )
}

export const Input = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

interface CheckboxProps extends React.ComponentPropsWithoutRef<"input"> {
  checked: boolean
  styleOverride?: object
}

export const CheckboxStyle = styled.div<CheckboxProps>`
  background: transparent;
  display: inline-block;
  border: 2px solid gray;
  border-radius: 100%;
  width: 2rem;
  height: 2rem;
  transition: all 100ms;
  padding: 0.2rem;

  ${Input}:focus & {
    border: 2px solid #0d0d1b;
    box-shadow: 0 0 5px 1px rgba(13, 13, 27, 0.2);
  }

  ${(props) =>
          props.checked &&
          css`
            background: #31f58d;
            border: 2px solid rgba(255, 255, 255, 0.66);
          `}
`

export default Checkbox
