import { ErrorBoundary, FallbackProps } from "react-error-boundary"
import ProductDetails from "./ProductDetails"
import { ApolloError } from "@apollo/client"
import ProductNotFound from "./ProductNotFound"

function ProductPageFallback({ error, resetErrorBoundary }: FallbackProps) {
  if (error instanceof ApolloError) {
    if (error.graphQLErrors[0].extensions.code === "DB_NOT_FOUND_ERROR") return <ProductNotFound/>
  }

  return <div>error</div>
}

function ProductPage() {
  return (
    <ErrorBoundary FallbackComponent={ProductPageFallback}>
      <ProductDetails/>
    </ErrorBoundary>
  )
}

export { ProductPage }

