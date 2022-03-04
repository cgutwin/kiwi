import React, { useEffect, useLayoutEffect, useState } from "react"

import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

import { Modal } from "@kiwi/components"
import { useScanner } from "@kiwi/hooks"
import { PageWrapper } from "@kiwi/pages/Product/styles"
import { ReactComponent as X } from "@kiwi/icons/close.svg"
import { IconButton } from "@kiwi/ui/buttons"
import CustomInput from "@kiwi/ui/inputs"

function ScanBarcode() {
  const [ active, setActive ] = useState(true)
  const [ ref, results ] = useScanner(active)
  const [ manualEntryOpen, setManualEntryOpen ] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (results && results.codeResult.code) {
      navigate(`/product/${results.codeResult.code}`, {
        replace: true
      })
    }
    return () => {
      setActive(false)
    }

    // `navigate` is just a hook to navigate.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ results ])

  useLayoutEffect(() => {
    // Active is the inverse of manualEntryOpen. true open means false active.
    setActive(!manualEntryOpen)
  }, [ manualEntryOpen ])

  const ManualEntryModal = () => {
    const { register, handleSubmit } = useForm()

    const onSubmitHandler = (data: any) => {
      navigate(`/product/${data.upc}`, {
        replace: true
      })
    }

    return (
      <React.Fragment>
        <h4>Enter Product Code</h4>
        <form id="manualCodeEntry" onSubmit={handleSubmit(onSubmitHandler)}>
          <CustomInput label="Product Code"
                       type="number"
                       inputMode="numeric"
                       autoComplete="false"
                       {...register("upc", {
                         required: true,
                         valueAsNumber: false
                       })}/>
        </form>
        <FormControlButtons>
          <p onClick={() => setManualEntryOpen(prevState => !prevState)}>Cancel</p>
          <input form="manualCodeEntry" type="submit" value="Find Product"/>
        </FormControlButtons>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <Page>
        <AppBar>
          <Leading>
            <IconButton>
              <X/>
            </IconButton>
          </Leading>
          <h1 className="t-h-reduced-size-4">Scan Barcode</h1>
        </AppBar>
        <ScanOverlayWrapper>
          <ScanHighlightOverlay/>
          <ScanOverlayText>Place barcode inside area.</ScanOverlayText>
          <ScanOverlaySubtext onClick={() => setManualEntryOpen(true)}>Or enter text manually</ScanOverlaySubtext>
        </ScanOverlayWrapper>
        <Main ref={ref}/>
      </Page>
      <Modal open={manualEntryOpen} closeAction={() => setManualEntryOpen(prevState => !prevState)}>
        <ManualEntryModal/>
      </Modal>
    </React.Fragment>
  )
}

const FormControlButtons = styled.div`
  align-items: baseline;
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`

const ScanOverlayWrapper = styled.div`
  place-self: center;
  grid-row: 1 / 3;
  z-index: 2;
  width: 75vw;
  height: 25vh;
  max-width: 20rem;
`

const ScanHighlightOverlay = styled.div`
  border-radius: 1rem 1rem 0 0;
  border: 0.25rem solid ${({ theme }) => theme.colours.text.main};
  height: 100%;
`

const ScanOverlayText = styled.p`
  color: ${({ theme }) => theme.colours.background.hex};
  background: ${({ theme }) => theme.colours.text.main};
  border-radius: 0 0 1rem 1rem;
  font-weight: 500;
  padding: 0.5rem 1rem 0.75rem;
  text-align: center;
`

const ScanOverlaySubtext = styled.p`
  color: ${({ theme }) => theme.colours.text.main};
  padding: 1rem;
  text-align: center;
  text-decoration: underline;
  z-index: 4;
`

const Leading = styled.div`
  > * {
    transform: translateY(8%);
  }

  grid-area: leading;
`

const AppBar = styled.header`
  > h1, h2, h3, h4, h5, h6 {
    grid-area: title;
  }

  align-items: center;
  background: ${({ theme }) => theme.colours.background.hex};
  border-radius: 0 0 1rem 1rem;
  display: grid;
  grid-gap: 1rem;
  grid-row: 1;
  grid-template-areas: "leading title actions";
  grid-template-columns: max-content 1fr max-content;
  grid-template-rows: min-content;
  padding: 1rem 2rem 1rem;
  z-index: 2;
`

const Main = styled.main`
  grid-row: 1 / 3;
  overflow: hidden;
  z-index: 1;
`

const Page = styled(PageWrapper)`
  > * {
    grid-column: 1;
  }
`

export default ScanBarcode
