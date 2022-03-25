import React, { useEffect, useState } from "react"
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom"
import VerticalTitleHeader from "../../components/VerticalTitleHeader"
import { gql, useQuery } from "@apollo/client"
import { PageWrapper } from "@kiwi/styles/layout"
import { withErrorBoundary } from "react-error-boundary"
import ProductPageFallback from "./Fallback"

export type PageMetaType = Partial<{
  title: string
  subtitle: string
}>

export interface ProductPageOutletContext<TPageMeta> {
  data: ProductQueryData
  meta: [
    value: TPageMeta,
    dispatch: React.Dispatch<React.SetStateAction<TPageMeta>>
  ]
}

interface ProductQueryResult {
  id: number,
  name: string,
  upc: string
}

interface ProductQueryData {
  product: ProductQueryResult
}

interface ProductQueryVars {
  upc: string
}

const QueryProductMetaInfo = gql`
    query QueryProductMetaInfo($upc: UPC!) {
        product(upc: $upc) {
            upc
            name
        }
    }
`

function ProductPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [ pageMeta, setPageMeta ] = useState<PageMetaType>({
    title: undefined,
    subtitle: undefined
  })
  const { upc } = useParams<{ upc: string }>()
  const { data, error } = useQuery<ProductQueryData, ProductQueryVars>(QueryProductMetaInfo, {
    variables: {
      // upc will always exist as we're never navigating to a url without a :upc param.
      upc: upc!
    }
  })

  const onBackClickHandler = () => {
    // As the pathname has / at the beginning, it splits with an empty string "". Return only values where exists.
    const path = location.pathname.split("/")
                         .filter((value) => value)
    if (path[path.length - 1] === upc) {
      navigate(`/`)
    } else {
      navigate(`/product/${upc}`)
    }
  }

  const onOverflowClickHandler = () => null

  useEffect(() => {
    if (data) {
      setPageMeta({
        title: data.product.name,
        subtitle: data.product.upc
      })
    }
  }, [ data ])

  if (error) throw error

  return (
    <PageWrapper>
      <VerticalTitleHeader title={pageMeta.title}
                           subtitle={pageMeta.subtitle}
                           backAction={onBackClickHandler}
                           overflowAction={onOverflowClickHandler}/>
      <Outlet context={{
        data,
        meta: [
          pageMeta,
          setPageMeta
        ]
      } as ProductPageOutletContext<PageMetaType>}/>
    </PageWrapper>
  )
}

export default withErrorBoundary(ProductPage, {
  FallbackComponent: ProductPageFallback
})
export { default as ProductPageDetails } from "./outlets/Details"
export { default as ProductPageEditProduct } from "./outlets/Edit"
