import { ErrorBoundary } from "react-error-boundary"
import React from "react"
import ExpiringFallback from "../Expiry/Fallback"
import ProductData from "./ProductData"

function ProductView() {
  return (
    <ErrorBoundary FallbackComponent={ExpiringFallback}>
      <ProductData/>
    </ErrorBoundary>
  )
}

export default ProductView
