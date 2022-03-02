import { ErrorBoundary } from "react-error-boundary"
import React from "react"
import ExpiringData from "./ExpiryData"
import ExpiringFallback from "./Fallback"

function ExpiringView() {
  return (
    <ErrorBoundary FallbackComponent={ExpiringFallback}>
      <ExpiringData/>
    </ErrorBoundary>
  )
}

export default ExpiringView
