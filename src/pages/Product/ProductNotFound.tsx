import React from "react"
import { PageWrapper } from "./styles"
import { HorizontalHeader } from "./views/Expiry/ExpiryData"
import { ArrowLeft } from "@kiwi/icons"
import { IconButton } from "@kiwi/ui/buttons"
import styled from "styled-components"
import flexy from "@kiwi/styles/flexMixin"
import { Card } from "./ProductDetails"
import { useNavigate, useParams } from "react-router-dom"

function ProductNotFound() {
  const { upc } = useParams()
  const navigate = useNavigate()

  const handleBackClick = () => navigate("/")

  return (
    <PageWrapper>
      <Header>
        <IconButton onClick={handleBackClick}>
          <ArrowLeft/>
        </IconButton>
      </Header>
      <Main>
        <Card style={{
          width: "100%"
        }}>
          <HorizontalHeader>
            <h1 className="t-h-reduced-size-2 t-no-margin">Product Not Found</h1>
          </HorizontalHeader>
          <p className="t-with-margin-bottom">A product with the code {upc} wasn't found.</p>
          <p>Either the code was scanned/entered incorrectly, or it doesn't yet exist in Kiwi's database.</p>
          <PromptChoicesContainer>
            <p onClick={handleBackClick}>Re-Enter Code</p>
            <p style={{
              color: "#31F58D",
              fontWeight: "700"
            }}>Create Product</p>
          </PromptChoicesContainer>
        </Card>
      </Main>
    </PageWrapper>
  )
}

const Header = styled(HorizontalHeader)`
  padding: 1rem 1rem 1.5rem;
  grid-row: 1;
  grid-column: 1;
  z-index: 2;
`

const Main = styled.main`
  ${flexy({ justify: "center", align: "center" })};
  flex-direction: column;
  grid-row: 1 / span 2;
  grid-column: 1;
  margin: 0 1rem;
`

const PromptChoicesContainer = styled.div`
  ${flexy({ justify: "space-evenly", align: "center" })};
  // Override/remove the padding positioning set by the parent card.
  margin: 1.5rem -1rem -1rem;
  padding: 1rem 0;
  border-top: 1px solid ${({ theme }) => theme.colours.text.fade};
`

export default ProductNotFound
