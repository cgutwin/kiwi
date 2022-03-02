import React from "react"

import { DefaultTheme } from "styled-components"

type Dispatch = React.Dispatch<React.SetStateAction<DefaultTheme>>
type ContextType = [
  theme: DefaultTheme,
  setTheme: Dispatch
]

// The theme configuration context, used to control which theme is passed into styled-components via its ThemeContext.
const ThemeConfigContext = React.createContext<ContextType | undefined>(undefined)

export default ThemeConfigContext
