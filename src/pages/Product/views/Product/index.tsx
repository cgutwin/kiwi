import { ErrorBoundary } from "react-error-boundary"
import React from "react"
import ProductFallback from "./Fallback"
import ProductData from "./ProductData"

function ProductView() {
  return (
    <ErrorBoundary FallbackComponent={ProductFallback}>
      <ProductData/>
    </ErrorBoundary>
  )
}

export default ProductView
