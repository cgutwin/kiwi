import React from "react"
import { FallbackProps } from "react-error-boundary"
import { ApolloError } from "@apollo/client"
import ProductNotFound from "./ProductNotFound"

function ProductPageFallback({ error }: FallbackProps) {
  if (error instanceof ApolloError) {
    if (error.graphQLErrors[0]?.extensions.code === "DB_NOT_FOUND_ERROR") return <ProductNotFound />
  }

  return <div>unknown error.</div>
}

export default ProductPageFallback
