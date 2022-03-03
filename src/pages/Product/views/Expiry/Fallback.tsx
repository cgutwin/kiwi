import { FallbackProps } from "react-error-boundary"
import React from "react"
import { Card } from "../../ProductDetails"

function ExpiringFallback({ error, resetErrorBoundary }: FallbackProps) {
  return <Card style={{
    background: "rgba(255,65,63,0.1)"
  }}>
    <h2 className="t-h-reduced-size-2 t-reduced-bottom-margin" style={{ color: "#FF413F" }}>There's been an error!</h2>
    <p style={{ color: "#FF413F" }}>Couldn't load expiry info for product.</p>
  </Card>
}

export default ExpiringFallback
