import React, { useState } from "react"

import { DefaultTheme, ThemeProvider } from "styled-components"

import { ThemeConfigContext } from "@kiwi/context"

/**
 * @function InjectTheme
 * Extends the styled-components ThemeProvider to include dynamic configuration of the provided theme.
 * This is done by adding a child ThemeConfigContext, which allows manipulating the currentTheme state, then passed to
 * the styled-components ThemeProvider.
 *
 * @param {Object} props - Accepted props
 * @param {DefaultTheme} props.initialTheme - The initial theme the app should load, and is passed to the
 * styled-components theme provider by default.
 * @param {React.ReactNode} props.children - The initial theme the app should load, and is passed to the
 * styled-components theme provider by default.
 * */
function InjectTheme({ initialTheme, children }: { initialTheme: DefaultTheme, children: React.ReactNode }) {
  const [ currentTheme, setCurrentTheme ] = useState(initialTheme)

  return (
    // Inject the styled-components theme context based on the current theme state.
    <ThemeProvider theme={currentTheme}>
      {/* Inject our own theme configuration context, to allow setting themes from different components without
       prop drilling. */}
      <ThemeConfigContext.Provider value={[ currentTheme, setCurrentTheme ]}>
        {children}
      </ThemeConfigContext.Provider>
    </ThemeProvider>
  )
}

export default InjectTheme
