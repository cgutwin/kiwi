import CSS from "csstype"

interface FlexyMixinProps {
  align: CSS.Properties["alignItems"]
  justify: CSS.Properties["justifyContent"]
}

const flexy = ({ align, justify }: Partial<FlexyMixinProps>) => `
  align-items: ${align || "unset"};
  display: flex;
  flex-direction: row;
  justify-content: ${justify || "unset"}
`

export default flexy
