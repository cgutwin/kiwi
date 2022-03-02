import "styled-components"

type ColourVariantsType = {
  hex: string
  rgba: string
}

declare module "styled-components" {
  export interface DefaultTheme {
    colours: {
      text: {
        main: string,
        fade: string
      }
      background: ColourVariantsType
      foreground: ColourVariantsType
    }
  }
}
