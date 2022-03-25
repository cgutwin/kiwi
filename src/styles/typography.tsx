import Typography from "typography"

const typography = new Typography({
  baseFontSize: "16px",
  blockMarginBottom: 0,
  headerLineHeight: 1.1,
  headerWeight: 600,
  baseLineHeight: 1.3,
  headerFontFamily: [ "Manrope", "sans-serif" ],
  bodyFontFamily: [ "Inter", "sans-serif" ],
  // 1.125 Major Second where the scale of 100% to H1 is 1.802.
  scaleRatio: 1.802,
  overrideStyles: ({ adjustFontSizeTo, rhythm, scale }) => ({
    h1: {
      ...adjustFontSizeTo(scale(5 / 5).fontSize),
    },
    h2: {
      ...adjustFontSizeTo(scale(4 / 5).fontSize),
      marginBottom: rhythm(1.10)
    },
    h3: {
      ...adjustFontSizeTo(scale(3 / 5).fontSize),
      marginBottom: rhythm(1.10)
    },
    h4: {
      ...adjustFontSizeTo(scale(2 / 5).fontSize)
      // marginBottom: rhythm(1.10)
    },
    h5: {
      "&:only-child": {
        margin: 0
      },
      ...adjustFontSizeTo(scale(1 / 5).fontSize),
      fontFamily: "Inter, sans-serif",
      fontWeight: 500
    },
    h6: {
      ...adjustFontSizeTo(scale(0 / 5).fontSize),
      fontFamily: "Inter, sans-serif",
      fontWeight: 500
    },
    small: {
      ...adjustFontSizeTo(scale(-1 / 5).fontSize),
      marginBottom: rhythm(1.10)
    },
    ".t-h-reduced-size-2": {
      ...adjustFontSizeTo(scale(2 / 5).fontSize),
      marginBottom: rhythm(1.10)
    },
    ".t-h-reduced-size-3": {
      ...adjustFontSizeTo(scale(3 / 5).fontSize),
      marginBottom: rhythm(1.10)
    },
    ".t-h-reduced-size-4": {
      ...adjustFontSizeTo(scale(4 / 5).fontSize)
    },
    ".t-reduced-bottom-margin": {
      marginBottom: rhythm(0.20)
    },
    ".t-no-margin": {
      margin: 0
    },
    ".t-base-weight": {
      fontWeight: 400
    },
    "[data-t-unfocused]": {
      opacity: 0.6
    },
    ".t-with-margin-bottom": {
      marginBottom: rhythm(1)
    }
  })
})

export default typography
