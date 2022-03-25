import React, { CSSProperties } from "react"
import styled, { keyframes } from "styled-components"

import { IconButton } from "@kiwi/ui/buttons"
import { ArrowLeft, DotsVertical } from "@kiwi/icons/index"

interface VerticalTitleHeaderProps {
  title: string | undefined,
  subtitle: string | undefined,
  backAction: () => void,
  overflowAction: () => void,
}

export default function VerticalTitleHeader({ title, subtitle, backAction, overflowAction }: VerticalTitleHeaderProps) {
  return (
    <VerticalAppBar>
      <Leading>
        <IconButton onClick={backAction}>
          <ArrowLeft/>
        </IconButton>
      </Leading>
      <Actions>
        <IconButton onClick={overflowAction}>
          <DotsVertical/>
        </IconButton>
      </Actions>
      <div data-child="">
        {title ? <h1 className="t-reduced-bottom-margin">{title}</h1> : <TextLoadingPlaceholder width="15rem"/>}
        {subtitle ? <p>{subtitle}</p> : <TextLoadingPlaceholder/>}
      </div>
    </VerticalAppBar>
  )
}

const LoadingPlaceholderAnimation = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0.3;
  }
`

const TextLoadingPlaceholder = styled.div<{ readonly width?: CSSProperties["width"] }>`
  &:not(:last-of-type) {
    margin-bottom: 0.5rem;
  }

  animation: 750ms linear alternate infinite ${LoadingPlaceholderAnimation};
  background: ${({ theme }) => theme.colours.text.fade};
  //border: 1px solid ${({ theme }) => theme.colours.text.fade};
  border-radius: 0.25rem;
  height: 2rem;
  width: ${({ width }) => width ? width : "10rem"};
`

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
