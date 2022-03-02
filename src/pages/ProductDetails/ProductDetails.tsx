import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Modal } from "components"
import { useThemeConfig } from "@kiwi/hooks"
import { ReactComponent as LeftArrow } from "@kiwi/icons/arrow-left.svg"
import { ReactComponent as OverflowCircle } from "@kiwi/icons/dots-vertical.svg"
import { ReactComponent as Edit } from "@kiwi/icons/pencil.svg"
import { dark, light } from "@kiwi/themes"
import { IconButton } from "@kiwi/ui/buttons"

import { Actions, Leading, PageWrapper, VerticalAppBar } from "./styles"
import styled from "styled-components"
import { useQuery } from "@apollo/client"
import findProductByUPC from "@kiwi/graphql/queries/findProductByUPC"
import ExpiringView from "./views/Expiry"
import ProductView from "./views/Product"

function ProductDetails() {
  const [ overflowMenuOpen, setOverflowMenuOpen ] = useState(false)
  const navigate = useNavigate()
  const { upc } = useParams()
  const [ theme, setTheme ] = useThemeConfig()
  const { data } = useQuery(findProductByUPC, {
    variables: {
      upc,
      expiring: true
    }
  })

  const handleOverflowClick = () => setOverflowMenuOpen(prevState => !prevState)
  const handleBackClick = () => navigate("/")

  return (
    <React.Fragment>
      <PageWrapper>
        <VerticalAppBar>
          <Leading>
            <IconButton onClick={handleBackClick}>
              <LeftArrow/>
            </IconButton>
          </Leading>
          <Actions>
            <IconButton onClick={handleOverflowClick}>
              <OverflowCircle/>
            </IconButton>
            <IconButton onClick={() => null}>
              <Edit/>
            </IconButton>
          </Actions>
          <div data-child="">
            <h1 className="t-reduced-bottom-margin">{data && data.product.name}</h1>
            <p>{upc}</p>
          </div>
        </VerticalAppBar>
        <PageLayout>
          <ProductView/>
          <ExpiringView/>
        </PageLayout>
      </PageWrapper>
      <Modal open={overflowMenuOpen} closeAction={() => setOverflowMenuOpen(prevState => !prevState)}>
        {/*todo: remove */}
        <h4 onClick={() => setTheme(theme === dark ? light : dark)}>Settings</h4>
      </Modal>
    </React.Fragment>
  )
}

export const Card = styled.div`
  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }

  > header {
    margin-bottom: 1rem;
  }

  border: 1px solid ${({ theme }) => theme.colours.text.fade};
  border-radius: 1rem;
  padding: 1rem;
`

const PageLayout = styled.section`
  display: flex;
  flex-direction: column;
  margin: 1rem 1rem 0 1rem;
`

export default ProductDetails
