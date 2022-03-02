import React from "react"

import { ThemeConfigContext } from "@kiwi/context"

/**
 * A hook to manipulate the current configured theme for styled-components. Used within a {@link ThemeConfigContext}
 * provider, which is wrapped in the {@link InjectTheme} component.
 *
 * @throws {ReferenceError} - Must be used within a {@link ThemeConfigContext} provider.
 * @see InjectTheme
 * @see ThemeConfigContext
 */
function useThemeConfig() {
  const context = React.useContext(ThemeConfigContext)
  // If the hook is used somehow outside the context of the theme config, throw a reference error, since the context
  // passed non-existent.
  if (context === undefined) {
    throw new ReferenceError("useThemeConfig must be used within a ThemeConfigContext provider.")
  }
  return context
}

export default useThemeConfig
