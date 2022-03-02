import { FallbackProps } from "react-error-boundary"
import React from "react"
import { Card } from "../../ProductDetails"

function ExpiringFallback({ error, resetErrorBoundary }: FallbackProps) {
  return <Card style={{
    background: "#FFF6F6"
  }}>
    <h2 className="t-h-reduced-size-2 t-reduced-bottom-margin" style={{ color: "#FF413F" }}>Uh Oh!</h2>
    <p style={{ color: "#FF413F" }}>There was an error loading entries!</p>
  </Card>
}

export default ExpiringFallback
