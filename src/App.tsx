import React, { useEffect } from "react"
import { Route, Routes } from "react-router-dom"

import { useThemeConfig } from "@kiwi/hooks"
import { ProductPage, ScanBarcode } from "@kiwi/pages"
import { ProductPageDetails, ProductPageEditProduct } from "@kiwi/pages/product"
import { dark, light } from "@kiwi/themes"
import ProductPageCreateProduct from "./pages/product/outlets/Create"

/*
 * Route structure:
 * /product
 *   /:upc
 *     /create
 *     /edit
 * /scan
 * */
function App() {
  // Set the current meta theme colour to the current active theme colour background.
  const [ theme, setTheme ] = useThemeConfig()
  document.querySelector("meta[name=\"theme-color\"]")
          ?.setAttribute("content", theme.colours.background.hex)

  // Dynamically change the app theme based on the device preferred colour scheme
  useEffect(() => {
    const query = "(prefers-color-scheme: dark)"
    const eventListener = (event: MediaQueryListEvent) => setTheme(event.matches ? dark : light)

    window.matchMedia(query)
          .addEventListener("change", eventListener)

    return () => {
      window.matchMedia(query)
            .removeEventListener("change", eventListener)
    }
  }, [ setTheme ])

  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<ScanBarcode />}/>
        <Route path="product/:upc" element={<ProductPage />}>
          <Route index element={<ProductPageDetails />}/>
          <Route path="edit" element={<ProductPageEditProduct />}/>
        </Route>
        <Route path="product/:upc/create" element={<ProductPageCreateProduct />}/>
      </Routes>
    </React.Fragment>
  )
}

export default App
