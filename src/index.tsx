import React from "react"
import ReactDOM from "react-dom"

import { ApolloProvider } from "@apollo/client"
import { BrowserRouter } from "react-router-dom"

import App from "./App"

import { InjectTheme } from "@kiwi/components"
import client from "@kiwi/graphql"
import typography from "@kiwi/styles/typography"
import { dark, light } from "@kiwi/themes"

import "./index.css"

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        {/* Inject the theme in the index, so I can manipulate the meta theme tag in <App/> */}
        <InjectTheme initialTheme={window.matchMedia("(prefers-color-scheme: dark)").matches ? dark : light}>
          <App/>
        </InjectTheme>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
)

typography.injectStyles()
